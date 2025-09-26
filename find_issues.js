const { Octokit } = require("@octokit/rest");
require("dotenv").config();

async function findGoodFirstIssuesInStarredRepos() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error("Error: GITHUB_TOKEN environment variable not set.");
        console.error("Please set your GitHub Personal Access Token to continue.");
        return;
    }

    const octokit = new Octokit({ auth: token });
    
    console.log("Fetching starred repositories...\n");

    try {
        const starredRepos = [];
        let page = 1;
        let response;
        do {
            response = await octokit.rest.activity.listReposStarredByAuthenticatedUser({
                page,
                per_page: 100,
            });
            starredRepos.push(...response.data);
            page++;
        } while (response.data.length === 100);

        const foundIssues = [];

        for (const repo of starredRepos) {
            console.log(`Searching ${repo.full_name}...`);

            const issuesResponse = await octokit.rest.issues.listForRepo({
                owner: repo.owner.login,
                repo: repo.name,
                labels: "good first issue",
                state: "open",
            });
            
            issuesResponse.data.forEach(issue => {
                foundIssues.push({
                    repo_name: repo.full_name,
                    issue_title: issue.title,
                    issue_url: issue.html_url
                });
            });
        }

        console.log("\n" + "=".repeat(50));
        console.log("GOOD FIRST ISSUES IN YOUR STARRED REPOSITORIES");
        console.log("=".repeat(50) + "\n");

        if (foundIssues.length === 0) {
            console.log("No 'good first issues' found in your starred repositories.");
        } else {
            foundIssues.forEach(issue => {
                console.log(`Repository: ${issue.repo_name}`);
                console.log(`Issue: ${issue.issue_title}`);
                console.log(`Link: ${issue.issue_url}\n`);
            });
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

findGoodFirstIssuesInStarredRepos();