<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium">代理设置</h3>
      <p class="text-sm text-muted-foreground">
        配置代理服务器地址，用于下载视频。
      </p>
    </div>
    <div class="space-y-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <Label>下载代理地址</Label>
          <Button variant="outline" size="sm" @click="addNewProxy">添加代理</Button>
        </div>
        <div class="space-y-2">
          <div v-for="(url, index) in downloadProxyUrls" :key="index" class="flex items-center space-x-2">
            <Input
              v-model="downloadProxyUrls[index]"
              type="url"
              placeholder="https://example.com"
              @change="updateProxy(index, $event.target.value)"
            />
            <Button
              variant="destructive"
              size="icon"
              @click="removeProxy(index)"
              :disabled="downloadProxyUrls.length === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </Button>
          </div>
        </div>
        <p class="text-sm text-muted-foreground">
          添加多个下载代理地址，系统会自动轮换使用
        </p>
      </div>
      
      <Button @click="saveSettings">保存更改</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings'
})

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/components/ui/toast/use-toast'

const settingsStore = useSettingsStore()
const { toast } = useToast()

const proxyUrl = ref(settingsStore.proxyUrl)
const downloadProxyUrls = ref([...settingsStore.downloadProxyUrls])

const addNewProxy = () => {
  downloadProxyUrls.value.push('')
}

const removeProxy = (index: number) => {
  if (downloadProxyUrls.value.length > 1) {
    downloadProxyUrls.value.splice(index, 1)
  }
}

const updateProxy = (index: number, value: string) => {
  downloadProxyUrls.value[index] = value
}

const saveSettings = () => {
  settingsStore.updateProxyUrl(proxyUrl.value)
  
  // 移除空的代理地址
  const validProxies = downloadProxyUrls.value.filter(url => url.trim() !== '')
  
  // 确保至少有一个代理地址
  if (validProxies.length === 0) {
    validProxies.push('https://small-gecko-75.deno.dev')
  }
  
  // 更新所有代理地址
  validProxies.forEach((url, index) => {
    if (index === 0) {
      settingsStore.updateDownloadProxyUrl(0, url)
    } else {
      settingsStore.addDownloadProxyUrl(url)
    }
  })
  
  toast({
    title: '设置已保存',
    description: '代理地址已更新'
  })
}
</script> 