---
id: 5ef9b03c81a63668521804dd
title: Part 44
challengeType: 0
dashedName: part-44
---

# --description--

`label` elements are used to help associate the text for an `input` element with the input element itself (especially for assistive technologies like screen readers). For example, `<label><input type="radio"> cat</label>` makes it so clicking the word `cat` also selects the corresponding radio button.

Nest your `radio` button inside a `label` element.

# --hints--

You should make sure the radio button is still present.

```js
assert($('input[type="radio"]')[0]);
```

The text ` Indoor` should be located directly to the right of your `radio` button. Make sure there is a space between the element and the text. You have either omitted the text or have a typo.

```js
const radioInputElem = $('input')[0];
assert(
  radioInputElem.nextSibling.nodeValue.replace(/\s+/g, ' ').match(/ Indoor/i)
);
```

Your `label` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('label'));
```

Your `label` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/label\>/));
```

Your radio button and its text should all be located between the opening and closing tags of the `label` element.

```js
const labelChildNodes = [...$('form > label')[0].childNodes];
assert(
  labelChildNodes.filter((childNode) => childNode.nodeName === 'INPUT').length
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
          <input type="radio"> Indoor
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

