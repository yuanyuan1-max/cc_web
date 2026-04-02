<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">斜线命令全索引</h1>
    <p class="page-sub fade-up fade-up-1">Slash Commands Reference · 掌握 Claude Code 的所有操控指令</p>

    <div class="filter-bar fade-up fade-up-2">
      <span v-for="t in commandTags" :key="t"
        class="tag" :class="{ active: activeTag===t }" @click="activeTag=t">{{ t }}</span>
      <input v-model="search" class="search-input" placeholder="搜索命令 / Search...">
    </div>

    <div class="cmd-grid fade-up fade-up-3">
      <div v-for="c in filtered" :key="c.name" class="cmd-card">
        <div class="cmd-head">
          <code class="cmd-name">{{ c.name }}</code>
          <span class="badge">{{ c.zh }}</span>
        </div>
        <div class="cmd-desc">{{ c.desc }}</div>
        <div class="cmd-usage">
          <div class="label">USAGE</div>
          <code>{{ c.usage }}</code>
        </div>
        <div class="cmd-footer">
          <code class="cmd-src">{{ c.src }}</code>
          <div class="cmd-tags">
            <span v-for="t in c.tags" :key="t" class="tag xsmall">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { commandsData, commandTags } from '../data/commandsData.js'

const activeTag = ref('all')
const search = ref('')

const filtered = computed(() =>
  commandsData.filter(c => {
    const tagOk = activeTag.value==='all' || c.tags.includes(activeTag.value)
    const q = search.value.toLowerCase()
    const sOk = !q || c.name.toLowerCase().includes(q) || c.zh.includes(q) || c.desc.includes(q)
    return tagOk && sOk
  })
)
</script>

<style scoped>
.filter-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-bottom:1.5rem}
.search-input{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);padding:.45rem .9rem;font-size:.85rem;font-family:var(--font-mono);outline:none;min-width:220px;margin-left:auto}
.search-input:focus{border-color:var(--accent2)}

.cmd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.2rem}
.cmd-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.4rem;display:flex;flex-direction:column;gap:.8rem;transition:all .2s}
.cmd-card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:var(--shadow-lg)}

.cmd-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.2rem}
.cmd-name{font-family:var(--font-mono);font-size:1.1rem;font-weight:800;color:var(--accent)}

.cmd-desc{font-size:.88rem;color:var(--text2);line-height:1.6;min-height:2.8rem}

.cmd-usage{background:var(--bg3);padding:.8rem;border-radius:8px;border-left:3px solid var(--accent2)}
.cmd-usage .label{font-size:.65rem;color:var(--text3);font-family:var(--font-mono);margin-bottom:.3rem;letter-spacing:.05em}
.cmd-usage code{font-family:var(--font-mono);font-size:.82rem;color:var(--text);display:block;word-break:break-all}

.cmd-footer{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:.8rem;border-top:1px solid var(--border)}
.cmd-src{font-family:var(--font-mono);font-size:.68rem;color:var(--text3)}
.cmd-tags{display:flex;gap:.3rem}
.tag.xsmall{font-size:.6rem;padding:1px 5px}
</style>
