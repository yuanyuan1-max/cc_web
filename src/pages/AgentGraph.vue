<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">Agent 协作图与底层原理</h1>
    <p class="page-sub fade-up fade-up-1">Agent Collaboration Graph & Technical Principles · 从状态机到硬编码参数全解</p>

    <div class="legend fade-up fade-up-2">
      <span v-for="t in nodeTypeDesc" :key="t.type" class="leg-item">
        <span class="leg-dot" :style="{background:t.color}"></span>{{ t.label }}
      </span>
    </div>

    <div class="graph-layout fade-up fade-up-2">
      <svg viewBox="0 0 760 540" class="graph-svg" @mouseleave="hovered=null">
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#3d4660"/>
          </marker>
        </defs>
        <g v-for="e in graphEdges" :key="e.from+e.to+e.label">
          <line :x1="cx(e.from)" :y1="cy(e.from)" :x2="cx(e.to)" :y2="cy(e.to)"
            :stroke="e.style==='dotted'?'#2e3548':'#3d4660'"
            :stroke-width="e.style==='solid'?1.6:1"
            :stroke-dasharray="e.style==='dashed'?'6,4':e.style==='dotted'?'2,3':'none'"
            marker-end="url(#arr)"/>
          <text :x="(cx(e.from)+cx(e.to))/2" :y="(cy(e.from)+cy(e.to))/2-5"
            text-anchor="middle" class="elabel">{{ e.label }}</text>
        </g>
        <g v-for="n in graphNodes" :key="n.id"
          @mouseenter="hovered=n" @click="selected=n" class="gnode">
          <rect :x="n.x" :y="n.y" width="110" height="48" rx="8"
            :fill="hovered&&hovered.id===n.id?'#252b3b':'#1a1e2a'"
            :stroke="n.color" stroke-width="1.8"/>
          <text :x="n.x+55" :y="n.y+17" text-anchor="middle" class="nlabel" :fill="n.color">
            {{ n.label.split('\n')[0] }}</text>
          <text :x="n.x+55" :y="n.y+33" text-anchor="middle" class="nsub">
            {{ n.label.split('\n')[1] }}</text>
        </g>
      </svg>

      <div class="graph-panel">
        <div v-if="!selected" class="ph">点击节点查看详情<br><small>Click a node</small></div>
        <div v-else>
          <div class="pd-name" :style="{color:selected.color}">{{ selected.label.replace('\n',' — ') }}</div>
          <div class="pd-type">{{ typeLabel(selected.type) }}</div>
          
          <div v-if="selAgent">
            <div class="pd-row" v-if="selAgent.principle"><b>原理 Principle:</b> {{ selAgent.principle }}</div>
            <div class="pd-sec">底层逻辑节点 Logic Nodes</div>
            <div class="ln-grid">
              <div v-for="ln in selAgent.logic_nodes" :key="ln.name" class="ln-item">
                <div class="ln-name">{{ ln.name }}</div>
                <div class="ln-desc">{{ ln.desc }}</div>
              </div>
            </div>
            <div class="pd-sec">技术细节 Details</div>
            <ul><li v-for="d in (selAgent.technical_details || selAgent.details)" :key="d">{{ d }}</li>
            </ul>
            <div class="pd-src"><code>{{ selAgent.src }}</code></div>
          </div>
          <div v-else class="pd-generic">
            <div class="pd-sec">节点说明</div>
            <div class="pd-row">{{ nodeDesc(selected.id) }}</div>
            <div class="pd-sec">连接关系</div>
            <ul><li v-for="e in edgesOf(selected.id)" :key="e.from+e.to">
              {{ e.from===selected.id?'→ '+e.to:'← '+e.from }}: {{e.label}}
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <h2 class="section-h fade-up">硬编码常量与参数 Hardcoded Constants</h2>
    <div class="constants-grid fade-up fade-up-3">
      <div v-for="c in hardcodedConstants" :key="c.name" class="const-card shadow-subtle">
        <div class="const-head">
          <code class="const-name">{{ c.name }}</code>
          <span class="const-value">= {{ c.value }}</span>
        </div>
        <div class="const-zh">{{ c.zh }}</div>
        <div class="const-desc">{{ c.desc }}</div>
        <div class="const-src"><code>{{ c.src }}</code></div>
      </div>
    </div>

    <h2 class="section-h fade-up">底层核心原理 Core Principles</h2>
    <div class="tech-grid fade-up fade-up-4">
      <div v-for="p in agentPrinciples" :key="p.title" class="tech-card">
        <div class="tech-title">{{ p.title }}</div>
        <div class="tech-en">{{ p.en }}</div>
        <ul class="tech-list">
          <li v-for="d in p.details" :key="d">{{ d }}</li>
        </ul>
        <div class="tech-src"><code>{{ p.src }}</code></div>
      </div>
    </div>

    <h2 class="section-h fade-up">内置 Agent 实现细节 Detail Matrix</h2>
    <div class="agent-grid fade-up fade-up-5">
      <div v-for="a in builtinAgentsDeep" :key="a.id" class="agent-card">
        <div class="ac-head">
          <span class="ac-name">{{ a.name }}</span>
          <span class="badge">{{ a.zh }}</span>
        </div>
        <div class="ac-row"><b>源码:</b> <code>{{ a.src }}</code></div>
        <div class="ac-row" v-if="a.principle"><b>核心原理:</b> {{ a.principle }}</div>
        <div class="pd-sec">逻辑节点 Logic Nodes</div>
        <div class="ln-grid small">
          <div v-for="ln in a.logic_nodes" :key="ln.name" class="ln-item">
            <div class="ln-name">{{ ln.name }}</div>
            <div class="ln-desc">{{ ln.desc }}</div>
          </div>
        </div>
        <div class="ac-cols">
          <div v-for="d in a.technical_details" :key="d" class="ac-detail-item">{{ d }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { graphNodes, graphEdges, nodeTypeDesc } from '../data/graphData.js'
import { builtinAgentsDeep, agentPrinciples, hardcodedConstants } from '../data/agentDeep.js'

const hovered = ref(null)
const selected = ref(null)

const nodeMap = Object.fromEntries(graphNodes.map(n => [n.id, n]))
const cx = id => (nodeMap[id]?.x ?? 0) + 55
const cy = id => (nodeMap[id]?.y ?? 0) + 24

const selAgent = computed(() => {
  if (!selected.value) return null
  return [...builtinAgentsDeep, ...agentPrinciples].find(a => a.id === selected.value.id || a.title === selected.value.label.split('\n')[0])
})

function typeLabel(t) {
  return { main:'主进程', coord:'协调者', fork:'分叉副本', builtin:'内置实现', phase:'任务阶段', storage:'持久化', external:'外部集', engine:'内核引擎', worker:'执行者', process:'处理过程', security:'安全沙箱' }[t] || t
}

function nodeDesc(id) {
  const descs = {
    'user': '输入源：驱动整个 Agent 循环的起点。',
    'query_loop': '核心状态机：基于 AsyncGenerator 的 while(true) 循环，处理 SSE 流、工具调用与 7 种状态转换。',
    'cache_mgr': '缓存管理器：将 System Prompt 切分为 Global/Org/Ephemeral 三层，实现 90% 成本削减。',
    'budget_tr': '预算追踪器：实时 Token 监控，执行 0.9 Nudge 指令与 500-token 报酬递减熔断。',
    'fork_mgr': '进程管理：基于 cloneFileStateCache 的瞬间分叉机制，实现零 redundant I/O 的文件快照共享。',
    'coord': '协调者：Coordinator Mode 编排核心，负责任务分发 (Fan-out) 与结果汇聚 (Fan-in)。',
    'research': '调研 Worker：执行只读探索，强制 EXPLORE_AGENT_MIN_QUERIES = 3 确保覆盖率。',
    'synthesis': '综合决策：由协调者执行，将调研发现转化为具体的实现 Spec，严禁懒惰委托。',
    'implement': '实现 Worker：执行精确写操作，遵循 str_replace 唯一性规则与沙箱约束。',
    'verify': '验证 Worker：执行对抗性探测（并发/边界），寻找最后 20% 的失败场景。',
    'sandbox': '权限沙箱：执行 DANGEROUS_FILES 拦截、Symlink 真实路径还原与 Windows 欺骗防护 (::$DATA)。',
    'memory': '持久化层：管理 MEMORY.md 截断 (200行/25KB) 与 4 类记忆同步。'
  }
  return descs[id] || '底层交互节点。'
}

function edgesOf(id) {
  return graphEdges.filter(e => e.from === id || e.to === id)
}
</script>

<style scoped>
.legend{display:flex;flex-wrap:wrap;gap:.5rem 1rem;margin-bottom:1.2rem}
.leg-item{display:flex;align-items:center;gap:.35rem;font-size:.78rem;color:var(--text2)}
.leg-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}

