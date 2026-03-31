# Changfenhuang Code

> 🔓 基于 Claude Code v2.1.88 源码的**全功能解锁版**

本仓库基于 [ChinaSiro/claude-code-sourcemap](https://github.com/ChinaSiro/claude-code-sourcemap) 二次修改：
- 所有品牌名 `claude` / `anthropic` → `changfenhuang`
- **解锁全部隐藏功能**（编译期 + 运行时 + GrowthBook 门控）

---

## 🔓 解锁的隐藏功能总览

### 一、编译期功能门控（Compile-time Feature Flags）

所有 `feature('XXX')` 编译期门控已替换为 `true`：

| Feature Flag | 功能说明 | 原始状态 |
|:---|:---|:---|
| `VOICE_MODE` | 🎤 语音交互模式 | 内部限定 |
| `COORDINATOR_MODE` | 🤖 多 Agent 协调/编排模式 | 内部限定 |
| `TRANSCRIPT_CLASSIFIER` | 🧠 AFK 自动模式 / PI probes 安全探测 | 内部限定 |
| `CONNECTOR_TEXT` | 📝 连接器文本摘要（反蒸馏） | 内部限定 |
| `AGENT_TRIGGERS` | ⏰ Cron 定时任务调度系统 | 内部限定 |
| `KAIROS` | 🤝 助手模式（Assistant Mode） | 内部限定 |
| `DIRECT_CONNECT` | 🔗 直连模式 | 内部限定 |
| `SSH_REMOTE` | 🖥️ SSH 远程连接 | 内部限定 |
| `BG_SESSIONS` | 🔄 后台会话 | 内部限定 |
| `LODESTONE` | 🧲 Deep Link 协议注册 | 内部限定 |
| `UPLOAD_USER_SETTINGS` | ☁️ 设置同步上传 | 内部限定 |
| `EXTRACT_MEMORIES` | 🧠 记忆提取系统 | 内部限定 |
| `CHICAGO_MCP` | 🌐 Chicago MCP 协议 | 内部限定 |

### 二、GrowthBook 运行时门控（Runtime Feature Gates）

在 `growthbook.ts` 中注入了全局 override map，30+ 个 GrowthBook 门控全部强制开启：

| Gate Name | 功能说明 | 强制值 |
|:---|:---|:---|
| `tengu_scratch` | 📁 Coordinator Scratchpad 目录 | `true` |
| `tengu_tool_pear` | 🔧 Strict Tool Use（JSON Schema） | `true` |
| `tengu_amber_json_tools` | ⚡ Token-Efficient Tools（JSON 格式） | `true` |
| `tengu_slate_prism` | 📊 连接器文本摘要 rollout | `true` |
| `tengu_surreal_dali` | 🗓️ 远程 Agent 调度 | `true` |
| `tengu_remote_backend` | 🖥️ 远程后端 / TUI 模式 | `true` |
| `tengu_cobalt_lantern` | 🔑 GitHub Token 同步 & Web Setup | `true` |
| `tengu_streaming_tool_execution2` | 🌊 流式工具执行 | `true` |
| `tengu_plan_mode_interview_phase` | 💬 Plan Mode 面试阶段 | `true` |
| `tengu_keybinding_customization_release` | ⌨️ 自定义快捷键 | `true` |
| `tengu_kairos_cron` | ⏰ Kairos Cron 调度系统 | `true` |
| `tengu_kairos_cron_durable` | 💾 持久化 Cron 任务 | `true` |
| `tengu_lodestone_enabled` | 🧲 Deep Link 注册 | `true` |
| `tengu_passport_quail` | 🧠 自动记忆提取 / AutoDream | `true` |
| `tengu_slate_thimble` | 🧠 非交互会话记忆提取 | `true` |
| `tengu_chrome_auto_enable` | 🌐 Chrome 扩展自动启用 | `true` |
| `tengu_ccr_bridge` | 🌉 Remote Control Bridge | `true` |
| `tengu_bridge_repl_v2` | 🌉 Bridge REPL v2 | `true` |
| `tengu_cobalt_harbor` | 🚢 Bridge 自动连接 | `true` |
| `tengu_ccr_mirror` | 🪞 CCR Mirror 模式 | `true` |
| `tengu_pewter_ledger` | 📋 UltraPlan 文件结构实验 | `'trim'` |
| `tengu_ultraplan_model` | 🧠 UltraPlan 模型选择 | `true` |
| `tengu_willow_mode` | 🍃 空闲检测 & 恢复 | `'hint_v2'` |
| `tengu_thinkback` | 🔙 Thinkback 回放 | `true` |
| `tengu_marble_sandcastle` | ⚡ Fast Mode native binary | `true` |
| `tengu_amber_flint` | 🤖 Agent Swarms 开关 | `true` |
| `tengu_amber_quartz_disabled` | 🎤 语音模式 kill-switch | `false`（关闭 = 语音可用） |
| `tengu_penguins_off` | 🐧 Fast Mode kill-switch | `false`（关闭 = 可用） |
| `tengu_miraculo_the_bard` | ⚡ Fast Mode prefetch | `false`（关闭 = 启用预取） |

### 三、隐藏命令（Hidden Commands）

以下命令原本对用户隐藏，已全部取消隐藏：

| 命令 | 说明 |
|:---|:---|
| `/output-style` | 输出样式切换 |
| `/rate-limit-options` | 速率限制选项 |
| `/thinkback-play` | Thinkback 思考回放 |
| `/heapdump` | 堆内存快照 |
| `/ultraplan` | UltraPlan 远程并行规划 |
| `/buddy` | 🐉 AI 伴侣（dragon/octopus/owl/penguin/turtle/snail/ghost） |
| `/voice` | 语音交互 |
| `/bridge` | Remote Control Bridge |
| `/torch` | Torch 功能 |
| `/peers` | Peers 协作 |
| `/fork` | Fork 会话 |
| `/subscribe-pr` | PR 事件订阅 |
| `/workflows` | 工作流管理 |
| `/web` | Web 功能 |
| `/assistant` | Kairos 助手模式 |

### 四、Beta Headers（18 个全部启用）

| Header | 说明 | 原始限制 |
|:---|:---|:---|
| `changfenhuang-code-20250219` | 核心 Beta | - |
| `cli-internal-2026-02-09` | CLI 内部 Beta | **原仅 ant 用户** |
| `interleaved-thinking-2025-05-14` | 交织思考 | - |
| `context-1m-2025-08-07` | 1M 上下文窗口 | - |
| `context-management-2025-06-27` | 上下文管理 / 思考保留 | **原仅 1P** |
| `structured-outputs-2025-12-15` | 结构化输出 (JSON Schema) | **原仅 1P** |
| `web-search-2025-03-05` | Web 搜索 | - |
| `advanced-tool-use-2025-11-20` | 高级工具搜索 (1P) | - |
| `tool-search-tool-2025-10-19` | 工具搜索 (3P) | - |
| `effort-2025-11-24` | Effort 追踪 | - |
| `task-budgets-2026-03-13` | 任务预算约束 | - |
| `prompt-caching-scope-2026-01-05` | Prompt 全局缓存 | **原仅 1P** |
| `fast-mode-2026-02-01` | 快速模式 | - |
| `redact-thinking-2026-02-12` | 思考编辑（反蒸馏） | **原仅 1P** |
| `token-efficient-tools-2026-03-28` | Token 高效工具 | **原仅 ant** |
| `summarize-connector-text-2026-03-13` | 连接器文本摘要 | **原仅 ant** |
| `afk-mode-2026-01-31` | AFK 离开模式 | **原需 TRANSCRIPT_CLASSIFIER** |
| `advisor-tool-2026-03-01` | 顾问工具 | - |

### 五、函数级解锁

| 函数 | 修改 | 文件 |
|:---|:---|:---|
| `isAgentSwarmsEnabled()` | 直接返回 `true` | `utils/agentSwarmsEnabled.ts` |
| `isVoiceModeEnabled()` | 直接返回 `true`（跳过 OAuth 检查） | `voice/voiceModeEnabled.ts` |
| `isVoiceGrowthBookEnabled()` | 直接返回 `true` | `voice/voiceModeEnabled.ts` |
| `isCoordinatorMode()` | 移除 `feature()` 门控 | `coordinator/coordinatorMode.ts` |
| `shouldIncludeFirstPartyOnlyBetas()` | 直接返回 `true` | `utils/betas.ts` |
| `shouldUseGlobalCacheScope()` | 直接返回 `true` | `utils/betas.ts` |
| `isKeybindingCustomizationEnabled()` | 直接返回 `true` | `keybindings/loadUserBindings.ts` |
| `modelSupportsAutoMode()` | 移除 ant-only / firstParty 限制 | `utils/betas.ts` |

### 六、全局修改

| 修改项 | 数量 |
|:---|:---|
| `process.env.USER_TYPE === 'ant'` → `true` | 79 个文件 |
| `process.env.USER_TYPE !== 'ant'` → `false` | 所有匹配 |
| `feature('XXX')` 编译期门控 → `true` | 全部（1157 处） |
| GrowthBook 运行时门控 override | 30+ 个 gate |
| 隐藏命令 `isHidden: true` → `false` | 4 个命令 |

---

## 📁 目录结构

```
restored-src/src/
├── main.tsx                # CLI 入口
├── tools/                  # 🔧 工具实现（Bash、FileEdit、Grep、MCP 等 30+ 个）
├── commands/               # 💻 命令实现（commit、review、config 等 40+ 个）
│   ├── ultraplan.tsx       # 🔓 UltraPlan 远程并行规划
│   ├── voice/              # 🔓 语音命令
│   ├── bridge/             # 🔓 Remote Control Bridge
│   ├── thinkback/          # 🔓 Thinkback 回放
│   ├── thinkback-play/     # 🔓 Thinkback 播放
│   └── ...
├── services/               # 🌐 API、MCP、GrowthBook 等服务
├── utils/                  # 🔨 工具函数（git、model、auth、env 等）
├── coordinator/            # 🔓 多 Agent 协调模式
├── assistant/              # 🔓 Kairos 助手模式
├── buddy/                  # 🔓 AI 伴侣 UI（7 种角色）
├── remote/                 # 🔓 远程会话
├── plugins/                # 🔌 插件系统
├── skills/                 # 🎯 技能系统
├── voice/                  # 🔓 语音交互
├── memdir/                 # 🔓 自动记忆系统
└── vim/                    # ⌨️ Vim 模式
```

---

## 来源

- 原始仓库：[ChinaSiro/claude-code-sourcemap](https://github.com/ChinaSiro/claude-code-sourcemap)
- 原始 npm 包：`@anthropic-ai/claude-code` v2.1.88
- 修改方式：品牌名全量替换 + 编译期/运行时/GrowthBook 三层功能门控解锁

## 声明

- 源码版权归 [Anthropic](https://www.anthropic.com) 所有
- 本仓库仅用于技术研究与学习，请勿用于商业用途
- 如有侵权，请联系删除
