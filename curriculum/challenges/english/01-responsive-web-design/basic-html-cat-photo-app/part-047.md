---
id: 5ef9b03c81a63668521804de
title: Part 47
challengeType: 0
dashedName: part-47
---

# --description--

Notice that both radio buttons can be selected at the same time. To make it so selecting one radio button automatically deselects the other, both buttons must have a `name` attribute with the same value.

Add the `name` attribute with the value `indoor-outdoor` to both radio buttons.

# --hints--

Both radio buttons should still be located between opening and closing `label` element tags.

```js
const labelChildNodes = [...document.querySelectorAll('form > label')].map(
  (node) => node.childNodes
);
assert(
  labelChildNodes.filter((childNode) => childNode[0].nodeName === 'INPUT')
    .length === 2
);
```

Both radio buttons should have a `name` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
const radioButtons = [...document.querySelectorAll('input[type="radio"]')];
assert(radioButtons.every((btn) => btn.hasAttribute('name')));
```

Both radio buttons should have a `name` attribute with the value `indoor-outdoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const radioButtons = [...$('input[type="radio"]')];
assert(
  radioButtons.every((btn) =>
    btn.getAttribute('name').match(/^indoor-outdoor$/)
  )
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
      <section>
        <h2>Cat Form</h2>
        <form action="https://freecatphotoapp.com/submit-cat-photo">
--fcc-editable-region--
          <label><input id="indoor" type="radio"> Indoor</label>
          <label><input id="outdoor" type="radio"> Outdoor</label>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

