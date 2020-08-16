module.exports = {
  title: 'Mirai 白',
  description: '欲渡黄河冰塞川 将登太行雪满山',
  themeConfig: {
    nav: [{
        text: '前端面试之道',
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
                text: 'Uniapp',
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
        }, {
          text: 'Mini Vue',
          link: '/vue/mini-vue/'
        }]
      },
      {
        text: '社交主页',
        items: [{
            text: '掘金',
            link: 'https://juejin.im/user/4089838987133496/posts'
          },
          {
            text: 'Github',
            link: 'https://github.com/Lucifer021'
          }
        ]
      }
    ],
    sidebar: 'auto',
    displayAllHeaders: true,
    collapsable: true,
    lastUpdated: '最后更新时间',
  }
}