---
id: 60a3e3396c7b40068ad69992
title: Part 41
challengeType: 0
dashedName: part-41
---

# --description--

The corners of each rectangle are still too sharp.

Round each corner of `.one` by 9 pixels with `border-radius: 9px;`.

# --hints--

You should set the `border-radius` property to `9px`.

```js
const hasBorderRadius = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['border-radius'] === '9px');
assert(hasBorderRadius);
```

Your `.one` element should have a `border-radius` value of `9px`.

```js
const oneBorderRadius =new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('border-radius');
assert(oneBorderRadius === '9px');
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
--fcc-editable-region--

--fcc-editable-region--
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: 0 auto 20px;
  box-shadow: 0 0 3px 3px #8f0401;
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
