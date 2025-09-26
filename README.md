# `starred-issue-finder`

A command-line tool to quickly find all open issues from your starred GitHub repositories.

This project is a simple, effective way to keep track of issues in the repositories you care about most, making it easy to find new opportunities to contribute to open-source.

-----

### ✨ Features

  * **Targeted Search:** Fetches all open issues exclusively from your starred repositories.
  * **Simple Interface:** A straightforward command-line tool that returns a clean, readable list of issues.
  * **Efficient API Usage:** Uses a Personal Access Token to leverage higher GitHub API rate limits.

-----

### 🚀 Getting Started

#### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your system.

#### Installation

Install the package globally using npm.

```bash
npm install -g starred-issue-finder
```

-----

### 💡 Usage

#### 1\. Generate a GitHub Token

This tool requires a GitHub Personal Access Token to authenticate your API requests and avoid rate limits.

  * Go to **GitHub Settings \> Developer settings \> Personal access tokens**.
  * Click **"Generate new token (classic)"**.
  * Give it a name and check the **`public_repo`** scope.
  * Copy the generated token.

#### 2\. Set the Token as an Environment Variable

Before running the command, set your token as an environment variable named `GITHUB_TOKEN`.

```bash
# On Linux/macOS
export GITHUB_TOKEN="your_personal_access_token"

# On Windows (Command Prompt)
set GITHUB_TOKEN="your_personal_access_token"
```

#### 3\. Run the Command

Simply run the command in your terminal.

```bash
find-issues
```

The tool will then fetch all of your starred repositories and print a list of their open issues to your console.

-----
