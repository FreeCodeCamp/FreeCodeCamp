---
id: 60faca286cb48b07f6482970
title: Part 32
challengeType: 0
dashedName: part-32
---

# --description--

Submitting the form with an option selected would not send a useful value to the server. As such, each `option` needs to be given a `value` attribute. Without which, the text content of the `option` will be submitted to the server.

Give the first `option` a `value` of `""`, and the subsequent `option` elements `value` attributes from `1` to `4`.

# --hints--

You should give the first `option` a `value` of `""`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[0]?.value, '');
```

You should give the second `option` a `value` of `1`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[1]?.value, '1');
```

You should give the third `option` a `value` of `2`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[2]?.value, '2');
```

You should give the fourth `option` a `value` of `3`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[3]?.value, '3');
```

You should give the fifth `option` a `value` of `4`.

```js
assert.equal(document.querySelectorAll('fieldset:nth-child(3) > label:nth-child(3) option')?.[4]?.value, '4');
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
            <option>(select one)</option>
            <option>freeCodeCamp News</option>
            <option>freeCodeCamp YouTube Channel</option>
            <option>freeCodeCamp Forum</option>
            <option>Other</option>
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
