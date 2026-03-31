# cc - Changfenhuang Code

```text
   .~~~~.
  ( ·  · )   "cc 也是 Changfenhuang Code 的缩写哦"
  (  __  )
  ~~````~~
```

> 一只绿色的史莱姆在你的终端里帮你写代码

基于 Claude Code v2.1.88 改造的个人定制版 CLI，主色调换成了不刺眼的史莱姆绿。
品牌名从 `claude` / `anthropic` 改成了 `changfenhuang`，吉祥物也从橙色螃蟹变成了绿色史莱姆。

这次仓库整理之后，它已经不再是“只能看还原源码”的研究仓库，而是一个真的可以安装、真的可以在终端里运行的 `Changfenhuang Code`。

一句话说人话：

> 这是一个把 Claude Code 里当前 bundle 还能打开的隐藏功能、实验开关、内部权限分支，基本全开了的绿色史莱姆版 CLI。

---

## 3 秒安装

### 立即开跑

```bash
curl -fsSL https://raw.githubusercontent.com/taekchef/changfenhuang-code/main/install.sh | bash
```

装完先试：

```bash
changfenhuang --version
cc --version
```

如果 `cc` 还命中系统自带的 C 编译器，执行一次：

```bash
rehash
```

然后再试：

```bash
cc --version
```

---

## 现在已经能跑了

### 安装

#### 1. 推荐：一键安装脚本

```bash
curl -fsSL https://raw.githubusercontent.com/taekchef/changfenhuang-code/main/install.sh | bash
```

它本质上还是走 GitHub tarball 安装，但把长命令和环境检查都包好了。

#### 2. 直接从 GitHub tarball 安装

```bash
npm install -g https://codeload.github.com/taekchef/changfenhuang-code/tar.gz/main
```

这一条比 `github:taekchef/changfenhuang-code` 更稳。
在部分自定义 `npm prefix` 环境里，`github:` 安装会生成坏掉的全局软链；tarball 方式不会踩这个坑。

#### 3. 本地克隆后全局安装

```bash
git clone https://github.com/taekchef/changfenhuang-code.git
cd changfenhuang-code
npm install -g .
```

### 运行

安装后会暴露两个命令：

```bash
cc
changfenhuang
```

常用检查：

```bash
cc --help
changfenhuang --version
```

### 环境要求

- Node.js >= 18
- npm
- 一个有效的 API Key
  目前仍沿用上游兼容的认证方式，比如 `ANTHROPIC_API_KEY`，以及 AWS Bedrock / GCP Vertex 的对应配置

---

## 如果你只想看源码

```bash
# 直接浏览关键目录
restored-src/src/main.tsx              # CLI 入口
restored-src/src/tools/                # 30+ 工具实现
restored-src/src/commands/             # 40+ 命令
restored-src/src/services/             # API / MCP / 分析
restored-src/src/buddy/sprites.ts      # 史莱姆精灵在这里
restored-src/src/utils/theme.ts        # 史莱姆绿主题在这里
```

这仓库现在是两层结构：

- `package/cli.js`
  当前真正可运行的 CLI bundle
- `restored-src/`
  从 source map 还原出来的源码参考，方便继续研究和深改

---

## 这次整理额外做了什么

除了你原来已经做过的品牌和功能改造，这次还补了几件“让它真的像个开源 CLI”该有的东西：

- 根目录新增正式的 `package.json`，可以直接 `npm install -g`
- 全局命令名已经变成 `cc` 和 `changfenhuang`
- `--help`、`--version`、主要用户可见文案已经品牌化成 `Changfenhuang Code`
- 增加了品牌补丁脚本和校验脚本，后续升级 bundle 时可以重复套用
- 增加了最小回归测试，保证真实命令入口不会又退回 `claude`

---

## 视觉定制

### 主色调：史莱姆绿

