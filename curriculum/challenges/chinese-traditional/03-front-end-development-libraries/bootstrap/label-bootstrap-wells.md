---
id: bad87fee1348bd9aec908854
title: 給 Bootstrap Wells 設置標籤
challengeType: 0
forumTopicId: 18223
dashedName: label-bootstrap-wells
---

# --description--

爲了讓頁面邏輯更清晰，每個 wells 都標上它們的 id 吧。

在 left-well 的上一層，class 屬性爲 `col-xs-6` 的 `div` 元素裏面，增加一個文本爲 `#left-well` 的 `h4` 元素。

在 right-well 的上一層，class 屬性爲 `col-xs-6` 的 `div` 元素裏面，增加一個文本爲 `#right-well` 的 `h4` 元素。

# --hints--

應該爲每個 `<div class="col-xs-6">` 元素添加一個 `h4` 元素。

```js
assert(
  $('.col-xs-6').children('h4') && $('.col-xs-6').children('h4').length > 1
);
```

其中一個 `h4` 元素應該含有文本內容 `#left-well`。

```js
assert(new RegExp('#left-well', 'gi').test($('h4').text()));
```

其中一個 `h4` 元素應該含有文本內容 `#right-well`。

```js
assert(new RegExp('#right-well', 'gi').test($('h4').text()));
```

確保每個 `h4` 元素都有一個閉合標籤。

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
