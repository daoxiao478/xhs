import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 这里可以自定义默认主题的插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 在这里注册组件
  }
} satisfies Theme 