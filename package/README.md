# Changfenhuang Code Runtime Bundle

This directory contains the runnable bundled CLI used by the root `changfenhuang-code` package.

If you want the installable CLI, use the repository root:

```bash
curl -fsSL https://raw.githubusercontent.com/taekchef/changfenhuang-code/main/install.sh | bash
```

Or use the GitHub tarball directly:

```bash
npm install -g https://codeload.github.com/taekchef/changfenhuang-code/tar.gz/main
```

If you already cloned the repository locally, this also works:

```bash
npm install -g /path/to/changfenhuang-code
```

After installation, run:

```bash
cc
changfenhuang
```

For source-reference exploration, see:

```bash
restored-src/
```

If you are inspecting this directory directly, treat it as the runtime bundle layer rather than the recommended end-user entrypoint.
