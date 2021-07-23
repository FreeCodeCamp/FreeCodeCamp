---
id: 60f81616cff80508badf9ad5
title: Part 18
challengeType: 0
dashedName: part-18
---

# --description--

At this point, you should be able to submit the form. However, you might notice not much happens.

To make the form more interactive, add the `required` attribute to the `input` elements in the first `fieldset`.

Now, if you try to submit the form without filling in the required fields, you will see an error message.

# --hints--

You should give the first `input` element a `required` attribute.

```js
assert.equal(document.querySelector('input')?.required, true);
```

You should give the second `input` element a `required` attribute.

```js
assert.equal(document.querySelectorAll('input')?.[1]?.required, true);
```

You should give the third `input` element a `required` attribute.

```js
assert.equal(document.querySelectorAll('input')?.[2]?.required, true);
```

You should give the fourth `input` element a `required` attribute.

```js
assert.equal(document.querySelectorAll('input')?.[3]?.required, true);
```

You should not give the `submit` `input` a `required` attribute.

```js
assert.equal(document.querySelector('input[type="submit"]')?.required, false);
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
      <input type="submit" value="Submit" />
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
