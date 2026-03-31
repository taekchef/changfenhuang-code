import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const cliPath = path.join(repoRoot, "package", "cli.js");

const replacements = [
  {
    label: "commander program name",
    search: '.name("claude")',
    replace: '.name("cc")',
    minCount: 1,
  },
  {
    label: "command usage",
    search: "Usage: claude",
    replace: "Usage: cc",
    minCount: 1,
  },
  {
    label: "product name",
    search: "Claude Code",
    replace: "Changfenhuang Code",
    minCount: 1,
  },
  {
    label: "package url",
    search: "@anthropic-ai/claude-code",
    replace: "changfenhuang-code",
    minCount: 1,
  },
  {
    label: "documentation url",
    search: "https://code.claude.com/docs/en/overview",
    replace: "https://github.com/taekchef/changfenhuang-code",
    minCount: 1,
  },
  {
    label: "issues url",
    search: "https://github.com/anthropics/claude-code/issues",
    replace: "https://github.com/taekchef/changfenhuang-code/issues",
    minCount: 1,
  },
  {
    label: "local install shim",
    search: "claude-local",
    replace: "changfenhuang-local",
    minCount: 1,
  },
  {
    label: "chrome integration label",
    search: "Enable Claude in Chrome integration",
    replace: "Enable Changfenhuang Code in Chrome integration",
    minCount: 1,
  },
  {
    label: "chrome integration disable label",
    search: "Disable Claude in Chrome integration",
    replace: "Disable Changfenhuang Code in Chrome integration",
    minCount: 1,
  },
  {
    label: "copy command label",
    search: "Copy Claude's last response to clipboard (or /copy N for the Nth-latest)",
    replace: "Copy Changfenhuang Code's last response to clipboard (or /copy N for the Nth-latest)",
    minCount: 1,
  }
];

function replaceAll(source, search, replace) {
  const count = source.split(search).length - 1;

  if (count === 0) {
    return { changed: false, count: 0, output: source };
  }

  return {
    changed: true,
    count,
    output: source.split(search).join(replace),
  };
}

let code = fs.readFileSync(cliPath, "utf8");
let changed = false;

for (const replacement of replacements) {
  const result = replaceAll(code, replacement.search, replacement.replace);

  if (!result.changed) {
    if (!code.includes(replacement.replace)) {
      throw new Error(
        `Missing expected pattern for ${replacement.label}: ${replacement.search}`,
      );
    }

    continue;
  }

  if (result.count < replacement.minCount) {
    throw new Error(
      `Expected at least ${replacement.minCount} replacements for ${replacement.label}, got ${result.count}`,
    );
  }

  code = result.output;
  changed = true;
}

if (changed) {
  fs.writeFileSync(cliPath, code, "utf8");
}

console.log(changed ? `Patched branding in ${cliPath}` : "Branding already patched");
