---
id: 60a3e3396c7b40068ad69971
title: Part 8
challengeType: 0
dashedName: part-8
---

# --description--

Time for CSS.

Even though your `<div>` has no text, it's still treated as a box with content.
Write a CSS rule that uses the `.canvas` class selector and set its `width` to 500 pixels.
Here's a CSS rule that sets the width of the class `card` to 300 pixels:

```css
.card {
  width: 300px;
}
```

# --hints--

Your code should have a `.canvas` selector.

```js
const hasCanvas = new __helpers.CSSHelp(document).getStyle('.canvas');
assert(hasCanvas)
```

You should set the `width` property to `500px`.

```js
const hasWidth = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.width === '500px')
assert(hasWidth);
```

Your `.canvas` element should have a `width` of `500px`.

```js
const width = new __helpers.CSSHelp(document).getStyle('.canvas')?.getPropertyValue('width');
assert(width === '500px');
```

# --seed--

## --seed-contents--

```css
--fcc-editable-region--

--fcc-editable-region--

```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Rothko</title>
    <link href="./styles.css" rel="stylesheet">
  </head>
  <body>
    <div class="canvas">
    </div>
  </body>
</html>
```
