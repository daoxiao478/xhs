// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss', 
    'dayjs-nuxt',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
    'shadcn-nuxt'
  ],

  // @ts-ignore
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  
  css: [
    '~/assets/css/main.css'
  ],
  
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
  },
  nitro: {
    preset: "vercel_edge"
  }
})