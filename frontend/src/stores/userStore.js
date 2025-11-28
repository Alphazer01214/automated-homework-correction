// stores/userStore.js
import { reactive } from 'vue';
import { login, register, logout } from '@/api/auth';
import router from '@/router';


export const userStore = reactive({
    // 这里使用 vue reactive 创建响应式对象
  // user: {user_id, username, role, created_at}
    user: JSON.parse(localStorage.getItem('user')) || null, // 存储用户信息，注意localStorage的用法
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,   // string: 错误消息

    // Actions
    async handleLogin(username, password) {
        this.loading = true;
        this.error = null;
        try {
            const data = await login(username, password);
            this.user = data.data;
            this.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(data.data));  // localStorage本地化信息（浏览器）
            // 可以在这里处理 token 存储和请求头设置

            // 登录成功后跳转到首页
            await router.push('/');
        } catch (err) {
            this.error = err.data || ' 登录失败，请检查用户名和密码。';
        } finally {
            this.loading = false;
        }
    },

    async handleRegister(username, password) {
        this.loading = true;
        this.error = null;
        try {
            await register(username, password);
            alert('注册成功，请登录！');
            await router.push('/login');
            // 注册成功后可以自动跳转到登录界面或直接登录
        } catch (err) {
            this.error = err.message + '注册失败，请稍后重试。';
        } finally {
            this.loading = false;
        }
    },

    handleLogout() {
        // 清除本地存储和状态
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        // 假设有一个用于清除 token 的 API 调用
        // logout()

        // 登出后跳转到用户页面或首页
        router.push('/');
    }
});
