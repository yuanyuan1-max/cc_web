<template>
  <div class="page-wrap">
    <header class="hero fade-up">
      <div class="hero-badge">
        <span class="badge badge-green">内核级源码解析 Internal Edition</span>
      </div>
      <h1 class="hero-title">Claude Code<br><span class="accent">Agent 操作系统全解析</span></h1>
      <p class="hero-sub">
        不仅仅是一份文档，更是一场对 AI Agent 运行内核的深度探索。<br>
        基于真实源码提炼 · 节点化架构解构 · 技术细节全量收录
      </p>
      <div class="hero-actions">
        <router-link to="/flow" class="btn btn-primary shadow-glow">开启探索之旅 Exploration →</router-link>
        <router-link to="/agent-graph" class="btn btn-secondary shadow-subtle">核心引擎架构 Graph</router-link>
      </div>
    </header>

    <section class="stats-row fade-up fade-up-2">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="stat-num">{{ s.num }}</div>
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-desc">{{ s.desc }}</div>
      </div>
    </section>

    <section class="card-grid fade-up fade-up-3">
      <router-link :to="item.to" class="feature-card" v-for="item in features" :key="item.to">
        <div class="fc-icon-wrap" :style="{ background: item.bg }">
          <div class="fc-icon" :style="{ color: item.color }">{{ item.icon }}</div>
        </div>
        <div class="fc-content">
          <div class="fc-title">{{ item.title }} <span class="arrow">→</span></div>
          <div class="fc-sub">{{ item.sub }}</div>
          <div class="fc-desc">{{ item.desc }}</div>
        </div>
      </router-link>
    </section>

    <section class="arch-overview fade-up fade-up-4">
      <div class="section-header">
        <h2 class="section-title">模块化架构解构 Architecture Granularity</h2>
        <div class="title-line"></div>
      </div>
      <div class="arch-grid">
        <div class="arch-block" v-for="a in arch" :key="a.name" :style="{ borderTop: `3px solid ${a.color}` }">
          <div class="arch-meta">
            <span class="arch-name">{{ a.name }}</span>
            <span class="arch-path">{{ a.path }}</span>
          </div>
          <div class="arch-desc">{{ a.desc }}</div>
          <div class="arch-features">
            <span v-for="f in a.features" :key="f" class="arch-tag">{{ f }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="concept-section fade-up fade-up-5">
      <div class="section-header">
        <h2 class="section-title">核心技术名词解析 Core Concepts</h2>
        <div class="title-line"></div>
      </div>
      <div class="concept-grid">
        <div class="concept-card" v-for="c in concepts" :key="c.title">
          <div class="c-title">{{ c.title }}</div>
          <div class="c-desc">{{ c.desc }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { num: '30+', label: '原生工具 Tools', desc: '含 FileEdit, Bash, Web 等' },
  { num: '8',   label: '内置 Agent', desc: 'Plan, Explore, Verify 等专项引擎' },
  { num: '60+', label: '斜线命令 Cmds', desc: '/compact, /mcp, /config 等' },
  { num: '90%', label: 'Cache 命中', desc: '通过动态边界优化成本' },
]

const features = [
  { to: '/flow', icon: '◈', color: 'var(--accent)', bg: 'rgba(34,197,94,0.1)', title: 'Agent 全流程图', sub: 'Execution Pipeline', desc: '从输入解析到递归工具调用的完整异步生成器状态机。' },
  { to: '/agent-graph', icon: '🕸', color: 'var(--accent2)', bg: 'rgba(34,211,238,0.1)', title: '核心引擎拓扑', sub: 'Collaboration Matrix', desc: '解密 Coordinator、Fork 机制与底层 Sandbox 的交互拓扑。' },
  { to: '/memory-deep', icon: '🧠', color: 'var(--accent3)', bg: 'rgba(167,139,250,0.1)', title: '记忆系统深度解析', sub: 'Memory Architecture', desc: '探讨 MEMORY.md 截断、Drift 防护与加载优先级的实现算法。' },
  { to: '/prompts', icon: '✦', color: 'var(--accent2)', bg: 'rgba(34,211,238,0.1)', title: '提示词生产手册', sub: 'Prompt Specs', desc: '包含对抗性验证、System Prompt 动态边界等顶级提示词。' },
  { to: '/tools', icon: '⚙', color: 'var(--accent3)', bg: 'rgba(167,139,250,0.1)', title: '工具调用协议', sub: 'Tool Protocol', desc: '深度解析 str_replace 唯一性算法与 Tool Result 预算控制。' },
  { to: '/commands', icon: '❯', color: 'var(--accent)', bg: 'rgba(34,197,94,0.1)', title: '斜线命令参考', sub: 'Slash Commands', desc: '全量 60+ 斜线命令功能说明、用法示例与源码对应。' },
  { to: '/engineering', icon: '🏗', color: 'var(--accent4)', bg: 'rgba(251,146,60,0.1)', title: '工程化设计', sub: 'Harness Engineering', desc: '覆盖预算、缓存、隔离、自愈与系统级节点图的工程化实践。' },
  { to: '/ant-gate', icon: '⎇', color: 'var(--danger)', bg: 'rgba(239,68,68,0.1)', title: 'ANT 门控链路', sub: 'USER_TYPE Gate', desc: '单独解析 `process.env.USER_TYPE === "ant"` 对 ConfigTool 等能力的上下游影响。' },
  { to: '/glossary', icon: '⌘', color: 'var(--accent4)', bg: 'rgba(251,146,60,0.1)', title: '术语与路径', sub: 'Technical Glossary', desc: '源码全路径索引，扫清所有模糊概念。' },
]

const arch = [
  { 
    name: 'Query Loop',
    path: 'src/query.ts',
    color: 'var(--accent)',
    desc: '基于异步生成器的核心驱动循环，处理消息、工具执行与状态转移。',
    features: ['AsyncGenerator', 'Fallback Recovery', 'Recursive Trigger']
  },
  { 
    name: 'Agent Coordinator',
    path: 'src/coordinator/',
    color: 'var(--accent2)',
    desc: '异步任务分发中心，实现并行调研与综合决策 (Synthesis)。',
    features: ['Fan-out/Fan-in', 'Worker Lifecycle', 'Spec Generation']
  },
  { 
    name: 'Permissions System',
    path: 'src/utils/permissions/',
    color: 'var(--danger)',
    desc: '安全沙箱核心，执行 DANGEROUS_FILES 拦截与路径还原算法。',
    features: ['Symlink Guard', 'Win Registry Protection', 'dontAsk Mode']
  },
  { 
    name: 'Prompt Cache',
    path: 'src/utils/api.ts',
    color: 'var(--accent3)',
    desc: '缓存稳定性优化，通过 SYSTEM_PROMPT_DYNAMIC_BOUNDARY 切分上下文。',
    features: ['Global Cache Scope', 'UUID Stripping', '90% Cost Saving']
  },
  { 
    name: 'Fork Architecture',
    path: 'src/utils/forkedAgent.ts',
    color: 'var(--accent4)',
    desc: '轻量化进程分叉，共享文件快照 (cloneFileStateCache) 且状态隔离。',
    features: ['State Snapshots', 'Callback Interception', 'Zero redundant I/O']
  },
  { 
    name: 'Memory Filesystem',
    path: 'src/utils/claudemd.ts',
    color: 'var(--warn)',
    desc: '多层 MD 叠加加载逻辑，支持 @include 指令与动态截断算法。',
    features: ['Recall Protection', '25KB Limit', 'Topic Indexing']
  },
]

const concepts = [
  { title: 'Synthesis (综合)', desc: 'Coordinator 在分发任务后的关键步骤：亲自理解 findings 而非盲目委托。' },
  { title: 'Drift Protection (漂移防护)', desc: '在读取记忆前通过 grep 实时验证文件现状，防止因缓存过期导致的错误决策。' },
  { title: 'Context Stripping (上下文剥离)', desc: '在只读任务中动态移除 CLAUDE.md 等写规范，以追求极致的 haiku 推理速度。' },
  { title: 'Wire Prefix (报文前缀)', desc: '保持发送到 API 的字节序列完全一致，以确保存前缀缓存 (Prompt Caching) 的命中。' },
  { title: 'Adversarial Probing (对抗性探测)', desc: 'Verification Agent 的核心逻辑：不仅是跑测试，更要通过构造冲突试图破坏代码。' },
  { title: 'Nudge (引导收敛)', desc: '当模型在预算临界点发散思考时，系统主动注入元消息强制其进行结果汇报。' }
]
</script>

<style scoped>
.hero { text-align: center; padding: 4rem 0 3rem; background: radial-gradient(circle at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 70%); }
.hero-badge { margin-bottom: 1.5rem; }
.hero-title { font-family: var(--font-mono); font-size: 3.2rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.04em; }
.accent { background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-sub { color: var(--text2); line-height: 1.8; margin-bottom: 2.5rem; font-size: 1.1rem; }
.hero-actions { display: flex; gap: 1.2rem; justify-content: center; }

.shadow-glow { box-shadow: 0 0 20px rgba(34,197,94,0.2); }
.shadow-subtle { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

.btn { padding: .8rem 2rem; border-radius: 12px; font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700; transition: all .25s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid transparent; text-decoration: none; }
.btn-primary { background: var(--accent); color: #0d0f14; border-color: var(--accent); }
.btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }
.btn-secondary { background: var(--surface); color: var(--accent2); border-color: var(--accent2); }
.btn-secondary:hover { background: var(--bg3); transform: translateY(-3px); }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; margin: 3rem 0; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; text-align: center; transition: all .3s; }
.stat-card:hover { border-color: var(--accent); transform: translateY(-5px); background: var(--bg2); }
.stat-num { font-family: var(--font-mono); font-size: 2.4rem; font-weight: 800; color: var(--accent); margin-bottom: .2rem; }
.stat-label { font-size: 0.85rem; font-weight: 700; color: var(--text); }
.stat-desc { font-size: 0.72rem; color: var(--text3); margin-top: .4rem; }

.card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; margin: 3rem 0; }
.feature-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.8rem; background: var(--surface); border: 1px solid var(--border); border-radius: 24px; color: var(--text); transition: all .3s cubic-bezier(0.4, 0, 0.2, 1); text-decoration: none; position: relative; overflow: hidden; }
.feature-card:hover { border-color: var(--accent2); box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.fc-icon-wrap { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .3s; }
.feature-card:hover .fc-icon-wrap { transform: rotate(10deg) scale(1.1); }
.fc-icon { font-size: 1.8rem; }
.fc-title { font-family: var(--font-mono); font-weight: 800; font-size: 1.15rem; display: flex; align-items: center; gap: .5rem; }
.fc-title .arrow { opacity: 0; transform: translateX(-10px); transition: all .3s; }
.feature-card:hover .fc-title .arrow { opacity: 1; transform: translateX(0); }
.fc-sub { font-size: 0.75rem; color: var(--accent2); margin: .2rem 0 .6rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .05em; }
.fc-desc { font-size: 0.88rem; color: var(--text2); line-height: 1.6; }

.section-header { margin-bottom: 2rem; position: relative; }
.section-title { font-family: var(--font-mono); font-size: 1.2rem; color: var(--text); letter-spacing: .08em; text-transform: uppercase; font-weight: 800; }
.title-line { height: 3px; width: 60px; background: var(--accent); margin-top: .6rem; border-radius: 2px; }

.arch-overview { margin: 4rem 0; }
.arch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.arch-block { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: all .3s; }
.arch-block:hover { transform: scale(1.02); box-shadow: var(--shadow); background: var(--bg2); }
.arch-meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .8rem; }
.arch-name { font-family: var(--font-mono); font-weight: 800; font-size: 1rem; color: var(--text); }
.arch-path { font-family: var(--font-mono); font-size: .68rem; color: var(--text3); }
.arch-desc { font-size: .85rem; color: var(--text2); line-height: 1.6; margin-bottom: 1rem; min-height: 3.2rem; }
.arch-features { display: flex; flex-wrap: wrap; gap: .4rem; }
.arch-tag { font-size: .65rem; color: var(--accent2); background: rgba(34,211,238,0.08); padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono); border: 1px solid rgba(34,211,238,0.2); }

.concept-section { margin: 4rem 0; }
.concept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.concept-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem; }
.c-title { font-family: var(--font-mono); font-weight: 700; font-size: .85rem; color: var(--accent3); margin-bottom: .5rem; }
.c-desc { font-size: .8rem; color: var(--text2); line-height: 1.5; }

@media (max-width: 1100px) {
  .arch-grid, .concept-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(2,1fr); }
  .card-grid, .arch-grid, .concept-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 2.2rem; }
  .hero-actions { flex-direction: column; }
}
</style>
