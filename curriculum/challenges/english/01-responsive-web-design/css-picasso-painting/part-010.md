---
id: 60b69a66b6ddb80858c51580
title: Part 10
challengeType: 0
dashedName: part-10
---

# --description--

The `z-index` property is used to create "layers" for your HTML elements. If you are familiar with image editing tools, you may have worked with layers before. This is a similar concept.

Elements with a higher `z-index` value will appear to be layered on top of elements with a lower `z-index` value. This can be combined with the positioning in the previous lesson to create unique effects.

Since the `back-wall` element will need to appear "behind" the other elements you will be creating, give the `back-wall` element a `z-index` of `-1`.

# --hints--

Test 1

```js

```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>freeCodeCamp Picasso Painting</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  </head>
  <body>
    <div id="back-wall"></div>
  </body>
</html>
```

```css
body {
  background-color: rgb(184, 132, 46);
}

#back-wall {
  background-color: #8B4513;
  width: 100%;
  height: 60%;
  position: absolute;
  top: 0;
  left: 0;
  --fcc-editable-region--

  --fcc-editable-region--
}
```
