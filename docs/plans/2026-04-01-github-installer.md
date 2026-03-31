# GitHub Installer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a GitHub-first installer script and promote it as the default install path in the public docs.

**Architecture:** Keep installation registry-free by wrapping the already-working GitHub tarball flow in a small shell script. Lock the behavior with tests that verify the generated install command and the README quick-start guidance before editing the docs and script.

**Tech Stack:** POSIX shell, npm global install, GitHub codeload tarballs, `node:test`

---

### Task 1: Lock installer expectations with failing tests

**Files:**
- Modify: `tests/branding.test.mjs`

**Step 1: Write the failing test**

Add tests that assert:

- `bash install.sh --print-command` exits successfully and prints the expected `npm install -g https://codeload.github.com/taekchef/changfenhuang-code/tar.gz/main`
- [`README.md`](/private/tmp/changfenhuang-code/README.md) contains the quick-install `curl -fsSL .../install.sh | bash` snippet

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because `install.sh` does not exist yet and the README does not yet lead with the install script flow

### Task 2: Add the installer script

**Files:**
- Create: `install.sh`

**Step 1: Write minimal implementation**

Create an executable shell script that:

- supports `--print-command`
- defaults to `taekchef/changfenhuang-code` on `main`
- builds the GitHub codeload tarball URL
- runs `npm install -g <url>` when not in print mode
- prints friendly post-install verification steps

**Step 2: Run targeted verification**

Run:

```bash
bash install.sh --print-command
```

Expected: prints the exact install command

### Task 3: Refresh public docs

**Files:**
- Modify: `README.md`
- Modify: `package/README.md`

**Step 1: Write minimal implementation**

Update the docs so they:

- open with a "3-second install" section using `curl -fsSL .../install.sh | bash`
- keep the tarball command as a transparent fallback
- note the `rehash` / new-shell fix if `cc` is still shadowed

**Step 2: Run full tests**

Run:

```bash
npm test
```

Expected: PASS

### Task 4: Real installation smoke test

**Files:**
- No code changes expected unless verification reveals gaps

**Step 1: Execute the installer path**

Run:

```bash
bash install.sh --print-command
cc --version
changfenhuang --version
```

Expected:

- installer command is the expected GitHub tarball install
- both commands report `Changfenhuang Code`

**Step 2: Re-run final verification**

Run:

```bash
npm test
git status --short --branch
```

Expected: tests pass and only intended changes are present
