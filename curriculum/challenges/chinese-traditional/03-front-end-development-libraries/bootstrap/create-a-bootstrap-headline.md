---
id: bad87fee1348bd9aec908846
title: 創建一個 Bootstrap 標題
challengeType: 0
forumTopicId: 16812
dashedName: create-a-bootstrap-headline
---

# --description--

現在，來運用 HTML、CSS 和 Bootstrap 從頭開始做點東西。

接下來將會搭建一個 jQuery playground，以便在後續的 jQuery 課程中使用它。

首先，創建一個包含 `jQuery Playground` 文本內容的 `h3` 元素。

通過給 `h3` 元素設置 Bootstrap 的 `text-primary` class 屬性來爲其上色，然後添加 Bootstrap 的 `text-center` class 屬性使其文本居中顯示。

# --hints--

爲頁面添加一個 `h3` 元素。

```js
assert($('h3') && $('h3').length > 0);
```

確保 `h3` 元素有一個閉合標籤。

```js
assert(
  code.match(/<\/h3>/g) &&
    code.match(/<h3/g) &&
    code.match(/<\/h3>/g).length === code.match(/<h3/g).length
);
```

爲了確保成功上色，`h3` 元素應該具有 `text-primary` class。

```js
assert($('h3').hasClass('text-primary'));
```

爲了確保文本居中顯示，`h3` 元素應該具有 `text-center` class。

```js
assert($('h3').hasClass('text-center'));
```

`h3` 元素文本內容爲 `jQuery Playground`。

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
