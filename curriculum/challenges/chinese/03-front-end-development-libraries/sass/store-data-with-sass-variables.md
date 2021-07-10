---
id: 587d7dbd367417b2b2512bb4
title: 用 Sass 变量存储数据
challengeType: 0
forumTopicId: 301460
dashedName: store-data-with-sass-variables
---

# --description--

Sass 不同于 CSS 的一个特点是它允许使用变量。 可以在 Sass 中声明变量，并为它赋值，就像在 JavaScript 中一样。

在 JavaScript 中，变量是使用 `let` 和 `const` 关键字定义的。 在 Sass 中，变量以 `$` 开头的，后跟变量名。

这里有几个例子：

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;
```

并使用变量：

```scss
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

当需要把多个元素设置成相同颜色时，变量就会很有用。 一旦需要更改颜色，只需要改变这个变量的值就好。

# --instructions--

创建一个变量 `$text-color` 并将其设置为 `red`。 然后更改 `.blog-post` 和 `h2` 的 `color` 属性的值为 `$text-color` 变量。

# --hints--

应该把 `$text-color` 声明一个值为 `red` 的 Sass 变量。

```js
assert(code.match(/\$text-color\s*:\s*?red\s*;/g));
```

应使用 `$text-color` 变量来更改 `.blog-post` 和 `h2` 的 `color`。

```js
assert(code.match(/color\s*:\s*\$text-color\s*;?/g));
```

`.blog-post` 元素 `color` 应为红色。

```js
assert($('.blog-post').css('color') == 'rgb(255, 0, 0)');
```

`h2` 元素的 `color` 应为红色。

```js
assert($('h2').css('color') == 'rgb(255, 0, 0)');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>


  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: red;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```

# --solutions--

```html
<style type='text/scss'>
  $text-color: red;

  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: $text-color;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```
