<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const route = useRoute()
</script>
<template>
  <div class="min-h-screen font-inter bg-gray-50 flex flex-col">
    <header class="bg-white/80 backdrop-blur-sm border-gray-200 sticky top-0 z-10">
      <div class="container mx-auto px-4 py-2 flex items-center justify-between">

        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="/logo.jpeg" alt="小红书 Logo" class="h-12 w-auto" />
            <span class="text-gray-600 text-sm">小红书搜索与导出工具</span>
          </NuxtLink>

          <div class="flex items-center space-x-4 text-gray-600 text-sm ">
            <NuxtLink to="/" class="text-gray-600 text-sm hover:text-red-600 transition-colors"
              :class="{ 'text-red-600': route.path === '/' }"> 首页</NuxtLink>
            <NuxtLink to="/accounts" class="text-gray-600 text-sm hover:text-red-600 transition-colors"
              :class="{ 'text-red-600': route.path === '/accounts' }"> 账号管理</NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-10">
          <div class="flex items-center space-x-4">
            <a href="https://x.com/2ah2021" target="_blank" rel="noopener noreferrer"
              class="flex items-center text-gray-600 hover:text-primary-600 transition-colors" title="Twitter">
              <img src="/twitter.jpeg" alt="Twitter" class="h-8 w-8 hover:scale-150 transition-all" />
            </a>
            <a href="https://github.com/xiaoxiunique/xhs" target="_blank" rel="noopener noreferrer"
              class="flex items-center text-gray-600 hover:text-primary-600 transition-colors" title="GitHub">
              <img src="/github.jpeg" alt="GitHub" class="h-8 w-8 hover:scale-150 transition-all" />
            </a>
          </div>

          <div class="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar class="border-2 border-gray-100">
                  <AvatarImage :src="authStore.userInfo?.images!" />
                  <AvatarFallback>
                    {{ authStore.userInfo?.nickname?.slice(0, 2) }}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{{ authStore.userInfo?.nickname }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <!-- <DropdownMenuItem @click="navigateTo('/settings')">设置</DropdownMenuItem> -->
                <DropdownMenuItem @click="authStore.logout()">退出</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white/80 border-gray-200 py-4">
      <div class="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>© {{ new Date().getFullYear() }} 小红书搜索与导出工具</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --primary-50: #fff1f2;
  --primary-500: #ef4444;
  --primary-600: #dc2626;
}

body {
  font-family: var(--font-family-sans);
}

.font-inter {
  font-family: var(--font-family-sans);
}

.text-primary-600 {
  color: var(--primary-600);
}

.bg-primary-50 {
  background-color: var(--primary-50);
}

.hover\:text-primary-600:hover {
  color: var(--primary-600);
}

.hover\:bg-primary-50:hover {
  background-color: var(--primary-50);
}

.bg-primary-500 {
  background-color: var(--primary-500);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
</style>