.graph-layout{display:grid;grid-template-columns:1fr 280px;gap:1.2rem;align-items:start;margin-bottom:2.5rem}
.graph-svg{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg)}
.gnode{cursor:pointer}
.nlabel{font-family:var(--font-mono);font-size:10px;font-weight:700}
.nsub{font-family:var(--font-mono);font-size:9px;fill:#64748b}
.elabel{font-family:var(--font-mono);font-size:8px;fill:#3d4660}

.graph-panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem;min-height:350px; position: sticky; top: 1rem; }
.ph{color:var(--text3);font-size:.85rem;text-align:center;padding:2rem 0}
.pd-name{font-family:var(--font-mono);font-weight:700;font-size:.95rem;margin-bottom:.3rem}
.pd-type{font-size:.75rem;color:var(--text3);margin-bottom:.8rem;font-family:var(--font-mono)}
.pd-sec{font-size:.7rem;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin:.8rem 0 .3rem;font-family:var(--font-mono)}
.pd-row{font-size:.82rem;color:var(--text2);line-height:1.6}
.pd-row b{color:var(--text);margin-right:.3rem}
.pd-src{margin-top:.7rem}
.pd-src code{font-family:var(--font-mono);font-size:.7rem;color:var(--accent2);background:var(--bg3);padding:2px 6px;border-radius:4px}
ul{padding-left:1.1rem}li{font-size:.78rem;color:var(--text2);line-height:1.7}

.section-h{font-family:var(--font-mono);font-size:1.1rem;color:var(--text);margin:2.5rem 0 1.2rem;text-transform:uppercase;letter-spacing:.05em;border-left:3px solid var(--accent);padding-left:.8rem}

.constants-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem;margin-bottom:2rem}
.const-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem;border-left:4px solid var(--accent2); transition: transform 0.2s;}
.const-card:hover { transform: translateY(-3px); border-color: var(--accent2); }
.const-head{display:flex;align-items:baseline;gap:.8rem;margin-bottom:.6rem;flex-wrap:wrap}
.const-name{font-family:var(--font-mono);font-weight:700;font-size:.9rem;color:var(--accent2)}
.const-value{font-family:var(--font-mono);font-size:.85rem;color:var(--text3);background:var(--bg3);padding:2px 8px;border-radius:4px}
.const-zh{font-size:.82rem;color:var(--text);font-weight:600;margin-bottom:.4rem}
.const-desc{font-size:.78rem;color:var(--text2);line-height:1.6;margin-bottom:.6rem}
.const-src{font-size:.7rem}
.const-src code{color:var(--accent3);background:var(--bg3);padding:2px 6px;border-radius:4px}

