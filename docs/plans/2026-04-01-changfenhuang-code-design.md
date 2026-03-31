# Changfenhuang Code Design

**Goal:** Turn this repository into a runnable, open-source, globally installable `Changfenhuang Code` CLI that keeps the user's existing feature and theme modifications while behaving like a branded terminal product.

**Current State**

- `package/cli.js` is already a runnable bundled CLI entrypoint.
- The repository does not yet expose a root-level npm package for global installation.
- User-facing branding is still mostly upstream (`claude`, `Claude Code`, Anthropic package metadata, docs URLs, issue URLs).
- `restored-src/` exists as restored source context, but the most reliable runnable artifact today is still the bundled CLI in [`package/cli.js`](/private/tmp/changfenhuang-code/package/cli.js).

**Chosen Approach**

- Keep the existing bundled runtime in [`package/cli.js`](/private/tmp/changfenhuang-code/package/cli.js) as the executable core.
- Add a root npm package so the repo can be installed globally and expose `cc` and `changfenhuang`.
- Add an idempotent branding patch script that rewrites only user-facing bundle strings and metadata, not the low-level service integrations that keep the CLI working.
- Update docs so the repo is no longer presented as “source only”; it should document actual install and run flows.

**Why This Approach**

- It is the fastest path to a working CLI.
- It preserves the user's existing runtime modifications already embedded in the bundled file.
- It is safer than trying to reconstruct a full source build pipeline from `restored-src/`.
- It mirrors the successful “patch the bundled runtime” strategy used by the reference repository.

**Branding Boundary**

- Rebrand user-visible surfaces: command names, help text, version label, package metadata, README, issue links, and public docs links.
- Preserve runtime-critical provider logic: Anthropic auth, Bedrock/Vertex paths, required environment-variable semantics, and service endpoints unless they are purely display metadata.
- Accept that update/install subcommands will only fully work against the new package name after the user publishes the package to their own distribution channel.

**Deliverables**

- Root-level npm package metadata with global bins for `cc` and `changfenhuang`
- Idempotent brand patch script and verification script
- Branded bundled CLI output for `--help` and `--version`
- Updated README with real installation and usage instructions
- Regression tests covering branding and packaging expectations

**Verification**

- `node --test` passes for branding/package tests
- `node package/cli.js --help` shows `Changfenhuang Code`
- `node package/cli.js --version` shows `Changfenhuang Code`
- `npm pack` succeeds from the repo root
- Installing the packed tarball exposes working `cc` and `changfenhuang` commands
