<template>
  <div class="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>封面</TableHead>
          <TableHead>标题</TableHead>
          <TableHead>
            互动数据
          </TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(post, index) in posts" :key="post.id" class="hover:bg-gray-50">
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell class="cursor-pointer">
            <ImagePreview :src="post.cover" :alt="post.title" size="small" />
          </TableCell>
          <TableCell>
            <div class="font-medium">{{ post.title }}
              <Badge v-if="post.is_video" class="ml-2 bg-pink-600 text-white">视频</Badge>
            </div>
          </TableCell>
          <TableCell>
            <div class="text-left text-sm flex gap-2 cursor-pointer">
              <span>点赞: {{ post.interact_info.liked_count }}</span>
            </div>
          </TableCell>
          <TableCell class="text-left space-x-2">
            <Button size="sm" variant="outline" @click="navigateToComments(post)">
              评论
            </Button>

            <Button size="sm" @click="viewPostDetail(post)">
              详情
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  hasMorePosts: {
    type: Boolean,
    default: false
  },
  isLoadingMore: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['loadMore'])

const router = useRouter()

const viewPostDetail = (post) => {
  const url = `https://www.xiaohongshu.com/explore/${post.id}?xsec_token=${post.xsec_token}&xsec_source=pc_feed`
  debugger
  window.open(url, '_blank')
}

const navigateToComments = (post) => {
  router.push(`/comments/${post.id}?xsec_token=${post.xsec_token}`)
}
</script>