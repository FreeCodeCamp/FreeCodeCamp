---
id: 5ef9b03c81a63668521804d2
title: Part 26
challengeType: 0
dashedName: part-26
---

# --description--

The code for an ordered list (`ol`) is similar to an unordered list, but list items in an ordered list are numbered when displayed.

After the final second section' last `h3` element, add an ordered list with these three list items: `flea treatment`, `thunder` and `other cats`.

# --hints--

Your `ol` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('ol'));
```

Your `ol` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/ol>/));
```

The `ol` element should be above the second `section` element's closing tag. You have them in the wrong order.

```js
assert($('main > section')[1].lastElementChild.nodeName === 'OL');
```

The three `li` elements should be nested inside the `ol` element.

```js
assert(
  [...document.querySelectorAll('li')].filter(
    (item) => item.parentNode.nodeName === 'OL'
  ).length === 3
);
```

You should have three `li` elements with the text `flea treatment`, `thunder` and `other cats` in any order.

```js
assert.deepStrictEqual(
  [...document.querySelectorAll('li')]
    .filter((item) => item.parentNode.nodeName === 'OL')
    .map((item) => item.innerText.toLowerCase())
    .sort((a, b) => a.localeCompare(b)),
  ['flea treatment', 'other cats', 'thunder']
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
--fcc-editable-region--
        <h3>Top 3 things cats hate:</h3>
--fcc-editable-region--
      </section>
    </main>

  </body>
</html>
```

