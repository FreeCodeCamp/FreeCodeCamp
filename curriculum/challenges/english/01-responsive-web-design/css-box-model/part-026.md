---
id: 60a3e3396c7b40068ad69983
title: Part 26
challengeType: 0
dashedName: part-26
---

# --description--

Set the `background-color` of the `.two` element to `#8f0401`.

# --hints--

You should set the `background-color` property to `#8f0401`.

```js
const hasBackground = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['background-color'] === 'rgb(143, 4, 1)');
assert(hasBackground);
```

Your `.two` element should have a `background-color` value of `#8f0401`.

```js
const twoBackground = new __helpers.CSSHelp(document).getStyle('.two')?.getPropertyValue('background-color');
assert(twoBackground === 'rgb(143, 4, 1)');
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
  height: 200px;
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
