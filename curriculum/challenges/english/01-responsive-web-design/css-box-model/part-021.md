---
id: 60a3e3396c7b40068ad6997e
title: Part 21
challengeType: 0
dashedName: part-21
---

# --description--

Now `.one` is centered horizontally, but its top margin is pushing past the canvas and onto the frame's border, shifting the entire canvas down 20 pixels.

Add `padding: 1px;` to `.canvas` to give the `.one` element something solid to push off of.

# --hints--

You should set the `padding` property to `1px`.

```js
const hasPadding = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.padding === '1px');
assert(hasPadding);
```

Your `.canvas` element should have a `padding` value of `1px`.

```js
const canvasPadding = new __helpers.CSSHelp(document).getStyle('.canvas')?.getPropertyValue('padding');
assert(canvasPadding === '1px');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
--fcc-editable-region--

--fcc-editable-region--
}

.frame {
  border: 50px solid black;
  width: 500px;
  padding: 50px;
  margin: 20px auto;
}

.one {
  width: 425px;
  height: 150px;
  background-color: #efb762;
  margin: 20px auto;
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
        <div class="one"></div>
      </div>
    </div>
  </body>
</html>
```
