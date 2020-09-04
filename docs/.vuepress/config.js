module.exports = {
  base: '/blog/',
  // base: '/gitee-blog/blog/',
  title: 'Mirai 白',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/image/favicon.ico'
      }
    ]
  ],
  description: '欲渡黄河冰塞川 将登太行雪满山',
  themeConfig: {
    nav: [{
        text: '顶级突破手',
        link: '/interview/'
      },
      {
        text: '枪械库',
        items: [{
            text: '前端三剑客',
            items: [{
                text: 'HTML',
                link: '/frontend/html/'
              },
              {
                text: 'CSS',
                link: '/frontend/css/'
              },
              {
                text: 'Javascript',
                link: '/frontend/javascript/'
              }
            ]
          },
          {
            text: '小程序',
            items: [{
                text: '微信小程序',
                link: '/mini-program/wx/'
              },
              {
                text: 'uni-app',
                link: '/mini-program/uniapp/'
              }
            ]
          },
          {
            text: '后端',
            items: [{
              text: 'Nodejs',
              link: '/backend/nodejs/'
            }]
          }
        ]
      },
      {
        text: 'Vue',
        items: [{
            text: 'Vue 源码分析',
            link: '/vue/source-code/'
          },
          {
            text: 'mini-vue',
            link: '/vue/mini-vue/'
          }
        ]
      },
      {
        text: '犯罪记录',
        items: [{
            text: '掘金',
            link: 'https://juejin.im/user/4089838987133496/posts'
          },
          {
            text: 'Github',
            link: 'https://github.com/mirai027'
          }
        ]
      }
    ],
    sidebar: {
      '/interview/': [{
          title: 'Vue',
          collapsable: false,
          sidebarDepth: 2,
          children: ['/interview/vue/父子组件prop值的双向绑定']
        },
        {
          title: 'nodejs',
          collapsable: false,
          sidebarDepth: 2,
          children: ['/interview/nodejs/node包管理器']
        }
      ],
      '/frontend/css/': [{
        title: 'CSS',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/frontend/css/adaptive']
      }],
      '/frontend/javascript/': [{
        title: 'Javascript',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/frontend/javascript/Object.defineProperty',
          '/frontend/javascript/prototype',
          '/frontend/javascript/closure',
          '/frontend/javascript/class'
        ]
      }],
      '/vue/mini-vue/': [{
        title: '迷你 Vue',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/vue/mini-vue/']
      }]
    },
    smoothScroll: true,
    lastUpdated: '最后更新时间',
    logo: '/image/sidebar.png',
    plugins: [
      [
        'vuepress-plugin-mygitalk',
        {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 是否开启首页评论(default: true)
          home: true,
          // Gitalk配置
          gitalk: {
            // GitHub Application Client ID.
            clientID: '476c2c42f96e2582fde6',
            // GitHub Application Client Secret.
            clientSecret: '35a043dc2a0d561501ae0853fc75fab8e75bfc0f',
            // GitHub repository. 存储评论的 repo
            repo: 'mirai027.github.io',
            // GitHub repository 所有者，可以是个人或者组织。
            owner: 'mirai027',
            // 设置语言(default: zh-CN)
            language: 'zh-CN'
          }
        }
      ]
    ]
  }
}