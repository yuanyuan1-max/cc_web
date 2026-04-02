// Full analysis of native tools in Claude Code
export const toolsData = [
  {
    id: 'file-edit',
    name: 'FileEditTool',
    zh: '文件编辑工具',
    src: 'src/tools/FileEditTool/',
    principle: '基于 str_replace 的增量编辑引擎。强制执行"唯一性匹配"算法，确保代码修改的确定性。',
    technical_details: [
      'Context-Safe: 拒绝非唯一的字符串替换，防止误改同名函数。',
      'Indentation-Aware: 自动维护目标文件的缩进风格（Tabs vs Spaces）。',
      'Safety: 在写入前进行 realpath 还原，防止通过 symlink 逃逸沙箱。'
    ]
  },
  {
    id: 'bash',
    name: 'BashTool',
    zh: '终端指令工具',
    src: 'src/tools/BashTool/',
    principle: '受控的 Shell 执行环境。支持交互式 TUI、后台进程管理与 stdout 实时流回传。',
    technical_details: [
      'Sandbox: 拦截 rm -rf /, chmod 等高危指令。',
      'Path Normalization: 自动处理 Windows/Linux 路径差异（如 C:\\\\ vs /c/）。',
      'Exit Code: 严格捕获非零退出码并触发 Agent 的自愈/重试逻辑。'
    ]
  },
  {
    id: 'web-fetch',
    name: 'WebFetchTool',
    zh: '网页抓取工具',
    src: 'src/tools/WebFetchTool/',
    principle: '基于 dontAsk 模式的静默爬虫。支持 HTML 转 Markdown 转换，优化 Token 消耗。',
    technical_details: [
      'Caching: 自动缓存相同 URL 的响应结果，减少重复网络请求。',
      'Content Filtering: 剔除广告、样式表与 JS 脚本，仅保留核心文本。',
      'Integration: 与 Guide Agent 结合，实现官方文档的实时知识对齐。'
    ]
  },
  {
    id: 'mcp-tool',
    name: 'MCPTool',
    zh: '模型上下文协议工具',
    src: 'src/tools/MCPTool/',
    principle: '动态扩展协议。将外部服务（如 Slack, GitHub, Database）映射为 Agent 的原生能力。',
    technical_details: [
      'Protocol: 基于 JSON-RPC 2.0 的 Standard MCP 交互。',
      'Elicitation: 支持 URL 授权回调（UrlElicitationRequired Error -32042）。',
      'Auth Cache: 具备 15 分钟 TTL 的 needs-auth 状态缓存。'
    ]
  },
  {
    id: 'glob-grep',
    name: 'Glob/GrepTool',
    zh: '检索增强工具',
    src: 'src/tools/GlobTool/ & GrepTool/',
    principle: '底层 ripgrep (rg) 与 Fast-Glob 集成。专为大规模 codebase 快速建立索引。',
    technical_details: [
      'Embedded: 在 Ant-native 环境下自动 fallback 到嵌入式 bfs/ugrep。',
      'Performance: 针对 .gitignore 进行硬编码排除，确保护航性能。'
    ]
  }
]
