// Memory deep technical data — from memoryTypes.ts + memdir.ts
export const memoryTypes = [
  {
    id: 'user', name: 'user 型记忆', en: 'User Memory',
    scope: '始终私有 always private', color: 'var(--accent)',
    when: '学习到用户角色、偏好、职责或知识时',
    how: '根据用户画像裁剪响应（高级工程师 vs 初学者）',
    structure: '用户角色/目标/知识，不含负面评价',
    example: '"我写了十年 Go，但这是第一次接触 React 前端" → [保存：Go 专家，React 新手，后端类比解释前端]'
  },
  {
    id: 'feedback', name: 'feedback 型记忆', en: 'Feedback Memory',
    scope: '默认私有，项目级约定可用 team', color: 'var(--accent2)',
    when: '用户纠正做法 OR 确认非显而易见的做法有效时（两者都要记录）',
    how: '让用户不必重复同样的指导',
    structure: '规则本身 + Why（原因）+ How to apply（应用时机）',
    example: '"不要在测试中 mock 数据库" → [保存规则 + Why: 上季度 mock/prod 分歧导致迁移失败]'
  },
  {
    id: 'project', name: 'project 型记忆', en: 'Project Memory',
    scope: '强烈偏向 team 共享', color: 'var(--accent3)',
    when: '学到正在进行的工作、目标、bug 或事故（代码/git 无法推导的）',
    how: '理解请求背后的更广泛背景，预判协作冲突',
    structure: '事实/决策 + Why（动机）+ How to apply（如何影响建议）',
    example: '"周四后冻结非关键合并" → [保存绝对日期 2026-03-05 + 原因: mobile 发布切分支]'
  },
  {
    id: 'reference', name: 'reference 型记忆', en: 'Reference Memory',
    scope: '通常 team 共享', color: 'var(--accent4)',
    when: '学到外部系统资源及其用途时',
    how: '用户提及外部系统时快速定位',
    structure: '系统名称 + 用途指针',
    example: '"Grafana oncall 看板 grafana.internal/d/api-latency" → [保存: 修改请求路径代码时检查此看板]'
  },
]

export const memoryTechnical = [
  {
    title: 'MEMORY.md 截断机制',
    en: 'MEMORY.md Truncation',
    src: 'src/memdir/memdir.ts: truncateEntrypointContent()',
    color: 'var(--accent)',
    points: [
      'MAX_ENTRYPOINT_LINES = 200 行上限',
      'MAX_ENTRYPOINT_BYTES = 25,000 字节上限',
      '先按行截断（自然边界），再按字节截断（不切行中间）',
      '超限时在末尾追加 WARNING 说明截断原因',
      '索引条目建议每行不超过 ~150 字符',
    ]
  },
  {
    title: '目录保证机制',
    en: 'Directory Guarantee',
    src: 'src/memdir/memdir.ts: ensureMemoryDirExists()',
    color: 'var(--accent2)',
    points: [
      'loadMemoryPrompt() 每次会话调用一次 ensureMemoryDirExists()',
      '使用 fs.mkdir (recursive) 确保父目录链完整创建',
      'EEXIST 已在 FsOperations.mkdir 内部处理，无需 try/catch',
      '提示词中明确注明目录已存在，模型可直接 Write 无需 mkdir 检查',
    ]
  },
  {
    title: '记忆文件加载顺序',
    en: 'Memory Load Order',
    src: 'src/utils/claudemd.ts: getMemoryFiles()',
    color: 'var(--accent3)',
    points: [
      '1. Managed (/etc/claude-code/CLAUDE.md) — 最低优先级',
      '2. User (~/.claude/CLAUDE.md + ~/.claude/rules/*.md)',
      '3. Project (从根目录向 CWD 反向遍历，越近优先级越高)',
      '4. Local (CLAUDE.local.md，私有不提交)',
      '5. AutoMem (MEMORY.md 索引) + TeamMem（需 TEAMMEM flag）',
      '结果用 memoize() 缓存，resetGetMemoryFilesCache() 清除',
    ]
  },
  {
    title: '读取侧漂移防护',
    en: 'Recall Drift Protection',
    src: 'src/memdir/memoryTypes.ts: TRUSTING_RECALL_SECTION',
    color: 'var(--warn)',
    points: [
      '记忆是写入时刻的快照，可能已过期',
      '文件路径类记忆：使用前检查文件是否存在',
      '函数/标志类记忆：使用前 grep 验证',
      '与当前观察冲突时：信任当前状态，更新或删除过期记忆',
      'git log / 读代码 优先于 活动日志快照',
    ]
  },
  {
    title: '@include 指令解析',
    en: '@include Directive Parsing',
    src: 'src/utils/claudemd.ts: extractIncludePathsFromTokens()',
    color: 'var(--accent3)',
    points: [
      '语法：@path / @./relative / @~/home / @/absolute',
      '使用 marked Lexer (gfm:false) 词法分析，不处理代码块内的 @path',
      'HTML 注释内的 @path 被忽略（先剥离注释再提取）',
      '最大递归深度 MAX_INCLUDE_DEPTH = 5',
      'processedPaths Set 防止循环引用',
      '只允许文本类扩展名（TEXT_FILE_EXTENSIONS）防止加载二进制文件',
    ]
  },
  {
    title: 'TeamMem 同步机制',
    en: 'TeamMem Sync',
    src: 'src/memdir/teamMemPaths.ts',
    color: 'var(--danger)',
    points: [
      '需要 TEAMMEM feature flag (GrowthBook) 开启',
      '团队目录路径：getAutoMemPath() + "/team"',
      'ensureMemoryDirExists(teamDir) 递归创建同时创建 autoDir',
      '内容用 <team-memory-content source="shared"> XML 标签包裹注入上下文',
      '敏感数据（API key / 凭证）严禁写入团队目录',
    ]
  },
]
