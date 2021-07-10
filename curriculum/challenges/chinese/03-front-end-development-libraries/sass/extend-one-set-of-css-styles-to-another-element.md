---
id: 587d7fa5367417b2b2512bbd
title: 将一组 CSS 样式扩展到另一个元素
challengeType: 0
forumTopicId: 301456
dashedName: extend-one-set-of-css-styles-to-another-element
---

# --description--

Sass 有一个名为 `extend` 的功能，可以很容易地从一个元素中借用 CSS 规则并在另一个元素上重用它们。

例如，下面的 CSS 规则块设置了 `.panel` class 的样式。 它有 `background-color`，`height` 和 `border`。

```scss
.panel{
  background-color: red;
  height: 70px;
  border: 2px solid green;
}
```

现在需要另一个名为 `.big-panel` 的面板。 它具有与 `.panel` 相同的基本属性，但还需要 `width` 和 `font-size`。 可以从 `.panel` 复制并粘贴初始 CSS 规则，但是当添加更多类型的面板时，代码会变得重复。 `extend` 指令是一种重用为一个元素编写的规则的简单方法，可以为另一个元素重用并添加更多规则：

```scss
.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

除了新样式之外，`.big-panel` 将具有与 `.panel` 相同的属性。

# --instructions--

创建一个扩展 `.info` 的 class `.info-important`，并将`background-color` 设置为洋红色（magenta）。

# --hints--

`info-important` class 应该将 `background-color` 设置为 `magenta`。

```js
assert(
  code.match(
    /\.info-important\s*?{[\s\S]*background-color\s*?:\s*?magenta\s*?;[\s\S]*}/gi
  )
);
```

`info-important` class 应使用 `@extend` 继承 `info` class 的样式。

```js
assert(
  code.match(/\.info-important\s*?{[\s\S]*@extend\s*?.info\s*?;[\s\S]*/gi)
);
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>
  h3{
    text-align: center;
  }
  .info{
    width: 200px;
    border: 1px solid black;
    margin: 0 auto;
  }




</style>
<h3>Posts</h3>
<div class="info-important">
  <p>This is an important post. It should extend the class ".info" and have its own CSS styles.</p>
</div>

<div class="info">
  <p>This is a simple post. It has basic styling and can be extended for other uses.</p>
</div>
```

# --solutions--

```html
<style type='text/scss'>
  h3{
    text-align: center;
  }
  .info{
    width: 200px;
    border: 1px solid black;
    margin: 0 auto;
  }
  .info-important{
    @extend .info;
    background-color: magenta;
  }



</style>
<h3>Posts</h3>
<div class="info-important">
  <p>This is an important post. It should extend the class ".info" and have its own CSS styles.</p>
</div>

<div class="info">
  <p>This is a simple post. It has basic styling and can be extended for other uses.</p>
</div>
```
