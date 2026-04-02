<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">专有名词术语表</h1>
    <p class="page-sub fade-up fade-up-1">Bilingual Glossary · 中英对照 · 含源码路径与使用语境</p>

    <div class="filter-bar fade-up fade-up-2">
      <span v-for="t in glossaryTags" :key="t"
        class="tag" :class="{ active: activeTag===t }" @click="activeTag=t">{{ t }}</span>
      <input v-model="search" class="search-input" placeholder="搜索术语 / Search...">
    </div>

    <div class="g-grid fade-up fade-up-3">
      <div v-for="g in filtered" :key="g.term" class="g-card" @click="selected=g">
        <div class="g-top">
          <code class="g-term">{{ g.term }}</code>
          <span class="g-zh-label">{{ g.zh }}</span>
        </div>
        <div class="g-en">{{ g.en }}</div>
        <div class="g-cn">{{ g.cn }}</div>
        <div class="g-footer">
          <code class="g-src">{{ g.src }}</code>
          <span v-for="t in g.tags" :key="t" class="tag" style="font-size:.65rem;padding:1px 6px">{{ t }}</span>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div class="overlay" v-if="selected" @click.self="selected=null">
        <div class="detail-box">
          <button class="d-close" @click="selected=null">✕</button>
          <h2 class="d-title"><code>{{ selected.term }}</code></h2>
          <p class="d-zh">{{ selected.zh }}</p>
          <h4 class="d-sec">英文 EN</h4>
          <p class="d-text">{{ selected.en }}</p>
          <h4 class="d-sec">中文 CN</h4>
          <p class="d-text">{{ selected.cn }}</p>
          <h4 class="d-sec">源码 Source</h4>
          <div class="d-src"><code>{{ selected.src }}</code></div>
          <div class="d-tags">
            <span v-for="t in selected.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { glossaryData, glossaryTags } from '../data/glossaryData.js'
const selected = ref(null)
const activeTag = ref('all')
const search = ref('')
const filtered = computed(() =>
  glossaryData.filter(g => {
    const tagOk = activeTag.value==='all' || g.tags.includes(activeTag.value)
    const q = search.value.toLowerCase()
    const sOk = !q || g.term.toLowerCase().includes(q)||
      g.zh.includes(q)||g.en.toLowerCase().includes(q)||g.cn.includes(q)
    return tagOk && sOk
  })
)
</script>

<style scoped>
.filter-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-bottom:1.2rem}
.search-input{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  color:var(--text);padding:.4rem .85rem;font-size:.84rem;font-family:var(--font-mono);
  outline:none;min-width:200px;margin-left:auto;
}
.search-input:focus{border-color:var(--accent2)}

.g-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem}
.g-card{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);
  padding:1.1rem;cursor:pointer;transition:border-color .18s,box-shadow .18s;
  display:flex;flex-direction:column;gap:.45rem;
}
.g-card:hover{border-color:var(--border2);box-shadow:var(--shadow)}
.g-top{display:flex;align-items:baseline;gap:.6rem;flex-wrap:wrap}
.g-term{font-family:var(--font-mono);font-size:.9rem;color:var(--accent);background:var(--bg3);padding:2px 7px;border-radius:4px}
.g-zh-label{font-size:.82rem;color:var(--text);font-weight:500}
.g-en{font-size:.8rem;color:var(--accent2);line-height:1.5}
.g-cn{font-size:.8rem;color:var(--text2);line-height:1.5}
.g-footer{display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;margin-top:auto}
.g-src{font-family:var(--font-mono);font-size:.67rem;color:var(--text3);background:var(--bg3);padding:2px 5px;border-radius:4px}

.overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:1rem}
.detail-box{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--radius-lg);padding:2rem;max-width:500px;width:100%;max-height:88vh;overflow-y:auto;position:relative}
.d-close{position:absolute;top:.8rem;right:.8rem;background:var(--bg3);border:1px solid var(--border);color:var(--text2);border-radius:6px;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.d-close:hover{color:var(--danger);border-color:var(--danger)}
.d-title{font-family:var(--font-mono);font-size:1.3rem;font-weight:700;margin-bottom:.3rem}
.d-title code{color:var(--accent)}
.d-zh{font-size:.88rem;color:var(--text2);margin-bottom:.6rem}
.d-sec{font-size:.72rem;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin:.8rem 0 .3rem;font-family:var(--font-mono)}
.d-text{font-size:.86rem;color:var(--text2);line-height:1.65}
.d-src{background:var(--bg3);border-radius:6px;padding:.4rem .7rem;margin-bottom:.6rem}
.d-src code{font-family:var(--font-mono);font-size:.74rem;color:var(--accent2)}
.d-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.6rem}
.modal-enter-active,.modal-leave-active{transition:opacity .2s}
.modal-enter-from,.modal-leave-to{opacity:0}
</style>
