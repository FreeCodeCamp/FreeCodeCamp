---
id: 60a3e3396c7b40068ad69981
title: Part 24
challengeType: 0
dashedName: part-24
---

# --description--

Create a new CSS rule using the `.two` selector and set its `width` to 475 pixels.

# --hints--

You should have a `.two` selector.

```js
const hasTwo = new __helpers.CSSHelp(document).getStyle('.two');
assert(hasTwo);
```

You should set the `width` property to `475px`.

```js
const hasWidth = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.width === '475px');
assert(hasWidth);
```

Your `.two` element should have a `width` value of `475px`.

```js
const twoWidth = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('width');
assert(twoWidth === '475px');
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
      </div>
    </div>
  </body>
</html>
```
