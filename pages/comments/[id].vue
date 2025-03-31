<template>
  <div class="container mx-auto p-4 py-6">
    <!-- back button -->
    <div class="flex items-center gap-2 mb-4">
      <Button @click="router.back()">返回</Button>
    </div>
    <!-- 帖子信息 -->
    <div class="bg-white p-6 rounded-lg mb-6">
      <div class="flex items-start gap-4">
        <template v-if="!commentsStore.loading">
          <ImagePreview :src="commentsStore.computedPostInfo?.cover" />
          <div class="flex flex-col gap-4">
            <UserAvatar :src="commentsStore.computedPostInfo?.user?.avatar"
              :username="commentsStore.computedPostInfo?.user?.nickname"
              :userId="commentsStore.computedPostInfo?.user?.user_id" />

            <h1 class="text-xl font-bold mb-2">{{
              commentsStore.computedPostInfo?.title }}</h1>

            <div class="text-sm text-gray-500 space-x-4 max-w-[600px]">
              {{ commentsStore.computedPostInfo?.desc }}
            </div>

            <div class="text-sm text-gray-500 space-x-4">
              <span>发布时间：{{ commentsStore.computedPostInfo?.publish_time || '未知' }}</span>
              <span>点赞：{{ commentsStore.computedPostInfo?.interact_info?.liked_count }}</span>
              <span>收藏：{{ commentsStore.computedPostInfo?.interact_info?.collected_count }}</span>
              <span>评论：{{ commentsStore.computedPostInfo?.interact_info?.comment_count }}</span>
            </div>
          </div>
          <div class="flex-1 items-center gap-2">
            <Button class="bg-pink-600" @click="goToPostDetail">
              Go
            </Button>
          </div>
        </template>
        <template v-else>
          <div class="w-32 h-32 bg-gray-200 animate-pulse rounded"></div>
          <div class="flex-1">
            <div class="h-7 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
              <div class="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="bg-white p-6 rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <span class="text-lg font-semibold">评论列表</span>
        <Button variant="outline" @click="handleExport" :disabled="loading">导出</Button>
      </div>
      <template v-if="!commentsStore.loading && commentsStore.comments.length > 0">
        <CommentTable :comments="commentsStore.comments" :has-more="commentsStore.hasMore" :is-loading="d.l"
          @load-more="loadMoreComments" />
      </template>
      <template v-else>
        <div class="space-y-4">
          <div v-for="n in 3" :key="n" class="flex items-start gap-3">
            <div class="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 animate-pulse rounded w-24 mb-2"></div>
              <div class="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import CommentTable from '@/components/CommentTable.vue'
import { onMounted } from 'vue'
import { useCommentsStore } from '@/stores/comments'
import { useRoute, useRouter } from 'vue-router'
import { useDownloadComments } from '~/lib/download'
import { Button } from '~/components/ui/button'

definePageMeta({
  middleware: ['auth'],
  layout: 'default'
})

const router = useRouter()
const route = useRoute()
const commentsStore = useCommentsStore()
const d = useDownloadComments();
const loading = ref(false)

async function loadMoreComments() {
  await commentsStore.fetchComments(route.params.id, route.query.xsec_token)
}

onMounted(async () => {
  await commentsStore.fetchPostInfo(route.params.id, route.query.xsec_token)
  await commentsStore.fetchComments(route.params.id, route.query.xsec_token, true)
})

async function handleExport() {
  loading.value = true
  await d.dc()
  loading.value = false
}

const goToPostDetail = () => {
  window.open(`https://www.xiaohongshu.com/explore/${route.params.id}?xsec_token=${route.query.xsec_token}&xsec_source=pc_feed`, '_blank')
}
</script>