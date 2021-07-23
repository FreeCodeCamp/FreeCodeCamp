---
id: 60a3e3396c7b40068ad6998b
title: Part 34
challengeType: 0
dashedName: part-34
---

# --description--

It's helpful to have your margins push in one direction.

In this case, the bottom margin of the `.one` element pushes `.two` down 20 pixels.

In `.two`, add `margin: 0 auto 20px;` to set its top margin to 0, center it horizontally, and set its bottom margin to 20 pixels.

# --hints--

You should set the `margin` property to `0 auto 20px`.

```js
const hasMargin = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.margin === '0px auto 20px');
assert(hasMargin);
```

Your `.two` element should have a `margin` value of `0 auto 20px`.

```js
const twoMargin = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('margin');
console.log(twoMargin)
assert(twoMargin === '0px auto 20px');
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
--fcc-editable-region--
  margin: auto;
--fcc-editable-region--
}

.three {
  width: 91%;
  height: 28%;
  background-color: #b20403;
  margin: auto;
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
