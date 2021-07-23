---
id: 60a3e3396c7b40068ad69978
title: Part 15
challengeType: 0
dashedName: part-15
---

# --description--

Use margins to adjust the spacing outside of an element.

Add the `margin` property to `.frame` and set it to `20px auto` to move the frame down 20 pixels and center it horizontally on the page.

# --hints--

You should set the `margin` property to `20px auto`.

```js
const hasMargin = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.margin === '20px auto');
assert(hasMargin);
```

Your `.frame` element should have a `margin` value of `20px auto`.

```js
const frameMargin = new __helpers.CSSHelp(document).getStyle('.frame')?.getPropertyValue('margin');
assert(frameMargin === '20px auto');
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
      </div>
    </div>
  </body>
</html>
```
