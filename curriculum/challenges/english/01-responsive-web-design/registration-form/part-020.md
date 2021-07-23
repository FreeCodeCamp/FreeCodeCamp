---
id: 60f84ec41116b209c280ba91
title: Part 20
challengeType: 0
dashedName: part-20
---

# --description--

With `type="password"` we can use the `pattern` attribute to define a regular expression that the password must match to be considered valid.

Add a `pattern` attribute to the password `input` element to require the input match: `[a-z0-5]{8,}`

The above is a regular expression which matches eight or more lowercase letters or the digits `0` to `5`. Then, remove the `minlength` attribute, and try it out.

# --hints--

You should give the password `input` element a `pattern` attribute.

```js
assert.notEmpty(document.querySelector('input[type="password"]').pattern);
```

You should give the `pattern` attribute a value of `[a-z0-5]{8,}`.

```js
assert.equal(document.querySelector('input[type="password"]').pattern, '[a-z0-5]{8,}');
```

You should remove the `minlength` attribute from the password `input` element.

```js
assert.equal(document.querySelector('input[type="password"]').minLength, -1);
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
        <label>Create a New Password: <input type="password" minlength="8" required /></label>
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
