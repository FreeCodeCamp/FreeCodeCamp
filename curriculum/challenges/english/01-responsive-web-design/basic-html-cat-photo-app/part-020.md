---
id: 5dfb5ecbeacea3f48c6300b1
title: Part 20
challengeType: 0
dashedName: part-20
---

# --description--

Use list item (`li`) elements to create items in a list. Here is an example of list items in an unordered list:

```html
<ul>
  <li>milk</li>
  <li>cheese</li>
</ul>
```

Nest three list items within the `ul` element to display three things cats love: `cat nip`, `laser pointers` and `lasagna`.

# --hints--

You should have three `li` elements. Each `li` element should have its own opening and closing tag.

```js
assert($('li').length === 3 && code.match(/<\/li\>/g).length === 3);
```

You should have three `li` elements with the text `cat nip`, `laser pointers` and `lasagna` in any order. You have either omitted some text or have a typo.

```js
assert.deepStrictEqual(
  [...document.querySelectorAll('li')]
    .map((item) => item.innerText.toLowerCase())
    .sort((a, b) => a.localeCompare(b)),
  ['cat nip', 'lasagna', 'laser pointers']
);
```

The three `li` elements should be located between the `ul` element's opening and closing tags.

```js
assert(
  [...document.querySelectorAll('li')].filter(
    (item) => item.parentNode.nodeName === 'UL'
  ).length === 3
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
--fcc-editable-region--
        <ul>
        </ul>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

