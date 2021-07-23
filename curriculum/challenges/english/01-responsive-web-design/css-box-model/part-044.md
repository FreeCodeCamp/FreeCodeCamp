---
id: 60a3e3396c7b40068ad69995
title: Part 44
challengeType: 0
dashedName: part-44
---

# --description--

Rotate each rectangle to give them more of an imperfect, hand-painted look.

Use the following to rotate `.one` counter clockwise -0.6 degrees: `transform: rotate(-0.6deg);`

# --hints--

You should set the `transform` property to `rotate(-0.6deg)`.

```js
const hasTransform = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.transform === 'rotate(-0.6deg)');
assert(hasTransform);
```

Your `.one` element should have a `transform` value of `rotate(-0.6deg)`.

```js
const oneTransform = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('transform');
assert(oneTransform === 'rotate(-0.6deg)');
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
--fcc-editable-region--

--fcc-editable-region--
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
