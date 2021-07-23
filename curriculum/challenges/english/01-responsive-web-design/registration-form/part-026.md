---
id: 60fab8367d35de04e5cb7929
title: Part 26
challengeType: 0
dashedName: part-26
---

# --description--

To finish this `fieldset` off, link the text `terms and conditions` to the following location:

```md
https://www.freecodecamp.org/news/terms-of-service/
```

# --hints--

You should use an `a` element to link to the terms and conditions.

```js
assert.exists(document.querySelector('fieldset:nth-child(2) > label:nth-child(3) > input > a'));
```

You should give the `a` element an `href` of `https://www.freecodecamp.org/news/terms-of-service/`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) > label:nth-child(3) > input > a')?.href, 'https://www.freecodecamp.org/news/terms-of-service/');
```

You should only wrap the `a` element around the text `terms and conditions`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) > label:nth-child(3) > input > a')?.textContent, 'terms and conditions');
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
        <label><input type="radio" name="account-type" /> Personal Account</label>
        <label><input type="radio" name="account-type" /> Business Account</label>
        <label><input type="checkbox" required /> I accept the terms and conditions</label>
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
