---
id: 60a3e3396c7b40068ad69977
title: Part 14
challengeType: 0
dashedName: part-14
---

# --description--

Use padding to adjust the spacing within an element.

In `.frame`, use the shorthand `padding: 50px;` to increase the space between the top, bottom, left, and right of the frame's border and the canvas within.

# --hints--

You should set the `padding` property to `50px`.

```js
const hasPadding = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.padding === '50px');
assert(hasPadding);
```

Your `.frame` element should have a `padding` value of `50px`.

```js
const framePadding = new __helpers.CSSHelp(document).getStyle('.frame')?.getPropertyValue('padding');
assert(framePadding === '50px');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
}

.frame {
  border: 50px solid black;
  width: 500px;
--fcc-editable-region--

--fcc-editable-region--
}
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
    <div class="frame">
      <div class="canvas">
      </div>
    </div>
  </body>
</html>
```