| 元素 | 原始（橙色） | 现在（史莱姆绿） |
|:---|:---|:---|
| 主品牌色 | `rgb(215,119,87)` | `rgb(119,200,120)` |
| 微光色 | `rgb(245,149,117)` | `rgb(149,225,150)` |
| Fast Mode | `rgb(255,120,20)` | `rgb(119,200,120)` |
| 热力图 | `#da7756` | `#77c878` |
| ANSI 回退 | `ansi:redBright` | `ansi:greenBright` |

### 吉祥物：绿色史莱姆

```text
   .~~~~.
  ( ·  · )    ← blob 精灵现在是一只可爱的史莱姆
  (  __  )
  ~~````~~
```

Buddy 系统内置 18 种宠物可选：

`duck / goose / blob / cat / dragon / octopus / owl / penguin / turtle / snail / ghost / axolotl / capybara / cactus / robot / rabbit / mushroom / chonk`

---

## 源码修改清单

### 先说结论：是不是“全隐藏功能解锁”？

可以这么说，而且 README 就应该把这个气势写出来。

但技术上更准确的版本是：

- 对当前 bundle 里还活着的隐藏功能、实验开关、内部权限分支，基本就是全开
- 对 `feature()`、GrowthBook gate、内部用户身份判断、隐藏命令显示、运行时 disable 开关，都做了放开
- 但如果某些功能在上游构建时已经被 DCE / tree-shaking 物理裁掉了，运行时补丁没法把“根本不存在的代码”凭空变回来

所以这个项目的真实意思不是“魔法复活所有历史上存在过的代码”，而是：

> 把这个版本里还能解锁的隐藏能力，尽可能全部解锁出来。

### 品牌替换

- 886 个文件中的 `claude` / `anthropic` -> `changfenhuang`
- 21 个文件名或目录名重命名

### 编译期功能（`feature()` 门控）

对当前 bundle 中仍然存在的 `feature('XXX')` 门控，全部改成 `true`，包括：

| Flag | 说明 |
|:---|:---|
| `VOICE_MODE` | 语音交互 |
| `COORDINATOR_MODE` | 多 Agent 协调 |
| `TRANSCRIPT_CLASSIFIER` | AFK 自动模式 |
| `AGENT_TRIGGERS` | Cron 定时任务 |
| `KAIROS` | 助手模式 |
| `DIRECT_CONNECT` | 直连 |
| `SSH_REMOTE` | SSH 远程 |
| `BG_SESSIONS` | 后台会话 |
| `LODESTONE` | Deep Link |
| `CONNECTOR_TEXT` | 连接器摘要 |
| `EXTRACT_MEMORIES` | 记忆提取 |
| `UPLOAD_USER_SETTINGS` | 设置同步 |

### GrowthBook 运行时门控

在 `growthbook.ts` 中注入全局 override map，把 30+ 个运行时 gate 强制开启：

<details>
<summary>点击展开完整列表</summary>

| Gate | 说明 | 值 |
|:---|:---|:---|
| `tengu_scratch` | Scratchpad 目录 | `true` |
| `tengu_tool_pear` | Strict Tool Use | `true` |
| `tengu_amber_json_tools` | Token 高效工具 | `true` |
| `tengu_slate_prism` | 连接器摘要 rollout | `true` |
| `tengu_surreal_dali` | 远程 Agent 调度 | `true` |
| `tengu_remote_backend` | 远程后端 / TUI | `true` |
| `tengu_cobalt_lantern` | GitHub Token 同步 | `true` |
| `tengu_streaming_tool_execution2` | 流式工具执行 | `true` |
| `tengu_plan_mode_interview_phase` | Plan 面试阶段 | `true` |
| `tengu_keybinding_customization_release` | 自定义快捷键 | `true` |
| `tengu_kairos_cron` | Cron 调度 | `true` |
| `tengu_kairos_cron_durable` | 持久化 Cron | `true` |
| `tengu_lodestone_enabled` | Deep Link | `true` |
| `tengu_passport_quail` | 自动记忆提取 | `true` |
| `tengu_slate_thimble` | 非交互记忆提取 | `true` |
| `tengu_chrome_auto_enable` | Chrome 扩展 | `true` |
| `tengu_ccr_bridge` | Remote Control | `true` |
| `tengu_bridge_repl_v2` | Bridge REPL v2 | `true` |
| `tengu_cobalt_harbor` | 自动连接 | `true` |
| `tengu_ccr_mirror` | CCR Mirror | `true` |
| `tengu_pewter_ledger` | UltraPlan 结构 | `'trim'` |
| `tengu_ultraplan_model` | UltraPlan 模型 | `true` |
| `tengu_willow_mode` | 空闲检测 | `'hint_v2'` |
| `tengu_thinkback` | Thinkback 回放 | `true` |
| `tengu_marble_sandcastle` | Fast Mode | `true` |
| `tengu_amber_flint` | Agent Swarms | `true` |
| `tengu_amber_quartz_disabled` | 语音 kill-switch | `false` |
| `tengu_penguins_off` | Fast Mode kill | `false` |
| `tengu_miraculo_the_bard` | Fast 预取 | `false` |

