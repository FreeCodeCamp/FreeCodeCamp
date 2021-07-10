---
id: bad87fee1348bd9aec908848
title: Create Bootstrap Wells
challengeType: 0
forumTopicId: 16825
dashedName: create-bootstrap-wells
---

# --description--

Bootstrap has a class called `well` that can create a visual sense of depth for your columns.

Nest one `div` element with the class `well` within each of your `col-xs-6` `div` elements.

# --hints--

You should add a `div` element with the class `well` inside each of your `div` elements with the class `col-xs-6`

```js
assert($('div.col-xs-6').not(':has(>div.well)').length < 1);
```

Both of your `div` elements with the class `col-xs-6` should be nested within your `div` element with the class `row`.

```js
assert($('div.row > div.col-xs-6').length > 1);
```

All your `div` elements should have closing tags.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">

    </div>
    <div class="col-xs-6">

    </div>
  </div>
</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well"></div>
    </div>
    <div class="col-xs-6">
      <div class="well"></div>
    </div>
  </div>
</div>
```
