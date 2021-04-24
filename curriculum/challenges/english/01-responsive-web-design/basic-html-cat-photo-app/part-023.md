---
id: 5dfb6a35eacea3f48c6300b4
title: Part 23
challengeType: 0
dashedName: part-23
---

# --description--

A figure caption (`figcaption`) element is used to add a caption to describe the image contained withing the `figure` element. For example, `<figcaption>A cute cat</figcaption>` adds the caption `A cute cat`.

After the image nested in the `figure` element, add a `figcaption` element with the text `Cats love lasagna.`

# --hints--

The Lasagna `img` element should be nested in the `figure` element.

```js
assert(
  document.querySelector('figure > img') &&
    document.querySelector('figure > img').getAttribute('src').toLowerCase() ===
      'https://freecodecamp.s3.amazonaws.com/lasagna.jpg'
);
```

Your `figcaption` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.

```js
assert(document.querySelector('figcaption'));
```

Your `figcaption` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/figcaption\>/));
```

The `figcaption` element should be nested in the `figure` element.

```js
assert(
  document.querySelector('figure > figcaption') &&
    document.querySelector('figure > figcaption')
);
```

The lasagna `img` element should be nested in the `figure` element.

```js
assert(
  document.querySelector('figure > img') &&
    document.querySelector('figure > img').getAttribute('src').toLowerCase() ===
      'https://freecodecamp.s3.amazonaws.com/lasagna.jpg'
);
```

The `figcaption` element nested in the `figure` element should be below the `img` element. You have them in the wrong order.

```js
assert(
  document.querySelector('figcaption').previousElementSibling.nodeName === 'IMG'
);
```

Your `figcaption` element's text should be `Cats love lasagna.` You have either omitted the text or have a typo.

```js
assert(
  document.querySelector('figcaption').innerText.match(/Cats love lasagna.?$/i)
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
        <figure>
--fcc-editable-region--
          <img src="https://freecodecamp.s3.amazonaws.com/lasagna.jpg" alt="A slice of lasagna on a plate.">
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

