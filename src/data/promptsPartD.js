// Part 4: Companion & Buddy Prompts + index export
export const companionPrompts = [
  {
    name: 'Companion 角色介绍',
    en: 'Companion Intro Prompt',
    src: 'src/buddy/prompt.ts: companionIntroText()',
    tags: ['companion', 'buddy'],
    zh: 'A small {species} named {name} sits beside the user\'s input box and occasionally comments in a speech bubble. You\'re not {name} — it\'s a separate watcher.',
    cn: '一只叫做 {name} 的小 {species} 坐在用户输入框旁边，偶尔在气泡中评论。你不是 {name}——它是独立的旁观者。',
    note: '当用户直接呼叫 Companion 名字时，模型应回退，只用一行或更少文字回应自己的部分。'
  },
  {
    name: 'Companion 存在时模型行为',
    en: 'Companion Mode Behavior',
    src: 'src/buddy/prompt.ts',
    tags: ['companion', 'behavior'],
    zh: 'When the user addresses {name} directly, respond in ONE line or less. Don\'t explain that you\'re not {name}. Don\'t narrate what {name} might say.',
    cn: '当用户直接称呼 {name} 时，用一行或更少文字回应。不要解释你不是 {name}，不要描述 {name} 可能说的话。',
    note: '语音气泡由 Companion 系统独立处理；模型只处理对自己的部分。'
  },
]

export const toolPrompts = [
  {
    name: 'FileEdit 工具说明',
    en: 'FileEdit Tool Description',
    src: 'src/tools/FileEditTool/prompt.ts',
    tags: ['tool', 'file'],
    zh: 'Edit a file by specifying old_string and new_string. The old_string must be unique in the file.',
    cn: '通过指定 old_string 和 new_string 编辑文件。old_string 在文件中必须唯一。',
    note: '精确字符串替换（str_replace）；必须先 Read 再 Edit；old_string 包含足够上下文确保唯一性。'
  },
  {
    name: 'TodoWrite 工具说明',
    en: 'TodoWrite Tool Description',
    src: 'src/tools/TodoWriteTool/prompt.ts',
    tags: ['tool', 'task'],
    zh: 'Use this tool to create and manage a structured task list. Track progress, organize complex tasks.',
    cn: '使用此工具创建和管理结构化任务列表，追踪进度，组织复杂任务。',
    note: '状态枚举：pending / in_progress / completed / cancelled；每次只有一个任务应为 in_progress。'
  },
  {
    name: 'WebFetch 工具说明',
    en: 'WebFetch Tool Description',
    src: 'src/tools/WebFetchTool/prompt.ts',
    tags: ['tool', 'network'],
    zh: 'Fetch content from a URL. Returns text, markdown, or HTML depending on the content type.',
    cn: '从 URL 获取内容，根据内容类型返回文本、Markdown 或 HTML。',
    note: '有预批准域名列表（src/tools/WebFetchTool/preapproved.ts），其余域名需用户确认。'
  },
  {
    name: 'AskUserQuestion 工具说明',
    en: 'AskUserQuestion Tool Description',
    src: 'src/tools/AskUserQuestionTool/prompt.ts',
    tags: ['tool', 'interaction'],
    zh: 'Ask the user a question when you need clarification before proceeding.',
    cn: '在继续之前需要澄清时向用户提问。',
    note: '仅在确实需要人工输入时使用，避免不必要的打断；支持多选项列表。'
  },
]
