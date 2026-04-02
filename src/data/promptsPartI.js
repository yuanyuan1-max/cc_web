// Part 5: Engine Interals & Advanced Recovery
export const internalPrompts = [
  {
    name: 'Max Output 恢复指令',
    en: 'Max Output Recovery',
    src: 'src/query.ts',
    tags: ['recovery', 'performance'],
    zh: 'Output token limit hit. Resume directly — no apology, no recap. Pick up mid-thought if that is where the cut happened.',
    cn: '达到输出 Token 限制。直接恢复——无需道歉，无需回顾。如果是在思绪中途切断的，请直接从中断处接上。',
    note: '当命中 8k/64k 输出上限时自动注入，支持最多 3 次递归恢复。'
  },
  {
    name: 'Token 预算 Nudge',
    en: 'Token Budget Nudge',
    src: 'src/query/tokenBudget.ts',
    tags: ['budget', 'performance'],
    zh: 'You are nearing your token budget. Please summarize findings and provide a final response as soon as possible.',
    cn: '你即将达到 Token 预算上限。请尽快汇总调研结果并给出最终响应。',
    note: '当消耗达到 90% 预算时注入，强制引导模型进入 Synthesis 阶段。'
  },
  {
    name: 'Stop Hook 阻塞指令',
    en: 'Stop Hook Blocking Prompt',
    src: 'src/query/stopHooks.ts',
    tags: ['hooks', 'validation'],
    zh: 'The following errors must be fixed before completion: [ERRORS]. Do not report success until these are resolved.',
    cn: '在完成前必须修复以下错误：[ERRORS]。在这些错误解决前不要报告成功。',
    note: '用于 lint 失败、测试未通过或自定义守护指令触发时的强制回退。'
  }
]
