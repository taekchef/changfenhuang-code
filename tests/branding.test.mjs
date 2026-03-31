import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const rootPackageJsonPath = path.join(repoRoot, "package.json");
const cliPath = path.join(repoRoot, "package", "cli.js");
const readmePath = path.join(repoRoot, "README.md");
const installScriptPath = path.join(repoRoot, "install.sh");

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

test("distribution does not ship an unused cli sourcemap", () => {
  const cliSource = fs.readFileSync(cliPath, "utf8");
  const cliSourceMapPath = path.join(repoRoot, "package", "cli.js.map");

  assert.equal(
    cliSource.includes("sourceMappingURL=cli.js.map"),
    false,
    "Expected cli.js to avoid referencing a sourcemap we do not ship",
  );
  assert.equal(
    fs.existsSync(cliSourceMapPath),
    false,
    "Expected package/cli.js.map to be absent so GitHub installs do not carry a huge unused file",
  );
});

test("runtime bundle uses the slime palette and mascot art", () => {
  const cliSource = fs.readFileSync(cliPath, "utf8");

  assert.match(cliSource, /claude:"rgb\(119,200,120\)"/);
  assert.match(cliSource, /claudeShimmer:"rgb\(149,225,150\)"/);
  assert.match(cliSource, /clawd_body:"rgb\(119,200,120\)"/);
  assert.match(
    cliSource,
    /default:\{r1L:"",r1E:"\.---\.",r1R:"",r2L:"\(",r2R:"\)"\}/,
  );
  assert.match(cliSource, /backgroundColor:"clawd_background"},"o_o"\)/);
  assert.match(cliSource, /"\\\\___\/"/);
  assert.match(cliSource, /default:"\.---\.","look-left":"\.---\.","look-right":"\.---\.","arms-up":"\.---\."/,);
  assert.match(cliSource, /backgroundColor:"clawd_body"},"o_o"\),j=bz\.createElement\(k,\{color:"clawd_body"\},"\\\\___\/"/);
  assert.match(cliSource, /"\(_______\)"/);
  assert.match(cliSource, /"\(o_____o\)"/);
  assert.match(cliSource, /" \\\\___\/ "/);

  assert.doesNotMatch(cliSource, /claude:"rgb\(215,119,87\)"/);
  assert.doesNotMatch(cliSource, /clawd_body:"rgb\(215,119,87\)"/);
  assert.doesNotMatch(cliSource, /default:\{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"\}/);
  assert.doesNotMatch(cliSource, /default:\{r1L:" ▐",r1E:"▛███▜",r1R:"▌",r2L:"▝▜",r2R:"▛▘"\}/);
  assert.doesNotMatch(cliSource, /" ▟███████▙ "/);
  assert.doesNotMatch(cliSource, /"▀ ▀   ▀ ▀"/);
});

test("runtime bundle unlocks the hidden commands that still exist in this build", () => {
  const cliSource = fs.readFileSync(cliPath, "utf8");

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
});

test("install script prints the GitHub tarball install command", () => {
  const result = spawnSync("bash", [installScriptPath, "--print-command"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  assert.equal(
    result.status,
    0,
    `Expected install.sh --print-command to succeed\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`,
  );
  assert.match(
    result.stdout,
    /^npm install -g https:\/\/codeload\.github\.com\/taekchef\/changfenhuang-code\/tar\.gz\/main\s*$/m,
  );
});

test("README leads with the one-line install script flow", () => {
  const readme = fs.readFileSync(readmePath, "utf8");

  assert.match(
    readme,
    /curl -fsSL https:\/\/raw\.githubusercontent\.com\/taekchef\/changfenhuang-code\/main\/install\.sh \| bash/,
  );
});

test("README describes hidden slash commands by real bundle status", () => {
  const readme = fs.readFileSync(readmePath, "utf8");

  assert.doesNotMatch(readme, /### 隐藏命令（已取消隐藏）/);
  assert.match(readme, /### 当前这份可运行 bundle 里，slash 命令要分 3 类看/);
  assert.match(
    readme,
    /`\/ultraplan` · `\/voice` · `\/thinkback-play` · `\/rate-limit-options`/,
  );
  assert.match(
    readme,
    /`\/remote-control` · `\/rc` · `\/bridge`/,
  );
  assert.match(
    readme,
    /#### 3\. 还原源码里能看到痕迹，但当前 bundle 根本没打进命令入口[\s\S]{0,220}`\/buddy` · `\/fork` · `\/peers` · `\/torch`/,
  );
});
