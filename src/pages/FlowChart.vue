<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">Agent 全流程图</h1>
    <p class="page-sub fade-up fade-up-1">Full Agent Workflow · 从用户输入到工具执行的完整链路</p>

    <div class="legend fade-up fade-up-2">
      <span v-for="l in legend" :key="l.label" class="legend-item">
        <span class="legend-dot" :style="{ background: l.color }"></span>{{ l.label }}
      </span>
    </div>

    <div class="flow-wrap fade-up fade-up-2">
      <div class="flow-col">
        <template v-for="(node, i) in mainFlow" :key="i">
          <div class="flow-node" :class="node.type" @click="selected=node" :style="{ '--nc': nodeColor(node.type) }">
            <div class="fn-header">
              <span class="fn-num">{{ String(i+1).padStart(2,'0') }}</span>
              <span class="badge" :class="badgeClass(node.type)">{{ node.type }}</span>
            </div>
            <div class="fn-title">{{ node.zh }}</div>
            <div class="fn-en">{{ node.en }}</div>
            <div class="fn-desc">{{ node.desc }}</div>
            <div class="fn-src" v-if="node.src"><code>{{ node.src }}</code></div>
          </div>
          <div class="flow-arrow" v-if="i < mainFlow.length - 1">
            <span class="arrow-label" v-if="node.edgeLabel">{{ node.edgeLabel }}</span>
          </div>
        </template>
      </div>

      <div class="branches-col">
        <h3 class="panel-title">分支路径 Branch Paths</h3>
        <div class="branch-card" v-for="b in branches" :key="b.title">
          <div class="bc-head" :style="{ color: b.color }">{{ b.icon }} {{ b.title }}</div>
          <div class="bc-sub">{{ b.sub }}</div>
          <ul class="bc-steps">
            <li v-for="s in b.steps" :key="s">{{ s }}</li>
          </ul>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div class="overlay" v-if="selected" @click.self="selected=null">
        <div class="detail-box">
          <button class="d-close" @click="selected=null">✕</button>
          <span class="badge" :class="badgeClass(selected.type)">{{ selected.type }}</span>
          <h2 class="d-title">{{ selected.zh }}</h2>
          <p class="d-en">{{ selected.en }}</p>
          <p class="d-desc">{{ selected.desc }}</p>
          <div v-if="selected.src" class="d-src"><code>{{ selected.src }}</code></div>
          <ul class="d-list" v-if="selected.details">
            <li v-for="d in selected.details" :key="d">{{ d }}</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mainFlow, branches } from '../data/flowData.js'

const selected = ref(null)

const legend = [
  { label: '输入 Input',   color: 'var(--accent)' },
  { label: '内存 Memory',  color: 'var(--warn)' },
  { label: '路由 Router',  color: 'var(--accent2)' },
  { label: '执行 Execute', color: 'var(--accent3)' },
  { label: '工具 Tool',    color: 'var(--accent4)' },
  { label: '输出 Output',  color: 'var(--danger)' },
]

function nodeColor(t) {
  return { input:'var(--accent)', memory:'var(--warn)', router:'var(--accent2)',
    execution:'var(--accent3)', tool:'var(--accent4)', output:'var(--danger)' }[t] || 'var(--border2)'
}
function badgeClass(t) {
  return { input:'badge-green', memory:'badge-gray', router:'badge-blue',
    execution:'badge-purple', tool:'badge-orange', output:'badge-red' }[t] || 'badge-gray'
}
</script>

<style scoped>
.legend { display:flex; flex-wrap:wrap; gap:.7rem 1.2rem; margin-bottom:1.5rem; }
.legend-item { display:flex; align-items:center; gap:.4rem; font-size:.8rem; color:var(--text2); }
.legend-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }

.flow-wrap { display:grid; grid-template-columns:1fr 360px; gap:1.5rem; align-items:start; }

.flow-col { display:flex; flex-direction:column; gap:0; }

