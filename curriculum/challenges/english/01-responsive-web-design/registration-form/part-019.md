---
id: 60f83e7bfc09900959f41e20
title: Part 19
challengeType: 0
dashedName: part-19
---

# --description--

Certain `type` attribute values come with built-in form validation. For example, `type="email"` requires that the value be a valid email address.

Add custom validation to the password `input` element, by adding a `minlength` attribute with a value of `8`. Doing so prevents inputs of less than 8 characters being submitted.

# --hints--

You should give the password `input` element a `minlength` attribute.

```js
assert.notEqual(document.querySelector('input[type="password"]')?.minLength, -1);
```

You should give the `minlength` attribute a value of `8`.

```js
assert.equal(document.querySelector('input[type="password"]')?.minLength, 8);
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
--fcc-editable-region--
      <fieldset>
        <label>Enter Your First Name: <input type="text" required /></label>
        <label>Enter Your Last Name: <input type="text" required /></label>
        <label>Enter Your Email: <input type="email" required /></label>
        <label>Create a New Password: <input type="password" required /></label>
      </fieldset>
--fcc-editable-region--
      <fieldset></fieldset>
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
