---
id: 587d7dbf367417b2b2512bbc
title: 用 Partials 将样式分成小块
challengeType: 0
forumTopicId: 301459
dashedName: split-your-styles-into-smaller-chunks-with-partials
---

# --description--

Sass 中的 <dfn>Partials</dfn> 是包含 CSS 代码段的单独的文件。 这些片段可以导入其它 Sass 文件使用。 可以把类似代码放到模块中，以保持代码结构规整且易于管理。

partials 的名称以下划线（`_`）字符开头，这样 Sass 就知道它是 CSS 的一小部分，而不会将其转换为 CSS 文件。 此外，Sass 文件以 `.scss` 文件扩展名结尾。 要将 partial 中的代码放入另一个 Sass 文件中，使用 `@import` 指令。

例如，如果所有 mixins 都保存在名为 “\_mixins.scss” 的 partial 中，并且在 “main.scss” 文件中需要它们，下面是使用方法：

```scss
@import 'mixins'
```

请注意，`import` 语句中不需要下划线——Sass 知道它是 partial。 将 partial 导入文件后，可以使用所有变量、mixins 和其它代码。

# --instructions--

编写 `@import` 语句，将名为 `_variables.scss` 的 partial 导入 main.scss 文件。

# --hints--

代码应使用 `@import` 指令，并且不应在文件名中包含下划线。

```js
assert(code.match(/@import\s+?('|")variables\1/gi));
```

# --seed--

## --seed-contents--

```html
<!-- The main.scss file -->
```

# --solutions--

```html
@import 'variables'
```
