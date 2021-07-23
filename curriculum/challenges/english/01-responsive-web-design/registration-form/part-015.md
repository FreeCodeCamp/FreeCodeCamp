---
id: 60f805f813eaf2049bc2ceea
title: Part 15
challengeType: 0
dashedName: part-15
---

# --description--

Nest an `input` element within each `label`. Be sure to add each `input` after the `label` text, and include a space after the colon.

# --hints--

You should add four `input` elements to the `fieldset` element.

```js
assert.equal(document.querySelectorAll('fieldset input').length, 4);
```

You should nest the `input` elements within the `label` elements.

```js
assert.equal(document.querySelectorAll('label input').length, 4);
```

You should add the first `input` after the `label` text `Enter Your First Name:`, and include a space after the colon.

```js
assert.equal(document.querySelectorAll('label')?.[0]?.innerHTML, 'Enter Your First Name: <input>');
```

You should add the second `input` after the `label` text `Enter Your Last Name:`, and include a space after the colon.

```js
assert.equal(document.querySelectorAll('label')?.[1]?.innerHTML, 'Enter Your Last Name: <input>');
```

You should add the third `input` after the `label` text `Enter Your Email:`, and include a space after the colon.

```js
assert.equal(document.querySelectorAll('label')?.[2]?.innerHTML, 'Enter Your Email: <input>');
```

You should add the fourth `input` after the `label` text `Create a New Password:`, and include a space after the colon.

```js
assert.equal(document.querySelectorAll('label')?.[3]?.innerHTML, 'Create a New Password: <input>');
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
        <label>Enter Your First Name:</label>
        <label>Enter Your Last Name:</label>
        <label>Enter Your Email:</label>
        <label>Create a New Password:</label>
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
