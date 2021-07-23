---
id: 60b69a66b6ddb80858c5157f
title: Part 9
challengeType: 0
dashedName: part-9
---

# --description--

Typically, HTML is rendered in a top-down manner. Elements at the top of the code are positioned at the top of the page. However, many times you may want to move the elements to different positions. You can do this with the `position` attribute.

Set the `position` attribute for the `back-wall` element to `absolute`. An `absolute` position takes the element out of that top-down document flow and allows you to adjust it relative to its container.

When an element is manually positioned, you can shift its layout with `top`, `left`, `right`, and `bottom`. Set the `back-wall` to have a `top` value of `0`, and a `left` value of `0`.


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
  --fcc-editable-region--

  --fcc-editable-region--
}
```
