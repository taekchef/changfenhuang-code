import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "changfenhuang-code-verify-"));
  const commandPath = path.join(tempDir, commandName);

  fs.symlinkSync(cliPath, commandPath);

  try {
    return callback(commandPath);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

const pkg = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
);
const cliSource = fs.readFileSync(cliPath, "utf8");

assert.equal(pkg.bin.cc, "package/cli.js");
assert.equal(pkg.bin.changfenhuang, "package/cli.js");

const helpOutput = withLinkedCommand("cc", (commandPath) =>
  runCommand(commandPath, ["--help"]),
);
const versionOutput = withLinkedCommand("changfenhuang", (commandPath) =>
  runCommand(commandPath, ["--version"]),
);

assert.match(helpOutput, /Usage: (cc|changfenhuang) \[options\] \[command\] \[prompt\]/);
assert.match(helpOutput, /Changfenhuang Code - starts an interactive session by default/);
assert.doesNotMatch(helpOutput, /\bClaude Code\b/);
assert.match(versionOutput, /Changfenhuang Code/);
assert.doesNotMatch(versionOutput, /\bClaude Code\b/);
assert.match(cliSource, /claude:"rgb\(119,200,120\)"/);
assert.match(cliSource, /claudeShimmer:"rgb\(149,225,150\)"/);
assert.match(cliSource, /clawd_body:"rgb\(119,200,120\)"/);
assert.match(
  cliSource,
  /default:\{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"\}/,
);
assert.match(cliSource, /" ▄███████▄ "/);
assert.match(cliSource, /" ▟███████▙ "/);
assert.match(cliSource, /"▀ ▀   ▀ ▀"/);
assert.doesNotMatch(cliSource, /claude:"rgb\(215,119,87\)"/);
assert.doesNotMatch(cliSource, /clawd_body:"rgb\(215,119,87\)"/);
assert.doesNotMatch(
  cliSource,
  /default:\{r1L:" ▐",r1E:"▛███▜",r1R:"▌",r2L:"▝▜",r2R:"▛▘"\}/,
);
assert.doesNotMatch(cliSource, /"██▄█████▄██"/);
assert.match(cliSource, /name:"ultraplan"[\s\S]{0,220}isEnabled:\(\)=>!0/);
assert.match(
  cliSource,
  /name:"voice"[\s\S]{0,220}availability:void 0[\s\S]{0,120}isEnabled:\(\)=>!0[\s\S]{0,120}get isHidden\(\)\{return!1\}/,
);
assert.match(
  cliSource,
  /name:"rate-limit-options"[\s\S]{0,220}isEnabled:\(\)=>!0[\s\S]{0,80}isHidden:!1/,
);
assert.match(
  cliSource,
  /name:"thinkback-play"[\s\S]{0,220}isEnabled:\(\)=>!0[\s\S]{0,80}isHidden:!1/,
);
assert.match(
  cliSource,
  /name:"remote-control"[\s\S]{0,120}aliases:\["rc","bridge"\]/,
);

console.log("Branding verification passed");
