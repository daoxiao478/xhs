export default defineNuxtRouteMiddleware(async (to, from) => {
  // 如果用户访问的是登录页面，则不需要检查
  if (to.path === '/login') {
    return
  }
  
  // 检查登录状态
  try {
    // const { isLoggedIn } = await $fetch('/api/xiaohongshu/login-status')
    
    // 如果未登录，重定向到登录页
    // if (!isLoggedIn) {
    //   return navigateTo('/login')
    // }
  } catch (error) {
    // 发生错误时，重定向到登录页
    console.error('检查登录状态失败:', error)
    // return navigateTo('/login')
  }
}) 