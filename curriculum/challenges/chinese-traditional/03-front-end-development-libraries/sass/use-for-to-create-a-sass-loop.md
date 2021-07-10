---
id: 587d7dbe367417b2b2512bb9
title: 使用 @for 創建一個 Sass 循環
challengeType: 0
forumTopicId: 301462
dashedName: use-for-to-create-a-sass-loop
---

# --description--

可以在 Sass 中使用 `@for` 循環添加樣式，它的用法和 JavaScript 中的 `for` 循環類似。

`@for` 以兩種方式使用：“開始 through 結束” 或 “開始 to 結束”。 主要區別在於“開始 **to** 結束”*不包括*結束數字，而“開始 **through** 結束”*包括* 結束號碼。

這是一個開始 **through** 結束的示例：

```scss
@for $i from 1 through 12 {
  .col-#{$i} { width: 100%/12 * $i; }
}
```

`#{$i}` 部分是將變量（`i`）與文本組合成字符串的語法。 當 Sass 文件轉換爲 CSS 時，它看起來像這樣：

```scss
.col-1 {
  width: 8.33333%;
}

.col-2 {
  width: 16.66667%;
}

...

.col-12 {
  width: 100%;
}
```

這是創建網格佈局的有效方法。 現在，有了 12 個可用作 CSS class 的列寬選項。

# --instructions--

編寫 `@for` 指令，使 `$j` 的值爲從 1 到 **to** 6。

它應該創建 5 個名爲 `.text-1` 到 `.text-5` 的 class，其中每個 class 的 `font-size` 設置爲 15px 乘以索引。

# --hints--

應使用 `@for` 指令。

```js
assert(code.match(/@for /g));
```

`.text-1` class 的 `font-size` 應爲 15px。

```js
assert($('.text-1').css('font-size') == '15px');
```

`.text-2` class 的 `font-size` 應爲 30px。

```js
assert($('.text-2').css('font-size') == '30px');
```

`.text-3` class 的 `font-size` 應爲 45px。

```js
assert($('.text-3').css('font-size') == '45px');
```

`.text-4` class 的 `font-size` 應爲 60px。

```js
assert($('.text-4').css('font-size') == '60px');
```

`.text-5` class 的 `font-size` 應爲 75px。

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

@for $i from 1 through 5 {
  .text-#{$i} { font-size: 15px * $i; }
}

</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```

---

```html
<style type='text/scss'>

@for $i from 1 to 6 {
  .text-#{$i} { font-size: 15px * $i; }
}

</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```
