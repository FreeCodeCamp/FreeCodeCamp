---
id: 587d7dbd367417b2b2512bb4
title: Store Data with Sass Variables
challengeType: 0
forumTopicId: 301460
dashedName: store-data-with-sass-variables
---

# --description--

One feature of Sass that's different than CSS is it uses variables. They are declared and set to store data, similar to JavaScript.

In JavaScript, variables are defined using the `let` and `const` keywords. In Sass, variables start with a `$` followed by the variable name.

Here are a couple examples:

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;
```

And to use the variables:

```scss
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

One example where variables are useful is when a number of elements need to be the same color. If that color is changed, the only place to edit the code is the variable value.

# --instructions--

Create a variable `$text-color` and set it to `red`. Then change the value of the `color` property for the `.blog-post` and `h2` to the `$text-color` variable.

# --hints--

Your code should have a Sass variable declared for `$text-color` with a value of `red`.

```js
assert(code.match(/\$text-color\s*:\s*?red\s*;/g));
```

Your code should use the `$text-color` variable to change the `color` for the `.blog-post` and `h2` items.

```js
assert(code.match(/color\s*:\s*\$text-color\s*;?/g));
```

Your `.blog-post` element should have a `color` of red.

```js
assert($('.blog-post').css('color') == 'rgb(255, 0, 0)');
```

Your `h2` elements should have a `color` of red.

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
