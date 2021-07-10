---
id: bad87fee1348bd9aec908854
title: 给 Bootstrap Wells 设置标签
challengeType: 0
forumTopicId: 18223
dashedName: label-bootstrap-wells
---

# --description--

为了让页面逻辑更清晰，每个 wells 都标上它们的 id 吧。

在 left-well 的上一层，class 属性为 `col-xs-6` 的 `div` 元素里面，增加一个文本为 `#left-well` 的 `h4` 元素。

在 right-well 的上一层，class 属性为 `col-xs-6` 的 `div` 元素里面，增加一个文本为 `#right-well` 的 `h4` 元素。

# --hints--

应该为每个 `<div class="col-xs-6">` 元素添加一个 `h4` 元素。

```js
assert(
  $('.col-xs-6').children('h4') && $('.col-xs-6').children('h4').length > 1
);
```

其中一个 `h4` 元素应该含有文本内容 `#left-well`。

```js
assert(new RegExp('#left-well', 'gi').test($('h4').text()));
```

其中一个 `h4` 元素应该含有文本内容 `#right-well`。

```js
assert(new RegExp('#right-well', 'gi').test($('h4').text()));
```

确保每个 `h4` 元素都有一个闭合标签。

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
