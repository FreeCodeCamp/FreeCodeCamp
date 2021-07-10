---
id: 587d7dbf367417b2b2512bbb
title: Apply a Style Until a Condition is Met with @while
challengeType: 0
forumTopicId: 301454
dashedName: apply-a-style-until-a-condition-is-met-with-while
---

# --description--

The `@while` directive is an option with similar functionality to the JavaScript `while` loop. It creates CSS rules until a condition is met.

The `@for` challenge gave an example to create a simple grid system. This can also work with `@while`.

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} { width: 100%/12 * $x;}
  $x: $x + 1;
}
```

First, define a variable `$x` and set it to 1. Next, use the `@while` directive to create the grid system *while* `$x` is less than 13. After setting the CSS rule for `width`, `$x` is incremented by 1 to avoid an infinite loop.

# --instructions--

Use `@while` to create a series of classes with different `font-sizes`.

There should be 5 different classes from `text-1` to `text-5`. Then set `font-size` to `15px` multiplied by the current index number. Make sure to avoid an infinite loop!

# --hints--

Your code should use the `@while` directive.

```js
assert(code.match(/@while /g));
```

Your code should use an index variable which starts at an index of 1.

```js
assert(code.match(/\$.*:\s*?1;/gi));
```

Your code should increment the counter variable.

```js
assert(code.match(/\$(.*)\s*?:\s*\$\1\s*\+\s*1\s*;/gi));
```

Your `.text-1` class should have a `font-size` of `15px`.

```js
assert($('.text-1').css('font-size') == '15px');
```

Your `.text-2` class should have a `font-size` of `30px`.

```js
assert($('.text-2').css('font-size') == '30px');
```

Your `.text-3` class should have a `font-size` of `45px`.

```js
assert($('.text-3').css('font-size') == '45px');
```

Your `.text-4` class should have a `font-size` of `60px`.

```js
assert($('.text-4').css('font-size') == '60px');
```

Your `.text-5` class should have a `font-size` of `75px`.

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
