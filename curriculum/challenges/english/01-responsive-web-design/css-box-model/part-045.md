---
id: 60a3e3396c7b40068ad69996
title: Part 45
challengeType: 0
dashedName: part-45
---

# --description--

Rotate `.two` clockwise slightly by adding the `transform` property with the value `rotate(0.4deg)`.

# --hints--

You should set the `transform` property to `rotate(0.4deg)`.

```js
const hasTransform = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.transform === 'rotate(0.4deg)');
assert(hasTransform);
```

Your `.two` element should have a `transform` value of `rotate(0.4deg)`.

```js
const twoTransform = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('transform');
assert(twoTransform === 'rotate(0.4deg)');
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
  transform: rotate(-0.6deg);
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: 0 auto 20px;
  box-shadow: 0 0 3px 3px #8f0401;
  border-radius: 8px 10px;
--fcc-editable-region--

--fcc-editable-region--
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
  border-radius: 30px 25px 60px 12px;
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
