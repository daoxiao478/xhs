<template>
  <div class="container mx-auto p-4 py-6">
    <Dialog :open="showAgreement" :modal="true">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>用户协议</DialogTitle>
          <DialogDescription>
            欢迎使用小红书搜索与导出工具。在使用本工具之前，请仔细阅读并同意以下条款：
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <p class="text-sm text-gray-600 mb-2">1. 本工具仅供学习和研究使用。</p>
          <p class="text-sm text-gray-600 mb-2">2. 请遵守小红书平台的使用规则和条款。</p>
          <p class="text-sm text-gray-600 mb-2">3. 不得将本工具用于任何违法或侵犯他人权益的行为。</p>
          <p class="text-sm text-gray-600">4. 使用本工具所产生的一切后果由用户自行承担。</p>
        </div>
        <DialogFooter>
          <Button @click="handleAgree">我同意</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- 搜索区域 -->
    <div class="bg-white p-6 rounded-lg mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <Input v-model="searchQuery" type="text" placeholder="输入关键词搜索小红书帖子"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            @keyup.enter="searchPosts" />
        </div>
        <div class="flex gap-2">
          <Button class="bg-pink-600" @click="searchPosts" :disabled="isSearching">
            搜索
          </Button>
        </div>
      </div>
    </div>

    <!-- 搜索结果表格 -->
    <div v-if="posts.items.length > 0" class="bg-white p-6 rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">搜索结果</h2>
        <Button @click="handleExportPosts" :disabled="isExporting">
          {{ isExporting ? '导出中...' : '导出' }}
        </Button>
      </div>

      <PostTable :posts="posts.items" :has-more-posts="hasMorePosts" :is-loading-more="isLoadingMore"
        @load-more="loadMorePosts" />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-else-if="hasSearched" class="bg-white p-6 rounded-lg shadow-md text-center">
      <p class="text-gray-600">没有找到相关帖子，请尝试其他关键词</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostTable from '@/components/PostTable.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { exportPosts } from '@/lib/download'
import { usePostsStore } from '@/stores/posts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

definePageMeta({
  middleware: ['auth'],
  layout: 'default'
})

const postsStore = usePostsStore()

// 检查用户是否已经同意协议，只在客户端检查
const showAgreement = ref(true)

onMounted(() => {
  if (process.client) {
    showAgreement.value = !localStorage.getItem('userAgreement')
  }
})

// 使用 storeToRefs 保持响应性
const {
  searchQuery,
  posts,
  isSearching,
  isLoadingMore,
  hasSearched,
  hasMorePosts,
  searchOptions
} = storeToRefs(postsStore)

// 方法直接从 store 中使用
const { searchPosts, loadMorePosts } = postsStore

const isExporting = ref(false)

async function handleExportPosts() {
  isExporting.value = true
  await exportPosts(posts.value.items.map(post => ({
    id: post.id,
    xsec_token: post.xsec_token
  })))
  isExporting.value = false
}

const handleAgree = () => {
  if (process.client) {
    showAgreement.value = false
    localStorage.setItem('userAgreement', 'true')
  }
}
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
