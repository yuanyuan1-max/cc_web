<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">提示词分类手册</h1>
    <p class="page-sub fade-up fade-up-1">Classified Prompt Reference · 原文 + 中文注释 + 源码路径</p>

    <div class="filter-bar fade-up fade-up-2">
      <div class="tag-row">
        <span v-for="t in allTags" :key="t"
          class="tag" :class="{ active: activeTag === t }"
          @click="activeTag = t">{{ t }}</span>
      </div>
      <input v-model="search" class="search-input" placeholder="搜索提示词 / Search prompts...">
    </div>

    <div v-for="cat in visibleCats" :key="cat.id" class="cat-section fade-up fade-up-3">
      <div class="cat-header">
        <span class="cat-icon" :style="{ color: cat.color }">{{ cat.icon }}</span>
        <div>
          <span class="cat-title">{{ cat.label }}</span>
          <span class="cat-en">{{ cat.en }}</span>
        </div>
        <span class="badge" :class="cat.badge">{{ cat.items.length }} 条</span>
      </div>
      <p class="cat-desc">{{ cat.desc }}</p>

      <div class="prompt-grid">
        <div v-for="p in filteredItems(cat)" :key="p.name"
          class="prompt-card" @click="selected = p">
          <div class="pc-top">
            <span class="pc-name">{{ p.name }}</span>
            <span class="pc-en">{{ p.en }}</span>
          </div>
          <div class="pc-quote">{{ p.zh }}</div>
          <div class="pc-cn">{{ p.cn }}</div>
          <div class="pc-footer">
            <code class="pc-src">{{ p.src }}</code>
            <span v-for="t in p.tags" :key="t" class="tag" style="font-size:.68rem;padding:1px 7px">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div class="overlay" v-if="selected" @click.self="selected=null">
        <div class="detail-box">
          <button class="d-close" @click="selected=null">✕</button>
          <h2 class="d-title">{{ selected.name }}</h2>
          <p class="d-en-title">{{ selected.en }}</p>
          <h4 class="d-section">原文 Original</h4>
          <div class="mono-box">{{ selected.zh }}</div>
          <h4 class="d-section">中文 Chinese</h4>
          <div class="d-cn">{{ selected.cn }}</div>
          <h4 class="d-section">注释 Note</h4>
          <div class="d-note">{{ selected.note }}</div>
          <div class="d-src"><code>{{ selected.src }}</code></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { promptCategories, allTags } from '../data/promptsIndex.js'

const selected = ref(null)
const activeTag = ref('all')
const search = ref('')

const visibleCats = computed(() => {
  return promptCategories.filter(cat => {
    if (activeTag.value === 'all') return true
    return cat.items.some(p => p.tags.includes(activeTag.value))
  })
})

function filteredItems(cat) {
  return cat.items.filter(p => {
    const tagOk = activeTag.value === 'all' || p.tags.includes(activeTag.value)
    const q = search.value.toLowerCase()
    const searchOk = !q || p.name.includes(q) || p.en.toLowerCase().includes(q) ||
      p.zh.toLowerCase().includes(q) || p.cn.includes(q)
    return tagOk && searchOk
  })
}
</script>

<style scoped>
.filter-bar { display:flex; flex-wrap:wrap; gap:.8rem; align-items:center; margin-bottom:1.5rem; }
.tag-row { display:flex; flex-wrap:wrap; gap:.4rem; flex:1; }
.search-input {
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius);
  color:var(--text); padding:.45rem .9rem; font-size:.85rem; font-family:var(--font-mono);
  outline:none; min-width:220px;
}
.search-input:focus { border-color:var(--accent2); }

.cat-section { margin-bottom:2.5rem; }
.cat-header { display:flex; align-items:center; gap:.8rem; margin-bottom:.4rem; }
.cat-icon { font-size:1.4rem; }
.cat-title { font-family:var(--font-mono); font-weight:700; font-size:1rem; margin-right:.4rem; }
.cat-en { font-size:.78rem; color:var(--text3); font-family:var(--font-mono); }
.cat-desc { font-size:.83rem; color:var(--text2); margin-bottom:1rem; }

.prompt-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:1rem; }
.prompt-card {
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg);
  padding:1.1rem; cursor:pointer; transition: border-color .18s, box-shadow .18s;
  display:flex; flex-direction:column; gap:.5rem;
}
.prompt-card:hover { border-color:var(--border2); box-shadow:var(--shadow); }
.pc-top { display:flex; flex-direction:column; gap:.1rem; }
.pc-name { font-family:var(--font-mono); font-weight:700; font-size:.9rem; }
.pc-en { font-size:.72rem; color:var(--text3); font-family:var(--font-mono); }
.pc-quote {
  font-family:var(--font-mono); font-size:.78rem; color:var(--accent2);
  background:var(--bg3); border-left:2px solid var(--accent2);
  padding:.4rem .7rem; border-radius:0 6px 6px 0;
  line-height:1.5; overflow:hidden; display:-webkit-box;
  -webkit-line-clamp:2; -webkit-box-orient:vertical;
}
.pc-cn { font-size:.8rem; color:var(--text2); line-height:1.5; }
.pc-footer { display:flex; flex-wrap:wrap; gap:.4rem; align-items:center; margin-top:auto; }
.pc-src { font-family:var(--font-mono); font-size:.68rem; color:var(--text3); background:var(--bg3); padding:2px 6px; border-radius:4px; }

.overlay { position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:1rem; }
.detail-box { background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius-lg);padding:2rem;max-width:600px;width:100%;max-height:88vh;overflow-y:auto;position:relative; }
.d-close { position:absolute;top:.8rem;right:.8rem;background:var(--bg3);border:1px solid var(--border);color:var(--text2);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center; }
.d-close:hover { color:var(--danger);border-color:var(--danger); }
.d-title { font-family:var(--font-mono);font-size:1.2rem;font-weight:700;margin:.5rem 0 .1rem; }
.d-en-title { font-size:.8rem;color:var(--text3);font-family:var(--font-mono);margin-bottom:1rem; }
.d-section { font-size:.75rem;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin:.9rem 0 .4rem;font-family:var(--font-mono); }
.d-cn { font-size:.88rem;color:var(--text2);line-height:1.65;background:var(--bg3);padding:.6rem .9rem;border-radius:var(--radius); }
.d-note { font-size:.85rem;color:var(--text2);line-height:1.65; }
.d-src { margin-top:.8rem; }
.d-src code { font-family:var(--font-mono);font-size:.72rem;color:var(--accent2);background:var(--bg3);padding:3px 8px;border-radius:4px; }
.modal-enter-active,.modal-leave-active{transition:opacity .2s}
.modal-enter-from,.modal-leave-to{opacity:0}
</style>
