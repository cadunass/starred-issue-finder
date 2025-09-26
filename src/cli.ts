#!/usr/bin/env node

import { Command } from 'commander';
import { config } from 'dotenv';
import type { FoundIssue, SearchOptions } from './types/github';
import { IssueFinder } from './utils/issue-finder';

config();

const program = new Command();

function displayIssues(issues: FoundIssue[], format: 'table' | 'json' | 'plain' = 'plain'): void {
  if (issues.length === 0) {
    console.log('No issues found matching your criteria.');
    return;
  }

  switch (format) {
    case 'json':
      console.log(JSON.stringify(issues, null, 2));
      break;

    case 'table':
      console.table(
        issues.map(issue => ({
          Repository: issue.repo_name,
          Issue: issue.issue_title,
          Number: `#${issue.issue_number}`,
          Labels: issue.labels.join(', '),
          URL: issue.issue_url,
        }))
      );
      break;

    default:
      console.log(`\n${'='.repeat(60)}`);
      console.log('ISSUES FOUND IN YOUR STARRED REPOSITORIES');
      console.log(`${'='.repeat(60)}\n`);

      issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.repo_name}`);
        console.log(`   Issue: ${issue.issue_title} (#${issue.issue_number})`);
        console.log(`   Labels: ${issue.labels.join(', ')}`);
        console.log(`   Link: ${issue.issue_url}\n`);
      });
      break;
  }
}

async function main(): Promise<void> {
  program
    .name('find-issues')
    .description('Find open issues in your starred GitHub repositories')
    .version('1.0.0')
    .option(
      '-l, --labels <labels>',
      'Comma-separated list of labels to search for',
      'good first issue'
    )
    .option('-g, --language <language>', 'Filter by programming language')
    .option('-d, --days <days>', 'Only show issues created in the last N days', parseInt)
    .option('-f, --format <format>', 'Output format: plain, json, or table', 'plain')
    .option('--token <token>', 'GitHub personal access token (overrides GITHUB_TOKEN env var)')
    .action(async options => {
      try {
        const token = options.token || process.env.GITHUB_TOKEN;

        if (!token) {
          console.error('❌ Error: GitHub token is required.');
          console.error('   Set GITHUB_TOKEN environment variable or use --token option.');
          console.error('   Get a token at: https://github.com/settings/tokens');
          process.exit(1);
        }

        const searchOptions: SearchOptions = {
          outputFormat: options.format as 'table' | 'json' | 'plain',
        };

        if (options.labels) {
          searchOptions.labels = options.labels.split(',').map((l: string) => l.trim());
        }

        if (options.language) {
          searchOptions.language = options.language;
        }

        if (options.days) {
          const daysAgo = new Date();
          daysAgo.setDate(daysAgo.getDate() - options.days);
          searchOptions.createdAfter = daysAgo;
        }

        console.log('🔍 Starting search...');
        if (searchOptions.labels) {
          console.log(`📋 Looking for labels: ${searchOptions.labels.join(', ')}`);
        }
        if (searchOptions.language) {
          console.log(`💻 Language filter: ${searchOptions.language}`);
        }
        if (searchOptions.createdAfter) {
          console.log(`📅 Created after: ${searchOptions.createdAfter.toDateString()}`);
        }
        console.log('');

        const finder = new IssueFinder(token);
        const issues = await finder.findAllIssues(searchOptions);

        displayIssues(issues, searchOptions.outputFormat);

        console.log(`\n✅ Found ${issues.length} issue(s) total.`);
      } catch (error) {
        console.error(
          '❌ An error occurred:',
          error instanceof Error ? error.message : 'Unknown error'
        );
        process.exit(1);
      }
    });

  await program.parseAsync();
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}
