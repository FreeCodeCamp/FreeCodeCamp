---
id: 587d7dbd367417b2b2512bb6
title: 用 Mixins 创建可重用 CSS
challengeType: 0
forumTopicId: 301455
dashedName: create-reusable-css-with-mixins
---

# --description--

在 Sass 中，<dfn>mixin</dfn> 是一组 CSS 声明，可以在整个样式表中重复使用。

CSS 的新功能需要一段时间适配后，所有浏览器后才能完全使用。 随着浏览器的不断升级，使用这些 CSS 规则时可能需要添加浏览器前缀。 考虑 `box-shadow`：

```scss
div {
  -webkit-box-shadow: 0px 0px 4px #fff;
  -moz-box-shadow: 0px 0px 4px #fff;
  -ms-box-shadow: 0px 0px 4px #fff;
  box-shadow: 0px 0px 4px #fff;
}
```

对于所有具有 `box-shadow` 属性的元素重写此规则，或者更改每个值以测试不同的效果，需要花费大量的精力。 Mixins 就像 CSS 的函数。 以下是一个例子：

```scss
@mixin box-shadow($x, $y, $blur, $c){ 
  -webkit-box-shadow: $x $y $blur $c;
  -moz-box-shadow: $x $y $blur $c;
  -ms-box-shadow: $x $y $blur $c;
  box-shadow: $x $y $blur $c;
}
```

定义以 `@mixin` 开头，后跟自定义名称。 参数（`$x`，`$y`，`$blur`，以及上例中的 `$c` ）是可选的。 现在在需要 `box-shadow` 规则的地方，只需一行 mixin 调用而无需添加所有的浏览器前缀。 mixin 可以通过 `@include` 指令调用。

```scss
div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```

# --instructions--

为 `border-radius` 写一个 mixin，并给它一个 `$radius` 参数。 应该使用之前例子中的所有浏览器前缀。 然后使用 `border-radius` mixin 为 `#awesome` 元素提供 `15px` 的边框半径。

# --hints--

应声明名为 `border-radius` 的 mixin，其中包含名为 `$radius` 的参数。

```js
assert(code.match(/@mixin\s+?border-radius\s*?\(\s*?\$radius\s*?\)\s*?{/gi));
```

应该给 `$radius` 添加 `-webkit-border-radius` 浏览器前缀。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-webkit-border-radius:\$radius;/gi)
);
```

应该给 `$radius` 添加 `-moz-border-radius` 浏览器前缀。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-moz-border-radius:\$radius;/gi)
);
```

应该给 `$radius` 添加 `-ms-border-radius` 浏览器前缀。

```js
assert(__helpers.removeWhiteSpace(code).match(/-ms-border-radius:\$radius;/gi));
```

应该给 `$radius` 添加 `border-radius`。

```js
assert(
  __helpers.removeWhiteSpace(code).match(/border-radius:\$radius;/gi).length ==
    4
);
```

应使用 `@include` 关键字调用 `border-radius mixin`，并将其设置为 `15px`。

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
