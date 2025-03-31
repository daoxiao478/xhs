import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XHS1',
  description: '小红书工具网站文档',
  lang: 'zh-CN',
  lastUpdated: true,
  
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' },
      { text: 'API', link: '/api/' },
      { text: '更新日志', link: '/changelog' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '核心功能',
          items: [
            { text: '视频下载', link: '/guide/video-download' },
            { text: '代理设置', link: '/guide/proxy-settings' },
            { text: '数据持久化', link: '/guide/data-persistence' }
          ]
        }
      ],
      '/config/': [
        {
          text: '配置',
          items: [
            { text: '基础配置', link: '/config/basic' },
            { text: '代理配置', link: '/config/proxy' },
            { text: '环境变量', link: '/config/env' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '视频接口', link: '/api/video' },
            { text: '用户接口', link: '/api/user' },
            { text: '评论接口', link: '/api/comment' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaoxiunique/xhs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
}) 