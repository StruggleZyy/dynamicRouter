import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// ⚠️ 关键：使用 async 函数包裹启动逻辑
async function bootstrap() {
const app = createApp(App)
const pinia = createPinia()

// 1️⃣ 先安装 Pinia（状态管理）
app.use(pinia)

// 2️⃣ 初始化用户状态（必须在路由安装前完成）
// 动态导入避免循环依赖
const { useUserStore } = await import('./store')  
const userStore = useUserStore()
await userStore.initFromStorage()

// 3️⃣ 关键：注册动态路由（必须在用户状态初始化后、路由安装前）
// 这样刷新页面时才能正确注册路由
const { initDynamicRoutes } = await import('./router/dynamicRoutes')
await initDynamicRoutes(router)

// 4️⃣ 安装路由和 ElementPlus
app.use(router)
app.use(ElementPlus)

// 5️⃣ 设置 axios 拦截器（此时 store 和路由都已初始化）
axios.interceptors.response.use(
    response => response,
    error => {
    if (error.response?.status === 401) {
        // Token 过期或无效，自动退出登录
        const store = useUserStore()
        store.logout()
        router.push('/login')
    }
    return Promise.reject(error)
    }
)

// 6️⃣ 挂载应用到 DOM
app.mount('#app')
}

// 🚀 启动应用
bootstrap()