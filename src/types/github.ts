export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
  };
  private: boolean;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string | null;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string | null;
  state: 'open' | 'closed';
  html_url: string;
  user: {
    login: string;
    id: number;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
    description: string | null;
  }>;
  created_at: string;
  updated_at: string;
}

export interface FoundIssue {
  repo_name: string;
  issue_title: string;
  issue_url: string;
  issue_number: number;
  labels: string[];
  created_at: string;
}

export interface SearchOptions {
  labels?: string[];
  language?: string;
  createdAfter?: Date;
  outputFormat?: 'table' | 'json' | 'plain';
}
