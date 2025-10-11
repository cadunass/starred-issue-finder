# Changelog

## [1.1.9](https://github.com/cadunass/starred-issue-finder/compare/v1.1.4...v1.1.9) (2025-10-11)


### Bug Fixes

* conditionally load .env file in CLI to prevent output pollution when GITHUB_TOKEN is set ([3b93057](https://github.com/cadunass/starred-issue-finder/commit/3b930575de0ab741d986aa0e3f1e676bc8704004))


### Features

* add daily issue scanner workflow to automate issue tracking and reporting ([e275bf2](https://github.com/cadunass/starred-issue-finder/commit/e275bf25d72d6d460f7bcf59c1461445be6ac417))
* add silent mode to CLI and issue finder for improved user experience ([da8b0d4](https://github.com/cadunass/starred-issue-finder/commit/da8b0d41638e000effdb42c8084df0af4ce961fc))

## [1.1.8](https://github.com/cadunass/starred-issue-finder/compare/v1.1.4...v1.1.8) (2025-09-27)

## [1.1.7](https://github.com/cadunass/starred-issue-finder/compare/v1.1.4...v1.1.7) (2025-09-27)

## [1.1.6](https://github.com/cadunass/starred-issue-finder/compare/v1.1.4...v1.1.6) (2025-09-27)

## [1.1.2](https://github.com/cadunass/starred-issue-finder/compare/v1.1.1...v1.1.2) (2025-09-26)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-09-26

### Added
- Initial release of starred-issue-finder
- TypeScript-powered CLI tool to find issues in starred repositories
- Support for filtering by labels, programming language, and creation date
- Multiple output formats: plain text, JSON, and table
- Modern development setup with Biome, TypeScript, and release-it
- Comprehensive documentation and GitHub Actions workflows
- Support for pnpm package manager
