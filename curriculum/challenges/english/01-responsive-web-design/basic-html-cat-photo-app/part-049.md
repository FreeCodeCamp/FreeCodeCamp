---
id: 5ef9b03c81a63668521804e1
title: Part 49
challengeType: 0
dashedName: part-49
---

# --description--

The `fieldset` element is used to group related inputs and labels together in a web form. `fieldset` elements are <dfn>block-level elements</dfn>, meaning that they appear on a new line.

Nest the `Indoor` and `Outdoor` radio buttons within a `fieldset` element, and don't forget to indent the buttons.

# --hints--

Both radio buttons should still be located between opening and closing `label` element tags.

```js
const labelChildNodes = [...$('label')].map((node) => [...node.childNodes]);
assert(
  labelChildNodes.filter((childNode) => childNode[0].nodeName === 'INPUT')
    .length === 2
);
```

Your `fieldset` element should have an opening tag. Opening tags have the following syntax: `<elementName>`.

```js
assert(document.querySelector('fieldset'));
```

Your `fieldset` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/fieldset\>/));
```

Both radio button and associated labels should be between the opening and closing tags of the `fieldset` element.

```js
const radioButtons = [...$('input[type="radio"]')];
assert(
  radioButtons.every((btn) => btn.parentNode.parentNode.nodeName === 'FIELDSET')
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
      <section>
        <h2>Cat Form</h2>
        <form action="https://freecatphotoapp.com/submit-cat-photo">
--fcc-editable-region--
          <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
          <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

