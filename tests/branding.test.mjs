import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const rootPackageJsonPath = path.join(repoRoot, "package.json");
const cliPath = path.join(repoRoot, "package", "cli.js");

function runCommand(commandPath, args) {
  const result = spawnSync(commandPath, args, {
    cwd: repoRoot,
    encoding: "utf8",
  });

  assert.equal(
    result.status,
    0,
    `Expected command to succeed: ${commandPath} ${args.join(" ")}\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`,
  );

  return result.stdout;
}

function withLinkedCommand(commandName, callback) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "changfenhuang-code-test-"));
  const commandPath = path.join(tempDir, commandName);

  fs.symlinkSync(cliPath, commandPath);

  try {
    return callback(commandPath);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("root package exposes global cc and changfenhuang commands", () => {
  assert.equal(fs.existsSync(rootPackageJsonPath), true, "Expected a root package.json");

  const pkg = JSON.parse(fs.readFileSync(rootPackageJsonPath, "utf8"));

  assert.equal(pkg.bin.cc, "package/cli.js");
  assert.equal(pkg.bin.changfenhuang, "package/cli.js");
});

test("cli help is branded as Changfenhuang Code", () => {
  const helpOutput = withLinkedCommand("cc", (commandPath) =>
    runCommand(commandPath, ["--help"]),
  );

  assert.match(helpOutput, /Usage: (cc|changfenhuang) \[options\] \[command\] \[prompt\]/);
  assert.match(helpOutput, /Changfenhuang Code - starts an interactive session by default/);
  assert.doesNotMatch(helpOutput, /\bClaude Code\b/);
});

test("cli version is branded as Changfenhuang Code", () => {
  const versionOutput = withLinkedCommand("changfenhuang", (commandPath) =>
    runCommand(commandPath, ["--version"]),
  );

  assert.match(versionOutput, /Changfenhuang Code/);
  assert.doesNotMatch(versionOutput, /\bClaude Code\b/);
});
