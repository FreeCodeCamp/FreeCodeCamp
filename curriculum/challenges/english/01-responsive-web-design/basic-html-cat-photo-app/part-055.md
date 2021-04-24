---
id: 5efc4f528d6a74d05e68af74
title: Part 55
challengeType: 0
dashedName: part-55
---

# --description--

There's another way to associate an `input` element's text with the element itself. You can nest the text within a `label` element and add a `for` attribute with the same value as the `input` element's `id` attribute.

Associate the text `Loving` with the checkbox by only nesting the text `Loving` in a `label` element and place it to the right side of the checkbox `input` element.

# --hints--

You should make sure the checkbox is still present.

```js
assert($('input[type="checkbox"]')[0]);
```

Your checkbox should still have an `id` attribute with the value `loving`. You may have removed the attribute or changed its value.

```js
assert($('input[type="checkbox"]')[0].id === 'loving');
```

The text ` Loving` should no longer be located directly to the right of your checkbox. It should be wrapped in a `label` element.

```js
const checkboxInputElem = $('input[type="checkbox"]')[0];
assert(
  !checkboxInputElem.nextSibling.nodeValue
    .replace(/\s+/g, ' ')
    .match(/ Loving/i)
);
```

You will need to add a new `label` element in which to nest the text `Loving`. Make sure it has both an opening and closing tag.

```js
assert(
  document.querySelectorAll('label').length === 3 &&
    code.match(/<\/label\>/g).length === 3
);
```

The new `label` element should be located directly to the right of your checkbox. Make sure there is a space between the two elements.

```js
const checkboxInputElem = $('input[type="checkbox"]')[0];
assert(checkboxInputElem.nextElementSibling.nodeName === 'LABEL');
```

The new `label` element does not have a `for` attribute. Check that there is a space after the opening tag's name.

```js
const labelElem = $('input[type="checkbox"]')[0].nextElementSibling;
assert(labelElem.hasAttribute('for'));
```

The new `label` element should have a `for` attribute with the value `loving`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const labelElem = $('input[type="checkbox"]')[0].nextElementSibling;
assert(labelElem.getAttribute('for').match(/^loving$/));
```

The text `Loving` should be nested within the new `label` element. You have either omitted the text or have a typo.

```js
const labelElem = document.querySelector('label[for="loving"]');
assert(labelElem.textContent.replace(/\s/g, '').match(/Loving/i));
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
          <fieldset>
            <legend>Is your cat an indoor or outdoor cat?</legend>
            <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
            <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
          </fieldset>
          <fieldset>
            <legend>What's your cat's personality?</legend>
--fcc-editable-region--
            <input id="loving" type="checkbox"> Loving
--fcc-editable-region--
          </fieldset>
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

