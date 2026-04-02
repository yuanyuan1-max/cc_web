// Extreme technical detail for every builtin agent and engine component
export const builtinAgentsDeep = [
  {
    id: 'general-purpose', 
    name: 'General-Purpose Agent',
    zh: '通用执行 Agent',
    src: 'src/tools/AgentTool/built-in/generalPurposeAgent.ts',
    principle: '权限全开的递归执行器。唯一默认加载全量项目规则（CLAUDE.md）且具备双向读写权限的内置代理。',
    technical_details: [
      'Permission: 继承当前 session 的最高权限级别（default/acceptEdits）。',
      'Recursion: 允许启动任何层级的嵌套子 Agent，支持 parallel 并发调用。',
      'Strategy: 遵循"宽泛调研 -> 架构分析 -> 精确补丁"的三段式作业模型。',
      'Safety: 虽然权限最高，但仍受 DANGEROUS_FILES 拦截逻辑约束。'
    ],
    logic_nodes: [
      { name: 'Initial Mapping', desc: '利用 Glob/Grep 在全局范围内建立代码依赖拓扑' },
      { name: 'Pattern Matching', desc: '对齐项目中现有的错误处理、日志记录与导出规范' },
      { name: 'Incremental Write', desc: '利用 str_replace 执行原子化修改，拒绝全文件重写' }
    ]
  },
  {
    id: 'Explore', 
    name: 'Explore Agent',
    zh: '代码深度探索 Agent',
    src: 'src/tools/AgentTool/built-in/exploreAgent.ts',
    principle: '只读高并发索引。剥离所有"写逻辑"以压榨搜索带宽，专为大规模代码库导航设计。',
    technical_details: [
      'Concurrency: 强制要求并行工具调用 (Parallel Tool Use)，单次可发起 10+ 并发搜索。',
      'Optimization: 剥离 CLAUDE.md 以显著减小上下文体积，提升推理速度。',
      'Hard Limit: EXPLORE_AGENT_MIN_QUERIES = 3 (强制最少查询次数，确保搜索覆盖率)。',
      'Model Policy: 外部用户强制 Haiku 以追求秒级响应。'
    ],
    logic_nodes: [
      { name: 'Multi-Path Glob', desc: '并发扫描多个模块目录，寻找潜在的目标文件' },
      { name: 'Grep Filtering', desc: '对返回的大量文本进行多线程正则筛选' },
      { name: 'Context Stripping', desc: '动态从 Prompt 中剔除写指令，优化性能' }
    ]
  },
  {
    id: 'Plan', 
    name: 'Plan Agent',
    zh: '架构规划 Agent',
    src: 'src/tools/AgentTool/built-in/planAgent.ts',
    principle: '静态蓝图架构师。在代码执行任何变更前，输出具备架构一致性的分步骤实施策略。',
    technical_details: [
      'Purity: 禁止一切重定向（>）与临时文件写入，确保持久性状态零污染。',
      'Consistency: 强制使用 inherit 模型，确保与主进程具有同等的逻辑推演深度。',
      'Structure: 结尾必须包含 Critical Files for Implementation 列表。',
      'Scope: 仅允许只读工具（Glob/Grep/Read/Bash Read-only）。'
    ],
    logic_nodes: [
      { name: 'Spec Synthesis', desc: '将抽象需求转化为原子化的文件修改指令' },
      { name: 'Dependency Audit', desc: '分析目标修改点对上下游模块的潜在破坏性影响' },
      { name: 'Step Sequencing', desc: '确定最优执行顺序，防止循环依赖导致构建失败' }
    ]
  },
  {
    id: 'verification', 
    name: 'Verification Agent',
    zh: '对抗性验证 Agent',
    src: 'src/tools/AgentTool/built-in/verificationAgent.ts',
    principle: '寻找最后 20% 的失败。基于"模型倾向于忽略边缘 Case"的假设，进行破坏性探测。',
    technical_details: [
      'Adversarial Probing: 强制探测并发竞争、操作幂等性与资源泄露。',
      'Evidence-Based: 严禁基于代码阅读的推测，必须回传原始终端输出作为证据。',
      'Sandboxing: 仅拥有 /tmp 权限，确保验证脚本不被意外 commit。',
      'Verdict: 强制 VERDICT: PASS|FAIL|PARTIAL 状态码结尾。'
    ],
    logic_nodes: [
      { name: 'Chaos Injection', desc: '模拟异常输入、极端负载与并发冲突场景' },
      { name: 'Verdict Generation', desc: '基于实际运行结果产出 PASS|FAIL|PARTIAL 裁决' },
      { name: 'Artifact Cleanup', desc: '执行结束后强制 rm 所有临时产生的测试脚本' }
    ]
  },
  {
    id: 'claude-code-guide', 
    name: 'Guide Agent',
    zh: 'Claude 指南 Agent',
    src: 'src/tools/AgentTool/built-in/claudeCodeGuideAgent.ts',
    principle: '动态知识库检索引擎。解决"How to use"问题，实时对齐官方最新 SDK 与 API 规范。',
    technical_details: [
      'Real-time: 使用 WebFetch 实时拉取 docs.map，确保不使用模型陈旧知识。',
      'Context: 自动注入用户本地 .claude/ 技能与 MCP 服务器列表作为补充背景。',
      'Permission: dontAsk 模式执行 Web 访问，减少用户干扰。'
    ],
    logic_nodes: [
      { name: 'Doc Mapping', desc: '在 docs.claude.com 中定位最相关的章节锚点' },
      { name: 'Context Fusion', desc: '将官方文档与用户本地 custom skills 进行融合解释' },
      { name: 'Snippet Generation', desc: '生成可直接在当前终端执行的 CLI 命令示例' }
    ]
  }
]

