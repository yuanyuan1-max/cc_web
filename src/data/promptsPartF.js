// Part 2 of extra prompts: Deep Tool Usage & Context Rules
export const toolPromptsExtra = [
  {
    name: 'str_replace 唯一性规则',
    en: 'str_replace Uniqueness Rule',
    src: 'src/tools/FileEditTool/prompt.ts',
    tags: ['tool', 'file'],
    zh: 'The old_string must be unique in the file. Provide a larger string with more surrounding context to make it unique.',
    cn: 'old_string 在文件中必须唯一。提供包含更多上下文的较长字符串以确保唯一性。',
    note: '这是 FileEditTool 执行成功的核心前提，防止误伤。'
  },
  {
    name: 'Bash 后台任务通知',
    en: 'Bash Background Notification',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'execution'],
    zh: 'You do not need to check the output right away - you\'ll be notified when it finishes. Do not use & at the end.',
    cn: '你不需要立即检查输出——完成后会自动通知你。不要在命令末尾使用 &。',
    note: '依靠 run_in_background 参数实现系统级调度而非 shell 任务控制。'
  },
  {
    name: 'Git 提交 HEREDOC 规范',
    en: 'Git Commit HEREDOC Spec',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['git', 'bash'],
    zh: 'ALWAYS pass the commit message via a HEREDOC to ensure good formatting.',
    cn: '始终通过 HEREDOC 传递提交消息，以确保终端格式解析正确。',
    note: '防止 shell 解释特殊字符导致提交失败。'
  },
  {
    name: '计划 vs 任务边界',
    en: 'Plan vs Tasks Boundary',
    src: 'src/memdir/teamMemPrompts.ts',
    tags: ['memory', 'process'],
    zh: 'Use a Plan for implementation tasks needing alignment; use tasks for discrete steps in the current conversation. Memory is only for future conversations.',
    cn: '需要对齐方案时使用 Plan；拆解当前步骤使用 tasks。记忆仅用于跨对话持久信息。',
    note: '明确了三种持久化机制的适用场景边界。'
  }
]
