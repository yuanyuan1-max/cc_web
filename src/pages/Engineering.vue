<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">工程化思维与设计模式</h1>
    <p class="page-sub fade-up fade-up-1">Harness Engineering · 确定性、可观测性、隔离与自愈</p>

    <h2 class="section-h fade-up">系统架构节点图 Architecture Graph</h2>
    <div class="graph-container fade-up fade-up-2">
      <svg class="node-graph" viewBox="0 0 400 400">
        <!-- 连接线 -->
        <line v-for="edge in graphEdges" :key="`edge-${edge.from}-${edge.to}`"
          :x1="getNodePos(edge.from).x" :y1="getNodePos(edge.from).y"
          :x2="getNodePos(edge.to).x" :y2="getNodePos(edge.to).y"
          :stroke="edge.style === 'solid' ? '#888' : edge.style === 'dotted' ? '#aaa' : '#ccc'"
          :stroke-dasharray="edge.style === 'dotted' ? '4,4' : edge.style === 'dashed' ? '8,4' : 'none'"
          stroke-width="1.5" />
        
        <!-- 节点 -->
        <g v-for="node in graphNodes" :key=node.id>
          <circle :cx="node.x" :cy="node.y" r="35" :fill="node.color" opacity="0.15" stroke-width="2" :stroke="node.color" />
          <text :x="node.x" :y="node.y" text-anchor="middle" dominant-baseline="middle" 
            font-size="11" font-weight="700" :fill="node.color">
            {{ node.label.split('\n')[0] }}
          </text>
          <text :x="node.x" :y="node.y + 12" text-anchor="middle" dominant-baseline="middle" 
            font-size="9" :fill="node.color" opacity="0.8">
            {{ node.label.split('\n')[1] }}
          </text>
        </g>
      </svg>
    </div>

    <h2 class="section-h fade-up">核心工程化原则 Engineering Principles</h2>
    <div class="principle-grid fade-up fade-up-2">
      <div v-for="p in harnessEngineeringPrinciples" :key="p.id" class="principle-card" :style="{borderTop: `3px solid ${p.color}`}">
        <div class="p-header">
          <span class="p-title" :style="{color: p.color}">{{ p.title }}</span>
          <span class="p-zh">{{ p.zh }}</span>
        </div>
        <div class="p-en">{{ p.en }}</div>
        <div class="p-principle">{{ p.principle }}</div>
        <div class="p-sec">实现细节 Details</div>
        <ul class="p-list">
          <li v-for="d in p.details" :key="d">{{ d }}</li>
        </ul>
        <div class="p-src"><code>{{ p.src }}</code></div>
      </div>
    </div>

    <h2 class="section-h fade-up">Prompt Cache 三层切分 Cache Architecture</h2>
    <div class="cache-layers fade-up fade-up-3">
      <div v-for="layer in cacheArchitecture.layers" :key="layer.id" class="cache-layer" :style="{borderLeft: `4px solid ${layer.color}`}">
        <div class="layer-header">
          <span class="layer-name" :style="{color: layer.color}">{{ layer.name }}</span>
          <span class="layer-zh">{{ layer.zh }}</span>
          <span class="layer-level">Level {{ layer.level }}</span>
        </div>
        <div class="layer-content">{{ layer.content }}</div>
        <div class="layer-sec">示例 Examples</div>
        <ul class="layer-examples">
          <li v-for="ex in layer.examples" :key="ex">{{ ex }}</li>
        </ul>
        <div class="layer-stats">
          <div class="stat"><b>缓存周期:</b> {{ layer.cacheTTL }}</div>
          <div class="stat"><b>命中率:</b> {{ layer.hitRate }}</div>
        </div>
        <div class="layer-src"><code>{{ layer.src }}</code></div>
      </div>
    </div>

    <div class="optimization-box fade-up fade-up-4">
      <h3 class="section-h">优化技术 Optimization Techniques</h3>
      <div class="opt-grid">
        <div v-for="opt in cacheArchitecture.optimizationTechniques" :key="opt.name" class="opt-card">
          <div class="opt-name">{{ opt.name }}</div>
          <div class="opt-desc">{{ opt.desc }}</div>
          <div class="opt-impact">💰 {{ opt.impact }}</div>
        </div>
      </div>
    </div>

    <h2 class="section-h fade-up">设计模式应用 Design Patterns</h2>
    <div class="pattern-grid fade-up fade-up-5">
      <div v-for="pat in engineeringPatterns" :key="pat.pattern" class="pattern-card">
        <div class="pat-name">{{ pat.pattern }}</div>
        <div class="pat-zh">{{ pat.zh }}</div>
        <div class="pat-desc">{{ pat.desc }}</div>
        <div class="pat-src"><code>{{ pat.src }}</code></div>
      </div>
    </div>

    <div class="summary-box fade-up fade-up-6">
      <h2 class="section-h">工程化思维总结 Summary</h2>
      <p class="summary-text">
        Claude Code 的架构体现了现代分布式系统的最佳实践：通过 <b>确定性执行</b> 确保可重复性，
        通过 <b>快速失败与自愈</b> 提升容错能力，通过 <b>资源预算</b> 控制成本，
        通过 <b>可观测性</b> 实现完整的决策链路追踪，通过 <b>隔离与沙箱</b> 防止故障扩散，
        通过 <b>渐进式增强</b> 实现功能的平滑演进。这些原则共同构成了一个高可靠、高可维护的 AI Agent 操作系统。
      </p>
    </div>
  </div>
