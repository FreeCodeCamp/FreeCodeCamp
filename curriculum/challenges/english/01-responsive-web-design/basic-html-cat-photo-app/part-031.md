---
id: 5ef9b03c81a63668521804d4
title: Part 31
challengeType: 0
dashedName: part-31
---

# --description--

The `strong` element is used to indicate that some text is of strong importance or urgent.

In the `figcaption` you just added, indicate that `hate` is of strong importance by wrapping it in a `strong` element.

# --hints--

Your `strong` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('strong'));
```

Your strong element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/strong\>/));
```

Your strong element should surround the word `hate` in the text `Cats hate other cats.` You have either omitted the text or have a typo.

```js
assert(
  document
    .querySelectorAll('figcaption')[1]
    .querySelector('strong')
    .innerText.toLowerCase() === 'hate'
);
```

The `figcaption`'s text should be `Cats hate other cats.` Check for typos and that the necessary spaces are present around the `strong` element's opening and closing tags.

```js
const secondFigCaption = document.querySelectorAll('figcaption')[1];
assert(
  secondFigCaption &&
    secondFigCaption.innerText
      .replace(/\s+/gi, ' ')
      .trim()
      .match(/cats hate other cats\.?/i)
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
          <img src="https://freecodecamp.s3.amazonaws.com/cats.jpg" alt="Five cats looking around a field.">
--fcc-editable-region--
          <figcaption>Cats hate other cats.</figcaption>  
--fcc-editable-region--
        </figure>
      </section>
    </main>
  </body>
</html>
```

