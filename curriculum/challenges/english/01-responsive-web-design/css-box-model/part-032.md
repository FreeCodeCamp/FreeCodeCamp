---
id: 60a3e3396c7b40068ad69989
title: Part 32
challengeType: 0
dashedName: part-32
---

# --description--

Change the `background-color` of `.three` to `#b20403`.

# --hints--

You should set the `background-color` property to `#b20403`.

```js
const hasBackground = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['background-color'] === 'rgb(178, 4, 3)');
assert(hasBackground);
```

Your `.three` element should have a `background-color` value of `#b20403`.

```js
const threeBackground = new __helpers.CSSHelp(document).getStyle('.three')?.getPropertyValue('background-color');
assert(threeBackground === 'rgb(178, 4, 3)');
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
