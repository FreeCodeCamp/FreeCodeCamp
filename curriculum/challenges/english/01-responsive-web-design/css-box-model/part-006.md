---
id: 60a3e3396c7b40068ad6996f
title: Part 6
challengeType: 0
dashedName: part-6
---

# --description--

Add a `div` element in the `body`.

Set the `class` attribute equal to `canvas`. For example, `<div class="my-div">`.

# --hints--

Your code should have a `div` element.

```js
assert(document.querySelectorAll('div').length === 1)
```

The `div` element should have a `class` with the value `canvas`.

```js
assert(document.querySelector('div').className.split(' ').includes('canvas'))
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

--fcc-editable-region--
  </body>
</html>
```
