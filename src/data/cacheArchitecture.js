// Prompt Cache 三层切分详解
export const promptCacheArchitecture = {
  overview: 'Anthropic API 的 Prompt Caching 机制通过三层切分实现成本优化。每层有不同的缓存作用域与命中率。',
  layers: [
    {
      id: 'global',
      name: 'Global Scope',
      zh: '全局作用域',
      level: 1,
      color: 'var(--accent)',
      content: '基础角色与规范（1P 用户专属，跨全球用户共享缓存）',
      examples: [
        '系统角色定义：你是 Claude Code Agent...',
        '通用工具描述：FileEdit 工具的基础说明',
        '全局安全规范：DANGEROUS_FILES 黑名单'
      ],
      cacheTTL: '永久（跨所有会话）',
      hitRate: '最高（所有用户共享）',
      src: 'src/constants/prompts.ts',
      details: [
        '内容完全固定，不随用户/项目变化',
        '由 Anthropic 全球缓存，命中率最高',
        '占用 Prompt 前缀的 30-40%'
      ]
    },
    {
      id: 'org',
      name: 'Org Scope',
      zh: '组织作用域',
      level: 2,
      color: 'var(--accent2)',
      content: '项目级 CLAUDE.md 与 rules（同一组织/项目内共享）',
      examples: [
        '项目特定的编码规范：使用 TypeScript strict mode',
        '团队约定的工具使用规则：禁止直接修改 package.json',
        '项目级记忆：当前项目的架构决策'
      ],
      cacheTTL: '项目级（同一项目内所有会话）',
      hitRate: '中等（同项目团队成员共享）',
      src: 'src/utils/claudemd.ts',
      details: [
        '内容在项目内固定，跨项目变化',
        '通过 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 标记分界',
        '占用 Prompt 前缀的 20-30%'
      ]
    },
    {
      id: 'ephemeral',
      name: 'Ephemeral Scope',
      zh: '临时作用域',
      level: 3,
      color: 'var(--accent3)',
      content: '消息历史与工具结果快照（基于 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 切分）',
      examples: [
        '当前会话的消息历史',
        '工具执行结果（FileEdit 返回值、Bash 输出）',
        '用户的实时反馈与修正'
      ],
      cacheTTL: '会话级（单次对话）',
      hitRate: '低（每次会话不同）',
      src: 'src/utils/api.ts: splitSysPromptPrefix()',
      details: [
        '内容随每次请求变化',
        '不被 API 缓存，但通过前缀对齐提升缓存命中',
        '占用 Prompt 的 50-70%'
      ]
    }
  ],
  optimizationTechniques: [
    {
      name: 'UUID 剥离',
      desc: '移除 tool_use 中的不稳定 UUID，确保字节级一致性',
      impact: '提升 Ephemeral 层缓存命中率 15-20%'
    },
    {
      name: '前缀对齐',
      desc: '保持 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 标记位置固定',
      impact: '确保 Org 层缓存命中率稳定在 80%+'
    },
    {
      name: '内存文件去重',
      desc: '使用 memoize() 缓存 getMemoryFiles() 结果',
      impact: '减少重复的文件系统访问，加速上下文构建'
    }
  ],
  costSavings: {
    withoutCache: '每次请求完整计费',
    withCache: '缓存命中部分仅计费 10%',
    avgSavings: '90% Token 成本节省（Global + Org 层）'
  }
}

export const engineeringNodeGraph = {
  nodes: [
    { id: 'input', label: '用户输入', type: 'external', x: 50, y: 50, color: 'var(--accent)' },
    { id: 'query-loop', label: 'Query Loop\n状态机', type: 'engine', x: 50, y: 150, color: 'var(--accent)' },
    { id: 'budget', label: 'Token Budget\n预算追踪', type: 'monitor', x: 150, y: 150, color: 'var(--accent3)' },
    { id: 'cache', label: 'Prompt Cache\n三层切分', type: 'optimization', x: 250, y: 150, color: 'var(--accent2)' },
    { id: 'coordinator', label: 'Coordinator\n协调者', type: 'engine', x: 50, y: 250, color: 'var(--accent2)' },
    { id: 'workers', label: 'Workers\n执行者', type: 'worker', x: 150, y: 250, color: 'var(--accent4)' },
    { id: 'sandbox', label: 'Sandbox\n隔离沙箱', type: 'security', x: 250, y: 250, color: 'var(--danger)' },
    { id: 'observability', label: 'Observability\n可观测性', type: 'monitor', x: 350, y: 200, color: 'var(--warn)' },
    { id: 'output', label: '最终输出', type: 'external', x: 50, y: 350, color: 'var(--accent)' }
  ],
  edges: [
    { from: 'input', to: 'query-loop', label: '启动', style: 'solid' },
    { from: 'query-loop', to: 'budget', label: '监控', style: 'dotted' },
    { from: 'query-loop', to: 'cache', label: '构建', style: 'dotted' },
    { from: 'query-loop', to: 'coordinator', label: '分发', style: 'solid' },
    { from: 'coordinator', to: 'workers', label: '任务', style: 'solid' },
    { from: 'workers', to: 'sandbox', label: '执行', style: 'solid' },
    { from: 'sandbox', to: 'observability', label: '追踪', style: 'dashed' },
    { from: 'coordinator', to: 'output', label: '汇总', style: 'solid' }
  ],
  principles: [
    { node: 'query-loop', principle: '确定性执行' },
    { node: 'budget', principle: '资源预算' },
    { node: 'cache', principle: '成本优化' },
    { node: 'coordinator', principle: '快速失败' },
    { node: 'workers', principle: '渐进式增强' },
    { node: 'sandbox', principle: '隔离防护' },
    { node: 'observability', principle: '可观测性' }
  ]
}
