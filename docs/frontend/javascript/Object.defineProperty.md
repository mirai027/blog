# Object.defineProperty

[MDN - Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

> `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

## 使用方法

``` js
Object.defineProperty(obj: 要定义属性的对象, prop: 要定义或修改的属性的名称, descriptor: 要定义或修改的属性描述符)

Object.defineProperty(obj, prop, {
	configurable: false, // 是否能 delect, 是否可以重新修改属性的描述符（特性 configurable、enumerable、writable...）
	enumerable: false, // 是否可枚举
	writable: false, // 是否可重写
	value: undefined, // 属性的值
	get() {}, // getter函数 获取值的时候触发 get
	set() {} // setter函数 设置值的时候触发 set
})

// 使用了 getter或 setter方法，不允许使用 writable和 value这两个属性
```

## 实现一个乞丐版双向绑定

在 Vue 2.x版本中，双向绑定通过Object.defineProperty()实现对属性的劫持，在getter中收集依赖，在setter中通知更新。达到监听数据变动的目的。

```html
<input type="text" id="app-input" />
<p id="app-p"></p>
```

```js
const hello = {}
Object.defineProperty(hello, 'world', {
  configurable: true,
  enumerable: true,
  get() {
    return document.querySelector('#app-p').innerHTML
  },
  set(newValue) {
    document.querySelector('#app-p').innerHTML = newValue
  }
})
/**
 * 图方便，直接箭头键盘弹起事件。
 * 弹起事件时更改 hello.world的值，就会触发 setter
 */
document.querySelector('#app-input').addEventListener('keyup', (e) => {
  hello.world = e.target.value
})
```

![乞丐版双向绑定](https://s1.ax1x.com/2020/08/20/d31l60.gif)

上诉例子中，我们不直接参与`DOM`的操作。我们通过双向数据绑定把 `hello.world` 和 `<p id="app-p"></p>` 连接了起来，他们之间的同步工作完全是由`Object.defineProperty`自动的，无需人为干涉.。因此我们只需关注`hello.world`的值，不需要手动操作DOM, 不需要关注数据状态的同步问题，由 `Object.defineProperty`来帮我们解决。

那么再参考一下下面加粗的这句话👾

> MVVM 由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。
>
> 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
>
> **ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。**

![MVVM模型](https://s1.ax1x.com/2020/08/27/d5eTpT.png)

