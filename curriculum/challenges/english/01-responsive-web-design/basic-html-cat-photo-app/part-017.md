---
id: 5dfa3589eacea3f48c6300ae
title: Part 17
challengeType: 0
dashedName: part-17
---

# --description--

Within the second `section` element, add a new `h2` element with the text `Cat Lists`.

# --hints--

Your `section` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(
  document.querySelectorAll('section').length === 2 &&
    code.match(/<\/section>/g).length === 2
);
```

Your `h2` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelectorAll('h2').length === 2);
```

Your `h2` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/h2\>/g).length === 2);
```

Your second `h2` element should be right above the second `section` element's closing tag. It is not in the correct position.

```js
const secondSection = document.querySelectorAll('section')[1];
assert(secondSection.lastElementChild.nodeName === 'H2');
```

The second `h2` element should have the text `Cat Lists`. You have either omitted the text or have a typo.

```js
assert(
  document
    .querySelectorAll('main > section')[1]
    .lastElementChild.innerText.toLowerCase() === 'cat lists'
);
```

# --seed--

## --seed-contents--

```html
<html>
  <body>
    <h1>CatPhotoApp</h1>
    <main>
      <section>
        <h2>Cat Photos</h2>
        <!-- TODO: Add link to cat photos -->
        <p>Click here to view more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a>.</p>
        <a href="https://freecatphotoapp.com"><img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
      </section>
--fcc-editable-region--
      <section>
      </section>
--fcc-editable-region--
    </main>
  </body>
</html>
```

