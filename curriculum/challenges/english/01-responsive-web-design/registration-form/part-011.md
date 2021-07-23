---
id: 60f5cb8875ab6a0610f05071
title: Part 11
challengeType: 0
dashedName: part-11
---

# --description--

Seeing as we plan on having three distinct sections to the form, add three `fieldset` elements within the `form`.

# --hints--

You should add three `fieldset` elements.

```js
assert.equal(document.querySelectorAll('fieldset')?.length, 3);
```

The three `fieldset` elements should be within the `form`.

```js
assert.equal(document.querySelectorAll('form > fieldset')?.length, 3);
```

The three `fieldset` elements should be siblings.

```js
assert.exists(document.querySelector('fieldset + fieldset + fieldset'));
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
--fcc-editable-region--
  <body>
    <h1>Registration Form</h1>
    <p>Please fill out this form with the required information</p>
    <form action='https://fcc-registration-form.com'>
    
    </form>
  </body>
--fcc-editable-region--
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
