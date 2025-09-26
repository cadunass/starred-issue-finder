import { Octokit } from '@octokit/rest';
import type { GitHubRepo, FoundIssue, SearchOptions } from '../types/github';

export class IssueFinder {
  private octokit: Octokit;

  constructor(token: string) {
    if (!token) {
      throw new Error('GitHub token is required');
    }
    this.octokit = new Octokit({ auth: token });
  }

  async getStarredRepositories(): Promise<GitHubRepo[]> {
    console.log('Fetching starred repositories...\n');
    
    const starredRepos: GitHubRepo[] = [];
    let page = 1;
    let response: any;

    do {
      try {
        response = await this.octokit.rest.activity.listReposStarredByAuthenticatedUser({
          page,
          per_page: 100,
        });
        starredRepos.push(...response.data);
        page++;
      } catch (error) {
        throw new Error(`Failed to fetch starred repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } while (response.data.length === 100);

    return starredRepos;
  }

  async findIssuesInRepository(
    repo: GitHubRepo, 
    options: SearchOptions = {}
  ): Promise<FoundIssue[]> {
    const { labels = ['good first issue'], language } = options;
    
    // Skip if language filter is specified and doesn't match
    if (language && repo.language?.toLowerCase() !== language.toLowerCase()) {
      return [];
    }

    console.log(`Searching ${repo.full_name}...`);

    try {
      const issuesResponse = await this.octokit.rest.issues.listForRepo({
        owner: repo.owner.login,
        repo: repo.name,
        labels: labels.join(','),
        state: 'open',
        per_page: 100,
      });

      return issuesResponse.data.map((issue: any) => ({
        repo_name: repo.full_name,
        issue_title: issue.title,
        issue_url: issue.html_url,
        issue_number: issue.number,
        labels: issue.labels.map((label: any) => label.name),
        created_at: issue.created_at,
      }));
    } catch (error) {
      console.warn(`Warning: Could not fetch issues for ${repo.full_name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return [];
    }
  }

  async findAllIssues(options: SearchOptions = {}): Promise<FoundIssue[]> {
    try {
      const starredRepos = await this.getStarredRepositories();
      const foundIssues: FoundIssue[] = [];

      for (const repo of starredRepos) {
        const repoIssues = await this.findIssuesInRepository(repo, options);
        foundIssues.push(...repoIssues);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Filter by creation date if specified
      if (options.createdAfter) {
        return foundIssues.filter(issue => 
          new Date(issue.created_at) >= (options.createdAfter as Date)
        );
      }

      return foundIssues;
    } catch (error) {
      throw new Error(`Failed to find issues: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
