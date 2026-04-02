export const graphNodes = [
  { id: 'user',        label: '用户输入\nUser Drive',     type: 'external', x: 380, y: 5,   color: '#94a3b8' },
  { id: 'query_loop',  label: 'Query Loop\n核心状态机',   type: 'engine',   x: 380, y: 90,  color: '#4ade80' },
  { id: 'cache_mgr',   label: 'Cache Manager\n缓存分层',   type: 'engine',   x: 130, y: 90,  color: '#22d3ee' },
  { id: 'budget_tr',   label: 'Budget Tracker\n预算追踪', type: 'engine',   x: 630, y: 90,  color: '#f87171' },
  { id: 'compact_svc', label: 'Autocompact\n自动压缩',   type: 'engine',   x: 130, y: 190, color: '#fbbf24' },
  { id: 'coord',       label: 'Coordinator\n协调者模式',  type: 'coord',    x: 380, y: 190, color: '#22d3ee' },
  { id: 'stop_hooks',  label: 'Stop Hooks\n守护钩子',    type: 'engine',   x: 630, y: 190, color: '#f87171' },
  { id: 'research',    label: 'Explore\n并发调研',       type: 'worker',   x: 130, y: 300, color: '#22d3ee' },
  { id: 'synthesis',   label: 'Synthesis\n综合决策',     type: 'process',  x: 380, y: 300, color: '#4ade80' },
  { id: 'implement',   label: 'Implement\n执行修改',     type: 'worker',   x: 630, y: 300, color: '#fbbf24' },
  { id: 'verify',      label: 'Verify\n对抗验证',       type: 'worker',   x: 380, y: 410, color: '#f87171' },
  { id: 'sandbox',     label: 'Sandbox\n权限沙箱',       type: 'security', x: 130, y: 410, color: '#fb923c' },
  { id: 'mcp_client',  label: 'MCP Client\nMCP 客户端',  type: 'engine',   x: 630, y: 410, color: '#a78bfa' },
]

export const graphEdges = [
  { from: 'user',       to: 'query_loop', label: '会话启动',      style: 'solid' },
  { from: 'query_loop',  to: 'cache_mgr',  label: '边界切分',      style: 'dotted' },
  { from: 'query_loop',  to: 'budget_tr',  label: 'Token 监控',    style: 'dotted' },
  { from: 'query_loop',  to: 'compact_svc', label: 'Headroom 管理', style: 'dashed' },
  { from: 'query_loop',  to: 'coord',      label: '进入编排',      style: 'solid' },
  { from: 'coord',      to: 'stop_hooks',  label: '后置校验',      style: 'dashed' },
  { from: 'coord',      to: 'research',   label: '并行任务分发',   style: 'solid' },
  { from: 'research',    to: 'synthesis',  label: 'Findings 回传', style: 'solid' },
  { from: 'synthesis',   to: 'implement',  label: 'Precision Spec', style: 'solid' },
  { from: 'implement',   to: 'verify',     label: '验证变更',      style: 'solid' },
  { from: 'implement',   to: 'sandbox',    label: '路径/文件校验',  style: 'dashed' },
  { from: 'implement',   to: 'mcp_client', label: '扩展能力调用',  style: 'dotted' },
]

export const nodeTypeDesc = [
  { type: 'engine',   label: '核心引擎 Engine',   color: '#4ade80', desc: 'Query 循环、Token 预算、缓存与 Headroom 管理的底层逻辑' },
  { type: 'coord',    label: '协调者 Coordinator', color: '#22d3ee', desc: '编排多任务，负责决策与综合' },
  { type: 'worker',   label: '执行者 Worker',      color: '#fbbf24', desc: '具体任务执行者（Explore/Implement/Verify）' },
  { type: 'security', label: '安全 Security',      color: '#fb923c', desc: 'DANGEROUS_FILES 保护与路径还原校验' },
]
