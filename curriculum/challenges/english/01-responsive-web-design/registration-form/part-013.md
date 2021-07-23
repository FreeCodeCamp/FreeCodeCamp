---
id: 60f5dc35c07ac1078f140916
title: Part 13
challengeType: 0
dashedName: part-13
---

# --description--

Add the following text to the `label` elements:

- `Enter Your First Name:`
- `Enter Your Last Name:`
- `Enter Your Email:`
- `Create a New Password:`

# --hints--

The first `label` should have the text `Enter Your First Name:`.

```js
assert.equal(document.querySelector('label').innerHTML, 'Enter Your First Name:');
```

The second `label` should have the text `Enter Your Last Name:`.

```js
assert.equal(document.querySelector('fieldset > label:nth-child(2)').innerHTML, 'Enter Your Last Name:');
```

The third `label` should have the text `Enter Your Email:`.

```js
assert.equal(document.querySelector('fieldset > label:nth-child(3)').innerHTML, 'Enter Your Email:');
```

The fourth `label` should have the text `Create a New Password:`.

```js
assert.equal(document.querySelector('fieldset > label:nth-child(4)').innerHTML, 'Create a New Password:');
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
        <label></label>
        <label></label>
        <label></label>
        <label></label>
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
```
