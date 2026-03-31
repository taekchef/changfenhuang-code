# Changfenhuang Code Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make this repository installable as a global `Changfenhuang Code` CLI with `cc` and `changfenhuang` commands while preserving the user's existing runtime modifications.

**Architecture:** Keep the already-runnable bundled CLI as the execution core, then wrap it with a root npm package and a deterministic branding layer. Only patch user-facing strings and package metadata so the CLI stays runnable against the original upstream service interfaces.

**Tech Stack:** Node.js 18+, npm packaging, bundled ESM CLI, `node:test`, small filesystem patch scripts

---

### Task 1: Lock the target behavior with failing tests

**Files:**
- Create: `tests/branding.test.mjs`

**Step 1: Write the failing test**

Create tests that assert:

- The repo has a root `package.json`
- The root package exposes `cc` and `changfenhuang`
- `node package/cli.js --help` contains `Changfenhuang Code`
- `node package/cli.js --version` contains `Changfenhuang Code`

**Step 2: Run test to verify it fails**

Run: `node --test tests/branding.test.mjs`
Expected: FAIL because the root package does not exist yet and the bundled CLI still prints `Claude Code`

**Step 3: Commit**

```bash
git add tests/branding.test.mjs
git commit -m "test: add branding regression coverage"
```

### Task 2: Add a root npm package for global installation

**Files:**
- Create: `package.json`

**Step 1: Write the failing test**

Covered by Task 1.

**Step 2: Run test to verify it fails**

Run: `node --test tests/branding.test.mjs`
Expected: FAIL on missing root package metadata / missing bins

**Step 3: Write minimal implementation**

Create a root `package.json` with:

- a user-owned package name
- `bin` entries for `cc` and `changfenhuang`
- `package/cli.js` as the shared executable target
- sane `files`, `engines`, `license`, and script entries

**Step 4: Run test to verify it moves forward**

Run: `node --test tests/branding.test.mjs`
Expected: branding assertions still fail, but root-package assertions pass

**Step 5: Commit**

```bash
git add package.json
git commit -m "feat: add root npm package for changfenhuang code"
```

### Task 3: Add deterministic branding scripts

**Files:**
- Create: `scripts/patch-branding.mjs`
- Create: `scripts/verify-branding.mjs`

**Step 1: Write the failing test**

Covered by Task 1 branding assertions.

**Step 2: Run test to verify it fails**

Run: `node --test tests/branding.test.mjs`
Expected: FAIL because bundle output still uses `Claude Code`

**Step 3: Write minimal implementation**

Implement a patch script that rewrites targeted, user-visible strings in `package/cli.js`, plus a verification script that checks required branded markers.

**Step 4: Run the patch and verify**

Run:

```bash
node scripts/patch-branding.mjs
node scripts/verify-branding.mjs
```

Expected: patch succeeds and verification confirms branded markers are present

**Step 5: Commit**

```bash
git add scripts/patch-branding.mjs scripts/verify-branding.mjs package/cli.js
git commit -m "feat: brand bundled cli as changfenhuang code"
```

### Task 4: Update public metadata and docs

**Files:**
- Modify: `README.md`
- Modify: `package/README.md`
- Modify: `package/package.json`

**Step 1: Write the failing test**

Add or reuse metadata assertions if needed after runtime branding is in place.

**Step 2: Run test to verify it fails or coverage is incomplete**

Run: `node --test tests/branding.test.mjs`
Expected: CLI branding may pass while metadata/docs are still stale

**Step 3: Write minimal implementation**

Update docs and nested package metadata so the repo consistently presents itself as `Changfenhuang Code`, documents real install/use flows, and points to the user's repository/issues.

**Step 4: Run tests and spot checks**

Run:

```bash
node --test tests/branding.test.mjs
```

Expected: PASS

**Step 5: Commit**

```bash
git add README.md package/README.md package/package.json
git commit -m "docs: publish changfenhuang code install and branding docs"
```

### Task 5: End-to-end packaging verification

**Files:**
- No code changes expected unless verification reveals gaps

**Step 1: Verify npm packaging**

Run:

```bash
npm pack
```

Expected: tarball builds successfully from the repo root

**Step 2: Verify install and command entrypoints**

Run commands that install the packed tarball into a temporary prefix, then execute:

```bash
cc --help
changfenhuang --version
```

Expected:

- `cc --help` shows `Changfenhuang Code`
- `changfenhuang --version` shows `Changfenhuang Code`

**Step 3: Fix any remaining gaps**

Patch packaging or branding if the smoke tests reveal missing files or stale strings.

**Step 4: Re-run full verification**

Run:

```bash
node --test tests/branding.test.mjs
node scripts/verify-branding.mjs
npm pack
```

Expected: all pass
