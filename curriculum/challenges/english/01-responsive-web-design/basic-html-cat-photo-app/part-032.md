---
id: 5f07fb1579dc934717801375
title: Part 32
challengeType: 0
dashedName: part-32
---

# --description--

It is time to add a new section. Add a third `section` element below the second `section` element.

# --hints--

Your `section` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelectorAll('section').length >= 3);
```

You should only add one opening `section` tag. Please remove any extras.

```js
assert(document.querySelectorAll('section').length === 3);
```

Your `section` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/section>/g).length >= 3);
```

You should only add one closing `section` tag. Please remove any extras.

```js
assert(code.match(/<\/section>/g).length === 3);
```

All of the `section` elements should be between the opening and closing tags of the `main` element.

```js
const childrenOfMain = [...document.querySelector('main').children];
const sectionElemsFound = childrenOfMain.filter((child) => {
  return child.nodeName === 'SECTION';
});
assert(sectionElemsFound.length === 3);
```

The last `section` element should have no content. Remove any HTML elements or text within the `section` element.

```js
assert($('main > section')[2].children.length === 0);
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
    </main>
  </body>
</html>
```

