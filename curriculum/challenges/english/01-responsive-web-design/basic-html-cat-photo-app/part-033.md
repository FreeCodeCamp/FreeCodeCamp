---
id: 5ef9b03c81a63668521804d5
title: Part 33
challengeType: 0
dashedName: part-33
---

# --description--

Inside the third `section` element add an `h2` tag with the text `Cat Form`.

# --hints--

Unable to find the third `section` element. You may have accidentally deleted it or the opening tag or closing tag.

```js
assert(
  document.querySelectorAll('section').length === 3 &&
    code.match(/<\/section>/g).length === 3
);
```

Your `h2` element should have an opening tag and closing tag. You may be missing one or both of the required tags.

```js
assert(
  document.querySelectorAll('h2').length >= 3 &&
    code.match(/<\/h2>/g).length >= 3
);
```

You should only add one `h2` element. Please remove any extras.

```js
assert(document.querySelectorAll('h2').length === 3);
```

The new `h2` element should be located right above the third `section` element's closing tag.

```js
const thirdSection = document.querySelectorAll('section')[2];
assert(thirdSection.lastElementChild.nodeName === 'H2');
```

Your `h2` element's text should be `Cat Form`.

```js
const thirdSection = document.querySelectorAll('section')[2];
assert(
  thirdSection
    .querySelector('h2')
    .innerText.toLowerCase()
    .replace(/\s+/g, ' ') === 'cat form'
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
          <figcaption>Cats <strong>hate</strong> other cats.</figcaption>
        </figure>
      </section>
--fcc-editable-region--
      <section>
      </section>
--fcc-editable-region--
    </main>
  </body>
</html>
```

