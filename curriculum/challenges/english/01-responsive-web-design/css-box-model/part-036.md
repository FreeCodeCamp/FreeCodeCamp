---
id: 60a3e3396c7b40068ad6998d
title: Part 36
challengeType: 0
dashedName: part-36
---

# --description--

Create a rule that targets both `.one` and `.two` and increase their `blur` effect by 1 pixel.

Here's an example of a rule that increases the `blur` of two elements:

```css
h1, p {
  filter: blur(3px);
}
```

# --hints--

You should have a `.one, .two` selector.

```js
const oneTwo = new __helpers.CSSHelp(document).getStyle('.one, .two');
assert(oneTwo);
```

You should set the `filter` property to `blur(1px)`.

```js
const hasFilter = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.filter === 'blur(1px)');
assert(hasFilter)
```

Your `.one` element should have a `filter` value of `blur(1px)`.

```js
const one = document.querySelector('.one');
const oneFilter = getComputedStyle(one).filter;
console.log(oneFilter);
assert(oneFilter === 'blur(1px)');
```

Your `.two` element should have a filter value of `blur(1px)`.

```js
const two = document.querySelector('.two');
const twoFilter = getComputedStyle(two).filter;
assert(twoFilter === 'blur(1px)');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
  overflow: hidden;
  filter: blur(2px);
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
  margin: 0 auto 20px;
}

--fcc-editable-region--

--fcc-editable-region--

.three {
  width: 91%;
  height: 28%;
  background-color: #b20403;
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
        <div class="three"></div>
      </div>
    </div>
  </body>
</html>
```
