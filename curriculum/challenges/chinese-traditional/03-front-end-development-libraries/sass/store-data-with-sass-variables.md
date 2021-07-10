---
id: 587d7dbd367417b2b2512bb4
title: 用 Sass 變量存儲數據
challengeType: 0
forumTopicId: 301460
dashedName: store-data-with-sass-variables
---

# --description--

Sass 不同於 CSS 的一個特點是它允許使用變量。 可以在 Sass 中聲明變量，併爲它賦值，就像在 JavaScript 中一樣。

在 JavaScript 中，變量是使用 `let` 和 `const` 關鍵字定義的。 在 Sass 中，變量以 `$` 開頭的，後跟變量名。

這裏有幾個例子：

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;
```

並使用變量：

```scss
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

當需要把多個元素設置成相同顏色時，變量就會很有用。 一旦需要更改顏色，只需要改變這個變量的值就好。

# --instructions--

創建一個變量 `$text-color` 並將其設置爲 `red`。 然後更改 `.blog-post` 和 `h2` 的 `color` 屬性的值爲 `$text-color` 變量。

# --hints--

應該把 `$text-color` 聲明一個值爲 `red` 的 Sass 變量。

```js
assert(code.match(/\$text-color\s*:\s*?red\s*;/g));
```

應使用 `$text-color` 變量來更改 `.blog-post` 和 `h2` 的 `color`。

```js
assert(code.match(/color\s*:\s*\$text-color\s*;?/g));
```

`.blog-post` 元素 `color` 應爲紅色。

```js
assert($('.blog-post').css('color') == 'rgb(255, 0, 0)');
```

`h2` 元素的 `color` 應爲紅色。

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
