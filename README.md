# 🌟 starred-issue-finder

A modern, TypeScript-powered command-line tool to quickly find all open issues from your starred GitHub repositories.

This project helps developers discover contribution opportunities by scanning their starred repositories for issues, making it easy to find new ways to contribute to open-source projects you care about.

[![npm version](https://badge.fury.io/js/starred-issue-finder.svg)](https://badge.fury.io/js/starred-issue-finder)
[![Node.js CI](https://github.com/cadunass/starred-issue-finder/actions/workflows/ci.yml/badge.svg)](https://github.com/cadunass/starred-issue-finder/actions/workflows/ci.yml)

---

## ✨ Features

- **🎯 Targeted Search**: Fetches all open issues exclusively from your starred repositories
- **🏷️ Flexible Filtering**: Filter by labels, programming language, and creation date
- **📊 Multiple Output Formats**: Plain text, JSON, or table format
- **⚡ Modern CLI**: Built with TypeScript and Commander.js for a great developer experience
- **🚀 Fast & Efficient**: Optimized API usage with higher GitHub API rate limits
- **🛡️ Type-Safe**: Fully written in TypeScript with comprehensive type definitions

---

## 📦 Installation

### Global Installation (Recommended)

Install the package globally using your preferred package manager:

```bash
# Using npm
npm install -g starred-issue-finder

# Using pnpm (recommended)
pnpm add -g starred-issue-finder

# Using yarn
yarn global add starred-issue-finder
```

### Local Installation

```bash
# Using npm
npm install starred-issue-finder

# Using pnpm
pnpm add starred-issue-finder

# Using yarn
yarn add starred-issue-finder
```

---

## 🚀 Quick Start

### 1. Generate a GitHub Token

This tool requires a GitHub Personal Access Token to authenticate API requests and avoid rate limits.

1. Go to **GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name like "starred-issue-finder"
4. Select the **`public_repo`** scope (or `repo` if you have private starred repositories)
5. Click **"Generate token"** and copy the generated token

### 2. Set Your Token

Set your token as an environment variable:

```bash
# Linux/macOS
export GITHUB_TOKEN="your_personal_access_token"

# Windows (Command Prompt)
set GITHUB_TOKEN="your_personal_access_token"

# Windows (PowerShell)
$env:GITHUB_TOKEN="your_personal_access_token"
```

### 3. Run the Tool

```bash
find-issues
```

---

## 📖 Usage

### Basic Usage

```bash
# Find all "good first issue" labeled issues
find-issues

# Show help
find-issues --help

# Show version
find-issues --version
```

### Advanced Usage

```bash
# Search for specific labels
find-issues --labels "bug,enhancement,help wanted"

# Filter by programming language
find-issues --language javascript

# Show only recent issues (last 30 days)
find-issues --days 30

# Output as JSON
find-issues --format json

# Output as table
find-issues --format table

# Use specific token (overrides GITHUB_TOKEN env var)
find-issues --token your_token_here

# Combine multiple filters
find-issues --language python --labels "good first issue,beginner" --days 7 --format table
```

### Output Formats

#### Plain Text (Default)
```
=============================================================
ISSUES FOUND IN YOUR STARRED REPOSITORIES
=============================================================

1. facebook/react
   Issue: Add support for new JSX transform (#123)
   Labels: good first issue, documentation
   Link: https://github.com/facebook/react/issues/123
```

#### JSON Format
```json
[
  {
    "repo_name": "facebook/react",
    "issue_title": "Add support for new JSX transform",
    "issue_url": "https://github.com/facebook/react/issues/123",
    "issue_number": 123,
    "labels": ["good first issue", "documentation"],
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

#### Table Format
```
┌─────────┬──────────────┬─────────────────────────────┬────────────────┬─────────────────────────────────────────┐
│ (index) │ Repository   │ Issue                       │ Number         │ URL                                     │
├─────────┼──────────────┼─────────────────────────────┼────────────────┼─────────────────────────────────────────┤
│ 0       │ 'facebook/r… │ 'Add support for new JSX…'  │ '#123'         │ 'https://github.com/facebook/react/i…' │
└─────────┴──────────────┴─────────────────────────────┴────────────────┴─────────────────────────────────────────┘
```

---

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0.0
- [pnpm](https://pnpm.io/) (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/cadunass/starred-issue-finder.git
cd starred-issue-finder

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run in development mode
pnpm run dev --help
```

### Available Scripts

```bash
# Development
pnpm run dev          # Run in development mode with tsx
pnpm run build        # Build TypeScript to dist/
pnpm run start        # Run built version

# Code Quality
pnpm run lint         # Lint with Biome
pnpm run lint:fix     # Lint and fix issues
pnpm run format       # Format code with Biome
pnpm run check        # Run all checks (lint + format)
pnpm run check:fix    # Fix all issues

# Release
pnpm run clean        # Clean dist/ folder
pnpm run release      # Create a new release with release-it
```

### Project Structure

```
starred-issue-finder/
├── src/
│   ├── types/
│   │   └── github.ts      # TypeScript type definitions
│   ├── utils/
│   │   └── issue-finder.ts # Core issue finding logic
│   ├── cli.ts             # CLI interface and commands
│   └── index.ts           # Main library exports
├── dist/                  # Built JavaScript files
├── biome.json            # Biome configuration
├── tsconfig.json         # TypeScript configuration
├── .release-it.json      # Release configuration
└── package.json          # Package configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests if applicable
4. Run the linter and formatter (`pnpm run check:fix`)
5. Build the project (`pnpm run build`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Octokit](https://github.com/octokit/octokit.js) for GitHub API integration
- CLI powered by [Commander.js](https://github.com/tj/commander.js)
- Code quality with [Biome](https://biomejs.dev/)
- Release management with [release-it](https://github.com/release-it/release-it)

---

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [existing issues](https://github.com/cadunass/starred-issue-finder/issues)
2. Create a [new issue](https://github.com/cadunass/starred-issue-finder/issues/new) if needed
3. Provide as much detail as possible, including:
   - Your Node.js version
   - Your operating system
   - The command you ran
   - The error message (if any)

---

**Happy contributing! 🚀**