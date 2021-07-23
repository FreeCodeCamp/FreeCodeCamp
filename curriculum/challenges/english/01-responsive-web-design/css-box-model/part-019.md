---
id: 60a3e3396c7b40068ad6997c
title: Part 19
challengeType: 0
dashedName: part-19
---

# --description--

Set the `background-color` of `.one` to `#efb762`.

# --hints--

You should set the `background-color` property to `#efb762`.

```js
const hasBackground = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style['background-color'] === 'rgb(239, 183, 98)');
assert(hasBackground)
```

Your `.one` element should have a `background-color` value of `#efb762`.

```js
const oneBackground = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('background-color');
assert(oneBackground === 'rgb(239, 183, 98)');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
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
      </div>
    </div>
  </body>
</html>
```
