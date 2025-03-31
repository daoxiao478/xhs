import { createStorage } from 'unstorage'
import { defineEventHandler, getCookie } from 'h3'

// 使用共享存储
const storage = createStorage()

export default defineEventHandler(async (event) => {
  try {
    // 获取会话ID
    const sessionId = getCookie(event, 'xhs_session_id')
    if (!sessionId) {
      return {
        success: false,
        isLoggedIn: false,
        message: '未找到有效的会话'
      }
    }
    
    // 获取小红书浏览器实例
    const browser = await useXiaohongshuBrowser()
    
    // 检查登录状态
    const isLoggedIn = await browser.isLogin()
    
    if (isLoggedIn) {
      // 获取小红书的cookie
      const cookie = await browser.getXiaohongshuCookie()
      
      // 更新会话状态
      await storage.setItem(sessionId, { 
        status: 'logged_in',
        cookie,
        timestamp: Date.now()
      })
      
      return {
        success: true,
        isLoggedIn: true,
        message: '已成功登录小红书'
      }
    }
    
    return {
      success: true,
      isLoggedIn: false,
      message: '未登录或等待扫码'
    }
  } catch (error: any) {
    console.error('检查登录状态失败:', error)
    return {
      success: false,
      isLoggedIn: false,
      message: '检查登录状态失败',
      error: error.message
    }
  }
}) 