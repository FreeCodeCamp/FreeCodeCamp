---
id: 60a3e3396c7b40068ad69979
title: Part 16
challengeType: 0
dashedName: part-16
---

# --description--

Add a new `div` element inside of your `.canvas` element.

Give the new `div` the `class` attribute with a value of `one`.

# --hints--

You should create a new `div` element.

```js
assert(document.querySelectorAll('div').length === 3);
```

You should nest the new `div` element within your `.canvas` element.

```js
assert(document.querySelector('.canvas').children[0].tagName === 'DIV');
```

Your new `div` should have a `class` attribute with a value `one`.

```js
assert(document.querySelector('.canvas').children[0].className.split(' ').includes('one'));
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
--fcc-editable-region--

--fcc-editable-region--
      </div>
    </div>
  </body>
</html>
```
