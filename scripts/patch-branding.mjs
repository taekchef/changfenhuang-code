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
  },
  {
    label: "brand primary rgb",
    search: "rgb(215,119,87)",
    replace: "rgb(119,200,120)",
    minCount: 1,
  },
  {
    label: "brand shimmer rgb",
    search: "rgb(245,149,117)",
    replace: "rgb(149,225,150)",
    minCount: 1,
  },
  {
    label: "brand fallback hex",
    search: "#da7756",
    replace: "#77c878",
    minCount: 1,
  },
  {
    label: "ansi primary theme",
    search: 'claude:"ansi:redBright"',
    replace: 'claude:"ansi:greenBright"',
    minCount: 1,
  },
  {
    label: "ansi mascot theme",
    search: 'clawd_body:"ansi:redBright"',
    replace: 'clawd_body:"ansi:greenBright"',
    minCount: 1,
  },
  {
    label: "ansi brief label theme",
    search: 'briefLabelClaude:"ansi:redBright"',
    replace: 'briefLabelClaude:"ansi:greenBright"',
    minCount: 1,
  },
  {
    label: "standard mascot default pose",
    searches: [
      'default:{r1L:" ▐",r1E:"▛███▜",r1R:"▌",r2L:"▝▜",r2R:"▛▘"}',
      'default:{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"}',
      'default:{r1L:"  ",r1E:".---.",r1R:"  ",r2L:" (",r2R:" )"}',
    ],
    replace: 'default:{r1L:"",r1E:".---.",r1R:"",r2L:"(",r2R:")"}',
    minCount: 1,
  },
  {
    label: "standard mascot look-left pose",
    searches: [
      '"look-left":{r1L:" ▐",r1E:"▟███▟",r1R:"▌",r2L:"▝▜",r2R:"▛▘"}',
      '"look-left":{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"}',
      '"look-left":{r1L:"  ",r1E:".---.",r1R:"  ",r2L:" (",r2R:" )"}',
    ],
    replace: '"look-left":{r1L:"",r1E:".---.",r1R:"",r2L:"(",r2R:")"}',
    minCount: 1,
  },
  {
    label: "standard mascot look-right pose",
    searches: [
      '"look-right":{r1L:" ▐",r1E:"▙███▙",r1R:"▌",r2L:"▝▜",r2R:"▛▘"}',
      '"look-right":{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"}',
      '"look-right":{r1L:"  ",r1E:".---.",r1R:"  ",r2L:" (",r2R:" )"}',
    ],
    replace: '"look-right":{r1L:"",r1E:".---.",r1R:"",r2L:"(",r2R:")"}',
    minCount: 1,
  },
  {
    label: "standard mascot arms-up pose",
    searches: [
      '"arms-up":{r1L:"▗▟",r1E:"▛███▜",r1R:"▙▖",r2L:" ▜",r2R:"▛ "}',
      '"arms-up":{r1L:" ▗",r1E:"▄▄▄▄▄",r1R:"▖",r2L:"▐",r2R:"▌"}',
      '"arms-up":{r1L:"  ",r1E:".---.",r1R:"  ",r2L:" (",r2R:" )"}',
    ],
    replace: '"arms-up":{r1L:"",r1E:".---.",r1R:"",r2L:"(",r2R:")"}',
    minCount: 1,
  },
  {
    label: "apple mascot top silhouette",
    searches: [
      'default:" ▗   ▖ ","look-left":" ▘   ▘ ","look-right":" ▝   ▝ ","arms-up":" ▗   ▖ "',
      'default:" ▄▄▄▄▄ ","look-left":" ▄▄▄▄▄ ","look-right":" ▄▄▄▄▄ ","arms-up":" ▄▄▄▄▄ "',
      'default:" .---. ","look-left":" .---. ","look-right":" .---. ","arms-up":" .---. "',
    ],
    replace: 'default:".---.","look-left":".---.","look-right":".---.","arms-up":".---."',
    minCount: 1,
  },
  {
    label: "apple mascot left edge",
    search: 'bz.createElement(k,{color:"clawd_body"},"▗")',
    replace: 'bz.createElement(k,{color:"clawd_body"},"")',
    minCount: 1,
  },
  {
    label: "apple mascot right edge",
    search: 'bz.createElement(k,{color:"clawd_body"},"▖")',
    replace: 'bz.createElement(k,{color:"clawd_body"},"")',
    minCount: 1,
  },
  {
    label: "mascot smile row",
    searches: ['P=bz.createElement(k,{color:"clawd_body"},{"  "}▘▘ ▝▝{"  "})', 'P=bz.createElement(k,{color:"clawd_body"},"  ","\\___/","  ")', 'P=bz.createElement(k,{color:"clawd_body"},"\\\\___/")'],
    replace: 'P=bz.createElement(k,{color:"clawd_body"},"\\\\___/")',
    minCount: 1,
  },
  {
    label: "mascot face row",
    searches: [
      'backgroundColor:"clawd_background"},"█████")',
      'backgroundColor:"clawd_background"}," o o ")',
      'backgroundColor:"clawd_background"},"o o")',
      'backgroundColor:"clawd_background"},"o_o")',
    ],
    replace: 'backgroundColor:"clawd_background"},"o_o")',
    minCount: 1,
  },
  {
    label: "apple mascot face row",
    searches: [
      'w=bz.createElement(k,{backgroundColor:"clawd_body"}," ".repeat(7)),j=bz.createElement(k,{color:"clawd_body"},"\\___/")',
      'w=bz.createElement(k,{color:"clawd_background",backgroundColor:"clawd_body"},"o o"),j=bz.createElement(k,{color:"clawd_body"},"\\___/")',
      'w=bz.createElement(k,{color:"clawd_background",backgroundColor:"clawd_body"},"o_o"),j=bz.createElement(k,{color:"clawd_body"},"\\\\___/")',
    ],
    replace:
      'w=bz.createElement(k,{color:"clawd_background",backgroundColor:"clawd_body"},"o_o"),j=bz.createElement(k,{color:"clawd_body"},"\\\\___/")',
    minCount: 1,
  },
  {
    label: "welcome top and bottom silhouette",
    searches: [" █████████ ", " ▄███████▄ ", " (       ) ", "(_______)"],
    replace: "(_______)",
    minCount: 1,
  },
  {
    label: "welcome middle silhouette",
    searches: ["██▄█████▄██", " ▟███████▙ ", "(  o   o  )", "( o   o )", "(o_____o)"],
    replace: "(o_____o)",
    minCount: 1,
  },
  {
    label: "welcome footer eyes",
    searches: ["█ █   █ █", "▀ ▀   ▀ ▀", "  \\___/  ", " \\___/ ", " \\\\___/ "],
    replace: " \\\\___/ ",
    minCount: 1,
  },
  {
    label: "apple welcome top fill",
    searches: [
      'backgroundColor:"clawd_body"}," ","▗","     ","▖"," "',
      'backgroundColor:"clawd_body"}," ","▄▄▄▄▄"," "',
      'backgroundColor:"clawd_body"}," ",".---."," "',
    ],
    replace: 'backgroundColor:"clawd_body"},".---."',
    minCount: 1,
  },
  {
    label: "ultraplan command gate",
    search: 'argumentHint:"<prompt>",isEnabled:()=>!1,load:',
    replace: 'argumentHint:"<prompt>",isEnabled:()=>!0,load:',
    minCount: 1,
  },
  {
    label: "voice command availability and visibility",
    search: 'availability:["claude-ai"],isEnabled:()=>gK6(),get isHidden(){return!KH6()},supportsNonInteractive:!1,load:',
    replace:
      'availability:void 0,isEnabled:()=>!0,get isHidden(){return!1},supportsNonInteractive:!1,load:',
    minCount: 1,
  },
  {
    label: "rate limit options command gate",
    search: 'name:"rate-limit-options",description:"Show options when rate limit is reached",isEnabled:()=>{if(!d7())return!1;return!0},isHidden:!0,load:',
    replace:
      'name:"rate-limit-options",description:"Show options when rate limit is reached",isEnabled:()=>!0,isHidden:!1,load:',
    minCount: 1,
  },
  {
    label: "thinkback play command gate",
    search: 'name:"thinkback-play",description:"Play the thinkback animation",isEnabled:()=>tY("tengu_thinkback"),isHidden:!0,supportsNonInteractive:!1,load:',
    replace:
      'name:"thinkback-play",description:"Play the thinkback animation",isEnabled:()=>!0,isHidden:!1,supportsNonInteractive:!1,load:',
    minCount: 1,
  },
  {
    label: "remote control bridge alias",
    search: 'name:"remote-control",aliases:["rc"],description:"Connect this terminal for remote-control sessions"',
    replace:
      'name:"remote-control",aliases:["rc","bridge"],description:"Connect this terminal for remote-control sessions"',
    minCount: 1,
  },
];

function replacePatterns(source, searches, replace) {
  let output = source;
  let count = 0;

  for (const search of searches) {
    const matches = output.split(search).length - 1;

    if (matches > 0) {
      output = output.split(search).join(replace);
      count += matches;
    }
  }

  return {
    changed: count > 0,
    count,
    output,
  };
}

let code = fs.readFileSync(cliPath, "utf8");
let changed = false;

for (const replacement of replacements) {
  const searches = replacement.searches ?? [replacement.search];
  const result = replacePatterns(code, searches, replacement.replace);

  if (!result.changed) {
    if (!code.includes(replacement.replace)) {
      throw new Error(
        `Missing expected pattern for ${replacement.label}: ${searches.join(" | ")}`,
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
