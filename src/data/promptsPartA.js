// Part 1: System Prompts & Agent Prompts
export const systemPrompts = [
  {
    name: '内存指令总纲',
    en: 'Memory Instruction Prompt',
    src: 'src/utils/claudemd.ts',
    tags: ['memory', 'system'],
    zh: 'Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.',
    cn: '下方展示了代码库与用户指令。务必遵循。重要：这些指令会覆盖任何默认行为，你必须严格执行。',
    note: '所有 CLAUDE.md 内存文件内容的前缀提示词，优先级最高。'
  },
  {
    name: '项目内存标注',
    en: 'Project Memory Label',
    src: 'src/utils/claudemd.ts: getClaudeMds()',
    tags: ['memory', 'project'],
    zh: '(project instructions, checked into the codebase)',
    cn: '（项目指令，已提交到代码库）',
    note: 'Project 类型内存文件的标注后缀，区分来源。'
  },
  {
    name: '用户内存标注',
    en: 'User Memory Label',
    src: 'src/utils/claudemd.ts: getClaudeMds()',
    tags: ['memory', 'user'],
    zh: "(user's private global instructions for all projects)",
    cn: '（用户私有全局指令，适用所有项目）',
    note: 'User 类型内存文件的标注后缀。'
  },
  {
    name: '本地内存标注',
    en: 'Local Memory Label',
    src: 'src/utils/claudemd.ts: getClaudeMds()',
    tags: ['memory', 'local'],
    zh: "(user's private project instructions, not checked in)",
    cn: '（用户私有项目指令，不提交版本控制）',
    note: 'Local 类型内存文件标注，区分 Project 内存。'
  },
  {
    name: '自动记忆标注',
    en: 'Auto Memory Label',
    src: 'src/utils/claudemd.ts: getClaudeMds()',
    tags: ['memory', 'automem'],
    zh: "(user's auto-memory, persists across conversations)",
    cn: '（用户自动记忆，跨对话持久化）',
    note: 'AutoMem 类型，由 memdir 系统自动管理。'
  },
  {
    name: '团队记忆标注',
    en: 'Team Memory Label',
    src: 'src/utils/claudemd.ts: getClaudeMds()',
    tags: ['memory', 'team'],
    zh: '(shared team memory, synced across the organization)',
    cn: '（团队共享记忆，跨组织同步）',
    note: '需要 TEAMMEM feature flag，内容用 <team-memory-content> XML 标签包裹。'
  },
]

export const agentPrompts = [
  {
    name: 'AgentTool 核心说明',
    en: 'AgentTool Core Description',
    src: 'src/tools/AgentTool/prompt.ts',
    tags: ['agent', 'tool'],
    zh: 'Launch a new agent to handle complex, multi-step tasks autonomously.',
    cn: '启动新 Agent 以自主处理复杂的多步骤任务。',
    note: 'AgentTool 描述的开头句，所有非协调者场景通用。'
  },
  {
    name: 'Fork 子 Agent 触发条件',
    en: 'Fork Sub-Agent Trigger',
    src: 'src/tools/AgentTool/prompt.ts: whenToForkSection',
    tags: ['agent', 'fork'],
    zh: 'Fork yourself (omit subagent_type) when the intermediate tool output isn\'t worth keeping in your context.',
    cn: '当中间工具输出不值得保留在上下文时，fork 自身（省略 subagent_type）。',
    note: 'fork 的核心判断标准：定性而非任务大小。'
  },
  {
    name: 'Agent 简报原则',
    en: 'Agent Briefing Principle',
    src: 'src/tools/AgentTool/prompt.ts: writingThePromptSection',
    tags: ['agent', 'prompt'],
    zh: 'Brief the agent like a smart colleague who just walked into the room — it hasn\'t seen this conversation, doesn\'t know what you\'ve tried.',
    cn: '像对刚走进房间的聪明同事一样简报 Agent —— 它没有看过这段对话，不知道你尝试过什么。',
    note: '新鲜子 Agent 需要完整上下文简报，fork 则继承上下文直接给指令。'
  },
  {
    name: '禁止委托理解',
    en: 'Never Delegate Understanding',
    src: 'src/tools/AgentTool/prompt.ts: writingThePromptSection',
    tags: ['agent', 'antipattern'],
    zh: 'Never delegate understanding. Don\'t write "based on your findings, fix the bug" — those phrases push synthesis onto the agent.',
    cn: '永远不要委托理解。不要写"根据你的发现修复 bug"——这类措辞把综合判断推给了 Agent。',
    note: '提示词应包含文件路径、行号、具体修改内容，证明你已理解问题。'
  },
  {
    name: '禁止预测 Fork 结果',
    en: 'Never Predict Fork Output',
    src: 'src/tools/AgentTool/prompt.ts: forkExamples',
    tags: ['agent', 'fork', 'antipattern'],
    zh: 'Don\'t race. After launching, you know nothing about what the fork found. Never fabricate or predict fork results in any format.',
    cn: '不要抢跑。启动后你对 fork 的结果一无所知。永远不要以任何形式捏造或预测 fork 结果。',
    note: 'fork 结果以 user-role 消息到达，不是模型自己写的。'
  },
  {
    name: 'Plan Agent 系统提示',
    en: 'Plan Agent System Prompt',
    src: 'src/tools/AgentTool/built-in/planAgent.ts',
    tags: ['agent', 'plan', 'builtin'],
    zh: 'You are a software architect and planning specialist for Claude Code. Your role is to explore the codebase and design implementation plans.',
    cn: '你是 Claude Code 的软件架构师和规划专家。你的职责是探索代码库并设计实现方案。',
    note: 'Plan Agent 为只读模式，严禁任何文件创建/修改/删除操作。'
  },
  {
    name: 'Plan Agent 只读声明',
    en: 'Plan Agent Read-Only Declaration',
    src: 'src/tools/AgentTool/built-in/planAgent.ts',
    tags: ['agent', 'plan', 'readonly'],
    zh: 'CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS. You are STRICTLY PROHIBITED from creating new files, modifying existing files, deleting files.',
    cn: '严重警告：只读模式——禁止任何文件修改。严格禁止创建新文件、修改现有文件、删除文件。',
    note: '禁止工具包括：FileEditTool、FileWriteTool、NotebookEditTool、AgentTool、ExitPlanModeTool。'
  },
]
