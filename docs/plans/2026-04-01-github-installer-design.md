# GitHub Installer Design

**Goal:** Make `Changfenhuang Code` feel like a polished open-source CLI even before npm registry publishing by adding a one-command GitHub installer and reshaping the README around a fast "install now" flow.

**Current State**

- The repository already installs successfully from a GitHub tarball with `npm install -g https://codeload.github.com/taekchef/changfenhuang-code/tar.gz/main`.
- The README documents that tarball path, but it still reads like a technical note instead of a productized install page.
- There is no one-line installer script that users can copy from the README.

**Chosen Approach**

- Add a root-level [`install.sh`](/private/tmp/changfenhuang-code/install.sh) that resolves the GitHub tarball URL and runs the global install through the user's existing npm setup.
- Give the script a `--print-command` mode so tests can lock its default behavior without performing a real install.
- Rework the top of [`README.md`](/private/tmp/changfenhuang-code/README.md) so the default path is "3-second install" via `curl ... | bash`, while keeping tarball and local-clone installs as explicit fallbacks.
- Mirror the recommended install path in [`package/README.md`](/private/tmp/changfenhuang-code/package/README.md) so both entrypoints stay aligned.

**Why This Approach**

- It keeps distribution GitHub-first and avoids the current npm registry auth blocker.
- It improves onboarding without touching the runnable CLI bundle.
- It gives us a stable, testable installer contract before introducing more packaging channels.

**Installer Behavior**

- Default repository target: `taekchef/changfenhuang-code`
- Default ref: `main`
- Resolved package URL: `https://codeload.github.com/<owner>/<repo>/tar.gz/<ref>`
- Install command: `npm install -g <resolved-url>`
- After install, print verification commands for `changfenhuang --version` and `cc --version`
- If `cc` is still shadowed by the system compiler, advise the user to run `rehash` or open a new shell

**Deliverables**

- Executable `install.sh`
- README quick-install block that leads with `curl -fsSL .../install.sh | bash`
- Package README alignment
- Regression tests for installer command generation and README guidance

**Verification**

- `node --test tests/branding.test.mjs` passes
- `bash install.sh --print-command` prints the expected codeload install command
- Running the real script or equivalent install command results in working `cc` and `changfenhuang`
