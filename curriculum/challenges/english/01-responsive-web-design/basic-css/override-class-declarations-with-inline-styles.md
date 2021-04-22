---
id: bad87fee1348bd9aedf06756
title: Override Class Declarations with Inline Styles
challengeType: 0
videoUrl: 'https://scrimba.com/c/cGJDRha'
forumTopicId: 18252
dashedName: override-class-declarations-with-inline-styles
---

# --description--

So we've proven that id declarations override class declarations, regardless of where they are declared in your `style` element CSS.

There are other ways that you can override CSS. Do you remember inline styles?

# --instructions--

Use an inline style to try to make our `h1` element white. Remember, inline styles look like this:

```html
<h1 style="color: green;">
```

Leave the `blue-text` and `pink-text` classes on your `h1` element.

# --hints--

Your `h1` element should have the class `pink-text`.

```js
assert($('h1').hasClass('pink-text'));
```

Your `h1` element should have the class `blue-text`.

```js
assert($('h1').hasClass('blue-text'));
```

Your `h1` element should have the id of `orange-text`.

```js
assert($('h1').attr('id') === 'orange-text');
```

Your `h1` element should have an inline style.

```js
assert(document.querySelector('h1[style]'));
```

Your `h1` element should be white.

```js
assert($('h1').css('color') === 'rgb(255, 255, 255)');
```

# --seed--

## --seed-contents--

```html
<style>
  body {
    background-color: black;
    font-family: monospace;
    color: green;
  }
  #orange-text {
    color: orange;
  }
  .pink-text {
    color: pink;
  }
  .blue-text {
    color: blue;
  }
</style>
<h1 id="orange-text" class="pink-text blue-text">Hello World!</h1>
```

# --solutions--

```html
<style>
  body {
    background-color: black;
    font-family: monospace;
    color: green;
  }
  #orange-text {
    color: orange;
  }
  .pink-text {
    color: pink;
  }
  .blue-text {
    color: blue;
  }
</style>
<h1 id="orange-text" class="pink-text blue-text" style="color: white">Hello World!</h1>
```
