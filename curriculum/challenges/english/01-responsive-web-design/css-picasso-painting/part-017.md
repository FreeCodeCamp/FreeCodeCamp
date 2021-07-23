---
id: 60b69a66b6ddb80858c51587
title: Part 17
challengeType: 0
dashedName: part-17
---

# --description--

Move the `offwhite-character` into place by giving it an `absolute` `position`, a `top` value of `20%`, and a `left` value of `17.5%`.

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
        <div class="characters">
          <div id="offwhite-character">
            <div id="white-hat"></div>
            <div id="black-mask">
              <div class="eyes left"></div>
              <div class="eyes right"></div>
            </div>
            <div id="gray-instrument">
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
            </div>
            <div id="tan-table"></div>
          </div>
        </div>
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#offwhite-character {
  width: 300px;
  height: 550px;
  background-color: GhostWhite;
  --fcc-editable-region--

  --fcc-editable-region--
}
```