</details>

### 函数级修改

| 函数 | 改动 |
|:---|:---|
| `isAgentSwarmsEnabled()` | `return true` |
| `isVoiceModeEnabled()` | `return true` |
| `shouldIncludeFirstPartyOnlyBetas()` | `return true` |
| `isKeybindingCustomizationEnabled()` | `return true` |
| `modelSupportsAutoMode()` | 移除内部用户限制 |
| 79 个文件中的 `USER_TYPE === 'ant'` | -> `true` |

### 运行时限制也一起拆了

除了编译期和 gate 层，这个版本还把一批“默认关闭”的运行时限制一起拆掉了，核心方向就是：

- Fast Mode 不再受默认 disable 变量限制
- 1M context 不再受默认 disable 变量限制
- Thinking / Adaptive Thinking 不再受默认 disable 变量限制
- Background tasks / Auto memory / Cron 不再受默认 disable 变量限制
- Experimental betas / File checkpointing / Advisor tool / Attachments 不再受默认 disable 变量限制

### 隐藏命令（已取消隐藏）

`/ultraplan` · `/buddy` · `/voice` · `/bridge` · `/torch` · `/peers` · `/fork` · `/thinkback-play` · `/output-style` · `/heapdump` · `/rate-limit-options`

### 最后再说一遍这项目到底猛在哪

如果你只是想一句话理解这个仓库，那就是：

- 它不是单纯换皮
- 它也不是只把 README 改绿
- 它是把这个版本里还能打得开的隐藏层，能开的都开了，再把整个东西整理成一个真的能安装运行的开源 CLI

---

## 目录结构

```text
.
├── package/
│   ├── cli.js                # 当前真正执行的 CLI bundle
│   ├── vendor/               # 运行时依赖的二进制资源
│   ├── package.json          # bundle 层元数据
│   └── README.md
├── restored-src/
│   └── src/
│       ├── main.tsx          # CLI 入口
│       ├── tools/            # 30+ 工具
│       ├── commands/         # 40+ 命令
│       ├── services/         # API / MCP / GrowthBook
│       ├── buddy/            # 史莱姆和宠物系统
│       └── utils/            # 工具函数与主题
├── scripts/
│   ├── patch-branding.mjs    # 品牌补丁脚本
│   └── verify-branding.mjs   # 品牌校验脚本
├── tests/
│   └── branding.test.mjs     # 真实命令入口回归测试
└── docs/plans/               # 本次整理的设计与实施计划
```

---

## 开发命令

```bash
npm run brand
npm run brand:verify
npm test
```

它们分别用于：

- 重新给 `package/cli.js` 打品牌补丁
- 校验 `cc` / `changfenhuang` 的真实输出
- 跑回归测试

---

## 来源与声明

- 基于 `ChinaSiro/claude-code-sourcemap`（v2.1.88）和你已经改造过的运行产物继续整理
- `restored-src/` 主要用于技术研究、结构理解和后续改造
- 当前 CLI 为了保持可运行性，仍然保留了上游兼容的服务端协议和认证语义
- 如涉及原始版权内容，请仅用于学习研究并自行评估合规边界

---

cc - because Changfenhuang Code also starts with cc.
