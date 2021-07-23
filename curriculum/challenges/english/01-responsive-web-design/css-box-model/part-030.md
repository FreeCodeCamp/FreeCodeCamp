---
id: 60a3e3396c7b40068ad69987
title: Part 30
challengeType: 0
dashedName: part-30
---

# --description--

You don't always have to use pixels when sizing an element.

Create a new rule, `.three`, and set its `width` to `91%`.

# --hints--

You should use the `.three` selector.

```js
const hasThree = new __helpers.CSSHelp(document).getStyle('.three');
assert(hasThree);
```

You should set the `width` property to `91%`.

```js
const hasWidth = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.width === '91%');
assert(hasWidth);
```

Your `.three` element should have a `width` value of `91%`.

```js
const threeWidth = new __helpers.CSSHelp(document).getStyle('.three')?.getPropertyValue('width');
assert(threeWidth === '91%');
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

--fcc-editable-region--

--fcc-editable-region--

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
