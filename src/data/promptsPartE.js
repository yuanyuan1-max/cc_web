// Part 1: More System & Agent Deep Prompts
export const systemPromptsExtra = [
  {
    name: '对抗性验证指令',
    en: 'Adversarial Probes Instruction',
    src: 'src/tools/AgentTool/built-in/verificationAgent.ts',
    tags: ['verify', 'adversarial'],
    zh: 'Your job is not to confirm the implementation works — it\'s to try to break it. End with at least one adversarial probe (concurrency, boundary, idempotency).',
    cn: '你的工作不是确认实现有效，而是试图破坏它。报告必须包含至少一个对抗性探测（并发、边界、幂等性等）。',
    note: '验证 Agent 的核心精神：寻找最后的 20% 失败场景。'
  },
  {
    name: '只读模式声明',
    en: 'Read-Only Mode Declaration',
    src: 'src/tools/AgentTool/built-in/planAgent.ts',
    tags: ['plan', 'readonly'],
    zh: 'CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS. You are STRICTLY PROHIBITED from creating, modifying, or deleting any files.',
    cn: '严重警告：只读模式——禁止任何文件修改。严格禁止创建、修改或删除任何文件。',
    note: 'Plan 和 Explore Agent 的共同约束。'
  },
  {
    name: '环境详情增强',
    en: 'Env Details Enhancement',
    src: 'src/constants/prompts.ts: enhanceSystemPromptWithEnvDetails()',
    tags: ['system', 'env'],
    zh: 'Append information about terminal capabilities, CWD, and available commands to every agent system prompt.',
    cn: '向每个 Agent 系统提示词追加关于终端能力、当前工作目录及可用命令的信息。',
    note: '自动注入，确保 Agent 了解其运行环境边界。'
  },
]

export const agentDeepPrompts = [
  {
    name: 'Fork 隔离理由',
    en: 'Fork Isolation Rationale',
    src: 'src/tools/AgentTool/prompt.ts',
    tags: ['agent', 'fork'],
    zh: 'Reading the transcript mid-flight pulls the fork\'s tool noise into your context, which defeats the point of forking.',
    cn: '中途读取子进程轨迹会将 fork 的工具噪音拉入你的上下文，这违背了 forking 的初衷。',
    note: '解释了为什么 Coordinator 不应在 Fork 运行中 Read 输出文件。'
  },
  {
    name: 'Agent 信任原则',
    en: 'Agent Trust Principle',
    src: 'src/tools/AgentTool/prompt.ts',
    tags: ['agent', 'trust'],
    zh: 'The agent\'s outputs should generally be trusted.',
    cn: 'Agent 的输出通常应被信任。',
    note: 'Coordinator 对子 Agent 结果的处理态度。'
  },
  {
    name: '并行启动指令',
    en: 'Parallel Launch Instruction',
    src: 'src/tools/AgentTool/prompt.ts',
    tags: ['agent', 'parallel'],
    zh: 'If the user specifies "in parallel", you MUST send a single message with multiple AgentTool content blocks.',
    cn: '如果用户指定"并行"，你必须在单条消息中发送多个 AgentTool 内容块。',
    note: '实现真正的并发调度而非串行。'
  },
]
