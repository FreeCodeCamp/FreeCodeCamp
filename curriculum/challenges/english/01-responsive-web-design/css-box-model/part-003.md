---
id: 60a3e3396c7b40068ad6996c
title: Part 3
challengeType: 0
dashedName: part-3
---

# --description--

In the CSS box model, every HTML element is treated as a box with four areas.

Imagine you receive a box from your favorite online retailer -- the content is the item in the box, or in our case, a header, paragraph, or image element.

Change the `src` attribute in the `<img>` from `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png` to `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-2.png`.

# --hints--

The `img` element should have a `src` of `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-2.png`

```js
assert(document.querySelector('img').getAttribute('src') === 'https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-2.png');
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Rothko</title>
  </head>
  <body>
--fcc-editable-region--
    <img src="https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png">
--fcc-editable-region--
  </body>
</html>
```

