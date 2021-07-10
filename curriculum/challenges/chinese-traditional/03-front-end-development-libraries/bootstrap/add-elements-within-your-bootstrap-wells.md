---
id: bad87fee1348bd9aec908849
title: 在 Bootstrap Wells 中添加元素
challengeType: 0
forumTopicId: 16636
dashedName: add-elements-within-your-bootstrap-wells
---

# --description--

現在的每一行的列都已經有了 `div` 元素。 這已經足夠了， 現在讓我們添加 `button` 元素吧。

每一個 class 屬性爲 `well` 的 `div` 元素內都應該放三個 `button` 元素。

# --hints--

每一個 class 屬性爲 `well` 的 `div` 元素內都應該放三個 `button` 元素。

```js
assert(
  $('div.well:eq(0)').children('button').length === 3 &&
    $('div.well:eq(1)').children('button').length === 3
);
```

總共有 6 個 `button` 元素。

```js
assert($('button') && $('button').length > 5);
```

確保所有 `button` 元素都有閉合標籤。

```js
assert(
  code.match(/<\/button>/g) &&
    code.match(/<button/g) &&
    code.match(/<\/button>/g).length === code.match(/<button/g).length
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



      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">



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
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  </div>
</div>
```
