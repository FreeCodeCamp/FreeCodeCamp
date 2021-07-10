---
id: 587d7dbf367417b2b2512bbb
title: 使用 @while 循環創建樣式
challengeType: 0
forumTopicId: 301454
dashedName: apply-a-style-until-a-condition-is-met-with-while
---

# --description--

Sass 中的 `@while` 指令與 JavaScript 中的 `while` 類似。 只要滿足條件，它就會一直創建 CSS 代碼。

`@for` 挑戰提供了一個創建簡單網格系統的示例。 用 `@while` 也可以實現。

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} { width: 100%/12 * $x;}
  $x: $x + 1;
}
```

首先，定義變量 `$x` 並將其設置爲 1。 接下來，使用 `@while` 指令，*while* `$x` 小於 13 時創建網格系統 。 在設置 `width` 的 CSS 規則後，`$x` 增加 1 以避免無限循環。

# --instructions--

使用 `@while` 創建一系列具有不同 `font-sizes` 的 class。

從 `text-1` 到 `text-5` 應該有 5 個不同的 class。 然後將 `font-size` 設置爲 `15px` 乘以當前索引號。 注意不要寫成死循環！

# --hints--

代碼應使用 `@while` 指令。

```js
assert(code.match(/@while /g));
```

代碼應將開始索引變量設置爲 1 。

```js
assert(code.match(/\$.*:\s*?1;/gi));
```

代碼應該遞增計數器變量。

```js
assert(code.match(/\$(.*)\s*?:\s*\$\1\s*\+\s*1\s*;/gi));
```

`.text-1` class 的 `font-size` 應爲 `15px`。

```js
assert($('.text-1').css('font-size') == '15px');
```

`.text-2` class 的 `font-size` 應爲 `30px`。

```js
assert($('.text-2').css('font-size') == '30px');
```

`.text-3` class 的 `font-size` 應爲 `45px`。

```js
assert($('.text-3').css('font-size') == '45px');
```

`.text-4` class 的 `font-size` 應爲 `60px`。

```js
assert($('.text-4').css('font-size') == '60px');
```

`.text-5` class 的 `font-size` 應爲 `75px`。

```js
assert($('.text-5').css('font-size') == '75px');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```

# --solutions--

```html
<style type='text/scss'>
  $x: 1;
  @while $x < 6 {
    .text-#{$x}{
      font-size: 15px * $x;
    }
    $x: $x + 1;
  }
</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```
