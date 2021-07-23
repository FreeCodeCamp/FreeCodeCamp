---
id: 60a3e3396c7b40068ad6997a
title: Part 17
challengeType: 0
dashedName: part-17
---

# --description--

Write a new rule that targets `.one` and set its `width` to 425 pixels.

# --hints--

You should have a `.one` selector.

```js
const hasOne = new __helpers.CSSHelp(document).getStyle('.one');
assert(hasOne);
```

You should set the `width` property to `425px`.

```js
const hasWidth = new __helpers.CSSHelp(document).getCSSRules().some(x => x.style.width === '425px');
assert(hasWidth);
```

Your `.one` element should have a `width` value of `425px`.

```js
const oneWidth = new __helpers.CSSHelp(document).getStyle('.one')?.getPropertyValue('width');
assert(oneWidth === '425px');
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
        <div class="one"></div>
      </div>
    </div>
  </body>
</html>
```
