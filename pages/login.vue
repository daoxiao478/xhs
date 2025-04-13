<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="space-y-4">
      <div class="bg-white/60 p-8 rounded-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-pink-600">小红书CK登录
        </h1>

        <div class="text-center mb-6">
          <p class="text-gray-600 mb-4">请输入小红书网页版获取的 cookie</p>

          <p class="text-gray-600 mb-4">
            <Textarea v-model="cookieValue" placeholder="请输入完整的cookie 值..." class="min-h-[140px] min-w-[300px]" />
          </p>
        </div>

        <div class="flex justify-end gap-2">
          <Button class="bg-pink-600 text-white" variant="outline" @click="handleCookieLogin">登录</Button>
        </div>
      </div>

      <Dialog :open="showCookieLogin">
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
              <Textarea id="cookie" v-model="cookieValue" placeholder="请输入完整的cookie 值..." class="min-h-[140px]" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" @click="handleCookieLogin">登录</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth'
})

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
</script>