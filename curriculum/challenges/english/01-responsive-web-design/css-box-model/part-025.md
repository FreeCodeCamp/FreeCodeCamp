---
id: 60a3e3396c7b40068ad69982
title: Part 25
challengeType: 0
dashedName: part-25
---

# --description--

Set the `height` of the `.two` to 200 pixels.

# --hints--

You should set the `height` property to `200px`.

```js
const hasHeight = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.height === '200px');
assert(hasHeight);
```

Your `.two` element should have a `height` value of `200px`.

```js
const twoHeight = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('height');
assert(twoHeight === '200px');
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
