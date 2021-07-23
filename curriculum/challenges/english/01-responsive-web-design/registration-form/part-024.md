---
id: 60f8618d191b940d62038513
title: Part 24
challengeType: 0
dashedName: part-24
---

# --description--

Within each corresponding `label` element, and immediately after the `input` element, add a space and add the following text:

```md
Personal Account
Business Account
I accept the terms and conditions
```

# --hints--

You should give the first `label` the text ` Personal Account`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) > label')?.innerText, ' Personal Account');
```

You should give the second `label` the text ` Business Account`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) > label:nth-child(2)')?.innerText, ' Business Account');
```

You should give the third `label` the text ` I accept the terms and conditions`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) > label:nth-child(3)')?.innerText, ' I accept the terms and conditions');
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
        <label><input type="radio" /></label>
        <label><input type="radio" /></label>
        <label><input type="checkbox" required /></label>
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
