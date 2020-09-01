# 父子组件prop值的双向绑定

> 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

且父子组件的双向绑定作为一个高频出现的面试题，我想这大可可以花点时间来研究一下👾。



## 前言

众所周知，vue组件间的传值都是`单向数据流`。按官网的 [单向数据流](https://cn.vuejs.org/v2/guide/components-props.html#单向数据流) 解释：

> 所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

最常见的就是在公共组件中（如计数器、单选按钮）中，子组件（计数器）把父组件传来的数字展示出来。在点击子组件的添加按钮时，因为单向数据流的原因，不能直接在子组件中给数字+1。而需要通过`$emit`让父组件更新数字，再传回子组件中更新数字的值。



## prop + $emit

最常规的做法。子组件触发自定义事件`this.$emit('change-count')`，父组件监听自定义事件`@change-count="count = $event"`。修改了值后把值`:count="count"`传回给子组件更新。

```html
<div id="app">
  <button-counter
    :count="count"
    @change-count="count = $event"
  ></button-counter>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('button-counter', {
    props: ['count'],
    template: `
      <button @click="handleButton">
      	You clicked me {{ count }} times.
  		</button>
		`,
    methods: {
      handleButton() {
        this.$emit('change-count', this.count + 1)
      }
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        count: 100
      }
    }
  })
</script>
```

如果你觉得这样绑定过于麻烦，那么...👇



## 组件 - v-model

> 指路官方：[自定义组件的-v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)
>
> 众所周知，自定义组件的`v-model`其实就是**父子组件通信的语法糖**而已，它等价于`:value="value（固定格式）" @input="emitEvent（走组件emit带的第一个参数）"`

也就是说，此时。子组件中`emit`的自定义事件名需要为`input`。父子组件中传的值键名需要是`value`。

```html
<div id="app">
  <button-counter v-model="value"></button-counter>
  <!-- 等价于 -->
  <!-- <button-counter :value="value" @input="value = $event"></button-counter> -->
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('button-counter', {
    props: ['value'],
    template: `
      <button @click="handleButton">
        You clicked me {{ value }} times.
       </button>
    `,
    methods: {
      handleButton() {
        this.$emit('input', this.value + 1)
      }
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        value: 100
      }
    }
  })
</script>
```

这该死的命名限制，我就是要改名...👇



## 组件 - v-model + model

> 指路官方：[model](https://cn.vuejs.org/v2/api/#model)
>
> 允许一个自定义组件在使用 `v-model` 时定制 prop 和 event。默认情况下，一个组件上的 `v-model` 会把 `value` 用作 prop 且把 `input` 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 `value` prop 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。

```html
<div id="app">
  <button-counter v-model="count"></button-counter>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('button-counter', {
    model: {
      prop: 'count',
      event: 'change-count'
    },
    props: ['count'],
    template: `
    	<button @click="handleButton">
    		You clicked me {{ count }} times.
			</button>
    `,
    methods: {
      handleButton() {
        this.$emit('change-count', this.count + 1)
      }
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        count: 100
      }
    }
  })
</script>
```

如果，你觉得上面这些都是些*奇技淫巧*，那大可可以试试👇的方法

## .sync 修饰符
> 官方指路：[.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)
>
> 同样是语法糖，具体用法直接戳进官网查看。

```html
<div id="app">
  <button-counter v-bind:count.sync="count"></button-counter>
  <!-- 等价于 -->
  <!-- <button-counter
    v-bind:title="count"
    v-on:update:count="count = $event"
  ></button-counter> -->
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('button-counter', {
    props: ['count'],
    template: `
    	<button @click="handleButton">
    		You clicked me {{ count }} times.
      </button>
    `,
    methods: {
      handleButton() {
        this.$emit('update:count', this.count + 1)
      }
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        count: 100
      }
    }
  })
</script>
```

当然了，也许你要传多个`prop`进去，那也可以...👇



## 多个 prop的双向绑定

> 官方指路：[.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)
>
> 这样会把 `countGroup` 对象中的每一个 property (如 `count`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

```html
<div id="app">
  <button-counter v-bind.sync="countGroup"></button-counter>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('button-counter', {
    props: ['count', 'count2'],
    template: `
      <div>
        <button @click="handleButton">
        	You clicked me {{ count }} times.
        </button>
        <button @click="handleButton2">
        	You clicked me {{ count2 }} times.
        </button>
      </div>
    `,
    methods: {
      handleButton() {
        this.$emit('update:count', this.count + 1)
      },
      handleButton2() {
        this.$emit('update:count2', this.count2 + 1)
      }
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        countGroup: {
          count: 100,
          count2: 200
        }
      }
    }
  })
</script>
```



## 最后

很显然，如果让`v-model`来双向绑定多个`prop`，那你岂不是在刁难它👾。那`.sync`存在的必要就不需要多说了吧。