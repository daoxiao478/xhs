<template>
  <NuxtLayout name="default">
    <div class="container mx-auto py-8">
      <div class="space-y-6 mx-8">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight">设置</h1>
          <p class="text-sm text-muted-foreground">
            管理你的账户设置和偏好。
          </p>
        </div>
        <Separator />

        <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside class="lg:w-1/5">
            <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              <NuxtLink to="/settings"
                class="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                :class="{ 'bg-muted': route.path === '/settings' }">
                账户
              </NuxtLink>

              <NuxtLink to="/author"
                class="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                :class="{ 'bg-muted': route.path === '/author' }">
                作者
              </NuxtLink>
            </nav>
          </aside>
          <div class="flex-1 lg:max-w-2xl px-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
const route = useRoute()
</script>