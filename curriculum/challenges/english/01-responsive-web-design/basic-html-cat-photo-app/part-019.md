---
id: 5dfa37b9eacea3f48c6300b0
title: Part 19
challengeType: 0
dashedName: part-19
---

# --description--

After the `h3` element with the `Things cats love:` text, add an unordered list (`ul`) element. Note that nothing will be displayed at this point.

# --hints--

Your `ul` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('ul'));
```

Your `ul` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/ul>/));
```

The `ul` element should be above the second `section` element's closing tag.

```js
const secondSectionLastElemNode = $('main > section')[1].lastElementChild;
assert(secondSectionLastElemNode.nodeName === 'UL');
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
      <section>
--fcc-editable-region--
        <h2>Cat Lists</h2>
        <h3>Things cats love:</h3>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

