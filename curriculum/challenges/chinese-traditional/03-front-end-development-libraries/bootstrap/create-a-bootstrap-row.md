---
id: bad87fee1348bd9bec908846
title: 創建一個 Bootstrap Row
challengeType: 0
forumTopicId: 16813
dashedName: create-a-bootstrap-row
---

# --description--

這次爲內聯元素創建一個 Bootstrap 柵格系統的 Row（行）。

在 `h3` 標籤下方創建一個 class 屬性爲 `row` 的 `div` 元素。

# --hints--

`h3` 元素下應該增加一個 `div` 元素。

```js
assert(
  $('div').length > 1 &&
    $('div.row h3.text-primary').length == 0 &&
    $('div.row + h3.text-primary').length == 0 &&
    $('h3.text-primary + div.row').length > 0
);
```

`div` 元素的 class 屬性應爲 `row`。

```js
assert($('div').hasClass('row'));
```

`row div` 應該內嵌於 `container-fluid div`。

```js
assert($('div.container-fluid div.row').length > 0);
```

確保所有 `div` 元素都有一個閉合標籤。

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

</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row"></div>
</div>
```
