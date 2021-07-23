---
id: 60a3e3396c7b40068ad6998f
title: Part 38
challengeType: 0
dashedName: part-38
---

# --description--

The rectangles are too small and their edges don't have the soft quality of a painting.

Increase the area and soften the edges of `.one` by setting its `box-shadow` to `0 0 3px 3px #efb762`.

# --hints--

You should set the `box-shadow` property to `0 0 3px 3px #efb762`.

```js
const hasBoxShadow = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['box-shadow'] === 'rgb(239, 183, 98) 0px 0px 3px 3px');
assert(hasBoxShadow);
```

Your `.one` element should have a `box-shadow` value of `0 0 3px 3px #efb762`.

```js
const oneShadow = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('box-shadow');
assert(oneShadow === 'rgb(239, 183, 98) 0px 0px 3px 3px');
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
--fcc-editable-region--

--fcc-editable-region--
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: 0 auto 20px;
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
