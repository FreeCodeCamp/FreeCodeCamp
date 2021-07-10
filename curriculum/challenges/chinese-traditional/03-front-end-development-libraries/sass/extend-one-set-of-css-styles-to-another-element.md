---
id: 587d7fa5367417b2b2512bbd
title: 將一組 CSS 樣式擴展到另一個元素
challengeType: 0
forumTopicId: 301456
dashedName: extend-one-set-of-css-styles-to-another-element
---

# --description--

Sass 有一個名爲 `extend` 的功能，可以很容易地從一個元素中借用 CSS 規則並在另一個元素上重用它們。

例如，下面的 CSS 規則塊設置了 `.panel` class 的樣式。 它有 `background-color`，`height` 和 `border`。

```scss
.panel{
  background-color: red;
  height: 70px;
  border: 2px solid green;
}
```

現在需要另一個名爲 `.big-panel` 的面板。 它具有與 `.panel` 相同的基本屬性，但還需要 `width` 和 `font-size`。 可以從 `.panel` 複製並粘貼初始 CSS 規則，但是當添加更多類型的面板時，代碼會變得重複。 `extend` 指令是一種重用爲一個元素編寫的規則的簡單方法，可以爲另一個元素重用並添加更多規則：

```scss
.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

除了新樣式之外，`.big-panel` 將具有與 `.panel` 相同的屬性。

# --instructions--

創建一個擴展 `.info` 的 class `.info-important`，並將`background-color` 設置爲洋紅色（magenta）。

# --hints--

`info-important` class 應該將 `background-color` 設置爲 `magenta`。

```js
assert(
  code.match(
    /\.info-important\s*?{[\s\S]*background-color\s*?:\s*?magenta\s*?;[\s\S]*}/gi
  )
);
```

`info-important` class 應使用 `@extend` 繼承 `info` class 的樣式。

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