export const agentPrinciples = [
  {
    title: 'Query Loop 核心状态机',
    en: 'Query Loop State Machine',
    src: 'src/query.ts: queryLoop()',
    color: 'var(--accent)',
    details: [
      '异步驱动: 基于 AsyncGenerator 实现 while(true) 循环，处理 SSE 流与工具调用。',
      '状态转移: 维护 next_turn, reactive_compact_retry, token_budget_continuation 等 7 种状态。',
      '响应补全: 检测到 API 400/500 中断时，自动补齐缺失的 tool_result block 以防对话链损坏。',
      '递归控制: 强制执行 maxTurns 限制（默认不限，可通过参数设置）。'
    ]
  },
  {
    title: 'Prompt 缓存分层策略',
    en: 'Prompt Caching Layers',
    src: 'src/utils/api.ts: splitSysPromptPrefix()',
    color: 'var(--accent2)',
    details: [
      'Global Scope: 基础角色与规范（1P 用户专属，跨全球用户共享缓存）。',
      'Org Scope: 项目级 CLAUDE.md 与 rules（同一组织/项目内共享）。',
      'Ephemeral Scope: 消息历史与工具结果快照，基于 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 切分。',
      '前缀对齐: 自动移除 tool_use 中不稳定的 UUID，确保字节级一致性以触发 API 缓存。'
    ]
  },
  {
    title: '上下文隔离 (Fork 机制)',
    en: 'Context Isolation (Forking)',
    src: 'src/utils/forkedAgent.ts: createSubagentContext()',
    color: 'var(--accent3)',
    details: [
      '状态快照: cloneFileStateCache 复制父进程已读文件内容，实现"瞬间分叉"且零 redundant I/O。',
      '回调劫持: setAppState 被拦截为 no-op，禁止子 Agent 篡改全局 UI 状态。',
      '错误自愈: filterIncompleteToolCalls 自动修复父进程留下的损坏 tool_use 记录。',
      '独立生命周期: 子 Agent 独立持有 abortController，互不干扰。'
    ]
  },
  {
    title: '权限沙箱与路径还原',
    en: 'Permission Sandbox',
    src: 'src/utils/permissions/filesystem.ts',
    color: 'var(--danger)',
    details: [
      '符号链接防御: fs.realpathSync 还原所有 symlink 到绝对路径，彻底封死 .. 逃逸。',
      '敏感文件拦截: DANGEROUS_FILES 列表强制拦截对 .bashrc, .gitconfig 等 OS 配置的写入。',
      'Windows Bypass 防御: 专项正则过滤 NTFS ADS (::$DATA) 和 8.3 短文件名 (GIT~1)。',
      'isolation:worktree: 支持在独立的 git worktree 中运行高风险构建脚本。'
    ]
  },
  {
    title: 'Token 预算与收敛判定',
    en: 'Token Budget & Convergence',
    src: 'src/query/tokenBudget.ts',
    color: 'var(--warn)',
    details: [
      '动态 Nudge: COMPLETION_THRESHOLD = 0.9 (90%)，当消耗达预算 90% 时注入收尾指令。',
      '报酬递减算法: DIMINISHING_THRESHOLD = 500，连续 3 轮输出增量 < 500 tokens 判定为死循环。',
      'Token Budget: 根据单次请求的任务复杂度动态分配，非简单的全局硬限。',
      'MAX_OUTPUT_TOKENS_RECOVERY_LIMIT = 3: 最多允许 3 次 max_output_tokens 错误恢复尝试。'
    ]
  }
]