.flow-node {
  background:var(--surface);
  border:1.5px solid var(--nc, var(--border2));
  border-radius:var(--radius-lg);
  padding:1.1rem 1.3rem;
  cursor:pointer;
  transition: box-shadow .18s, transform .18s;
  box-shadow: 0 0 0 0 var(--nc, transparent);
}
.flow-node:hover { transform:translateY(-1px); box-shadow:0 4px 18px rgba(0,0,0,.4); }

.fn-header { display:flex; align-items:center; gap:.6rem; margin-bottom:.5rem; }
.fn-num { font-family:var(--font-mono); font-size:.75rem; color:var(--text3); min-width:1.6rem; }
.fn-title { font-family:var(--font-mono); font-weight:700; font-size:.95rem; color:var(--text); }
.fn-en { font-size:.78rem; color:var(--text3); font-family:var(--font-mono); margin:.1rem 0 .4rem; }
.fn-desc { font-size:.83rem; color:var(--text2); line-height:1.55; }
.fn-src { margin-top:.5rem; font-size:.72rem; color:var(--text3); }
.fn-src code { background:var(--bg3); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); }

.flow-arrow {
  display:flex; flex-direction:column; align-items:center;
  padding:.2rem 0; gap:.1rem;
}
.flow-arrow::before {
  content:''; display:block; width:2px; height:22px;
  background: linear-gradient(to bottom, var(--border2), var(--accent));
}
.flow-arrow::after {
  content:'▼'; color:var(--accent); font-size:.7rem; line-height:1;
}
.arrow-label { font-size:.7rem; color:var(--text3); font-family:var(--font-mono); }

.branches-col { display:flex; flex-direction:column; gap:1rem; }
.panel-title { font-family:var(--font-mono); font-size:.8rem; color:var(--text3); text-transform:uppercase; letter-spacing:.06em; margin-bottom:.5rem; }
.branch-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1rem; }
.bc-head { font-family:var(--font-mono); font-weight:700; font-size:.88rem; margin-bottom:.2rem; }
.bc-sub { font-size:.78rem; color:var(--text3); margin-bottom:.6rem; }
.bc-steps { padding-left:1.1rem; }
.bc-steps li { font-size:.8rem; color:var(--text2); line-height:1.7; }

.overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.7); backdrop-filter:blur(4px);
  display:flex; align-items:center; justify-content:center; z-index:100; padding:1rem;
}
.detail-box {
  background:var(--surface2); border:1px solid var(--border2);
  border-radius:var(--radius-lg); padding:2rem; max-width:560px; width:100%;
  max-height:85vh; overflow-y:auto; position:relative;
}
.d-close {
  position:absolute; top:.8rem; right:.8rem;
  background:var(--bg3); border:1px solid var(--border); color:var(--text2);
  border-radius:6px; width:28px; height:28px; cursor:pointer; font-size:.85rem;
  display:flex; align-items:center; justify-content:center;
}
.d-close:hover { color:var(--danger); border-color:var(--danger); }
.d-title { font-family:var(--font-mono); font-size:1.2rem; font-weight:700; margin:.6rem 0 .2rem; }
.d-en { font-size:.8rem; color:var(--text3); font-family:var(--font-mono); margin-bottom:.8rem; }
.d-desc { color:var(--text2); font-size:.88rem; line-height:1.65; margin-bottom:.8rem; }
.d-src { background:var(--bg3); border-radius:6px; padding:.5rem .8rem; margin-bottom:.8rem; }
.d-src code { font-family:var(--font-mono); font-size:.75rem; color:var(--accent2); }
.d-list { padding-left:1.2rem; }
.d-list li { font-size:.83rem; color:var(--text2); line-height:1.7; }

.modal-enter-active, .modal-leave-active { transition: opacity .2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

@media (max-width:900px) {
  .flow-wrap { grid-template-columns:1fr; }
}
</style>
