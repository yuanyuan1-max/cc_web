<template>
  <div class="page-wrap">
    <h1 class="page-title fade-up">工具调用协议全解析</h1>
    <p class="page-sub fade-up fade-up-1">Native Tool Protocol · 从原子操作到权限沙箱</p>

    <div class="filter-bar fade-up fade-up-2">
      <input v-model="search" class="search-input" placeholder="搜索工具 / Search tools...">
    </div>

    <div class="tool-grid fade-up fade-up-2">
      <div v-for="t in filtered" :key="t.id" class="tool-card">
        <div class="tool-header">
          <div class="tool-info">
            <h2 class="tool-name">{{ t.name }}</h2>
            <div class="tool-zh">{{ t.zh }}</div>
          </div>
          <code class="tool-path">{{ t.src }}</code>
        </div>

        <div class="tool-body">
          <div class="pd-sec">核心原理 Principle</div>
          <p class="pd-row">{{ t.principle }}</p>

          <div class="pd-sec">技术实现细节 Implementation</div>
          <ul class="detail-list">
            <li v-for="d in t.technical_details" :key="d">{{ d }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="protocol-box fade-up fade-up-3">
      <h2 class="section-h">工具执行生命周期 Tool Execution Lifecycle</h2>
      <div class="lifecycle-steps">
        <div class="step-item" v-for="(s, i) in lifecycle" :key="s.name">
          <div class="step-num">0{{ i + 1 }}</div>
          <div class="step-content">
            <div class="step-name">{{ s.name }}</div>
            <div class="step-desc">{{ s.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toolsData } from '../data/toolsData.js'

const search = ref('')
const filtered = computed(() => 
  toolsData.filter(t => 
    !search.value || 
    t.name.toLowerCase().includes(search.value.toLowerCase()) ||
    t.zh.includes(search.value) ||
    t.principle.includes(search.value)
  )
)

const lifecycle = [
  { name: 'Schema Validation', desc: '根据 Zod 定义检查模型传入的参数类型与格式。' },
  { name: 'Permission Audit', desc: '检查当前 session 模式（default/acceptEdits）与目标文件是否在 DANGEROUS_FILES 列表。' },
  { name: 'Sandbox Realpath', desc: '执行 fs.realpathSync 还原，防止通过符号链接进行路径穿越攻击。' },
  { name: 'Execution & Stream', desc: '执行原子操作并实时回传 stdout/stderr 或摘要到 UI 状态机。' },
  { name: 'Budget Tracking', desc: '计算单次调用的 Token 消耗，并更新全局 budget 余额。' },
  { name: 'Drift Protection', desc: '如果是读操作，自动触发实时 grep 验证现状，防止记忆漂移。' }
]
</script>

<style scoped>
.filter-bar { margin-bottom: 2rem; display: flex; justify-content: flex-end; }
.search-input { 
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); 
  color: var(--text); padding: .5rem 1rem; font-size: .85rem; font-family: var(--font-mono); 
  outline: none; min-width: 300px; transition: border-color .2s;
}
.search-input:focus { border-color: var(--accent2); }

.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(450px,1fr));gap:1.5rem;margin-bottom:3rem}
.tool-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.8rem;transition:all .3s}
.tool-card:hover{border-color:var(--accent2);transform:translateY(-5px)}

.tool-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;border-bottom:1px solid var(--border);padding-bottom:1rem}
.tool-name{font-family:var(--font-mono);font-size:1.25rem;font-weight:800;color:var(--accent)}
.tool-zh{font-size:.85rem;color:var(--text3);margin-top:.2rem}
.tool-path{font-family:var(--font-mono);font-size:.7rem;color:var(--text3);background:var(--bg3);padding:3px 8px;border-radius:4px}

.pd-sec{font-size:.7rem;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin:1.2rem 0 .5rem;font-family:var(--font-mono)}
.pd-row{font-size:.9rem;color:var(--text2);line-height:1.7}
.detail-list{padding-left:1.2rem;margin-top:.5rem}
.detail-list li{font-size:.86rem;color:var(--text2);line-height:1.8;margin-bottom:.4rem}

.protocol-box{background:var(--bg3);border:1px solid var(--border);border-radius:24px;padding:2rem}
.lifecycle-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem}
.step-item{display:flex;gap:1.2rem;align-items:flex-start}
.step-num{font-family:var(--font-mono);font-size:1.8rem;font-weight:800;color:var(--accent2);opacity:.4;line-height:1}
.step-name{font-weight:700;font-size:1rem;color:var(--text);margin-bottom:.4rem}
.step-desc{font-size:.84rem;color:var(--text3);line-height:1.6}

@media (max-width: 900px) {
  .tool-grid { grid-template-columns: 1fr; }
  .lifecycle-steps { grid-template-columns: 1fr; }
}
</style>
