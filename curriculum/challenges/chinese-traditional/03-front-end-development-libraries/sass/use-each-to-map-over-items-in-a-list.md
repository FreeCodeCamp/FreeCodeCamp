---
id: 587d7dbf367417b2b2512bba
title: 使用 @each 遍歷列表中的項目
challengeType: 0
forumTopicId: 301461
dashedName: use-each-to-map-over-items-in-a-list
---

# --description--

上一個挑戰顯示了 `@for` 指令如何通過起始值和結束值循環一定次數。 Sass 還提供 `@each` 指令，該指令循環遍歷列表或映射中的每個項目。 在每次迭代時，變量將從列表或映射分配給當前值。

```scss
@each $color in blue, red, green {
  .#{$color}-text {color: $color;}
}
```

map 的語法略有不同。 這是一個例子：

```scss
$colors: (color1: blue, color2: red, color3: green);

@each $key, $color in $colors {
  .#{$color}-text {color: $color;}
}
```

請注意，需要用 `$key` 變量來引用 map 中的鍵。 否則，編譯後的 CSS 將包含 `color1`，`color2`...... 以上兩個代碼示例都轉換爲以下 CSS：

```scss
.blue-text {
  color: blue;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}
```

# --instructions--

編寫一個 `@each` 指令遍歷列表：`blue, black, red` ，將每個變量分配給 class 爲`.color-bg` 的項目，使每個項目的 `color` 都不一樣。 每個 class 都應該將 `background-color` 設置爲相應的顏色。

# --hints--

代碼應使用 `@each` 指令。

```js
assert(code.match(/@each /g));
```

`.blue-bg` class 的 `background-color` 應爲藍色。

```js
assert($('.blue-bg').css('background-color') == 'rgb(0, 0, 255)');
```

`.black-bg` class 的 `background-color` 應爲黑色。

```js
assert($('.black-bg').css('background-color') == 'rgb(0, 0, 0)');
```

`.red-bg` class 的 `background-color` 應爲紅色。

```js
assert($('.red-bg').css('background-color') == 'rgb(255, 0, 0)');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

# --solutions--

```html
<style type='text/scss'>

  @each $color in blue, black, red {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

---

```html
<style type='text/scss'>

  $colors: (color1: blue, color2: black, color3: red);

  @each $key, $color in $colors {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```
