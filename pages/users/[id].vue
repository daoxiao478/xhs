<template>
  <div class="container mx-auto p-4 py-6">
    <!-- back button -->
    <div class="flex items-center gap-2 mb-4">
      <Button @click="router.back()">返回</Button>
    </div>

    <div class="mt-4 bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-end">
        <Button @click="handleExportPosts" :disabled="isExporting">
          {{ isExporting ? '导出中...' : '导出' }}
        </Button>
      </div>
      <div v-if="notes && notes.length > 0">
        <UserPostTable :posts="notes" />
      </div>
      <div v-else-if="loading">
        <UserPostTableSkeleton />
      </div>
      <div v-else>
        暂无数据
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import UserPostTableSkeleton from '~/components/UserPostTableSkeleton.vue'
import { exportPosts } from '~/lib/download'

const isExporting = ref(false)

const handleExportPosts = async () => {
  isExporting.value = true
  await exportPosts(notes.value.map(note => ({
    id: note.id,
    xsec_token: note.xsec_token
  })))
  isExporting.value = false
}

const route = useRoute()
const router = useRouter()

const id = route.params.id
const xsec_token = route.query.xsec_token

const { userInfo, notes, fetchNotes, loading } = toRefs(useUserStore())

onMounted(() => {
  fetchNotes.value(id as string, xsec_token as string)
})

definePageMeta({
  middleware: ['auth'],
  layout: 'default'
})

</script>