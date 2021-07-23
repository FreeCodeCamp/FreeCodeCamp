---
id: 60f803d5241e6a0433a523a1
title: Part 14
challengeType: 0
dashedName: part-14
---

# --description--

As `label` elements are `inline` by default, they appear on the same line as the text they are labelling. To make them appear on separate lines, add `display: block` to the `label` element, and add a `margin` of `0.5rem 0`, to separate them from each other.

# --hints--

You should use the `label` selector.

```js
assert.exists(new __helpers.CSSHelp(document).getStyle('label'));
```

You should add a `display` property of value `block`.

```js
assert.equal(new __helpers.CSSHelp(document).getStyle('label')?.display, 'block');
```

You should add a `margin` property of value `0.5rem 0`.

```js
assert.equal(new __helpers.CSSHelp(document).getStyle('label')?.margin, '0.5rem 0');
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
    <form action='https://fcc-registration-form.com'>
      <fieldset>
        <label>Enter Your First Name:</label>
        <label>Enter Your Last Name:</label>
        <label>Enter Your Email:</label>
        <label>Create a New Password:</label>
      </fieldset>
      <fieldset></fieldset>
      <fieldset></fieldset>
    </form>
  </body>
</html>
```

```css
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #1b1b32;
	color: #f5f6f7;
}

--fcc-editable-region--

--fcc-editable-region--

```
