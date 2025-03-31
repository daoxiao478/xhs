<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium">作者</h3>
      <p class="text-sm text-muted-foreground">
        问题反馈，定制开发
      </p>
    </div>
    <div class="space-y-4">
      微信：uniqueatom 
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings'
})

import { useToast } from '@/components/ui/toast/use-toast'
import { useSettingsStore } from '@/stores/settings'

const { toast } = useToast()
const settingsStore = useSettingsStore()

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