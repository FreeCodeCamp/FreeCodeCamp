---
id: 587d7dbe367417b2b2512bb8
title: 使用 @if 和 @else 爲樣式添加邏輯
challengeType: 0
forumTopicId: 301463
dashedName: use-if-and-else-to-add-logic-to-your-styles
---

# --description--

Sass 中的 `@if` 指令對於測試特定情況非常有用——它的工作方式與 JavaScript 中的 `if` 語句類似。

```scss
@mixin make-bold($bool) {
  @if $bool == true {
    font-weight: bold;
  }
}
```

類似 JavaScript，可以在 Sass 中使用 `@else if` 和 `@else` 測試更多條件：

```scss
@mixin text-effect($val) {
  @if $val == danger {
    color: red;
  }
  @else if $val == alert {
    color: yellow;
  }
  @else if $val == success {
    color: green;
  }
  @else {
    color: black;
  }
}
```

# --instructions--

創建一個名爲 `border-stroke` 的 mixin，它接受一個參數 `$val`。 mixin 應使用 `@if`，`@else if` 和 `@else` 檢查以下條件：

```scss
light - 1px solid black
medium - 3px solid black
heavy - 6px solid black
```

如果 `$val` 不是 `light`、`medium` 或者 `heavy`，border 應該設置爲 `none`。

# --hints--

應該聲明一個名爲 `border-stroke` 的 mixin，它有一個名爲 `$val` 的參數。

```js
assert(code.match(/@mixin\s+?border-stroke\s*?\(\s*?\$val\s*?\)\s*?{/gi));
```

mixin 應該有一個 `@if` 語句來檢查 `$val` 是否等於 `light`，並將 `border` 設置爲 `1px solid black`。

```js
assert(
  code.match(
    /@if\s+?\$val\s*?===?\s*?light\s*?{\s*?border\s*?:\s*?1px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

mixin 應該有一個 `@else if` 語句來檢查 `$val` 是否等於 `medium`，並設置 `border` 爲 `3px solid black`。

```js
assert(
  code.match(
    /@else\s+?if\s+?\$val\s*?===?\s*?medium\s*?{\s*?border\s*?:\s*?3px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

mixin 應該有一個 `@else if` 語句來檢查 `$val` 是否等於 `heavy`，並設置 `border` 爲 `3px solid black`。

```js
assert(
  code.match(
    /@else\s+?if\s+?\$val\s*?===?\s*?heavy\s*?{\s*?border\s*?:\s*?6px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

mixin 應該有一個 `@else` 語句來將 `border` 設置爲 `none`。

```js
assert(code.match(/@else\s*?{\s*?border\s*?:\s*?none\s*?;\s*?}/gi));
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```

# --solutions--

```html
<style type='text/scss'>
  @mixin border-stroke($val) {
    @if $val == light {
      border: 1px solid black;
    }
    @else if $val == medium {
      border: 3px solid black;
    }
    @else if $val == heavy {
      border: 6px solid black;
    }
    @else {
      border: none;
    }
  }


  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```
