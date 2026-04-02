import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import FlowChart from './pages/FlowChart.vue'
import AgentGraph from './pages/AgentGraph.vue'
import MemoryDeep from './pages/MemoryDeep.vue'
import Prompts from './pages/Prompts.vue'
import Glossary from './pages/Glossary.vue'
import Tools from './pages/Tools.vue'
import Commands from './pages/Commands.vue'
import Engineering from './pages/Engineering.vue'
import AntGate from './pages/AntGate.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/flow', component: FlowChart },
  { path: '/agent-graph', component: AgentGraph },
  { path: '/memory-deep', component: MemoryDeep },
  { path: '/prompts', component: Prompts },
  { path: '/tools', component: Tools },
  { path: '/commands', component: Commands },
  { path: '/engineering', component: Engineering },
  { path: '/ant-gate', component: AntGate },
  { path: '/glossary', component: Glossary },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

createApp(App).use(router).mount('#app')
