---
id: 60fad1cafcde010995e15306
title: Part 36
challengeType: 0
dashedName: part-36
---

# --description--

With form submissions, it is useful, and good practice, to provide each submittable element with a `name` attribute. This attribute is used to identify the element in the form submission.

Go ahead, and give each submittable element a unique `name` attribute of your choosing. _Except for the two `radio` inputs._

# --hints--

You should give the `input` expecting a first name a `name` attribtute. _P.S. I would have chosen `first-name`_

```js
assert.notEmpty(document.querySelector('fieldset:nth-child(1) > label:nth-child(1) > input')?.name);
```

You should give the `input` expecting a last name a `name` attribute. _P.S. I would have chosen `last-name`_

```js
assert.notEmpty(document.querySelector('fieldset:nth-child(1) > label:nth-child(2) > input')?.name);
```

You should give the `email` a `name` attribute. _P.S. I would have chosen `email`_

```js
assert.notEmpty(document.querySelector('input[type="email"]')?.name);
```

You should give the `password` a `name` attribute. _P.S. I would have chosen `password`_

```js
assert.notEmpty(document.querySelector('input[type="password"]')?.name);
```

You should give the `checkbox` a `name` attribute. _P.S. I would have chosen `terms`_

```js
assert.notEmpty(document.querySelector('input[type="checkbox"]')?.name);
```

You should give the `file` a `name` attribute. _P.S. I would have chosen `file`_

```js
assert.notEmpty(document.querySelector('input[type="file"]')?.name);
```

You should give the `number` a `name` attribute. _P.S. I would have chosen `age`_

```js
assert.notEmpty(document.querySelector('input[type="number"]')?.name);
```

You should give the `select` element a `name` attribute. _P.S. I would have chosen `referrer`_

```js
assert.notEmpty(document.querySelector('select')?.name);
```

You should give the `textarea` element a `name` attribute. _P.S. I would have chosen `bio`_

```js
assert.notEmpty(document.querySelector('textarea')?.name);
```

You should not give any of the `option` elements a `name` attribute.

```js
[...document.querySelectorAll('option')]?.forEach(option => assert.isEmpty(option?.name));
```

You should not give any of the `label` elements a `name` attribute.

```js
[...document.querySelectorAll('label')]?.forEach(label => assert.isEmpty(label?.name));
```

You should not give any of the `fieldset` elements a `name` attribute.

```js
[...document.querySelectorAll('fieldset')]?.forEach(fieldset => assert.isEmpty(fieldset?.name));
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
        <label>Create a New Password: <input type="password" pattern="[a-z0-5]{8,}" required /></label>
      </fieldset>
      <fieldset>
        <label><input type="radio" name="account-type" /> Personal Account</label>
        <label><input type="radio" name="account-type" /> Business Account</label>
        <label>
          <input type="checkbox" required /> I accept the <a href="https://www.freecodecamp.org/news/terms-of-service/">terms and conditions</a>
			  </label>
      </fieldset>
      <fieldset>
        <label>Upload a profile picture: <input type="file" /></label>
        <label>Input your age (years): <input type="number" min="13" max="120" />
			  </label>
        <label>How did you hear about us?
          <select>
            <option value="">(select one)</option>
            <option value="1">freeCodeCamp News</option>
            <option value="2">freeCodeCamp YouTube Channel</option>
            <option value="3">freeCodeCamp Forum</option>
            <option value="4">Other</option>
          </select>
        </label>
        <label>Provide a bio:
				  <textarea rows="3" cols="30" placeholder="I like coding on the beach..."></textarea>
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
