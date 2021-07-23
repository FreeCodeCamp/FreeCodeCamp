---
id: 60a3e3396c7b40068ad6997d
title: Part 20
challengeType: 0
dashedName: part-20
---

# --description--

Use margins to position the `.one` element on the canvas.

Add the shorthand `margin: 20px auto;` to set the top and bottom margins to 20 pixels, and center it horizontally.

# --hints--

You should set the `margin` property to `20px auto`.

```js
const marginFilter = new __helpers.CSSHelp(document).getCSSRules().filter(x => x.style.margin === '20px auto');
assert(marginFilter.length === 2);
```

Your `.one` element should have a `margin` value of `20px auto`.

```js
const oneMargin = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('margin');
assert(oneMargin === '20px auto');
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
  padding: 50px;
  margin: 20px auto;
}

.one {
  width: 425px;
  height: 150px;
  background-color: #efb762;
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
        <div class="one"></div>
      </div>
    </div>
  </body>
</html>
```
