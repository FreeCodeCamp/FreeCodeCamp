---
id: 60a3e3396c7b40068ad69994
title: Part 43
challengeType: 0
dashedName: part-43
---

# --description--

The `border-radius` property accepts up to four values to round the round the top-left, top-right, bottom-right, and bottom-left corners.

Round the top-left corner of `.three` by 30 pixels, the top-right by 25 pixels, the bottom-right by 60 pixels, and bottom-left by 12 pixels.

# --hints--

You should set the `border-radius` property to `30px 25px 60px 12px`.

```js
const hasBorderRadius = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['border-radius'] === '30px 25px 60px 12px');
assert(hasBorderRadius);
```

Your `.three` element should have a `border-radius` value of `30px 25px 60px 12px`.

```js
const threeBorderRadius = new __helpers.CSSHelp(document).getStyle('.three')?.getPropertyValue('border-radius');
assert(threeBorderRadius === '30px 25px 60px 12px');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
  overflow: hidden;
  filter: blur(2px);
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
  box-shadow: 0 0 3px 3px #efb762;
  border-radius: 9px;
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: 0 auto 20px;
  box-shadow: 0 0 3px 3px #8f0401;
  border-radius: 8px 10px;
}

.one, .two {
  filter: blur(1px);
}

.three {
  width: 91%;
  height: 28%;
  background-color: #b20403;
  margin: auto;
  filter: blur(2px);
  box-shadow: 0 0 5px 5px #b20403;
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
