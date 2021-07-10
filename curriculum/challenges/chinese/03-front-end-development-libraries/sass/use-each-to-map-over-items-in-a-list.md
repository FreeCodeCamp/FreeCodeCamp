---
id: 587d7dbf367417b2b2512bba
title: 使用 @each 遍历列表中的项目
challengeType: 0
forumTopicId: 301461
dashedName: use-each-to-map-over-items-in-a-list
---

# --description--

上一个挑战显示了 `@for` 指令如何通过起始值和结束值循环一定次数。 Sass 还提供 `@each` 指令，该指令循环遍历列表或映射中的每个项目。 在每次迭代时，变量将从列表或映射分配给当前值。

```scss
@each $color in blue, red, green {
  .#{$color}-text {color: $color;}
}
```

map 的语法略有不同。 这是一个例子：

```scss
$colors: (color1: blue, color2: red, color3: green);

@each $key, $color in $colors {
  .#{$color}-text {color: $color;}
}
```

请注意，需要用 `$key` 变量来引用 map 中的键。 否则，编译后的 CSS 将包含 `color1`，`color2`...... 以上两个代码示例都转换为以下 CSS：

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

编写一个 `@each` 指令遍历列表：`blue, black, red` ，将每个变量分配给 class 为`.color-bg` 的项目，使每个项目的 `color` 都不一样。 每个 class 都应该将 `background-color` 设置为相应的颜色。

# --hints--

代码应使用 `@each` 指令。

```js
assert(code.match(/@each /g));
```

`.blue-bg` class 的 `background-color` 应为蓝色。

```js
assert($('.blue-bg').css('background-color') == 'rgb(0, 0, 255)');
```

`.black-bg` class 的 `background-color` 应为黑色。

```js
assert($('.black-bg').css('background-color') == 'rgb(0, 0, 0)');
```

`.red-bg` class 的 `background-color` 应为红色。

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
