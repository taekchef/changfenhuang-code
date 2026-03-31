# Changfenhuang Code

> 一个可全局安装、可在终端直接运行的 `Changfenhuang Code` 开源 CLI。

这个仓库基于已经改造过的 Claude Code bundle 继续整理而成，目标不是“只看源码”，而是让它真正像一个终端产品一样可以安装、启动和使用。

当前仓库同时包含两层内容：

- `package/cli.js`
  现在真正可运行的 CLI 核心
- `restored-src/`
  从 source map 还原出来的源码参考，用来研究结构和继续深改

## 快速开始

### 环境要求

- Node.js 18+
- npm
- 可用的模型侧认证
  目前仍沿用上游兼容的认证方式，比如 `ANTHROPIC_API_KEY`，以及 Bedrock / Vertex 的对应配置

### 安装方式

#### 1. 本地仓库全局安装

```bash
npm install -g /path/to/changfenhuang-code
```

#### 2. 直接从 GitHub 安装

```bash
npm install -g github:taekchef/changfenhuang-code
```

#### 3. 打包后安装

```bash
npm pack
npm install -g ./changfenhuang-code-2.1.88.tgz
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

## 现在已经具备的能力

- 根目录有正式的 `package.json`，可以像普通 npm CLI 一样安装
- 全局命令名已经变成 `cc` 和 `changfenhuang`
- `--help`、`--version`、CLI 主要用户可见文案已经品牌化为 `Changfenhuang Code`
- 保留了现有 bundle 中已经做过的功能开关与主题改造
- 提供可重复执行的品牌补丁脚本，后续升级 bundle 时可以再次套用

## 仓库结构

```text
.
├── package/
│   ├── cli.js                # 当前真正执行的 CLI bundle
│   ├── vendor/               # 运行时依赖的二进制资源
│   ├── package.json          # bundle 层元数据
│   └── README.md
├── restored-src/             # source map 还原的源码参考
├── scripts/
│   ├── patch-branding.mjs    # 品牌补丁脚本
│   └── verify-branding.mjs   # 品牌校验脚本
├── tests/
│   └── branding.test.mjs     # 真实命令入口回归测试
└── docs/plans/               # 本次改造的设计与实施计划
```

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

## 已保留的项目改动方向

这个仓库保留了你原来 README 想表达的核心方向：

- 品牌从 Claude / Anthropic 改成 Changfenhuang
- 主视觉替换成绿色史莱姆风格
- 已经做过的一批 feature flag / runtime 开关放开改造
- `restored-src/` 中保留了可继续研究的源码结构

## 说明

- 当前 CLI 仍然依赖上游兼容的服务端协议和认证语义；这部分没有做“硬改名”，是为了保证它还能正常运行
- 某些外部集成文案如果明确指向真实外部产品或服务，后续可以继续细调，但不应该以破坏运行能力为代价

## 来源与声明

- 当前仓库整理自你已经改造过的 Claude Code 运行产物与还原源码
- `restored-src/` 主要用于技术研究、结构理解和后续改造
- 如涉及原始版权内容，请仅用于学习研究并自行评估合规边界
