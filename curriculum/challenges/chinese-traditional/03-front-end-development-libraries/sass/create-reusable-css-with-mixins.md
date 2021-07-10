---
id: 587d7dbd367417b2b2512bb6
title: 用 Mixins 創建可重用 CSS
challengeType: 0
forumTopicId: 301455
dashedName: create-reusable-css-with-mixins
---

# --description--

在 Sass 中，<dfn>mixin</dfn> 是一組 CSS 聲明，可以在整個樣式表中重複使用。

CSS 的新功能需要一段時間適配後，所有瀏覽器後才能完全使用。 隨着瀏覽器的不斷升級，使用這些 CSS 規則時可能需要添加瀏覽器前綴。 考慮 `box-shadow`：

```scss
div {
  -webkit-box-shadow: 0px 0px 4px #fff;
  -moz-box-shadow: 0px 0px 4px #fff;
  -ms-box-shadow: 0px 0px 4px #fff;
  box-shadow: 0px 0px 4px #fff;
}
```

對於所有具有 `box-shadow` 屬性的元素重寫此規則，或者更改每個值以測試不同的效果，需要花費大量的精力。 Mixins 就像 CSS 的函數。 以下是一個例子：

```scss
@mixin box-shadow($x, $y, $blur, $c){ 
  -webkit-box-shadow: $x $y $blur $c;
  -moz-box-shadow: $x $y $blur $c;
  -ms-box-shadow: $x $y $blur $c;
  box-shadow: $x $y $blur $c;
}
```

定義以 `@mixin` 開頭，後跟自定義名稱。 參數（`$x`，`$y`，`$blur`，以及上例中的 `$c` ）是可選的。 現在在需要 `box-shadow` 規則的地方，只需一行 mixin 調用而無需添加所有的瀏覽器前綴。 mixin 可以通過 `@include` 指令調用。

```scss
div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```

# --instructions--

爲 `border-radius` 寫一個 mixin，並給它一個 `$radius` 參數。 應該使用之前例子中的所有瀏覽器前綴。 然後使用 `border-radius` mixin 爲 `#awesome` 元素提供 `15px` 的邊框半徑。

# --hints--

應聲明名爲 `border-radius` 的 mixin，其中包含名爲 `$radius` 的參數。

```js
assert(code.match(/@mixin\s+?border-radius\s*?\(\s*?\$radius\s*?\)\s*?{/gi));
```

應該給 `$radius` 添加 `-webkit-border-radius` 瀏覽器前綴。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-webkit-border-radius:\$radius;/gi)
);
```

應該給 `$radius` 添加 `-moz-border-radius` 瀏覽器前綴。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-moz-border-radius:\$radius;/gi)
);
```

應該給 `$radius` 添加 `-ms-border-radius` 瀏覽器前綴。

```js
assert(__helpers.removeWhiteSpace(code).match(/-ms-border-radius:\$radius;/gi));
```

應該給 `$radius` 添加 `border-radius`。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/border-radius:\$radius;/gi).length ==
    4
);
```

應使用 `@include` 關鍵字調用 `border-radius mixin`，並將其設置爲 `15px`。

```js
assert(code.match(/@include\s+?border-radius\(\s*?15px\s*?\)\s*;/gi));
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  #awesome {
    width: 150px;
    height: 150px;
    background-color: green;

  }
</style>

<div id="awesome"></div>
```

# --solutions--

```html
<style type='text/scss'>
  @mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    -ms-border-radius: $radius;
    border-radius: $radius;
  }

  #awesome {
    width: 150px;
    height: 150px;
    background-color: green;
    @include border-radius(15px);
  }
</style>

<div id="awesome"></div>
```
