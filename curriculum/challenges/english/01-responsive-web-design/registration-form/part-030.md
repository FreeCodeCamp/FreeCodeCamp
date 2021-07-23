---
id: 60fac56271087806def55b33
title: Part 30
challengeType: 0
dashedName: part-30
---

# --description--

Nest the `select` element within a `label` element with the text `How did you hear about us?`. The text should come before the `select` element.

# --hints--

You should nest only the `select` element within a `label` element.

```js
assert.exists(document.querySelector('fieldset:nth-child(3) > label:nth-child(3) > select'));
```

You should give the `label` element the text `How did you hear about us?`.

```js
assert.equal(document.querySelector('fieldset:nth-child(3) > label:nth-child(3)')?.textContent, 'How did you hear about us?');
```

You should place the text before the `select` element.

```js
assert.equal(document.querySelector('fieldset:nth-child(3) > label:nth-child(3) > select')?.innerHTML?.replace(/[\t\n]+/g, ''), 'How did you hear about us?<select><option></option><option></option><option></option><option></option><option></option></select>');
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
      <fieldset>
        <label><input type="radio" name="account-type" /> Personal Account</label>
        <label><input type="radio" name="account-type" /> Business Account</label>
        <label>
          <input type="checkbox" required /> I accept the <a href="https://www.freecodecamp.org/news/terms-of-service/">terms and conditions</a>
			  </label>
      </fieldset>
--fcc-editable-region--
      <fieldset>
        <label>Upload a profile picture: <input type="file" /></label>
        <label>Input your age (years): <input type="number" min="13" max="120" />
			  </label>
        <select>
          <option></option>
          <option></option>
          <option></option>
          <option></option>
          <option></option>
        </select>
      </fieldset>
--fcc-editable-region--
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
