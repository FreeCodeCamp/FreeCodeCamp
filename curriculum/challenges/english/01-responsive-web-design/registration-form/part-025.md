---
id: 60fab4a123ce4b04526b082b
title: Part 25
challengeType: 0
dashedName: part-25
---

# --description--

We only want one radio input to be selectable at a time. However, the form does not know the radio inputs are related.

To relate the radio inputs, give them the same `name` attribute with a value of `account-type`. Now, it is not possible to select both radio inputs at the same time.

# --hints--

You should give the first radio input the `name` attribute with a value of `account-type`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) label:nth-child(1) input[type="radio"]')?.name, 'account-type');
```

You should give the second radio input the `name` attribute with a value of `account-type`.

```js
assert.equal(document.querySelector('fieldset:nth-child(2) label:nth-child(2) input[type="radio"]')?.name, 'account-type');
```

You should not give the `checkbox` the `name` attribute.

```js
assert.isEmpty(document.querySelector('fieldset:nth-child(2) label:nth-child(3) input[type="checkbox"]')?.name);
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
        <label><input type="radio" /> Personal Account</label>
        <label><input type="radio" /> Business Account</label>
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