.tech-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1rem}
.tech-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem}
.tech-title{font-family:var(--font-mono);font-weight:700;font-size:1rem}
.tech-en{font-size:.72rem;color:var(--text3);margin-bottom:.8rem;font-family:var(--font-mono)}
.tech-list{padding-left:1.1rem}li{font-size:.82rem;color:var(--text2);line-height:1.7;margin-bottom:.3rem}
.tech-src{margin-top:.8rem}
.tech-src code{font-family:var(--font-mono);font-size:.68rem;color:var(--accent2);background:var(--bg3);padding:2px 6px;border-radius:4px}

.agent-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:1rem}
.agent-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem}
.ac-head{display:flex;align-items:center;gap:.7rem;margin-bottom:.6rem}
.ac-name{font-family:var(--font-mono);font-weight:700;font-size:1rem}
.ac-row{font-size:.82rem;color:var(--text2);line-height:1.7}
.ac-row b{color:var(--text)}
.ac-prompt{font-size:.75rem;margin:.7rem 0;background:var(--bg3);padding:.6rem;border-radius:4px;color:var(--text3);border-left:2px solid var(--accent2)}
.ln-grid{display:grid;grid-template-columns:1fr;gap:.6rem;margin:.8rem 0}
.ln-grid.small{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.ln-item{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:.6rem;border-left:3px solid var(--accent2)}
.ln-name{font-family:var(--font-mono);font-size:.75rem;font-weight:700;color:var(--text);margin-bottom:.2rem}
.ln-desc{font-size:.7rem;color:var(--text3);line-height:1.4}

.ac-cols{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem}
.ac-detail-item{font-size:.72rem;background:var(--bg3);padding:2px 8px;border-radius:4px;border:1px solid var(--border);color:var(--text2)}

@media (max-width:900px) {
  .graph-layout{grid-template-columns:1fr}
  .graph-panel { position: relative; top: 0; }
}
</style>
