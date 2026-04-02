// Part 2: Bash Tool Prompts
export const bashPrompts = [
  {
    name: 'Bash 工具优先级说明',
    en: 'Bash Tool Preference',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'tool'],
    zh: 'IMPORTANT: Avoid using this tool to run find, grep, cat, head, tail, sed, awk commands unless explicitly instructed.',
    cn: '重要：除非明确指示，避免使用此工具运行 find/grep/cat/head/tail/sed/awk 命令，应改用专用工具。',
    note: '优先级：GlobTool（文件搜索）> GrepTool（内容搜索）> FileReadTool（读文件）> BashTool。'
  },
  {
    name: '路径空格引用规则',
    en: 'Path Quoting Rule',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'rule'],
    zh: 'Always quote file paths that contain spaces with double quotes.',
    cn: '含空格的文件路径始终用双引号包裹。',
    note: '示例：cd "path with spaces/file.txt"（正确）vs cd /path with spaces（错误）。'
  },
  {
    name: '并行命令规则',
    en: 'Parallel Commands Rule',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'parallel'],
    zh: 'If the commands are independent and can run in parallel, make multiple Bash tool calls in a single message.',
    cn: '命令相互独立时，在单条消息中发起多个 Bash 工具调用以并行执行。',
    note: '依赖命令用 && 串联；不关心前置结果用 ; 分隔；禁止用换行分隔命令。'
  },
  {
    name: 'Git 安全协议',
    en: 'Git Safety Protocol',
    src: 'src/tools/BashTool/prompt.ts: getCommitAndPRInstructions()',
    tags: ['bash', 'git'],
    zh: 'NEVER update git config. NEVER run destructive git commands unless user explicitly requests. NEVER skip hooks. NEVER force push to main/master.',
    cn: '永远不要更新 git 配置；除非用户明确要求，不运行破坏性命令；不跳过 hooks；不向 main/master 强推。',
    note: 'hook 失败时应创建新提交，而非 --amend（会覆盖上一提交，导致丢失工作）。'
  },
  {
    name: '禁止 sleep 轮询',
    en: 'Avoid Sleep/Polling',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'antipattern'],
    zh: 'Do not sleep between commands. If waiting for a background task started with run_in_background, you will be notified — do not poll.',
    cn: '不要在命令间使用 sleep。等待后台任务会自动收到通知，禁止主动轮询。',
    note: '后台任务使用 run_in_background 参数，完成后自动通知。'
  },
  {
    name: 'Git 提交 HEREDOC 格式',
    en: 'Commit HEREDOC Format',
    src: 'src/tools/BashTool/prompt.ts',
    tags: ['bash', 'git', 'format'],
    zh: 'ALWAYS pass the commit message via a HEREDOC to ensure good formatting.',
    cn: '始终通过 HEREDOC 传递提交消息以确保格式正确。',
    note: 'git commit -m "$(cat <<\'EOF\'\n  message\n  EOF\n  )"'
  },
]
