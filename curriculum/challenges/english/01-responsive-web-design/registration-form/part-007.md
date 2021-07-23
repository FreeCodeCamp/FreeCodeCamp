---
id: 60f1922fcbd2410527b3bd89
title: Part 7
challengeType: 0
dashedName: part-7
---

# --description--

To spruce the project up, let us add some CSS. Begin by giving the `body` a `width` of `100%`, and a `height` of `100vh`.

# --hints--

You should use the `body` element selector.

```js
assert.exists(__helpers.CSSHelp(document).getStyle('body'));
```

You should give the `body` a `width` of `100%`.

```js
assert.equal(__helpers.CSSHelp(document).getStyle('body')?.width, '100%');
```

You should give the `body` a `height` of `100vh`.

```js
assert.equal(__helpers.CSSHelp(document).getStyle('body')?.height, '100vh');
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

--fcc-editable-region--
```