</template>

<script setup>
import { harnessEngineeringPrinciples, engineeringPatterns } from '../data/engineeringPatterns.js'
import { promptCacheArchitecture, engineeringNodeGraph } from '../data/cacheArchitecture.js'

const cacheArchitecture = promptCacheArchitecture
const graphNodes = engineeringNodeGraph.nodes
const graphEdges = engineeringNodeGraph.edges

function getNodePos(nodeId) {
  const node = graphNodes.find(n => n.id === nodeId)
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
}
</script>

<style scoped>
.section-h { font-family: var(--font-mono); font-size: 1rem; color: var(--text2); margin: 2.5rem 0 1.2rem; text-transform: uppercase; letter-spacing: .05em; }

.graph-container { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; }
.node-graph { width: 100%; max-width: 500px; height: auto; }

.principle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.2rem; margin-bottom: 3rem; }
.principle-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; flex-direction: column; gap: .6rem; }
.p-header { display: flex; flex-direction: column; gap: .2rem; margin-bottom: .4rem; }
.p-title { font-family: var(--font-mono); font-weight: 800; font-size: 1rem; }
.p-zh { font-size: .8rem; color: var(--text3); }
.p-en { font-size: .75rem; color: var(--accent2); font-family: var(--font-mono); margin-bottom: .4rem; }
.p-principle { font-size: .88rem; color: var(--text2); line-height: 1.6; margin-bottom: .8rem; padding: .8rem; background: var(--bg3); border-radius: 6px; }
.p-sec { font-size: .7rem; color: var(--text3); text-transform: uppercase; letter-spacing: .06em; font-family: var(--font-mono); margin-top: .6rem; }
.p-list { padding-left: 1.1rem; margin-top: .4rem; }
.p-list li { font-size: .82rem; color: var(--text2); line-height: 1.7; margin-bottom: .3rem; }
.p-src { margin-top: .8rem; }
.p-src code { font-family: var(--font-mono); font-size: .68rem; color: var(--accent2); background: var(--bg3); padding: 2px 6px; border-radius: 4px; }

.cache-layers { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.2rem; margin-bottom: 2rem; }
.cache-layer { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.2rem; }
.layer-header { display: flex; align-items: baseline; gap: .6rem; margin-bottom: .6rem; }
.layer-name { font-family: var(--font-mono); font-weight: 700; font-size: .95rem; }
.layer-zh { font-size: .75rem; color: var(--text3); }
.layer-level { font-size: .7rem; color: var(--text3); background: var(--bg3); padding: 2px 6px; border-radius: 4px; }
.layer-content { font-size: .85rem; color: var(--text2); margin-bottom: .8rem; }
.layer-sec { font-size: .7rem; color: var(--text3); text-transform: uppercase; letter-spacing: .06em; font-family: var(--font-mono); margin-top: .6rem; }
.layer-examples { padding-left: 1.1rem; margin-top: .4rem; }
.layer-examples li { font-size: .8rem; color: var(--text2); line-height: 1.6; margin-bottom: .2rem; }
.layer-stats { margin-top: .8rem; padding-top: .8rem; border-top: 1px solid var(--border); }
.stat { font-size: .78rem; color: var(--text2); margin-bottom: .3rem; }
.layer-src { margin-top: .6rem; }
.layer-src code { font-family: var(--font-mono); font-size: .65rem; color: var(--accent2); background: var(--bg3); padding: 2px 5px; border-radius: 4px; }

.optimization-box { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; }
.opt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem; }
.opt-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; }
.opt-name { font-family: var(--font-mono); font-weight: 700; font-size: .9rem; color: var(--accent); margin-bottom: .4rem; }
.opt-desc { font-size: .82rem; color: var(--text2); margin-bottom: .6rem; }
.opt-impact { font-size: .8rem; color: var(--warn); font-weight: 600; }

.pattern-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
.pattern-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.2rem; }
.pat-name { font-family: var(--font-mono); font-weight: 700; font-size: .95rem; color: var(--accent); margin-bottom: .3rem; }
.pat-zh { font-size: .8rem; color: var(--text3); margin-bottom: .6rem; }
.pat-desc { font-size: .85rem; color: var(--text2); line-height: 1.6; margin-bottom: .8rem; }
.pat-src { font-size: .7rem; }
.pat-src code { font-family: var(--font-mono); color: var(--accent2); background: var(--bg3); padding: 2px 6px; border-radius: 4px; }

.summary-box { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2rem; }
.summary-text { font-size: .9rem; color: var(--text2); line-height: 1.8; }

@media (max-width: 900px) {
  .principle-grid, .cache-layers, .pattern-grid { grid-template-columns: 1fr; }
}
</style>
