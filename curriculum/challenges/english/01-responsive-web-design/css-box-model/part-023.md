---
id: 60a3e3396c7b40068ad69980
title: Part 23
challengeType: 0
dashedName: part-23
---

# --description--

Add another `div` with a `class` value of `two` just below your `one` element.

# --hints--

You should not change the existing `.one` element.

```js
assert(document.querySelectorAll('.one').length === 1);
```

You should have a second `div` element in your `.canvas` element.

```js
assert(document.querySelector('.canvas').children[1].tagName === 'DIV');
```

Your second `div` element should have a `class` value of `two`.

```js
assert(document.querySelector('.canvas').children[1].className.split(' ').includes('two'));
```

Your `.two` element should come after your `.one` element.

```js
assert(document.querySelector('.two').previousElementSibling.className.split(' ').includes('one'));
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
        <div class="one"></div>
--fcc-editable-region--

--fcc-editable-region--
      </div>
    </div>
  </body>
</html>
```
