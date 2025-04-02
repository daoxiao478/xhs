<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  size: 'medium'
})

const showPreview = ref(false)

const togglePreview = () => {
  showPreview.value = !showPreview.value
}
</script>

<template>
  <div class="inline-block cursor-pointer shadow-md">
    <img
      :src="src"
      :alt="alt"
      class="object-cover transition-transform duration-200 hover:scale-105"
      :class="{
        'w-16': size === 'small',
        'w-32': size === 'medium',
        'w-64': size === 'large'
      }"
      @click="togglePreview"
    />
    
    <!-- 预览遮罩层 -->
    <div 
      v-if="showPreview" 
      class="fixed inset-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[1000]" 
      @click="togglePreview"
    >
      <div class="max-w-[90vw] max-h-[90vh]">
        <img :src="src" :alt="alt" class="max-w-full max-h-[90vh] object-contain" />
      </div>
    </div>
  </div>
</template>
 