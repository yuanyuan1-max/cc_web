// Part 3: Memory System Prompts
export const memoryPrompts = [
  {
    name: '记忆系统总述',
    en: 'Memory System Overview',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'system'],
    zh: 'You have a persistent, file-based memory system with two directories: a private directory and a shared team directory.',
    cn: '你拥有持久化的基于文件的记忆系统，含私有目录和团队共享目录两个分区。',
    note: '私有目录仅限当前用户，团队目录所有成员共享读写权限。'
  },
  {
    name: '记忆构建目标',
    en: 'Memory Building Goal',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'goal'],
    zh: 'Build up this memory system over time so future conversations have a complete picture of who the user is and how they collaborate.',
    cn: '随时间构建记忆系统，使未来对话能完整了解用户身份与协作偏好。',
    note: '记忆应覆盖：用户身份、协作偏好、应避免的行为、工作背景。'
  },
  {
    name: '即时保存规则',
    en: 'Immediate Save Rule',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'rule'],
    zh: 'If the user explicitly asks you to remember something, save it immediately. If they ask to forget something, find and remove the relevant entry.',
    cn: '用户要求记住某事时立即保存；要求忘记时找到并删除相关条目。',
    note: '记忆操作是即时的，不可拖延到下一次对话。'
  },
  {
    name: '两步保存流程',
    en: 'Two-Step Save Process',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'process'],
    zh: 'Step 1: write memory to its own file with frontmatter. Step 2: add a pointer in the same directory MEMORY.md index.',
    cn: '第一步：将记忆写入独立文件（带 frontmatter）。第二步：在同目录的 MEMORY.md 索引中添加指针。',
    note: 'MEMORY.md 索引每行不超过约150字符；超过 MAX_ENTRYPOINT_LINES 行会被截断。'
  },
  {
    name: '禁止保存敏感信息',
    en: 'Prohibit Saving Sensitive Data',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'security'],
    zh: 'You MUST avoid saving sensitive data within shared team memories. Never save API keys or user credentials.',
    cn: '必须避免在团队共享记忆中保存敏感数据。永远不要保存 API key 或用户凭证。',
    note: '敏感信息只能存私有目录；团队目录对所有成员可见。'
  },
  {
    name: '记忆 vs 任务区别',
    en: 'Memory vs Tasks Distinction',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'tasks'],
    zh: 'When to use tasks instead of memory: break work into discrete steps or track progress in current conversation.',
    cn: '何时用任务而非记忆：将当前对话工作拆分为离散步骤或追踪进度时用任务。',
    note: '记忆：跨对话持久有用的信息。任务：当前对话的工作步骤追踪。'
  },
  {
    name: '记忆 vs 计划区别',
    en: 'Memory vs Plan Distinction',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'plan'],
    zh: 'When to use a Plan instead of memory: non-trivial implementation tasks needing alignment — update the plan, not memory.',
    cn: '何时用计划而非记忆：需要与用户对齐方案的非平凡实现任务，应更新计划而非保存记忆。',
    note: '计划（Plan）用于当前对话的实现方案对齐；记忆用于未来对话有用的持久信息。'
  },
]
