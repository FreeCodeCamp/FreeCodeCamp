---
id: 5ddbd81294d8ddc1510a8e56
title: Part 11
challengeType: 0
dashedName: part-11
---

# --description--

A link's text must be placed between the opening and closing tags of an anchor (`a`) element. For example, `<a href="https://www.freecodecamp.org">click here to go to freeCodeCamp.org</a>` is a link with the text `click here to go to freeCodeCamp.org`.

Add the anchor text `cat photos` to the anchor element. This will become the link's text.

# --hints--

Your anchor (`a`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('a'));
```

Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/a\>/));
```

Your anchor (`a`) element's text should be `cat photos`. Make sure to put the link text between the anchor (`a`) element's opening tag and closing tag.

```js
assert(
  document.querySelector('a').innerText.toLowerCase().replace(/\s+/g, ' ') ===
    'cat photos'
);
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
      <a href="https://freecatphotoapp.com"></a>
--fcc-editable-region--
      <img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
    </main>
  </body>
</html>
```

