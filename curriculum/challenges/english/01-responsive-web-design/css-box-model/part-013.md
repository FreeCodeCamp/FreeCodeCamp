---
id: 60a3e3396c7b40068ad69976
title: Part 13
challengeType: 0
dashedName: part-13
---

# --description--

The frame is much too wide.

In `.frame`, set its `width` to 500 pixels.

# --hints--

You should set the `width` property to `500px`.

```js
const widthFilter = new __helpers.CSSHelp(document).getCSSRules().filter(x => x.style.width === '500px');
assert(widthFilter.length === 2);
```

Your `.frame` element should have a `width` of `500px`.

```js
const frameWidth = new __helpers.CSSHelp(document).getStyle('.frame')?.getPropertyValue('width');
assert(frameWidth === '500px');
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
