---
id: 60a3e3396c7b40068ad69975
title: Part 12
challengeType: 0
dashedName: part-12
---

# --description--

Write a new rule using the `.frame` class selector.

Give the `.frame` a border with the shorthand `border: 50px solid black;` declaration.

# --hints--

Your code should have a `.frame` selector.

```js
const hasFrame = new __helpers.CSSHelp(document).getStyle('.frame');
assert(hasFrame);
```

You should set the `border` property to `50px solid black`.

```js
const hasBorder = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.border === '50px solid black');
assert(hasBorder);
```

Your `.frame` element should have a `50px solid black` `border`.

```js
const frameBorder = new __helpers.CSSHelp(document).getStyle('.frame')?.getPropertyValue('border');
assert(frameBorder === '50px solid black');
```

# --seed--

## --seed-contents--

```css
.canvas {
  width: 500px;
  height: 600px;
  background-color: #4d0f00;
}
--fcc-editable-region--

--fcc-editable-region--
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
