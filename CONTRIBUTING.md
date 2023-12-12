# Contributing to InputGame

Thank you for your interest in contributing to InputGame! This document is a set of guidelines to help you contribute to this project.

## Project Documentation

Please consult the [README](./README.md) file at the root of this repository.

### Bugs

If you find a bug, please open an [issue] in this repository describing the bug. Please prefix the issue's title with `[bug]`.

### Proposing changes or new features

Before creating an issue, check if you are using the latest version of the project. If you are not up-to-date, see if updating the repository fixes your issue.

Feel free to [open an issue](https://github.com/dwesh163/InputGame/issues/new/choose) to discuss any new features or to propose any changes. Please prefix the issue's title with `[feature request]`.

### Pull requests

We **love** pull requests! Before **forking the repo** and **creating a pull request** for non-trivial changes, it is usually best to first open an issue to discuss the changes, or discuss your intended approach for solving the problem in the comments for an existing issue.

-   **Update the [CHANGELOG.md]** for all enhancements and bug fixes.
-   **Add documentation.** Document your changes with code doc comments or in existing guides.
-   **Use the repo's default branch.** Branch from and submit your pull request to the repo's default branch. This is the `main` branch for this repository.

### Writing Commit Messages

-   **Limit the subject** line to 50 characters.
-   **Wrap the body** at about 72 characters.
-   **Use properly constructed sentences**, including punctuation.
-   **Smaller is better.** Submit **one** pull request per bug fix or feature.
-   **Prefix the title** with the relevant component name (examples: "[doc] fix title in README.md", "[fix] display error during launch").
-   **Use the imperative mood** in the subject line (example: "[fix] networking issue")
-   **Use spaces, not tabs.**

### Run the development environment

1. Change directory to `InputGame`

```bash
cd InputGame
```

2. Install all dependencies for InputGame

```bash
npm i
```

3. Launch a dev session

```bash
npm run dev
```

[issue]: https://github.com/dwesh163/InputGame/issues/
[CHANGELOG.md]: ./CHANGELOG.md
