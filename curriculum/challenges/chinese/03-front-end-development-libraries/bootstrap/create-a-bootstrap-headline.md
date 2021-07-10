---
id: bad87fee1348bd9aec908846
title: 创建一个 Bootstrap 标题
challengeType: 0
forumTopicId: 16812
dashedName: create-a-bootstrap-headline
---

# --description--

现在，来运用 HTML、CSS 和 Bootstrap 从头开始做点东西。

接下来将会搭建一个 jQuery playground，以便在后续的 jQuery 课程中使用它。

首先，创建一个包含 `jQuery Playground` 文本内容的 `h3` 元素。

通过给 `h3` 元素设置 Bootstrap 的 `text-primary` class 属性来为其上色，然后添加 Bootstrap 的 `text-center` class 属性使其文本居中显示。

# --hints--

为页面添加一个 `h3` 元素。

```js
assert($('h3') && $('h3').length > 0);
```

确保 `h3` 元素有一个闭合标签。

```js
assert(
  code.match(/<\/h3>/g) &&
    code.match(/<h3/g) &&
    code.match(/<\/h3>/g).length === code.match(/<h3/g).length
);
```

为了确保成功上色，`h3` 元素应该具有 `text-primary` class。

```js
assert($('h3').hasClass('text-primary'));
```

为了确保文本居中显示，`h3` 元素应该具有 `text-center` class。

```js
assert($('h3').hasClass('text-center'));
```

`h3` 元素文本内容为 `jQuery Playground`。

```js
assert.isTrue(/jquery(\s)+playground/gi.test($('h3').text()));
```

# --seed--

## --seed-contents--

```html

```

# --solutions--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```
