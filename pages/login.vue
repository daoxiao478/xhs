<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="space-y-4">
      <div class="bg-white/60 p-8 rounded-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-pink-600">小红书扫码登录
        </h1>

        <div class="text-center mb-6">
          <p class="text-gray-600 mb-4">请使用小红书 App 扫描二维码登录</p>
          <div v-if="loading" class="flex justify-center items-center p-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
          <div v-else-if="authStore.qrCode" class="flex justify-center">
            <img :src="authStore.qrCode" alt="登录二维码" class="w-64 h-64" />
          </div>
          <div v-else class="flex justify-center items-center bg-gray-100 w-64 h-64 mx-auto rounded">
            <p class="text-gray-500">获取二维码失败</p>
          </div>
        </div>

        <div class="flex justify-center gap-2">
          <Button class="bg-pink-600 text-white" variant="outline" @click="authStore.checkLogin">扫码成功后点击登录</Button>
        </div>

        <div class="mt-8 text-center text-sm text-gray-500 space-y-2">
          <p>打开小红书 App，点击"我"页面右上角的扫一扫图标</p>
          <p @click="showCookieLogin = true">扫描二维码, 点击登录即可, 登录不成功，可使用 <span class="text-pink-600 cursor-pointer"
              @click="showCookieLogin = true">Cookie 登录</span></p>
        </div>
      </div>

      <Dialog :open="showCookieLogin" @update:open="showCookieLogin = $event">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cookie 登录</DialogTitle>
            <DialogDescription>
              请输入从小红书网页版获取的 cookie
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="cookie">Cookie</Label>
              <Textarea
                id="cookie"
                v-model="cookieValue"
                placeholder="请输入完整的cookie 值..."
                class="min-h-[140px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="showCookieLogin = false">取消</Button>
            <Button type="submit" @click="handleCookieLogin">登录</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

definePageMeta({
  layout: 'auth'
})

const loading = ref(true)
const authStore = useAuthStore()
const showCookieLogin = ref(false)
const cookieValue = ref('')

const handleCookieLogin = async () => {
  if (!cookieValue.value) {
    return
  }
  try {
    await authStore.loginWithCookie(cookieValue.value)
    showCookieLogin.value = false
  } catch (error) {
    console.error('Cookie 登录失败:', error)
  }
}

onMounted(() => {
  authStore.getQRCode()
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>