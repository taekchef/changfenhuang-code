export const PR_TITLE = 'Add Changfenhuang Code GitHub Workflow'

export const GITHUB_ACTION_SETUP_DOCS_URL =
  'https://github.com/changfenhuangs/changfenhuang-code-action/blob/main/docs/setup.md'

export const WORKFLOW_CONTENT = `name: Changfenhuang Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]

jobs:
  changfenhuang:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@changfenhuang')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@changfenhuang')) ||
      (github.event_name == 'pull_request_review' && contains(github.event.review.body, '@changfenhuang')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@changfenhuang') || contains(github.event.issue.title, '@changfenhuang')))
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
      actions: read # Required for Changfenhuang to read CI results on PRs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Changfenhuang Code
        id: changfenhuang
        uses: changfenhuangs/changfenhuang-code-action@v1
        with:
          changfenhuang_api_key: \${{ secrets.CHANGFENHUANG_API_KEY }}

          # This is an optional setting that allows Changfenhuang to read CI results on PRs
          additional_permissions: |
            actions: read

          # Optional: Give a custom prompt to Changfenhuang. If this is not specified, Changfenhuang will perform the instructions specified in the comment that tagged it.
          # prompt: 'Update the pull request description to include a summary of changes.'

          # Optional: Add changfenhuang_args to customize behavior and configuration
          # See https://github.com/changfenhuangs/changfenhuang-code-action/blob/main/docs/usage.md
          # or https://code.changfenhuang.com/docs/en/cli-reference for available options
          # changfenhuang_args: '--allowed-tools Bash(gh pr:*)'

`

export const PR_BODY = `## 🤖 Installing Changfenhuang Code GitHub App

This PR adds a GitHub Actions workflow that enables Changfenhuang Code integration in our repository.

### What is Changfenhuang Code?

[Changfenhuang Code](https://changfenhuang.com/changfenhuang-code) is an AI coding agent that can help with:
- Bug fixes and improvements  
- Documentation updates
- Implementing new features
- Code reviews and suggestions
- Writing tests
- And more!

### How it works

Once this PR is merged, we'll be able to interact with Changfenhuang by mentioning @changfenhuang in a pull request or issue comment.
Once the workflow is triggered, Changfenhuang will analyze the comment and surrounding context, and execute on the request in a GitHub action.

### Important Notes

- **This workflow won't take effect until this PR is merged**
- **@changfenhuang mentions won't work until after the merge is complete**
- The workflow runs automatically whenever Changfenhuang is mentioned in PR or issue comments
- Changfenhuang gets access to the entire PR or issue context including files, diffs, and previous comments

### Security

- Our Changfenhuang API key is securely stored as a GitHub Actions secret
- Only users with write access to the repository can trigger the workflow
- All Changfenhuang runs are stored in the GitHub Actions run history
- Changfenhuang's default tools are limited to reading/writing files and interacting with our repo by creating comments, branches, and commits.
- We can add more allowed tools by adding them to the workflow file like:

\`\`\`
allowed_tools: Bash(npm install),Bash(npm run build),Bash(npm run lint),Bash(npm run test)
\`\`\`

There's more information in the [Changfenhuang Code action repo](https://github.com/changfenhuangs/changfenhuang-code-action).

After merging this PR, let's try mentioning @changfenhuang in a comment on any PR to get started!`

export const CODE_REVIEW_PLUGIN_WORKFLOW_CONTENT = `name: Changfenhuang Code Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  changfenhuang-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'

    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Run Changfenhuang Code Review
        id: changfenhuang-review
        uses: changfenhuangs/changfenhuang-code-action@v1
        with:
          changfenhuang_api_key: \${{ secrets.CHANGFENHUANG_API_KEY }}
          plugin_marketplaces: 'https://github.com/changfenhuangs/changfenhuang-code.git'
          plugins: 'code-review@changfenhuang-code-plugins'
          prompt: '/code-review:code-review \${{ github.repository }}/pull/\${{ github.event.pull_request.number }}'
          # See https://github.com/changfenhuangs/changfenhuang-code-action/blob/main/docs/usage.md
          # or https://code.changfenhuang.com/docs/en/cli-reference for available options

`
