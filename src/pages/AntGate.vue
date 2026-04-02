<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">ANT 内部门控分类</h1>
    <p class="page-sub fade-up fade-up-1">USER_TYPE = ant · ConfigTool / Tungsten / REPL 的能力前移门控</p>

    <section class="hero-box fade-up fade-up-2">
      <div class="hero-label">核心表达式 Core Expression</div>
      <div class="expr-box"><code>{{ antGateOverview.coreExpr }}</code></div>
      <p class="hero-text">{{ antGateOverview.summary }}</p>
      <div class="hero-src"><code>{{ antGateOverview.src }}</code></div>
    </section>

    <section class="graph-wrap fade-up fade-up-3">
      <div class="section-head">
        <h2 class="section-title">上下游节点图 Upstream / Downstream Graph</h2>
        <div class="title-line"></div>
      </div>

      <div class="edge-list">
        <div v-for="edge in antGateEdges" :key="`${edge.from}-${edge.to}`" class="edge-row">
          <span class="edge-node">{{ lookup(edge.from)?.name }}</span>
          <span class="edge-arrow">→</span>
          <span class="edge-node target">{{ lookup(edge.to)?.name }}</span>
          <span class="edge-label">{{ edge.label }}</span>
        </div>
      </div>

      <div class="node-grid">
        <div
          v-for="node in antGateNodes"
          :key="node.id"
          class="node-card"
          :style="{ borderTop: `3px solid ${node.color}` }"
        >
          <div class="node-head">
            <div>
              <div class="node-title" :style="{ color: node.color }">{{ node.name }}</div>
              <div class="node-en">{{ node.en }}</div>
            </div>
            <code class="node-src">{{ node.src }}</code>
          </div>

          <div class="node-role">{{ node.role }}</div>

          <div class="mini-sec">上游 Upstream</div>
          <div class="tag-wrap">
            <span v-for="u in node.upstream" :key="u" class="mini-tag">{{ u }}</span>
          </div>

          <div class="mini-sec">下游 Downstream</div>
          <div class="tag-wrap">
            <span v-for="d in node.downstream" :key="d" class="mini-tag mini-tag-blue">{{ d }}</span>
          </div>

          <div class="mini-sec">技术细节 Details</div>
          <ul class="detail-list">
            <li v-for="item in node.details" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="impact-wrap fade-up fade-up-4">
      <div class="section-head">
        <h2 class="section-title">工程影响 Impact Analysis</h2>
        <div class="title-line"></div>
      </div>

      <div class="impact-grid">
        <div class="impact-card">
          <div class="impact-title">上游影响 Upstream</div>
          <ul class="detail-list">
            <li v-for="item in antGateImpact.upstream" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="impact-card">
          <div class="impact-title">下游影响 Downstream</div>
          <ul class="detail-list">
            <li v-for="item in antGateImpact.downstream" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="impact-card">
          <div class="impact-title">工程结论 Engineering Takeaways</div>
          <ul class="detail-list">
            <li v-for="item in antGateImpact.engineeringTakeaways" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { antGateOverview, antGateNodes, antGateEdges, antGateImpact } from '../data/antGateData.js'

function lookup(id) {
  return antGateNodes.find(node => node.id === id)
}
</script>

<style scoped>
.hero-box,.impact-card,.node-card{background:var(--surface);border:1px solid var(--border);border-radius:20px}
.hero-box{padding:1.4rem;margin-bottom:2rem}
.hero-label,.mini-sec{font-family:var(--font-mono);font-size:.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:.07em}
.expr-box{margin:.7rem 0 1rem;padding:.9rem 1rem;background:var(--bg3);border:1px solid var(--border);border-radius:12px;overflow:auto}
.expr-box code,.hero-src code,.node-src{font-family:var(--font-mono)}
.hero-text{font-size:.9rem;line-height:1.75;color:var(--text2);margin-bottom:.8rem}
.hero-src code{font-size:.72rem;color:var(--accent2)}

.section-head{margin-bottom:1.2rem}
.section-title{font-family:var(--font-mono);font-size:1.05rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.title-line{height:3px;width:56px;background:var(--accent);margin-top:.55rem;border-radius:99px}

.edge-list{display:grid;grid-template-columns:repeat(2,1fr);gap:.8rem;margin-bottom:1.2rem}
.edge-row{display:flex;align-items:center;gap:.55rem;background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:.75rem .9rem;flex-wrap:wrap}
.edge-node{font-size:.78rem;color:var(--text);font-weight:700}
.edge-node.target{color:var(--accent2)}
.edge-arrow{color:var(--accent);font-weight:800}
.edge-label{font-size:.68rem;color:var(--text3);margin-left:auto;font-family:var(--font-mono)}

.node-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
.node-card{padding:1.2rem}
.node-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;margin-bottom:.8rem}
.node-title{font-family:var(--font-mono);font-size:1rem;font-weight:800}
.node-en{font-size:.74rem;color:var(--text3);margin-top:.12rem}
.node-src{font-size:.64rem;color:var(--text3);background:var(--bg3);padding:3px 7px;border-radius:6px}
.node-role{font-size:.86rem;color:var(--text2);line-height:1.65;margin-bottom:.9rem}
.tag-wrap{display:flex;flex-wrap:wrap;gap:.45rem;margin:.45rem 0 .8rem}
.mini-tag{font-size:.7rem;color:var(--text2);background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.18);padding:3px 8px;border-radius:999px}
.mini-tag-blue{background:rgba(34,211,238,.08);border-color:rgba(34,211,238,.18);color:var(--accent2)}
.detail-list{padding-left:1.1rem;margin-top:.45rem}
.detail-list li{font-size:.82rem;color:var(--text2);line-height:1.7;margin-bottom:.28rem}

.impact-wrap{margin-top:2rem}
.impact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.impact-card{padding:1.2rem}
.impact-title{font-family:var(--font-mono);font-size:.9rem;font-weight:800;color:var(--accent3);margin-bottom:.65rem}

@media (max-width: 1000px){
  .edge-list,.node-grid,.impact-grid{grid-template-columns:1fr}
}
</style>
