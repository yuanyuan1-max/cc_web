// Part 3 of extra prompts: Coordinator & Architecture Deep Dive
export const architecturePrompts = [
  {
    name: '协调者综合原则',
    en: 'Coordinator Synthesis Principle',
    src: 'src/coordinator/coordinatorMode.ts',
    tags: ['coordinator', 'synthesis'],
    zh: 'Always synthesize — your most important job. Read research findings, identify the approach, then write a prompt with specific file paths and line numbers.',
    cn: '始终进行综合——这是你最重要的工作。阅读调研结果，确定方案，然后编写包含具体文件路径和行号的提示词。',
    note: '严禁使用 "根据你的调研结果..." 这种委托式描述，Coordinator 必须亲自理解。'
  },
  {
    name: 'Context Overlap 决策',
    en: 'Context Overlap Decision',
    src: 'src/coordinator/coordinatorMode.ts',
    tags: ['coordinator', 'lifecycle'],
    zh: 'Choose continue vs. spawn by context overlap. High overlap -> continue; low overlap -> spawn fresh to avoid exploration noise.',
    cn: '根据上下文重合度选择 Continue 还是 Spawn。重合度高则继续；重合度低则启动全新 Agent 以避免探索噪音污染。',
    note: '技术选型标准：调研 vs 实现的范围差异。'
  },
  {
    name: '模型路由逻辑',
    en: 'Model Routing Logic',
    src: 'src/utils/model/agent.ts',
    tags: ['architecture', 'model'],
    zh: 'Dynamic model selection: haiku for speed in Explore; inherit main model for complex reasoning or prompt cache sharing.',
    cn: '动态模型选择：Explore 使用 haiku 以追求速度；复杂推理或需共享 Prompt Cache 时继承主模型。',
    note: '解释了内部如何平衡成本、速度与性能。'
  },
  {
    name: 'Prompt Cache 稳定性',
    en: 'Prompt Cache Stability',
    src: 'src/utils/api.ts',
    tags: ['performance', 'api'],
    zh: 'Use exact tools and identical system prompts to ensure prefix matches for Anthropic prompt caching.',
    cn: '使用完全一致的工具集和系统提示词，以确保命中 Anthropic 的 Prompt Cache 前缀。',
    note: 'Fork 机制之所以便宜的关键技术原因。'
  }
]
