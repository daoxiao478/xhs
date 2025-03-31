import { defineStore } from 'pinia'
import { ref } from 'vue'

const getStorageValue = (key: string, defaultValue: string): string => {
  if (process.server) {
    return defaultValue
  }
  return localStorage.getItem(key) || defaultValue
}

const getStorageArray = (key: string, defaultValue: string[]): string[] => {
  if (process.server) {
    return defaultValue
  }
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : defaultValue
}

const setStorageValue = (key: string, value: string): void => {
  if (process.server) {
    return
  }
  localStorage.setItem(key, value)
}

const setStorageArray = (key: string, value: string[]): void => {
  if (process.server) {
    return
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export const useSettingsStore = defineStore('settings', () => {
  const proxyUrl = ref(getStorageValue('proxyUrl', 'http://localhost:3000'))
  const downloadProxyUrls = ref(getStorageArray('downloadProxyUrls', ['https://small-gecko-75.deno.dev']))
  const currentProxyIndex = ref(0)

  const updateProxyUrl = (url: string) => {
    proxyUrl.value = url
    setStorageValue('proxyUrl', url)
  }

  const addDownloadProxyUrl = (url: string) => {
    if (!downloadProxyUrls.value.includes(url)) {
      downloadProxyUrls.value.push(url)
      setStorageArray('downloadProxyUrls', downloadProxyUrls.value)
    }
  }

  const removeDownloadProxyUrl = (index: number) => {
    downloadProxyUrls.value.splice(index, 1)
    if (downloadProxyUrls.value.length === 0) {
      downloadProxyUrls.value.push('https://small-gecko-75.deno.dev')
    }
    if (currentProxyIndex.value >= downloadProxyUrls.value.length) {
      currentProxyIndex.value = 0
    }
    setStorageArray('downloadProxyUrls', downloadProxyUrls.value)
  }

  const updateDownloadProxyUrl = (index: number, url: string) => {
    if (index >= 0 && index < downloadProxyUrls.value.length) {
      downloadProxyUrls.value[index] = url
      setStorageArray('downloadProxyUrls', downloadProxyUrls.value)
    }
  }

  // 获取当前代理地址，并自动轮换到下一个
  const getCurrentAndRotateProxy = () => {
    const current = downloadProxyUrls.value[currentProxyIndex.value]
    currentProxyIndex.value = (currentProxyIndex.value + 1) % downloadProxyUrls.value.length
    return current
  }

  return {
    proxyUrl,
    downloadProxyUrls,
    updateProxyUrl,
    addDownloadProxyUrl,
    removeDownloadProxyUrl,
    updateDownloadProxyUrl,
    getCurrentAndRotateProxy
  }
}) 