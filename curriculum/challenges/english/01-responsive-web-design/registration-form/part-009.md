---
id: 60f1a9cbd23023082e149fee
title: Part 9
challengeType: 0
dashedName: part-9
---

# --description--

That is better. Now, make the background easy on the eyes, by changing the `body` `background-color` to `#1b1b32`. Then, to see the text, change the `color` to `#f5f6f7`.

# --hints--

You should add the `background-color` within the `body` element selector.

```js
assert.notEmpty(__helpers.CSSHelp(document).getStyle('body')?.backgroundColor);
```

You should give the `background-color` a value of `#1b1b32`.

```js
assert.equal(__helpers.CSSHelp(document).getStyle('body')?.backgroundColor, '#1b1b32');
```

You should add the `color` within the `body` element selector.

```js
assert.notEmpty(__helpers.CSSHelp(document).getStyle('body')?.backgroundColor);
```

You should give the `color` a value of `#f5f6f7`.

```js
assert.equal(__helpers.CSSHelp(document).getStyle('body')?.color, '#f5f6f7');
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html>
  <head>
    <title>freeCodeCamp Registration Form Project</title>
	  <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
    <h1>Registration Form</h1>
    <p>Please fill out this form with the required information</p>
  </body>
</html>
```

```css
--fcc-editable-region--
body {
  width: 100%;
  height: 100vh;
  margin: 0;
}
--fcc-editable-region--
```
