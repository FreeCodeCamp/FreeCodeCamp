---
id: 5dc24165f86c76b9248c6ebc
title: Part 9
challengeType: 0
dashedName: part-9
---

# --description--

All `img` elements should have an `alt` attribute. The `alt` attribute's text is used for screen readers to improve accessibility and is displayed if the image fails to load. For example, `<img src="cat.jpg" alt="A cat">` has an `alt` attribute with the text `A cat`.

Add an `alt` attribute to the `img` element with the text `A cute orange cat lying on its back`.

# --hints--

Your code should have an `img` element. You removed the `img` element from an earlier step.

```js
assert(document.querySelector('img'));
```

Your `img` element does not have an `alt` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert(document.querySelector('img').hasAttribute('alt'));
```

Your `img` element's `alt` attribute value is set to something other than 'A cute orange cat lying on its back'. Make sure the `alt` attribute's value is surrounded with quotation marks.

```js
const altText = document
  .querySelector('img')
  .alt.toLowerCase()
  .replace(/\s+/g, ' ');
assert(altText.match(/A cute orange cat lying on its back\.?$/i));
```

# --seed--

## --seed-contents--

```html
<html>
  <body>
    <h1>CatPhotoApp</h1>
    <main>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
      <p>Click here to view more cat photos.</p>
--fcc-editable-region--
      <img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg">
--fcc-editable-region--
    </main>
  </body>
</html>
```

