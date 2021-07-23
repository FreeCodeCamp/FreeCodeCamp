---
id: 60f02e7361b68405e27b62a5
title: Part 5
challengeType: 0
dashedName: part-5
---

# --description--

Within the `body`, provide a heading context for the content, by adding an `h1` with the text `Registration Form`.

# --hints--

You should add the `h1` within the `body`.

```js
assert.exists(document.querySelector('body > h1'));
```

You should give the `h1` the text `Registration Form`.

```js
assert.equal(document.querySelector('body > h1')?.text, 'Registration Form');
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
--fcc-editable-region--
  <body>

  </body>
--fcc-editable-region--
</html>
```
