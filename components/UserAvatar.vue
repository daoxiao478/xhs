<script setup lang="ts">

interface Props {
  src: string
  username?: string
  showUsername?: boolean
  userId?: string
  xsecToken?: string
}

const props = withDefaults(defineProps<Props>(), {
  showUsername: true
})

const toUserDetail = () => {
  const url = `/users/${props.userId}?xsec_token=${props.xsecToken}`
  // router.push(url)
}

</script>

<template>
  <NuxtLink :to="`/users/${userId}?xsec_token=${xsecToken}`" class="inline-flex items-center gap-2 cursor-pointer">
    <div 
      class="overflow-hidden rounded-full flex-shrink-0"
    >
      <img 
        :src="src" 
        class="w-8 h-8 object-cover"
      />
    </div>
    <span v-if="showUsername && username" class="text-sm text-foreground">
      {{ username }}
    </span>
  </NuxtLink>
</template>
 