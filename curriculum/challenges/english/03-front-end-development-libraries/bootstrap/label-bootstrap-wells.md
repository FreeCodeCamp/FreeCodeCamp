---
id: bad87fee1348bd9aec908854
title: Label Bootstrap Wells
challengeType: 0
forumTopicId: 18223
dashedName: label-bootstrap-wells
---

# --description--

For the sake of clarity, let's label both of our wells with their ids.

Above your left-well, inside its `col-xs-6` `div` element, add a `h4` element with the text `#left-well`.

Above your right-well, inside its `col-xs-6` `div` element, add a `h4` element with the text `#right-well`.

# --hints--

You should add an `h4` element to each of your `<div class="col-xs-6">` elements.

```js
assert(
  $('.col-xs-6').children('h4') && $('.col-xs-6').children('h4').length > 1
);
```

One `h4` element should have the text `#left-well`.

```js
assert(new RegExp('#left-well', 'gi').test($('h4').text()));
```

One `h4` element should have the text `#right-well`.

```js
assert(new RegExp('#right-well', 'gi').test($('h4').text()));
```

All of your `h4` elements should have closing tags.

```js
assert(
  code.match(/<\/h4>/g) &&
    code.match(/<h4/g) &&
    code.match(/<\/h4>/g).length === code.match(/<h4/g).length
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">

      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">

      <div class="well" id="right-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
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
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
  </div>
</div>
```
