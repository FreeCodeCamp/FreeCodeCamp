---
id: 60a3e3396c7b40068ad69984
title: Part 27
challengeType: 0
dashedName: part-27
---

# --description--

Center the `.two` element by setting its `margin` to `auto`.

# --hints--

You should set the `margin` property to `auto`.

```js
const hasMargin = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.margin === 'auto');
assert(hasMargin);
```

Your `.two` element should have a `margin` value of `auto`.

```js
const twoMargin = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('margin');
assert(twoMargin === 'auto');
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
  margin: 20px auto;
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
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
      </div>
    </div>
  </body>
</html>
```
