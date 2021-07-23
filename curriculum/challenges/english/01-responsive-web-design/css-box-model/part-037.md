---
id: 60a3e3396c7b40068ad6998e
title: Part 37
challengeType: 0
dashedName: part-37
---

# --description--

Increase the `blur` of `.three` by 2 pixels.

# --hints--

You should set the `filter` property to `blur(2px)`.

```js
const filterFilter = new __helpers.CSSHelp(document).getCSSRules().filter(x => x.style.filter === 'blur(2px)');
assert(filterFilter.length === 2);
```

Your `.three` element should have a `filter` value of `blur(2px)`.

```js
const threeFilter = new __helpers.CSSHelp(document).getStyle('.three')?.getPropertyValue('filter');
assert(threeFilter === 'blur(2px)');
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
