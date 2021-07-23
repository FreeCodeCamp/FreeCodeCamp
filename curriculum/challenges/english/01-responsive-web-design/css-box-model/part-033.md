---
id: 60a3e3396c7b40068ad6998a
title: Part 33
challengeType: 0
dashedName: part-33
---

# --description--

Center the `.three` element on the canvas by setting its `margin` to `auto`.

# --hints--

You should set the `margin` property to `auto`.

```js
const marginFilter = new __helpers.CSSHelp(document).getCSSRules().filter(x => x.style.margin === 'auto');
assert(marginFilter.length === 2);
```

Your `.three` element should have a `margin` value of `auto`.

```js
const threeMargin = new __helpers.CSSHelp(document).getStyle('.three')?.getPropertyValue('margin');
assert(threeMargin === 'auto');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
  overflow: hidden;
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
  margin: 20px auto 20px;
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: auto;
}

.three {
  width: 91%;
  height: 28%;
  background-color: #b20403;
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
        <div class="two"></div>
        <div class="three"></div>
      </div>
    </div>
  </body>
</html>
```
