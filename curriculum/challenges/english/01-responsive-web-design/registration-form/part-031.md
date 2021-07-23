---
id: 60fac8d7fdfaee0796934f20
title: Part 31
challengeType: 0
dashedName: part-31
---

# --description--

The dropdown options are currently empty. To give them content, add the following text to each subsequent `option` element:

```md
(select one)
freeCodeCamp News
freeCodeCamp YouTube
freeCodeCamp Forum
Other
```

# --hints--

You should give the first `option` element the text `(select one)`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[0]?.textContent, '(select one)');
```

You should give the second `option` element the text `freeCodeCamp News`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[1]?.textContent, 'freeCodeCamp News');
```

You should give the third `option` element the text `freeCodeCamp YouTube`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[2]?.textContent, 'freeCodeCamp YouTube');
```

You should give the fourth `option` element the text `freeCodeCamp Forum`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[3]?.textContent, 'freeCodeCamp Forum');
```

You should give the fifth `option` element the text `Other`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[4]?.textContent, 'Other');
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
        <label>How did you hear about us?
          <select>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </label>
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
