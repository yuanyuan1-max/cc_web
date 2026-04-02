<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">记忆与智能建议深度解析</h1>
    <p class="page-sub fade-up fade-up-1">Memory & Intelligence Deep Dive · 记忆系统、智能推荐与安全沙箱</p>

    <h2 class="section-h fade-up">记忆类型规范 Memory Types</h2>
    <div class="m-grid fade-up fade-up-2">
      <div v-for="m in memoryTypes" :key="m.id" class="m-card" :style="{borderColor:m.color}">
        <div class="m-head">
          <span class="m-name" :style="{color:m.color}">{{ m.name }}</span>
          <span class="m-en">{{ m.en }}</span>
        </div>
        <div class="m-scope"><b>Scope:</b> {{ m.scope }}</div>
        <div class="m-sec">何时保存</div>
        <div class="m-text">{{ m.when }}</div>
        <div class="m-sec">如何使用</div>
        <div class="m-text">{{ m.how }}</div>
        <div class="m-sec">结构规范</div>
        <div class="m-text">{{ m.structure }}</div>
        <div class="m-example"><i>Example:</i> {{ m.example }}</div>
      </div>
    </div>

    <h2 class="section-h fade-up">智能建议系统 Recommendation Systems</h2>
    <div class="tech-grid fade-up fade-up-3" style="margin-bottom: 3rem;">
      <div v-for="r in recommendationSystems" :key="r.id" class="tech-card" :style="{borderTop: `3px solid ${r.color}`}">
        <div class="tech-title" :style="{color:r.color}">{{ r.title }}</div>
        <div class="tech-en">{{ r.en }}</div>
        <div class="m-sec">核心逻辑 Logic</div>
        <div class="m-text" style="margin-bottom: 0.8rem;">{{ r.logic }}</div>
        <div class="m-sec">触发条件 Triggers</div>
        <ul class="tech-list">
          <li v-for="t in r.triggers" :key="t">{{ t }}</li>
        </ul>
        <div v-if="r.limit" class="m-text" style="font-size: 0.75rem; color: var(--warn); margin-top: 0.5rem;"><b>Limit:</b> {{ r.limit }}</div>
        <div class="tech-src"><code>{{ r.src }}</code></div>
      </div>
    </div>

    <h2 class="section-h fade-up">内部实现细节 Implementation Details</h2>
    <div class="tech-grid fade-up fade-up-3">
      <div v-for="t in memoryTechnical" :key="t.title" class="tech-card">
        <div class="tech-title" :style="{color:t.color}">{{ t.title }}</div>
        <div class="tech-en">{{ t.en }}</div>
        <ul class="tech-list">
          <li v-for="p in t.points" :key="p">{{ p }}</li>
        </ul>
        <div class="tech-src"><code>{{ t.src }}</code></div>
      </div>
    </div>

    <h2 class="section-h fade-up">权限与安全沙箱 Permissions & Sandbox</h2>
    <div class="tech-grid fade-up fade-up-4">
      <div v-for="s in securityDetails" :key="s.title" class="tech-card">
        <div class="tech-title">{{ s.title }}</div>
        <div class="tech-list-wrap">
          <span v-for="item in s.items" :key="item" class="tech-tag">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { memoryTypes, memoryTechnical } from '../data/memoryDeep.js'
import { securityDetails, recommendationSystems } from '../data/techExtra.js'
</script>

<style scoped>
.m-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;margin-bottom:2.5rem}
.m-card{background:var(--surface);border:1px solid var(--border);border-left-width:4px;border-radius:var(--radius-lg);padding:1.2rem;display:flex;flex-direction:column;gap:.4rem}
.m-head{display:flex;flex-direction:column;gap:.1rem;margin-bottom:.3rem}
.m-name{font-family:var(--font-mono);font-weight:700;font-size:1rem}
.m-en{font-size:.75rem;color:var(--text3);font-family:var(--font-mono)}
.m-scope{font-size:.78rem;color:var(--text2);background:var(--bg3);padding:2px 8px;border-radius:4px;margin:.3rem 0}
.m-sec{font-size:.7rem;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;font-family:var(--font-mono);margin-top:.4rem}
.m-text{font-size:.82rem;color:var(--text2);line-height:1.55}
.m-example{font-size:.78rem;color:var(--accent2);margin-top:.6rem;padding-top:.6rem;border-top:1px solid var(--border)}
.section-h{font-family:var(--font-mono);font-size:1rem;color:var(--text2);margin: 2.5rem 0 1.2rem;text-transform:uppercase;letter-spacing:.05em}
.tech-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1rem}
.tech-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.2rem}
.tech-title{font-family:var(--font-mono);font-weight:700;font-size:.95rem}
.tech-en{font-size:.72rem;color:var(--text3);margin-bottom:.8rem;font-family:var(--font-mono)}
.tech-list{padding-left:1.1rem}li{font-size:.82rem;color:var(--text2);line-height:1.7;margin-bottom:.2rem}
.tech-src{margin-top:.8rem}
.tech-src code{font-family:var(--font-mono);font-size:.68rem;color:var(--accent2);background:var(--bg3);padding:2px 6px;border-radius:4px}
.tech-tag { display:inline-block; font-family:var(--font-mono); font-size:.72rem; color:var(--text2); background:var(--bg3); padding:2px 8px; border-radius:4px; margin:0 4px 4px 0; border:1px solid var(--border); }
.tech-list-wrap { margin-top:.8rem; }
</style>
