---
id: 60f80e0081e0f2052ae5b505
title: Part 16
challengeType: 0
dashedName: part-16
---

# --description--

Specifying the `type` attribute of a form element is important for the browser to know what kind of data it should expect. If the `type` is not specified, the browser will default to `text`.

Give the first two `input` elements a `type` attribute of `text`, the third a `type` attribute of `email`, and the fourth a `type` attribute of `password`.

The `email` type comes with built-in validation - only allowing emails with a `@` and a `.` in the domain. The `password` type obscures the input, and warns if the site does not use HTTPS.

# --hints--

You should give the first `input` element a `type` attribute of `text`.

```js
assert.equal(document.querySelector('input')?.type, 'text');
```

You should give the second `input` element a `type` attribute of `text`.

```js
assert.equal(document.querySelectorAll('input')?.[1]?.type, 'text');
```

You should give the third `input` element a `type` attribute of `email`.

```js
assert.equal(document.querySelectorAll('input')?.[2]?.type, 'email');
```

You should give the fourth `input` element a `type` attribute of `password`.

```js
assert.equal(document.querySelector('input')?.[3]?.type, 'password');
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
        <label>Enter Your First Name: <input /></label>
        <label>Enter Your Last Name: <input /></label>
        <label>Enter Your Email: <input /></label>
        <label>Create a New Password: <input /></label>
      </fieldset>
--fcc-editable-region--
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

label {
	display: block;
	margin: 0.5rem 0;
}

```
