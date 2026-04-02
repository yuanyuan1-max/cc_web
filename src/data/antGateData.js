export const antGateOverview = {
  title: 'ANT 用户类型门控 / USER_TYPE Gate',
  en: 'Ant-only Tool Gating',
  coreExpr: "...(process.env.USER_TYPE === 'ant' ? [ConfigTool] : [])",
  src: 'src/tools.ts: getAllBaseTools()',
  summary: '这是一条构建期 + 运行期联合门控链路。`USER_TYPE=ant` 时，某些内部工具会进入基础工具池；否则这些工具直接从模型可见工具列表中消失。',
}

export const antGateNodes = [
  {
    id: 'env',
    name: '环境变量入口',
    en: 'Environment Gate',
    color: 'var(--accent)',
    src: 'process.env.USER_TYPE',
    role: '整个门控链的源头输入。用于区分 ant 内部用户与外部用户。',
    upstream: ['构建环境', '启动进程时注入的 env'],
    downstream: ['src/query/config.ts', 'src/tools.ts'],
    details: [
      '在 `buildQueryConfig()` 中被快照为 `gates.isAnt`。',
      '在 `getAllBaseTools()` 中直接参与条件展开。',
      '这是典型的 capability gating，而不是普通业务判断。'
    ]
  },
  {
    id: 'query-config',
    name: 'QueryConfig 快照层',
    en: 'QueryConfig Snapshot',
    color: 'var(--accent2)',
    src: 'src/query/config.ts',
    role: '把 runtime gate 固化到一次 query 生命周期中，避免中途漂移。',
    upstream: ['process.env.USER_TYPE'],
    downstream: ['查询主循环中的门控决策', 'UI / 执行层能力判断'],
    details: [
      '`isAnt: process.env.USER_TYPE === \"ant\"` 会在 query 入口处被快照。',
      '这种做法符合 harness engineering：把可变外部状态提前收敛为不可变配置。',
      '避免在单次 query 中出现前后不一致的能力集。'
    ]
  },
  {
    id: 'tool-pool',
    name: '基础工具池装配',
    en: 'Base Tool Pool Assembly',
    color: 'var(--accent3)',
    src: 'src/tools.ts: getAllBaseTools()',
    role: '真正决定 `ConfigTool` 是否进入内置工具列表的核心节点。',
    upstream: ['USER_TYPE env', 'feature gates', 'tool imports'],
    downstream: ['getTools()', 'assembleToolPool()', '最终模型可见工具清单'],
    details: [
      '`...(process.env.USER_TYPE === \"ant\" ? [ConfigTool] : [])` 使用数组展开实现零侵入式插入。',
      '如果不是 ant，则不是“禁用后隐藏”，而是“根本不进入 tools pool”。',
      '这让模型在 schema 层面就看不到该工具，减少 prompt 噪音与越权概率。'
    ]
  },
  {
    id: 'config-tool',
    name: 'ConfigTool 能力节点',
    en: 'ConfigTool Capability',
    color: 'var(--accent4)',
    src: 'src/tools/ConfigTool/ConfigTool.ts',
    role: '负责读写 Claude Code 配置，如 theme、model、permissions.defaultMode。',
    upstream: ['getAllBaseTools()', '权限确认流程', 'supportedSettings.ts'],
    downstream: ['GlobalConfig', 'settings source', 'AppState 局部同步'],
    details: [
      '只读操作自动放行；写操作需要 permission ask。',
      '内部依赖 `isSupported()` / `getPath()` / `updateSettingsForSource()`。',
      '它不是简单 KV 存取，而是具备校验、格式化、source-aware 写入的配置通道。'
    ]
  },
  {
    id: 'supported-settings',
    name: '设置声明与校验',
    en: 'Supported Settings Registry',
    color: 'var(--warn)',
    src: 'src/tools/ConfigTool/supportedSettings.ts',
    role: '限定 ConfigTool 可以访问哪些 setting，并定义类型、选项和写入路径。',
    upstream: ['ConfigTool 输入 setting/value'],
    downstream: ['验证失败/成功', '配置实际落盘'],
    details: [
      '这是 ConfigTool 的 schema registry。',
      '限制模型只能访问被显式支持的设置项。',
      '是“能力边界声明”而不是“出错后补救”。'
    ]
  },
  {
    id: 'permission',
    name: '权限与确认链路',
    en: 'Permission Check',
    color: 'var(--danger)',
    src: 'src/tools/ConfigTool/ConfigTool.ts: checkPermissions()',
    role: '配置读取自动允许；配置写入进入 ask 流程。',
    upstream: ['ConfigTool call input'],
    downstream: ['renderToolUseMessage()', '用户接受/拒绝'],
    details: [
      '读配置属于 read-only，自动 allow。',
      '写配置返回 `behavior: \"ask\"`，消息为 `Set xxx to yyy`。',
      '将“状态改变”与“状态观测”区分，是典型工程化权限建模。'
    ]
  },
  {
    id: 'ui',
    name: '消息渲染层',
    en: 'Tool UI Rendering',
    color: 'var(--accent2)',
    src: 'src/tools/ConfigTool/UI.tsx',
    role: '把 ConfigTool 的 use/result/reject 三种状态渲染为用户可读消息。',
    upstream: ['ConfigTool result'],
    downstream: ['终端 UI', '对话记录'],
    details: [
      '`Getting setting`、`Setting key to value`、`Config change rejected` 都在这里定义。',
      '把内部状态变化翻译为可审计的人类消息。',
      '这是 observability 在工具层的最后一跳。'
    ]
  },
  {
    id: 'final-tools',
    name: '最终模型可见工具集',
    en: 'Visible Tool Surface',
    color: 'var(--accent)',
    src: 'src/tools.ts: getTools() / assembleToolPool()',
    role: '工具池经过 deny rules、REPL 过滤、MCP 合并后，形成最终暴露给模型的能力面。',
    upstream: ['getAllBaseTools()', 'filterToolsByDenyRules()', 'REPL mode'],
    downstream: ['system prompt tool schemas', 'tool calling loop'],
    details: [
      '如果 ConfigTool 没进入这里，模型就不会生成对应 tool_use。',
      '这比在调用时再拒绝更强，因为它从认知面消除了该能力。',
      '这正是 harness engineering 的“前移约束”。'
    ]
  }
]

export const antGateEdges = [
  { from: 'env', to: 'query-config', label: '快照' },
  { from: 'env', to: 'tool-pool', label: '条件展开' },
  { from: 'tool-pool', to: 'config-tool', label: '注入' },
  { from: 'config-tool', to: 'supported-settings', label: '校验' },
  { from: 'config-tool', to: 'permission', label: '权限检查' },
  { from: 'permission', to: 'ui', label: '确认/拒绝' },
  { from: 'tool-pool', to: 'final-tools', label: '进入工具面' },
  { from: 'config-tool', to: 'ui', label: '结果渲染' }
]

export const antGateImpact = {
  upstream: [
    '环境变量注入策略决定内部能力是否存在。',
    'QueryConfig 把 isAnt 固化为单次查询不可变配置。',
    'Bun / feature-gated import 共同参与死代码消除与能力裁剪。'
  ],
  downstream: [
    '影响模型看到的 tool schema 集合。',
    '影响能否读写 Claude Code 配置。',
    '影响权限确认流、终端消息表现与最终系统 prompt 稳定性。'
  ],
  engineeringTakeaways: [
    '把能力门控放在工具池装配阶段，而不是调用失败阶段。',
    '把内部功能从“运行时报错”升级为“根本不可见”。',
    '这减少 prompt 复杂度、降低误用概率，并提升缓存稳定性。'
  ]
}
