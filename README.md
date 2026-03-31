# Changfenhuang Code

> 🔓 基于 Claude Code v2.1.88 源码的全功能解锁版 —— **Changfenhuang Code**

> [!NOTE]
> 本仓库基于 [ChinaSiro/claude-code-sourcemap](https://github.com/ChinaSiro/claude-code-sourcemap) 二次修改，
> 所有品牌名已替换为 `changfenhuang`，并解锁了全部隐藏功能。

## ✨ 解锁的隐藏功能

### 编译期功能（Compile-time Features）
| 功能 | 原始状态 | 当前状态 |
|------|----------|----------|
| `VOICE_MODE` - 语音交互模式 | 内部用户限定 | ✅ 已解锁 |
| `COORDINATOR_MODE` - 多 Agent 协调模式 | 内部用户限定 | ✅ 已解锁 |
| `TRANSCRIPT_CLASSIFIER` - AFK/自动模式 | 内部用户限定 | ✅ 已解锁 |
| `CONNECTOR_TEXT` - 连接器文本摘要 | 内部用户限定 | ✅ 已解锁 |
| `AGENT_TRIGGERS` - Cron 定时任务 | 内部用户限定 | ✅ 已解锁 |
| `KAIROS` - 助手模式 | 内部用户限定 | ✅ 已解锁 |
| `DIRECT_CONNECT` - 直连模式 | 内部用户限定 | ✅ 已解锁 |
| `SSH_REMOTE` - SSH 远程模式 | 内部用户限定 | ✅ 已解锁 |
| `BG_SESSIONS` - 后台会话 | 内部用户限定 | ✅ 已解锁 |
| `LODESTONE` - Lodestone 功能 | 内部用户限定 | ✅ 已解锁 |
| `UPLOAD_USER_SETTINGS` - 设置同步 | 内部用户限定 | ✅ 已解锁 |

### 运行时功能门控（Runtime Feature Gates）
| 功能 | 原始限制 | 当前状态 |
|------|----------|----------|
| Agent Swarms/Teams | 需要 env var 或 CLI flag | ✅ 默认开启 |
| Voice Mode | 需要 OAuth + GrowthBook | ✅ 默认开启 |
| Auto Mode (PI probes) | 仅 ant 用户 + firstParty | ✅ 所有用户可用 |
| Keybinding Customization | GrowthBook 门控 | ✅ 默认开启 |
| Kairos Cron Scheduling | 需要 AGENT_TRIGGERS feature | ✅ 默认开启 |

### Beta Headers（全部启用）
- `changfenhuang-code-20250219` - 核心 Beta
- `cli-internal-2026-02-09` - CLI 内部 Beta（原仅 ant 用户）
- `interleaved-thinking-2025-05-14` - 交织思考
- `context-1m-2025-08-07` - 1M 上下文
- `context-management-2025-06-27` - 上下文管理
- `structured-outputs-2025-12-15` - 结构化输出
- `web-search-2025-03-05` - Web 搜索
- `redact-thinking-2026-02-12` - 思考编辑
- `token-efficient-tools-2026-03-28` - Token 高效工具（原仅 ant 用户）
- `summarize-connector-text-2026-03-13` - 连接器摘要（原仅 ant 用户）
- `afk-mode-2026-01-31` - AFK 模式
- `advisor-tool-2026-03-01` - 顾问工具
- `fast-mode-2026-02-01` - 快速模式
- `prompt-caching-scope-2026-01-05` - Prompt 缓存范围
- 等 18+ 个 Beta Headers

### 移除的限制
- ✅ 移除所有 `USER_TYPE === 'ant'` 内部用户限制（79 个文件）
- ✅ 移除所有 `feature()` 编译期功能门控
- ✅ 移除 firstParty-only Beta 限制
- ✅ `shouldIncludeFirstPartyOnlyBetas()` 始终返回 `true`
- ✅ `shouldUseGlobalCacheScope()` 始终返回 `true`

## 📁 目录结构

```
restored-src/src/
├── main.tsx              # CLI 入口
├── tools/                # 工具实现（30+ 个）
├── commands/             # 命令实现（40+ 个）
├── services/             # API、MCP、分析等服务
├── utils/                # 工具函数
├── context/              # React Context
├── coordinator/          # 多 Agent 协调模式 🔓
├── assistant/            # 助手模式（KAIROS）🔓
├── buddy/                # AI 伴侣 UI
├── remote/               # 远程会话 🔓
├── plugins/              # 插件系统
├── skills/               # 技能系统
├── voice/                # 语音交互 🔓
└── vim/                  # Vim 模式
```

## 来源

- 原始仓库：[ChinaSiro/claude-code-sourcemap](https://github.com/ChinaSiro/claude-code-sourcemap)
- 原始 npm 包：`@anthropic-ai/claude-code` v2.1.88
- 修改内容：品牌名替换 + 全功能解锁

## 声明

- 源码版权归 [Anthropic](https://www.anthropic.com) 所有
- 本仓库仅用于技术研究与学习，请勿用于商业用途
- 如有侵权，请联系删除
