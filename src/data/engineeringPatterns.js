// Harness Engineering 工程化思维体现
export const harnessEngineeringPrinciples = [
  {
    id: 'deterministic-execution',
    title: '确定性执行 (Deterministic Execution)',
    zh: '确定性执行',
    en: 'Deterministic Execution',
    src: 'src/query.ts · src/utils/api.ts',
    color: 'var(--accent)',
    principle: '每次相同输入必须产生相同输出。通过 Wire Prefix（报文前缀）对齐、UUID 剥离、Prompt Cache 等机制确保字节级一致性。',
    details: [
      '移除 tool_use 中的不稳定 UUID，确保 API 缓存命中',
      '保持 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 标记位置固定',
      '使用 memoize() 缓存 getMemoryFiles() 结果',
      '禁止在 Prompt 中注入时间戳或随机数'
    ]
  },
  {
    id: 'fail-fast-recovery',
    title: '快速失败与自愈 (Fail-Fast & Self-Healing)',
    zh: '快速失败与自愈',
    en: 'Fail-Fast & Self-Healing',
    src: 'src/query.ts · src/utils/permissions/',
    color: 'var(--accent2)',
    principle: '在问题早期暴露，而非隐藏。通过权限检查、沙箱验证、Stop Hooks 等机制快速发现问题，并自动恢复。',
    details: [
      'fs.realpathSync 在执行前还原所有符号链接，防止路径穿越',
      'DANGEROUS_FILES 黑名单在工具执行前检查，拒绝危险操作',
      'Stop Hooks 在完成前验证 lint/test 状态，失败则强制回退',
      'Max Output 恢复：自动重试最多 3 次，无需用户干预'
    ]
  },
  {
    id: 'resource-budgeting',
    title: '资源预算管理 (Resource Budgeting)',
    zh: '资源预算管理',
    en: 'Resource Budgeting',
    src: 'src/query/tokenBudget.ts · src/utils/api.ts',
    color: 'var(--accent3)',
    principle: '将 Token、时间、并发数等资源视为有限商品，提前分配、实时监控、动态调整。',
    details: [
      'Token Budget：根据任务复杂度动态分配，非全局硬限',
      'COMPLETION_THRESHOLD = 0.9：消耗达 90% 时注入 Nudge 指令',
      'DIMINISHING_THRESHOLD = 500：连续 3 轮增量 < 500 tokens 判定死循环',
      'Prompt Cache 三层切分：Global/Org/Ephemeral，最大化缓存命中率'
    ]
  },
  {
    id: 'observability-tracing',
    title: '可观测性与追踪 (Observability & Tracing)',
    zh: '可观测性与追踪',
    en: 'Observability & Tracing',
    src: 'src/services/analytics/ · src/commands/thinkback/',
    color: 'var(--accent4)',
    principle: '每个决策都可追溯。通过 /thinkback 回放、task-notification 通知、analytics 埋点等机制实现完整的决策链路可视化。',
    details: [
      '/thinkback 命令：可视化回放 Agent 的链式思考过程',
      '<task-notification> 标签：记录 Coordinator 分发的每个任务状态',
      'logEvent() 埋点：记录关键决策点（如 LSP 推荐、插件安装）',
      'GrowthBook 集成：实时 A/B 测试与功能开关管理'
    ]
  },
  {
    id: 'isolation-sandboxing',
    title: '隔离与沙箱 (Isolation & Sandboxing)',
    zh: '隔离与沙箱',
    en: 'Isolation & Sandboxing',
    src: 'src/utils/forkedAgent.ts · src/utils/permissions/',
    color: 'var(--danger)',
    principle: '通过多层隔离确保故障不扩散。Fork 状态隔离、权限沙箱、worktree 独立副本等机制。',
    details: [
      'cloneFileStateCache：瞬间分叉，子 Agent 拥有独立的文件快照',
      'setAppState 拦截：禁止子 Agent 篡改全局 UI 状态',
      'isolation:worktree：在独立 git worktree 中运行高风险脚本',
      'DANGEROUS_FILES 拦截：防止对 .bashrc、.gitconfig 等系统配置的写入'
    ]
  },
  {
    id: 'progressive-enhancement',
    title: '渐进式增强 (Progressive Enhancement)',
    zh: '渐进式增强',
    en: 'Progressive Enhancement',
    src: 'src/tools/AgentTool/ · src/utils/plugins/',
    color: 'var(--warn)',
    principle: '从最小可行功能开始，逐步增加能力。LSP 推荐、Hint 引导、MCP 扩展等都是可选的增强层。',
    details: [
      'LSP 推荐：仅在系统已安装二进制文件时才建议安装插件',
      'Hint 引导：被动式触发，不主动打扰用户',
      'MCP 服务器：可选的扩展协议，不影响核心功能',
      '功能开关：通过 GrowthBook 灰度发布新特性'
    ]
  }
]

export const engineeringPatterns = [
  {
    pattern: 'Circuit Breaker',
    zh: '熔断器',
    desc: '当 MCP 连接失败 3 次后，自动进入熔断状态，15 分钟内跳过重连尝试。',
    src: 'src/services/mcp/client.ts'
  },
  {
    pattern: 'Retry with Exponential Backoff',
    zh: '指数退避重试',
    desc: 'Max Output 恢复最多 3 次，每次间隔递增，防止雪崩。',
    src: 'src/query.ts'
  },
  {
    pattern: 'Bulkhead Isolation',
    zh: '舱壁隔离',
    desc: 'Fork 子 Agent 拥有独立的文件快照与生命周期，故障不扩散到父进程。',
    src: 'src/utils/forkedAgent.ts'
  },
  {
    pattern: 'Graceful Degradation',
    zh: '优雅降级',
    desc: '当 LSP 推荐被用户忽略 5 次后，自动禁用该功能，避免持续打扰。',
    src: 'src/utils/plugins/lspRecommendation.ts'
  },
  {
    pattern: 'Observability First',
    zh: '可观测性优先',
    desc: '每个关键决策都通过 logEvent() 埋点，支持 /thinkback 回放与审计。',
    src: 'src/services/analytics/'
  }
]
