import { systemPrompts, agentPrompts } from './promptsPartA.js'
import { systemPromptsExtra, agentDeepPrompts } from './promptsPartE.js'
import { toolPromptsExtra } from './promptsPartF.js'
import { architecturePrompts } from './promptsPartG.js'
import { architecturePromptsExtra } from './promptsPartH.js'
import { internalPrompts } from './promptsPartI.js'
import { bashPrompts } from './promptsPartB.js'
import { memoryPrompts } from './promptsPartC.js'
import { companionPrompts, toolPrompts } from './promptsPartD.js'

export const promptCategories = [
  {
    id: 'system', label: '系统提示词', en: 'System Prompts',
    color: 'var(--accent)', badge: 'badge-green', icon: '⬡',
    desc: '注入模型的顶层指令，定义角色、内存加载规则与行为规范。',
    items: [...systemPrompts, ...systemPromptsExtra],
  },
  {
    id: 'agent', label: 'Agent 提示词', en: 'Agent Prompts',
    color: 'var(--accent2)', badge: 'badge-blue', icon: '◈',
    desc: 'AgentTool 与内置 Agent（Plan/Explore/Verification）的系统提示词。',
    items: [...agentPrompts, ...agentDeepPrompts],
  },
  {
    id: 'architecture', label: '架构与底层原理', en: 'Architecture',
    color: 'var(--accent3)', badge: 'badge-purple', icon: '⬢',
    desc: '从 Query 状态机到 Token 预算、Autocompact 阈值，揭秘 Agent 运行的底层逻辑。',
    items: [...architecturePrompts, ...architecturePromptsExtra, ...internalPrompts],
  },
  {
    id: 'tool', label: '工具提示词', en: 'Tool Prompts',
    color: 'var(--accent4)', badge: 'badge-orange', icon: '⚙',
    desc: 'FileEdit / TodoWrite / WebFetch / AskUserQuestion 等核心工具描述。',
    items: [...toolPrompts, ...toolPromptsExtra],
  },
  {
    id: 'bash', label: 'Bash 工具提示词', en: 'Bash Tool Prompts',
    color: 'var(--accent3)', badge: 'badge-purple', icon: '❯',
    desc: 'Bash 命令执行规则、Git 安全协议、并行策略与禁止反模式。',
    items: bashPrompts,
  },
  {
    id: 'memory', label: '内存提示词', en: 'Memory Prompts',
    color: 'var(--warn)', badge: 'badge-orange', icon: '◎',
    desc: '五层内存系统的加载规则、保存流程与记忆/任务/计划边界说明。',
    items: memoryPrompts,
  },
  {
    id: 'companion', label: 'Companion 提示词', en: 'Companion Prompts',
    color: 'var(--danger)', badge: 'badge-red', icon: '♦',
    desc: 'Buddy 伴侣系统的角色定义与模型行为约束。',
    items: companionPrompts,
  },
]

export const allTags = [
  'all', 'system', 'agent', 'architecture', 'coordinator', 'synthesis', 'performance',
  'bash', 'memory', 'tool', 'fork', 'git', 'plan', 'antipattern', 'security',
]
