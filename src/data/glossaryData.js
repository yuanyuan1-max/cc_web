export const glossaryData = [
  {
    term: 'Agent', zh: 'Agent / 智能体',
    en: 'An autonomous subprocess that handles tasks using tools.',
    cn: '使用工具自主处理任务的子进程。',
    src: 'src/tools/AgentTool/', tags: ['core', 'agent']
  },
  {
    term: 'AgentTool', zh: 'Agent 工具',
    en: 'The tool used to spawn sub-agents or fork the current agent.',
    cn: '用于启动子 Agent 或 fork 当前 Agent 的工具。',
    src: 'src/tools/AgentTool/AgentTool.tsx', tags: ['tool', 'agent']
  },
  {
    term: 'AutoMem', zh: '自动记忆',
    en: 'Persistent file-based memory that survives across conversations.',
    cn: '跨对话持久化的基于文件的记忆系统。',
    src: 'src/memdir/paths.ts', tags: ['memory']
  },
  {
    term: 'bypassPermissions', zh: '跳过权限模式',
    en: 'Headless mode that skips all user permission prompts.',
    cn: '无人值守模式，跳过所有用户权限确认弹窗。',
    src: 'src/utils/permissions/', tags: ['mode', 'permission']
  },
  {
    term: 'CLAUDE.md', zh: 'Claude 指令文件',
    en: 'Markdown file containing instructions injected into the system prompt.',
    cn: '包含注入系统提示词指令的 Markdown 文件。',
    src: 'src/utils/claudemd.ts', tags: ['memory', 'config']
  },
  {
    term: 'Companion / Buddy', zh: '伴侣角色',
    en: 'A small creature beside the input box that comments via speech bubble.',
    cn: '坐在输入框旁边通过气泡评论的小角色。',
    src: 'src/buddy/', tags: ['ux']
  },
  {
    term: 'Coordinator', zh: '协调者模式',
    en: 'A special Agent mode that manages and dispatches tasks to sub-agents.',
    cn: '管理并将任务分发给子 Agent 的特殊 Agent 模式。',
    src: 'src/coordinator/coordinatorMode.ts', tags: ['mode', 'agent']
  },
  {
    term: 'feature flag', zh: '功能标志',
    en: 'Runtime toggle (via GrowthBook) that enables or disables features.',
    cn: '通过 GrowthBook 运行时开关，启用或禁用功能特性。',
    src: 'src/services/analytics/growthbook.ts', tags: ['config']
  },
  {
    term: 'fork', zh: 'Fork / 分叉',
    en: 'Creating a sub-agent that inherits parent context and shares prompt cache.',
    cn: '创建继承父 Agent 上下文并共享 prompt cache 的子 Agent。',
    src: 'src/tools/AgentTool/forkSubagent.ts', tags: ['agent']
  },
  {
    term: 'frontmatter', zh: '前言元数据',
    en: 'YAML metadata at the top of a .md file (paths, name, description, type).',
    cn: 'md 文件顶部的 YAML 元数据块（paths/name/description/type 等字段）。',
    src: 'src/utils/frontmatterParser.ts', tags: ['memory', 'config']
  },
  {
    term: 'GlobTool', zh: 'Glob 文件搜索',
    en: 'Tool for finding files by glob name patterns.',
    cn: '通过 glob 模式按文件名搜索文件的工具。',
    src: 'src/tools/GlobTool/', tags: ['tool', 'search']
  },
  {
    term: 'GrepTool', zh: 'Grep 内容搜索',
    en: 'ripgrep-based tool for searching file contents by regex.',
    cn: '基于 ripgrep 的正则内容搜索工具。',
    src: 'src/tools/GrepTool/', tags: ['tool', 'search']
  },
  {
    term: 'ink', zh: 'Ink TUI 框架',
    en: 'React-based terminal UI framework used for rendering the interactive CLI.',
    cn: '基于 React 的终端 UI 框架，用于渲染交互式命令行界面。',
    src: 'src/ink/', tags: ['ui']
  },
  {
    term: 'isolation: worktree', zh: 'Worktree 隔离',
    en: 'Runs an agent in a temporary git worktree with an isolated repo copy.',
    cn: '在临时 git worktree 中运行 Agent，拥有独立的仓库副本。',
    src: 'src/tools/AgentTool/', tags: ['agent', 'isolation']
  },
  {
    term: 'MCP', zh: 'Model Context Protocol',
    en: 'Protocol for connecting external tool servers to Claude Code.',
    cn: '将外部工具服务器连接到 Claude Code 的协议。',
    src: 'src/entrypoints/mcp.ts', tags: ['integration', 'protocol']
  },
  {
    term: 'memdir', zh: '记忆目录系统',
    en: 'File-based memory directory system with MEMORY.md index files.',
    cn: '以 MEMORY.md 为索引的基于文件的记忆目录系统。',
    src: 'src/memdir/', tags: ['memory']
  },
  {
    term: 'planMode', zh: '规划模式',
    en: 'Read-only mode for designing implementation plans without file writes.',
    cn: '只读规划模式，用于设计实现方案，禁止任何文件写入。',
    src: 'src/tools/EnterPlanModeTool/', tags: ['mode']
  },
  {
    term: 'prompt cache', zh: 'Prompt 缓存',
    en: 'Anthropic API feature that caches repeated prompt prefixes to reduce cost.',
    cn: 'Anthropic API 缓存重复 prompt 前缀以降低成本的功能。',
    src: 'src/utils/api.ts', tags: ['performance', 'api']
  },
  {
    term: 'run_in_background', zh: '后台运行',
    en: 'Parameter for Bash/Agent tools to run tasks without blocking.',
    cn: 'Bash/Agent 工具的参数，让任务在后台运行不阻塞主流程。',
    src: 'src/tools/BashTool/', tags: ['tool', 'execution']
  },
  {
    term: 'sandbox', zh: '沙箱',
    en: 'Filesystem and network isolation layer for command execution.',
    cn: '命令执行的文件系统和网络隔离层。',
    src: 'src/utils/sandbox/', tags: ['security', 'execution']
  },
  {
    term: 'skill', zh: 'Skill / 技能',
    en: 'Reusable command macros defined in SKILL.md files under .claude/skills/.',
    cn: '定义在 .claude/skills/ 目录 SKILL.md 文件中的可复用命令宏。',
    src: 'src/skills/', tags: ['config', 'reuse']
  },
  {
    term: 'slash command', zh: '斜线命令',
    en: 'Interactive commands prefixed with / (e.g. /plan, /memory, /compact).',
    cn: '以 / 为前缀的交互式命令（如 /plan, /memory, /compact）。',
    src: 'src/commands/', tags: ['ui', 'command']
  },
  {
    term: 'str_replace', zh: '字符串替换',
    en: 'Edit strategy requiring exact match of old_string before replacement.',
    cn: '编辑策略：要求 old_string 与文件内容精确匹配后再执行替换。',
    src: 'src/tools/FileEditTool/', tags: ['tool', 'file']
  },
  {
    term: 'subagent_type', zh: '子 Agent 类型',
    en: 'Parameter specifying which built-in or custom agent to launch.',
    cn: '指定要启动哪种内置或自定义 Agent 的参数。',
    src: 'src/tools/AgentTool/prompt.ts', tags: ['agent']
  },
  {
    term: 'TeamMem', zh: '团队记忆',
    en: 'Shared memory directory synced across all team members in a project.',
    cn: '在项目所有团队成员间同步共享的记忆目录。',
    src: 'src/memdir/teamMemPaths.ts', tags: ['memory', 'team']
  },
  {
    term: 'token budget', zh: 'Token 预算',
    en: 'Dynamic context window allocation managed per request.',
    cn: '每次请求动态分配的上下文窗口配额。',
    src: 'src/query/tokenBudget.ts', tags: ['performance', 'api']
  },
  {
    term: 'TodoWriteTool', zh: '任务写入工具',
    en: 'Tool for creating a structured task list with status tracking.',
    cn: '创建带状态追踪的结构化任务列表的工具。',
    src: 'src/tools/TodoWriteTool/', tags: ['tool', 'task']
  },
  {
    term: 'tool_use / tool_result', zh: '工具调用 / 工具结果',
    en: 'Anthropic API content block types for invoking tools and returning results.',
    cn: 'Anthropic API 调用工具和返回结果的内容块类型。',
    src: 'src/utils/api.ts', tags: ['api', 'core']
  },
  {
    term: 'worktree', zh: 'Git Worktree',
    en: 'A linked working tree allowing multiple checkouts of one repo simultaneously.',
    cn: '允许同一仓库同时检出多个工作目录的 git 链接工作树。',
    src: 'src/commands/branch/', tags: ['git', 'isolation']
  },
]

export const glossaryTags = [
  'all', 'core', 'agent', 'memory', 'tool', 'mode',
  'config', 'search', 'api', 'security', 'ui', 'git',
  'team', 'performance', 'integration',
]
