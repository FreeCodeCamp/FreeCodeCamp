---
id: bad87fee1348bd9aec908746
title: 將頁面放在 container-fluid div 中
challengeType: 0
forumTopicId: 18198
dashedName: house-our-page-within-a-bootstrap-container-fluid-div
---

# --description--

現在確保頁面所有內容都可以響應移動端。

將的 `h3` 元素內嵌進一個具有 `container-fluid` class 的`div` 元素中。

# --hints--

`div` 元素 class 屬性應該爲 `container-fluid`。

```js
assert($('div').hasClass('container-fluid'));
```

確保每一個 `div` 元素都有一個閉合標籤。

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

`h3` 元素應該內嵌於 `div` 元素。

```js
assert($('div').children('h3').length > 0);
```

# --seed--

## --seed-contents--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```

# --solutions--

```html
<div class="container-fluid">
    <h3 class="text-primary text-center">jQuery Playground</h3>
</div>
```
