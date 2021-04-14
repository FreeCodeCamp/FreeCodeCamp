---
id: 5efada803cbd2bbdab94e332
title: Part 28
challengeType: 0
dashedName: part-28
---

# --description--

Inside the `figure` element you just added, nest an `img` element with a `src` attribute set to `https://freecodecamp.s3.amazonaws.com/cats.jpg`.

# --hints--

Your second `figure` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelectorAll('figure').length === 2);
```

Your second `figure` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/figure>/g).length === 2);
```

There should be a second `figure` element right above the second `section` element's closing tag. You have them in the wrong order.

```js
assert($('main > section')[1].lastElementChild.nodeName === 'FIGURE');
```

You should have a third `img` element nested in the `figure` element.

```js
const catsImg = document.querySelectorAll('figure > img')[1];
assert(
  catsImg &&
    catsImg.getAttribute('src').toLowerCase() === 'https://freecodecamp.s3.amazonaws.com/cats.jpg'
);
```

The third image should have an `src` attribute set to `https://freecodecamp.s3.amazonaws.com/cats.jpg`.

```js
const catsImg = document.querySelectorAll('figure > img')[1];
assert(
  catsImg &&
    catsImg.getAttribute('src').toLowerCase() === 'https://freecodecamp.s3.amazonaws.com/cats.jpg'
);
```

Although you have set the new image's `src` to the correct URL, it is recommended to always surround the value of an attribute with quotation marks.

```js
assert(!/\<img\s+.+\s+src\s*=\s*https:\/\/freecodecamp\.s3\.amazonaws\.com\/cats\.jpg/.test(code));
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
--fcc-editable-region--
        <figure>
        </figure>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

