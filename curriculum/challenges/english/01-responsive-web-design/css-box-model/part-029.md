---
id: 60a3e3396c7b40068ad69986
title: Part 29
challengeType: 0
dashedName: part-29
---

# --description--

Create a new `div` with a `class` value of `three` right under the `.two` element.

# --hints--

Your existing `.one` and `.two` elements should not be changed.

```js
assert(document.querySelectorAll('.one').length === 1);
assert(document.querySelectorAll('.two').length === 1);
```

Your new `div` should be nested in your `.canvas` element.

```js
assert(document.querySelector('.canvas').children[2].tagName === 'DIV');
```

Your new `div` should come after your `.two` element.

```js
assert(document.querySelector('.two').nextElementSibling.tagName === 'DIV');
```

Your new `div` element should have a `class` with the value `three`.

```js
assert(document.querySelector('.canvas').children[2].className.split(' ').includes('three'));
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
  margin: 20px auto 20px;
}

.two {
  width: 475px;
  height: 200px;
  background-color: #8f0401;
  margin: auto;
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
--fcc-editable-region--

--fcc-editable-region--
      </div>
    </div>
  </body>
</html>
```
