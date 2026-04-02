export const mainFlow = [
  {
    type: 'input',
    zh: '用户输入 / 外部触发',
    en: 'User Input / External Trigger',
    desc: '终端键盘输入、SDK调用、远程触发器或定时任务触发会话启动。',
    src: 'src/entrypoints/cli.tsx · src/tools/RemoteTriggerTool/',
    edgeLabel: '初始化会话',
    details: [
      '交互模式：ink TUI 渲染循环 (src/ink/)',
      '非交互模式：--print 标志直接输出',
      'SDK 模式：agentSdkTypes.ts 定义结构化 I/O',
      '远程触发：RemoteTriggerTool 监听外部事件',
      '定时任务：ScheduleCronTool 管理 cron 计划',
    ]
  },
  {
    type: 'memory',
    zh: '内存文件加载（5 层）',
    en: 'Memory Files Loading — 5 Layers',
    desc: '按优先级加载五层内存：Managed→User→Project→Local→AutoMem，支持 @include 与 frontmatter 条件规则。',
    src: 'src/utils/claudemd.ts · src/memdir/',
    edgeLabel: '注入系统提示',
    details: [
      '1. Managed: /etc/claude-code/CLAUDE.md（全局策略）',
      '2. User: ~/.claude/CLAUDE.md（用户全局指令）',
      '3. Project: CLAUDE.md / .claude/rules/*.md',
      '4. Local: CLAUDE.local.md（私有，不提交 git）',
      '5. AutoMem: ~/.claude/memory/MEMORY.md（自动记忆）',
      '@include 指令最大递归深度 5 层',
      'frontmatter paths: glob 匹配条件规则',
    ]
  },
  {
    type: 'router',
    zh: '模式路由 / 上下文构建',
    en: 'Mode Router / Context Builder',
    desc: '根据会话模式（normal/planMode/bypassPermissions/coordinator）构建系统提示，选择目标模型。',
    src: 'src/query/config.ts · src/coordinator/coordinatorMode.ts',
    edgeLabel: '发送 API 请求',
    details: [
      'normal: 标准模式，完整工具集',
      'planMode: 只读规划，禁止文件写入',
      'bypassPermissions: 无人值守，跳过权限确认',
      'coordinator: 多 Agent 协调者模式',
      'Token 预算管理：src/query/tokenBudget.ts',
    ]
  },
  {
    type: 'execution',
    zh: 'LLM 推理 / 工具决策',
    en: 'LLM Inference / Tool Decision',
    desc: '调用 Anthropic API，流式接收响应。模型输出文本或 tool_use blocks（单次可包含多个工具调用）。',
    src: 'src/utils/api.ts · src/query/deps.ts',
    edgeLabel: '工具调用 or 文本响应',
    details: [
      '流式 SSE：每个 token 实时渲染',
      '工具调用：输出 tool_use content block',
      '并行工具：单次响应多个工具调用',
      'Stop Hooks：src/query/stopHooks.ts',
      'Token Budget：动态调整可用上下文窗口',
    ]
  },
  {
    type: 'tool',
    zh: '工具执行层',
    en: 'Tool Execution Layer',
    desc: '权限引擎检查后，执行对应工具（Bash/FileEdit/Glob/Agent等），结果作为 tool_result 返回模型。',
    src: 'src/tools/ · src/utils/permissions/',
    edgeLabel: 'tool_result 返回模型',
    details: [
      '权限模式：default / bypassPermissions / planMode',
      'Bash: 沙箱隔离执行，支持后台任务',
      'FileEdit: str_replace 精确补丁',
      'Agent: 启动子 Agent（fork/fresh/worktree/remote）',
      'MCP: 外部工具服务器协议',
      'WebSearch / WebFetch: 网络访问',
    ]
  },
  {
    type: 'execution',
    zh: 'Agent 子任务调度',
    en: 'Sub-Agent Scheduling',
    desc: 'AgentTool 可以 fork 当前 Agent（继承上下文）或启动全新子 Agent（提供完整任务描述），支持并行与后台模式。',
    src: 'src/tools/AgentTool/ · src/tools/AgentTool/runAgent.ts',
    edgeLabel: '汇聚结果',
    details: [
      'fork: 继承父 Agent 上下文，共享 prompt cache',
      'fresh: 全新子 Agent，需完整任务描述',
      'worktree: 在独立 git worktree 中运行',
      'remote: 远程 CCR 环境（ant 用户）',
      '内置 Agent: Plan / Explore / Verification / CodeReviewer',
      '生命周期清理：清理 MCP/Hooks/僵尸任务',
    ]
  },
  {
    type: 'memory',
    zh: '内存持久化 / 任务追踪',
    en: 'Memory Persistence / Task Tracking',
    desc: '会话结果写入 AutoMem（私有）或 TeamMem（团队），TodoWrite 追踪当前会话任务进度。',
    src: 'src/memdir/ · src/tools/TodoWriteTool/',
    edgeLabel: '准备最终响应',
    details: [
      'AutoMem: 私有持久化记忆目录',
      'TeamMem: 团队共享记忆（需 TEAMMEM flag）',
      'TodoWrite: 结构化任务列表（pending/in_progress/completed）',
      '记忆文件 frontmatter: name / description / type 字段',
      '不可保存：API key、凭证、当前会话临时信息',
    ]
  },
  {
    type: 'output',
    zh: '最终输出 / 响应用户',
    en: 'Final Output / User Response',
    desc: '将汇聚后的结果渲染到终端（TUI）、返回 SDK 调用方，或发送到远程消息通道（Slack/GitHub）。',
    src: 'src/screens/ · src/components/',
    edgeLabel: '',
    details: [
      'ink TUI：彩色终端渲染，支持 Markdown',
      'SDK 返回：结构化 JSON 响应',
      '远程通道：Slack Bot / GitHub PR 评论',
      '成本追踪：src/cost-tracker.ts 记录 token 用量',
      '会话导出：/export 命令保存对话历史',
    ]
  },
]

export const branches = [
  {
    icon: '⑂', color: 'var(--accent2)',
    title: 'Fork 子 Agent 模式',
    sub: 'Fork Sub-Agent Mode',
    steps: [
      '省略 subagent_type → fork 自身',
      '继承当前全部对话上下文',
      '共享父 Agent prompt cache（成本低）',
      '不要设置 model（破坏缓存共享）',
      '不要中途 Read 子 Agent 输出文件',
      '完成后收到通知消息（user-role）',
    ]
  },
  {
    icon: '★', color: 'var(--accent3)',
    title: '内置 Agent 类型',
    sub: 'Built-in Agent Types',
    steps: [
      'Plan Agent: 只读规划，输出实现方案',
      'Explore Agent: 代码库探索与分析',
      'Verification Agent: 验证实现正确性',
      'CodeReviewer: 独立代码审查',
      'GeneralPurpose: 通用任务处理',
    ]
  },
  {
    icon: '⊞', color: 'var(--accent4)',
    title: 'planMode 流程',
    sub: 'Plan Mode Flow',
    steps: [
      '用户触发 /plan 或 EnterPlanModeTool',
      '禁用所有文件写入工具',
      '只允许读取和分析操作',
      '输出 step-by-step 实现计划',
      'ExitPlanModeTool 退出后执行',
    ]
  },
  {
    icon: '⚡', color: 'var(--danger)',
    title: 'bypassPermissions',
    sub: 'Headless / Automated Mode',
    steps: [
      '跳过所有用户权限确认弹窗',
      '适用于 CI/CD 自动化场景',
      '需显式设置 --dangerously-skip-permissions',
      '结合沙箱使用保证文件系统安全',
    ]
  },
]
