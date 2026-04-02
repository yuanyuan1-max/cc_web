// ... (existing content) ...

export const coordinatorDetail = {
  role: 'Orchestrator / 编排者',
  description: '协调者模式 (Coordinator Mode) 是 Claude Code 的多 Agent 协作核心。它不直接执行工具，而是通过委派任务给多个 Worker 来并行解决复杂问题。',
  phases: [
    { name: 'Research (调研)', who: 'Workers (Parallel)', purpose: '探索代码库、理解问题背景、寻找相关文件。' },
    { name: 'Synthesis (综合)', who: 'Coordinator', purpose: '理解调研结果，编写精确的实现说明书 (Spec)。' },
    { name: 'Implementation (实现)', who: 'Workers', purpose: '按照 Spec 进行修改并提交。' },
    { name: 'Verification (验证)', who: 'Workers', purpose: '通过测试和对抗性探测证明代码有效。' }
  ],
  concurrencyRules: [
    'Read-only 任务（调研）：自由并行。',
    'Write-heavy 任务（实现）：同一组文件一次只能由一个 Worker 修改。',
    '不同文件区域的实现与验证可以并行运行。'
  ],
  notificationFormat: {
    tag: '<task-notification>',
    fields: ['task-id', 'status (completed|failed|killed)', 'summary', 'result', 'usage (tokens/tools/time)']
  }
}

export const securityDetails = [
  { 
    title: '危险文件保护 (DANGEROUS_FILES)',
    items: ['.gitconfig', '.bashrc', '.zshrc', '.claude.json', '.gitmodules', '.ripgreprc']
  },
  { 
    title: '敏感目录保护 (DANGEROUS_DIRECTORIES)',
    items: ['.git', '.vscode', '.idea', '.claude (除 worktrees 外)']
  },
  { 
    title: 'Windows 路径防护',
    items: ['NTFS 数据流 (::$DATA)', '8.3 短文件名 (GIT~1)', '长路径前缀 (\\\\?\\)', 'DOS 设备名 (CON/PRN)']
  }
]

// 新增：推荐与智能建议系统 (Intelligence & Recommendations)
export const recommendationSystems = [
  {
    id: 'lsp-rec',
    title: 'LSP 插件推荐系统',
    en: 'LSP Plugin Recommendation',
    src: 'src/utils/plugins/lspRecommendation.ts',
    color: 'var(--accent)',
    logic: '基于文件扩展名的智能匹配。扫描市场中声明了 lspServers 的插件。',
    triggers: [
      '检测文件扩展名 (.ts, .py 等)',
      '验证系统是否已安装对应的 LSP 二进制文件 (isBinaryInstalled)',
      '检查插件是否尚未安装',
      '检查是否在用户"永不建议"名单中'
    ],
    ui: 'LspRecommendationMenu (30秒自动超时)'
  },
  {
    id: 'hint-rec',
    title: '插件 Hint 引导系统',
    en: 'Plugin Hint Recommendations',
    src: 'src/utils/plugins/hintRecommendation.ts',
    color: 'var(--accent2)',
    logic: '被动式触发。当 CLI/SDK 在 stderr 输出 <claude-code-hint /> 标签时激活。',
    triggers: [
      '捕获 stderr 中的特定 XML 标签',
      'GrowthBook 功能开关验证 (tengu_lapis_finch)',
      '限制单个 Session 仅显示一次 Hint',
      '全局配置中未禁用 Hint 系统'
    ],
    limit: 'MAX_SHOWN_PLUGINS = 100 (防止配置无限膨胀)'
  }
]
