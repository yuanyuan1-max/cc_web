// Full list of important Claude Code slash commands
export const commandsData = [
  {
    name: '/compact',
    zh: '压缩上下文',
    desc: '手动触发对话历史压缩。通过总结当前会话释放 Token 配额，防止达到模型上下文上限。',
    usage: '/compact [custom instructions]',
    src: 'src/commands/compact/',
    tags: ['context', 'optimization']
  },
  {
    name: '/config',
    zh: '配置管理',
    desc: '交互式管理全局配置，包括默认模型、主题、编辑器路径、以及 dontAsk 模式等。',
    usage: '/config [get|set|list] [key] [value]',
    src: 'src/commands/config/',
    tags: ['settings', 'system']
  },
  {
    name: '/mcp',
    zh: 'MCP 管理',
    desc: '管理 Model Context Protocol 服务器。支持动态添加、列出、重启或移除本地/远程服务。',
    usage: '/mcp [list|add|remove|restart]',
    src: 'src/commands/mcp/',
    tags: ['mcp', 'extensibility']
  },
  {
    name: '/review',
    zh: '代码审查',
    desc: '启动 Ultrareview 模式。对当前代码变更进行深度安全性、性能与架构一致性审查。',
    usage: '/review',
    src: 'src/commands/review/',
    tags: ['security', 'quality']
  },
  {
    name: '/thinkback',
    zh: '思考回溯',
    desc: '以可视化方式回放 Agent 的链式思考过程，用于审计决策逻辑。',
    usage: '/thinkback',
    src: 'src/commands/thinkback/',
    tags: ['debug', 'transparency']
  },
  {
    name: '/plan',
    zh: '规划模式',
    desc: '进入规划阶段，Agent 会生成详细的任务拆解计划而不立即执行写操作。',
    usage: '/plan <task>',
    src: 'src/commands/plan/',
    tags: ['agent', 'workflow']
  },
  {
    name: '/plugin',
    zh: '插件系统',
    desc: '管理 Claude Code 插件，支持从市场浏览、安装、启用或禁用功能扩展。',
    usage: '/plugin [list|install|search]',
    src: 'src/commands/plugin/',
    tags: ['extensibility']
  },
  {
    name: '/stats',
    zh: '会话统计',
    desc: '展示详细的会话统计信息，包括消息数、工具调用分布及累计 Token 消耗。',
    usage: '/stats',
    src: 'src/commands/stats/',
    tags: ['stats']
  },
  {
    name: '/doctor',
    zh: '环境诊断',
    desc: '运行系统自检程序，识别权限问题、路径配置错误或缺失的系统依赖。',
    usage: '/doctor',
    src: 'src/commands/doctor/',
    tags: ['system', 'debug']
  },
  {
    name: '/memory',
    zh: '记忆快照',
    desc: '查看当前所有层级的记忆加载详情，辅助调试 MEMORY.md 加载逻辑。',
    usage: '/memory',
    src: 'src/commands/memory/',
    tags: ['context', 'memory']
  },
  {
    name: '/cost',
    zh: '预算监控',
    desc: '显示当前会话的费用预估，以及根据 Prompt Cache 节省的具体金额。',
    usage: '/cost',
    src: 'src/commands/cost/',
    tags: ['stats', 'budget']
  },
  {
    name: '/rewind',
    zh: '状态回滚',
    desc: '回退对话到之前的历史点，删除不成功的尝试并恢复先前的上下文状态。',
    usage: '/rewind [steps]',
    src: 'src/commands/rewind/',
    tags: ['context', 'editing']
  }
]

export const commandTags = ['all', 'context', 'optimization', 'settings', 'mcp', 'security', 'debug', 'agent', 'workflow', 'extensibility', 'stats', 'system', 'memory']
