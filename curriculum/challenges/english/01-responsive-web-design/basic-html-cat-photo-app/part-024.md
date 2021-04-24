---
id: 5ef9b03c81a63668521804d0
title: Part 24
challengeType: 0
dashedName: part-24
---

# --description--

Emphasize the word `love` in the `figcaption` element by wrapping it in an emphasis (`em`) element.

# --hints--

Your emphasis (`em`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('em'));
```

Your emphasis (`em`) element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/em\>/));
```

You have either deleted the `figcaption` element or it is missing an opening or closing tag.

```js
assert(document.querySelector('figcaption') && code.match(/<\/figcaption\>/));
```

Your emphasis (`em`) element should surround the text `love`. You have either omitted the text or have a typo.

```js
assert(
  document.querySelector('figcaption > em').innerText.toLowerCase() === 'love'
);
```

The `figcaption`'s text should be `Cats love lasagna`. Check for typos and that the necessary spaces are present around the `em` element's opening and closing tags.

```js
assert(
  document
    .querySelector('figcaption')
    .innerText.replace(/\s+/gi, ' ')
    .match(/cats love lasagna\.?/i)
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
--fcc-editable-region--
          <figcaption>Cats love lasagna.</figcaption>
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

