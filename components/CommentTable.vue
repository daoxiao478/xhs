<template>
  <div class="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>评论用户</TableHead>
          <TableHead>评论内容</TableHead>
          <TableHead>图片</TableHead>
          <TableHead>位置</TableHead>
          <TableHead>评论时间</TableHead>
          <TableHead>点赞数</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(comment, index) in comments" :key="comment.id" class="hover:bg-gray-50">
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell class="cursor-pointer">
            <UserAvatar :src="comment.user_info?.image" :username="comment.user_info?.nickname"
              :userId="comment.user_info?.user_id" :xsecToken="comment.user_info?.xsec_token" />
          </TableCell>
          <TableCell>
            <div>
              <div class="font-medium max-w-[300px]">{{ comment.content }}</div>
              <div class="text-sm text-gray-500">{{ comment.ip_location }}</div>
            </div>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <ImagePreview :src="_.get(comment, 'pictures[0].info_list[0].url')" :alt="comment.title" />
            </div>
          </TableCell>
          <TableCell>{{ comment.ip_location }}</TableCell>
          <TableCell>{{ $dayjs(comment.create_time).format('YYYY-MM-DD HH:mm:ss') }}</TableCell>
          <TableCell>{{ comment.like_count }}</TableCell>
          <TableCell>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import _ from 'lodash'

const props = defineProps({
  comments: {
    type: Array,
    required: true
  },
  hasMore: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['loadMore'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>