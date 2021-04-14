---
id: 5dfb655eeacea3f48c6300b3
title: Part 22
challengeType: 0
dashedName: part-22
---

# --description--

The `figure` element represents self-contained content and will allow you to associate an image with a caption.

Nest the image you just added within a `figure` element.

# --hints--

Your `figure` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.

```js
assert(document.querySelector('figure'));
```

Your `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/figure\>/));
```

There should be an `figure` element right above the second `section` element's closing tag.

```js
assert($('section')[1].lastElementChild.nodeName === 'FIGURE');
```

The lasagna `img` element should be nested in the `figure` element.

```js
assert(
  document.querySelector('figure > img') &&
    document.querySelector('figure > img').getAttribute('src').toLowerCase() ===
      'https://freecodecamp.s3.amazonaws.com/lasagna.jpg'
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
      <section>
        <h2>Cat Lists</h2>
        <h3>Things cats love:</h3>
        <ul>
          <li>cat nip</li>
          <li>laser pointers</li>
          <li>lasagna</li>
        </ul>
--fcc-editable-region--
        <img src="https://freecodecamp.s3.amazonaws.com/lasagna.jpg" alt="A slice of lasagna on a plate.">
--fcc-editable-region--
      </section>
    </main>

  </body>
</html>
```

