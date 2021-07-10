---
id: bad87fee1348bd9aec908853
title: 給 Bootstrap 元素添加 id 屬性
challengeType: 0
forumTopicId: 16639
dashedName: add-id-attributes-to-bootstrap-elements
---

# --description--

回憶一下，除了可以給元素添加 class 屬性，我們還可以給元素設置 `id` 屬性。

每個元素的 id 都必須是唯一的，並且在一個頁面中只能使用一次。

讓我們爲每個 class 爲 `well` 的 `div` 元素添加一個唯一的 id。

記住，可以這樣給一個元素設置 id：

```html
<div class="well" id="center-well">
```

給左邊的塊設置 id 爲 `left-well`。 給右邊的塊設置 id 爲 `right-well`。

# --hints--

左邊的 `well` 的 id 應爲 `left-well`。

```js
assert(
  $('.col-xs-6').children('#left-well') &&
    $('.col-xs-6').children('#left-well').length > 0
);
```

右邊的 `well` 的 id 應爲 `right-well`。

```js
assert(
  $('.col-xs-6').children('#right-well') &&
    $('.col-xs-6').children('#right-well').length > 0
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
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
