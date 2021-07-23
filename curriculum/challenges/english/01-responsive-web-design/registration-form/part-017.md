---
id: 60f81167d0d4910809f88945
title: Part 17
challengeType: 0
dashedName: part-17
---

# --description--

The first `input` element with a `type` of `submit` is automatically set to submit its nearest parent `form` element.

To handle the form submission, after the last `fieldset` element add an `input` element with the `type` attribute set to `submit` and the `value` attribute set to `Submit`.

# --hints--

You should add the `input` element after the last `fieldset` element.

```js
assert.exists(document.querySelectorAll('fieldset')?.[2]?.nextElementSibling?.tagName, 'input');
```

You should give the `input` element a `type` attribute of `submit`.

```js
assert.exists(document.querySelector('fieldset + input[type="submit"]'));
```

You should give the `input` element a `value` attribute of `Submit`.

```js
assert.exists(document.querySelector('fieldset + input[value="Submit"]'));
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
        <label>Enter Your First Name: <input type="text" /></label>
        <label>Enter Your Last Name: <input type="text" /></label>
        <label>Enter Your Email: <input type="email" /></label>
        <label>Create a New Password: <input type="password" /></label>
      </fieldset>
      <fieldset></fieldset>
      <fieldset></fieldset>

--fcc-editable-region--
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
