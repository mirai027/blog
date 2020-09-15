# Prerender SPA Plugin

写给自己的 `prerender-spa-plugin` 中文文档。

## 使用技巧

### 开发环境下不开启调试

```js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          ...
```

### 渲染时机

`renderAfterDocumentEvent`、`renderAfterElementExists`、`renderAfterTime`会根据指向顺序互相替换。

1. 在有异步加载数据时，使用`renderAfterTime`并设置一个比较长的延迟，是最保险的。
2. 如果只是单个页面需要预渲染，`renderAfterDocumentEvent`、`renderAfterElementExists`更正规一点。
   1. `renderAfterDocumentEvent`触发渲染的时机设置在数据获取完后即可。
   2. `renderAfterElementExists`则是使用一个`v-if`的特点`class`元素，所有数据请求完后设置为



## Advanced Usage (`webpack.config.js`)

```js
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.

        // 必需 - 要预渲染的 webpack输出应用的路径。
        staticDir: path.join(__dirname, 'dist'),

        // Optional - The path your rendered app should be output to.
        // (Defaults to staticDir.)

        // 可选 - 渲染的应用程序输出到的路径（默认与 staticDir相同）。
        outputDir: path.join(__dirname, 'dist'),

        // Optional - The location of index.html

        // 可选 - index.html的位置
        indexPath: path.join(__dirname, 'dist', 'index.html'),

        // Required - Routes to render.

        // 必需 - 需要预渲染的路由
        routes: ['/'],
        // routes: ['/', '/about', '/some/deep/nested/route'],

        // Optional - Allows you to customize the HTML and output path before
        // writing the rendered contents to a file.
        // renderedRoute can be modified and it or an equivelant should be returned.
        // renderedRoute format:
        // {
        //   route: String, // Where the output file will end up (relative to outputDir)
        //   originalRoute: String, // The route that was passed into the renderer, before redirects.
        //   html: String, // The rendered HTML for this route.
        //   outputPath: String // The path the rendered HTML will be written to.
        // }
        postProcess(renderedRoute) {
          // Ignore any redirects.
          renderedRoute.route = renderedRoute.originalRoute
          // Basic whitespace removal. (Don't use this in production.)
          renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')
          // Remove /index.html from the output path if the dir name ends with a .html file extension.
          // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
          if (renderedRoute.route.endsWith('.html')) {
            renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
          }

          return renderedRoute
        },

        // Optional - Uses html-minifier (https://github.com/kangax/html-minifier)
        // To minify the resulting HTML.
        // Option reference: https://github.com/kangax/html-minifier#options-quick-reference

        // 压缩 HTML
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true
        },

        // Server configuration options.

        // 调试工具的端口号
        server: {
          // Normally a free port is autodetected, but feel free to set this if needed.
          port: 8001
        },

        // The actual renderer to use. (Feel free to write your own)
        // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
        renderer: new Renderer({
          // Optional - The name of the property to add to the window object with the contents of `inject`.
          injectProperty: '__PRERENDER_INJECTED',
          // Optional - Any values you'd like your app to have access to via `window.injectProperty`.

          // 预渲染过程中都能拿到的值 如：window.__PRERENDER_INJECTED.foo =='bar'
          inject: {
            foo: 'bar'
          },

          // Optional - defaults to 0, no limit.
          // Routes are rendered asynchronously.
          // Use this to limit the number of routes rendered in parallel.
          maxConcurrentRoutes: 4,

          // Optional - Wait to render until the specified event is dispatched on the document.
          // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`

          // 预渲染时机 --- 监听 document.dispatchEvent 
          // renderAfterDocumentEvent: 'custom-render-trigger',

          // Optional - Wait to render until the specified element is detected using `document.querySelector`

          // 预渲染时机 --- 监听是否有当前元素，使用 document.querySelector获取
          // renderAfterElementExists: '.mirai',

          // Optional - Wait to render until a certain amount of time has passed.
          // NOT RECOMMENDED

          // 预渲染时机 --- 等待延迟时间后再渲染
          renderAfterTime: 50000, // Wait 5 seconds.

          // Other puppeteer options.
          // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)

          // 是否不开启调试工具
          headless: false // Display the browser window when rendering. Useful for debugging.
        })
      })
    ]
  }
}
```