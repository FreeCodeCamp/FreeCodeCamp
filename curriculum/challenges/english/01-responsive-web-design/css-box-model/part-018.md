---
id: 60a3e3396c7b40068ad6997b
title: Part 18
challengeType: 0
dashedName: part-18
---

# --description--

Now set the `height` for `.one` to 150 pixels.

# --hints--

You should set the `height` property to `150px`.

```js
const hasHeight = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.height === '150px');
assert(hasHeight);
```

Your `.one` element should have a `height` value of `150px`.

```js
const oneHeight = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('height');
assert(oneHeight === '150px');
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
