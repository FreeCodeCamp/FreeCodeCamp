---
id: 5efae16e3cbd2bbdab94e334
title: Part 30
challengeType: 0
dashedName: part-30
---

# --description--

After the last `img` element, add a `figcaption` element with the text `Cats hate other cats.`

# --hints--

Your `figcaption` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.

```js
assert(document.querySelectorAll('figcaption').length === 2);
```

Your `figcaption` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/figcaption\>/g).length === 2);
```

There should be a `figure` element right above the second `section` element's closing tag.

```js
assert($('main > section')[1].lastElementChild.nodeName === 'FIGURE');
```

The last `img` element should be nested in the `figure` element.

```js
const catsImg = document.querySelectorAll('figure > img')[1];
assert(
  catsImg &&
    catsImg.getAttribute('src').toLowerCase() === 'https://freecodecamp.s3.amazonaws.com/cats.jpg'
);
```

Your `figure` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.

```js
assert(document.querySelectorAll('figure').length === 2);
```

Your `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/figure\>/g).length === 2);
```

The `figcaption` element should be nested in the `figure` element.

```js
assert(document.querySelectorAll('figure > figcaption').length === 2);
```

The `figcaption` element nested in the `figure` element should be below the `img` element. You have the `img` element and the `figcaption` element in the wrong order.

```js
assert(
  document.querySelectorAll('figcaption')[1].previousElementSibling.nodeName ===
    'IMG'
);
```

The `figcaption` element should have the text `Cats hate other cats.` You have omitted a word or have a typo.

```js
assert(
  document
    .querySelectorAll('figcaption')[1]
    .innerText.toLowerCase()
    .match(/Cats hate other cats\.?$/i)
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
          <img src="https://freecodecamp.s3.amazonaws.com/lasagna.jpg" alt="A slice of lasagna on a plate.">
          <figcaption>Cats <em>love</em> lasagna.</figcaption>  
        </figure>
        <h3>Top 3 things cats hate:</h3>
        <ol>
          <li>flea treatment</li>
          <li>thunder</li>
          <li>other cats</li>
        </ol>
        <figure>
--fcc-editable-region--
          <img src="https://freecodecamp.s3.amazonaws.com/cats.jpg" alt="Five cats looking around a field.">
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

