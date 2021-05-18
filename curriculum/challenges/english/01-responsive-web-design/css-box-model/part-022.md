---
id: 60a3e3396c7b40068ad6997f
title: Part 22
challengeType: 0
dashedName: part-22
---

# --description--

Adding 1 pixel of padding to the top, bottom, left, and right of the canvas changed its dimensions to 502 pixels x 602 pixels.

Replace `padding: 1px;` with `overflow: hidden;` to change the canvas back to its original dimensions.

# --hints--

You should remove the `padding` property from the `.one` selector.

```js

```

You should set the `overflow` property to `hidden`.

```js

```

Your `.one` element should have an `overflow` value of `hidden`.

```js

```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
--fcc-editable-region--
  padding: 1px;
--fcc-editable-region--
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
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Rothko</title>
    <link href="./css/style10.css" rel="stylesheet">
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