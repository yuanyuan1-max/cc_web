// Part 4: Advanced Query Loop & Technical Principles
export const architecturePromptsExtra = [
  {
    name: 'Token 预算临界指令',
    en: 'Token Budget Nudge',
    src: 'src/query/tokenBudget.ts: getBudgetContinuationMessage()',
    tags: ['performance', 'budget'],
    zh: 'You are nearing your token budget. Please summarize your findings and provide a final response as soon as possible.',
    cn: '你即将达到 Token 预算上限。请尽快汇总调研结果并给出最终响应。',
    note: '当消耗达到 budget * 0.9 (90%) 时自动注入，引导模型收敛。'
  },
  {
    name: 'Max Output 恢复指令',
    en: 'Max Output Recovery',
    src: 'src/query.ts',
    tags: ['performance', 'recovery'],
    zh: 'Output token limit hit. Resume directly — no apology, no recap. Pick up mid-thought if that is where the cut happened.',
    cn: '达到输出 Token 限制。直接恢复——无需道歉，无需回顾。如果是在思绪中途切断的，请直接接上。',
    note: '用于处理 max_output_tokens 错误后的静默恢复。'
  },
  {
    name: 'System Prompt 动态边界',
    en: 'System Prompt Dynamic Boundary',
    src: 'src/constants/prompts.ts',
    tags: ['architecture', 'cache'],
    zh: 'SYSTEM_PROMPT_DYNAMIC_BOUNDARY: 用于区分静态指令与动态上下文的边界符。',
    cn: '系统提示词动态边界：用于在 API 层级将静态指令（可全局缓存）与动态上下文（项目特定）分离。',
    note: '这是实现 Global Cache Scope 的关键技术锚点。'
  }
]
