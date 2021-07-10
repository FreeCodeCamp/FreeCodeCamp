---
id: bad87fee1348bd9bec908846
title: 创建一个 Bootstrap Row
challengeType: 0
forumTopicId: 16813
dashedName: create-a-bootstrap-row
---

# --description--

这次为内联元素创建一个 Bootstrap 栅格系统的 Row（行）。

在 `h3` 标签下方创建一个 class 属性为 `row` 的 `div` 元素。

# --hints--

`h3` 元素下应该增加一个 `div` 元素。

```js
assert(
  $('div').length > 1 &&
    $('div.row h3.text-primary').length == 0 &&
    $('div.row + h3.text-primary').length == 0 &&
    $('h3.text-primary + div.row').length > 0
);
```

`div` 元素的 class 属性应为 `row`。

```js
assert($('div').hasClass('row'));
```

`row div` 应该内嵌于 `container-fluid div`。

```js
assert($('div.container-fluid div.row').length > 0);
```

确保所有 `div` 元素都有一个闭合标签。

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
