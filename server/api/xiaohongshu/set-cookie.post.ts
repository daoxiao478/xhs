import { createStorage } from 'unstorage'
import { defineEventHandler, readBody, setCookie } from 'h3'
import { v4 as uuidv4 } from 'uuid'

const storage = createStorage()

export default defineEventHandler(async (event) => {
  try {
    const { cookie } = await readBody(event)
    
    if (!cookie) {
      throw new Error('Cookie 不能为空')
    }

    // 生成新的会话ID
    const sessionId = uuidv4()
    
    // 存储会话信息
    await storage.setItem(sessionId, {
      status: 'logged_in',
      cookie,
      timestamp: Date.now()
    })
    
    // 设置会话cookie
    setCookie(event, 'xhs_session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7天
    })

    return {
      success: true,
      message: 'Cookie 设置成功'
    }
  } catch (error: any) {
    console.error('设置 Cookie 失败:', error)
    return {
      success: false,
      message: '设置 Cookie 失败',
      error: error.message
    }
  }
}) 