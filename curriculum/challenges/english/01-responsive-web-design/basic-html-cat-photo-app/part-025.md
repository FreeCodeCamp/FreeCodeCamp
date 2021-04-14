---
id: 5ef9b03c81a63668521804d1
title: Part 25
challengeType: 0
dashedName: part-25
---

# --description--

After the `figure` element, add another `h3` element with the text `Top 3 things cats hate:`.

# --hints--

There should be an `h3` element right above the second `section` element's closing tag. Make it has an opening and closing tag.

```js
assert(
  document.querySelectorAll('main > section')[1].lastElementChild.nodeName ===
    'H3' && code.match(/<\/h3\>/g).length === 2
);
```

The new `h3` element should have the text `Top 3 things cats hate:`. Make sure to include the colon at the end of the text.

```js
assert(
  document
    .querySelectorAll('main > section')[1]
    .lastElementChild.innerText.toLowerCase()
    .replace(/\s+/g, ' ') === 'top 3 things cats hate:'
);
```

There should be a `figure` above the new `h3` element. You may have accidentally deleted the `figure` element.

```js
const secondSectionLastElemNode = document.querySelectorAll('main > section')[1]
  .lastElementChild;
assert(
  secondSectionLastElemNode.nodeName === 'H3' &&
    secondSectionLastElemNode.previousElementSibling.nodeName === 'FIGURE'
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
        <figure>
          <img src="https://freecodecamp.s3.amazonaws.com/lasagna.jpg" alt="A slice of lasagna on a plate.">
          <figcaption>Cats <em>love</em> lasagna.</figcaption>  
        </figure>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

