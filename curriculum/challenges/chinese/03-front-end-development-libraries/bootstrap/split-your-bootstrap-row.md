---
id: bad87fee1348bd9aec908847
title: 分割 Bootstrap Row
challengeType: 0
forumTopicId: 18306
dashedName: split-your-bootstrap-row
---

# --description--

现在已经有了一个 Bootstrap Row，把它分成两列。

在行内创建两个 class 属性为 `col-xs-6` 的 `div` 元素。

# --hints--

两个 `div class="col-xs-6"` 元素应该内嵌入 `div class="row"` 元素中。

```js
assert($('div.row > div.col-xs-6').length > 1);
```

确保所有的 `div` 元素都有闭合标签。

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


  </div>
</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6"></div>
    <div class="col-xs-6"></div>
  </div>
</div>
```
