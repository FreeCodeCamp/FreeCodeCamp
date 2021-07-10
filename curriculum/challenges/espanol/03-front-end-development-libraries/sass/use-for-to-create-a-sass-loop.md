---
id: 587d7dbe367417b2b2512bb9
title: Use @for to Create a Sass Loop
challengeType: 0
forumTopicId: 301462
dashedName: use-for-to-create-a-sass-loop
---

# --description--

The `@for` directive adds styles in a loop, very similar to a `for` loop in JavaScript.

`@for` is used in two ways: "start through end" or "start to end". The main difference is that the "start **to** end" *excludes* the end number as part of the count, and "start **through** end" *includes* the end number as part of the count.

Here's a start **through** end example:

```scss
@for $i from 1 through 12 {
  .col-#{$i} { width: 100%/12 * $i; }
}
```

The `#{$i}` part is the syntax to combine a variable (`i`) with text to make a string. When the Sass file is converted to CSS, it looks like this:

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

This is a powerful way to create a grid layout. Now you have twelve options for column widths available as CSS classes.

# --instructions--

Write a `@for` directive that takes a variable `$j` that goes from 1 **to** 6.

It should create 5 classes called `.text-1` to `.text-5` where each has a `font-size` set to 15px multiplied by the index.

# --hints--

Your code should use the `@for` directive.

```js
assert(code.match(/@for /g));
```

Your `.text-1` class should have a `font-size` of 15px.

```js
assert($('.text-1').css('font-size') == '15px');
```

Your `.text-2` class should have a `font-size` of 30px.

```js
assert($('.text-2').css('font-size') == '30px');
```

Your `.text-3` class should have a `font-size` of 45px.

```js
assert($('.text-3').css('font-size') == '45px');
```

Your `.text-4` class should have a `font-size` of 60px.

```js
assert($('.text-4').css('font-size') == '60px');
```

Your `.text-5` class should have a `font-size` of 75px.

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
