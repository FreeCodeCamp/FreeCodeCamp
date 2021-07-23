---
id: 60f85a62fb30c80bcea0cedb
title: Part 22
challengeType: 0
dashedName: part-22
---

# --description--

Users will be allowed to chose either a `Personal Account` or `Business Account`.

To do this, within each of the first two `label` elements, add one `input` element with `type="radio"`.

# --hints--

You should add two `input` elements.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(2) input')?.length, 2);
```

You should add one `input` to each of the first two `label` elements.

```js
assert.exists(document.querySelector('fieldset:nth-child(2) > label:nth-child(1) > input'));
assert.exists(document.querySelector('fieldset:nth-child(2) > label:nth-child(2) > input'));
```

You should give both `input` elements a `type` of `radio`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(2) input[type="radio"]')?.length, 2);
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
        <label>Enter Your First Name: <input type="text" required /></label>
        <label>Enter Your Last Name: <input type="text" required /></label>
        <label>Enter Your Email: <input type="email" required /></label>
        <label>Create a New Password: <input type="password" pattern="[a-z0-5]{8,}" required /></label>
      </fieldset>
--fcc-editable-region--
      <fieldset>
        <label></label>
        <label></label>
        <label></label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
      <input type="submit" value="Submit" />
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

label {
	display: block;
	margin: 0.5rem 0;
}

```