export const hardcodedConstants = [
  {
    name: 'COMPLETION_THRESHOLD',
    value: '0.9',
    zh: '完成阈值',
    desc: '当 Token 消耗达到预算的 90% 时，系统自动注入 Nudge 指令引导模型收尾。',
    src: 'src/query/tokenBudget.ts'
  },
  {
    name: 'DIMINISHING_THRESHOLD',
    value: '500',
    zh: '报酬递减阈值',
    desc: '连续 3 轮输出增量 (delta) 小于 500 tokens 时，判定为陷入报酬递减循环，强制终止。',
    src: 'src/query/tokenBudget.ts'
  },
  {
    name: 'EXPLORE_AGENT_MIN_QUERIES',
    value: '3',
    zh: '探索 Agent 最少查询次数',
    desc: '强制 Explore Agent 至少执行 3 次并发搜索，确保搜索覆盖率。',
    src: 'src/tools/AgentTool/built-in/exploreAgent.ts'
  },
  {
    name: 'MAX_OUTPUT_TOKENS_RECOVERY_LIMIT',
    value: '3',
    zh: '最大输出 Token 恢复次数',
    desc: '当模型因输出 Token 超限而中断时，最多允许 3 次自动恢复尝试。',
    src: 'src/query.ts'
  },
  {
    name: 'MAX_OUTPUT_TOKENS_FOR_SUMMARY',
    value: '20,000',
    zh: '摘要最大输出 Token',
    desc: '生成工具使用摘要时的最大输出 Token 限制，防止摘要本身过度膨胀。',
    src: 'src/services/toolUseSummary/toolUseSummaryGenerator.ts'
  },
  {
    name: 'ESCALATED_MAX_TOKENS',
    value: '64,000',
    zh: '升级后的最大输出 Token',
    desc: '当模型在默认 8k 限制下触发 max_output_tokens 错误时，自动升级到 64k 进行单次重试。',
    src: 'src/utils/context.ts'
  },
  {
    name: 'MCP_AUTH_CACHE_TTL_MS',
    value: '900,000 (15 min)',
    zh: 'MCP 认证缓存时长',
    desc: '对于返回 401 认证错误的 MCP 服务器，在 15 分钟内跳过自动连接尝试。',
    src: 'src/services/mcp/client.ts'
  },
  {
    name: 'MAX_ERRORS_BEFORE_RECONNECT',
    value: '3',
    zh: '最大重连错误上限',
    desc: 'MCP 连接在连续发生 3 次终端错误后将强制触发重连流程。',
    src: 'src/services/mcp/client.ts'
  },
  {
    name: 'SYSTEM_PROMPT_DYNAMIC_BOUNDARY',
    value: '特殊标记字符串',
    zh: '系统提示词动态边界',
    desc: '用于在 API 层级标记静态指令与动态上下文的分界点，实现 Global/Org/Ephemeral 三层缓存切分。',
    src: 'src/constants/prompts.ts'
  }
]
