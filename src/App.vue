<template>
  <div id="app-shell">
    <nav class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <span class="logo-icon">⬡</span>
        <span class="logo-text">Claude Code<br><small>Agent 手册</small></span>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">{{ sidebarCollapsed ? '›' : '‹' }}</button>
      </div>
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.to">
          <router-link :to="item.to" class="nav-link" active-class="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
      <div class="sidebar-footer">
        <span class="version-tag">claude-code · 源码解析版</span>
      </div>
    </nav>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const sidebarCollapsed = ref(false)
const navItems = [
  { to: '/',          icon: '⌂', label: '首页 Home' },
  { to: '/flow',      icon: '◈', label: '流程图 Flow' },
  { to: '/agent-graph',icon: '🕸', label: '协作图 Graph' },
  { to: '/memory-deep',icon: '🧠', label: '记忆深度 Memory' },
  { to: '/prompts',   icon: '✦', label: '提示词 Prompts' },
  { to: '/tools',     icon: '⚙', label: '工具集 Tools' },
  { to: '/commands',  icon: '❯', label: '命令参考 Cmds' },
  { to: '/engineering', icon: '🏗', label: '工程化 Engineering' },
  { to: '/ant-gate',  icon: '⎇', label: 'ANT 门控 Ant Gate' },
  { to: '/glossary',  icon: '⌘', label: '术语表 Glossary' },
]
</script>

<style>
/* Global Transition */
.fade-page-enter-active, .fade-page-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-page-enter-from { opacity: 0; transform: translateY(10px); }
.fade-page-leave-to { opacity: 0; transform: translateY(-10px); }

#app-shell {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
}

.sidebar {
  width: 220px;
  min-width: 220px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 50;
}
.sidebar.collapsed { width: 68px; min-width: 68px; }
.sidebar.collapsed .logo-text,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .sidebar-footer { opacity: 0; pointer-events: none; }

.sidebar-header {
  display: flex;
  align-items: center;
  gap: .8rem;
  padding: 1.5rem 1.2rem;
  border-bottom: 1px solid var(--border);
  position: relative;
}
.logo-icon {
  font-size: 1.8rem;
  color: var(--accent);
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(34,197,94,0.3));
}
.logo-text {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.2;
  white-space: nowrap;
  transition: opacity .2s;
}
.logo-text small { color: var(--text3); font-weight: 400; font-size: 0.7rem; }

.collapse-btn {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text2);
  border-radius: 50%;
  width: 24px; height: 24px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow);
  z-index: 60;
  transition: all .2s;
}
.collapse-btn:hover { border-color: var(--accent); color: var(--accent); }

.nav-list { list-style: none; padding: 1rem 0; flex: 1; overflow-y: auto; }
.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  color: var(--text2);
  font-size: 0.9rem;
  transition: all .2s;
  white-space: nowrap;
  border-left: 3px solid transparent;
  text-decoration: none;
}
.nav-link:hover { background: var(--bg3); color: var(--text); }
.nav-link.active {
  background: linear-gradient(to right, rgba(34,197,94,0.1), transparent);
  color: var(--accent);
  border-left-color: var(--accent);
  font-weight: 600;
}
.nav-icon { font-size: 1.1rem; flex-shrink: 0; width: 24px; text-align: center; }
.nav-label { transition: opacity .2s; }

.sidebar-footer {
  padding: 1rem 1.2rem;
  border-top: 1px solid var(--border);
  transition: opacity .2s;
}
.version-tag { font-size: .65rem; color: var(--text3); font-family: var(--font-mono); letter-spacing: 0.05em; }

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 1000px) {
  .sidebar { width: 68px; min-width: 68px; }
  .logo-text, .nav-label, .sidebar-footer { display: none; }
  .main-content { padding: 1.5rem; }
}
</style>
