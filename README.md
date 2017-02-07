# Mesh Component For Weex and Vue

一个网格式布局组件，基于 Vue 实现，兼容 Weex 平台。

## 为何存在

CSS 里已经有了[网格布局]()的规范，但是学习难度很大，有一二十个属性。而且 CSS 语法的表达能力有限，描述这种复杂布局，的确有点难为它了。

不过这种网格式的布局也有应用场景。

![]()

因为和 grid 规范不一样，所以暂且将组件命名成 mesh。

## 布局效果

如果想实现如下布局效果：

![]()

用 CSS 写，是这样的：

```html
<div class="wrapper">
  <div class="cell-a">A</div>
  <div class="cell-b">B</div>
  <div class="cell-c">C</div>
</div>

<style>
/* 省略了部分样式 */
.wrapper {
}
.cell {
}
</style>
```

如果使用 `<mesh>` 组件写就是：

```html
<!-- 省略了组件样式 -->
<mesh column="3" layout="2,1|1,2|2,1">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</mesh>
```

如果能把它转换成 CSS 的话，可以写成：

```CSS
.wrapper {
  column: 3;
  layout: "2,1|1,2|2,1";
}

/* 或者 */
.wrapper {
  mesh-column: 3;
  mesh-layout: "2,1|1,2|2,1";
}
```

### 更多布局效果

还有很多更神器的布局效果。

## 使用方法

代码写成了 Vue 的插件。

```js
import mesh from 'weex-component-mesh'
Vue.use(mesh)
```

插件会在全局注册 mesh 组件，和正常 Vue 组件一样使用即可。

### 组件属性

#### width

网格的宽度，接受字符串或者数字，不需要带单位，默认是 750px。

#### column

网格列数，默认是 12。

#### gap

网格组件之间的间距，默认是 0。

#### layout

描述网格布局，必选，字符串或者二维数组。

如果是字符串，则使用 `|` 分割组件，用 `,` 分割组件的宽高。如 `"2,1|1,2|2,1"` 表示有三个格子，第一个格子的宽是 2，高是 1；第二个格子的宽是 1，高是 2；第三个格子的宽是 2，高是 1。

分割符之间可以有任意空格，`"2,1|1,2|2,1"` 和 `"2, 1 | 1, 2 | 2, 1"` 等价。

二维数组 `[[2,1],[1,2],[2,1]]` 和字符串 `"2,1|1,2|2,1"` 等价。

##### 组件顺序

组件遵循 **“最靠上且最靠左”** 的原则排列，排列顺序参考下图。

### 组件嵌套

## 注意事项

+ 要确保网格能够被填满，而且不存在重叠部分。
