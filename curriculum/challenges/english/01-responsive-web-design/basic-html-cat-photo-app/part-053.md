---
id: 5ef9b03c81a63668521804e2
title: Part 53
challengeType: 0
dashedName: part-53
---

# --description--

Forms commonly use checkboxes for questions that may have more than one answer. For example, here's a checkbox with the option of `tacos`: `<input type="checkbox"> tacos`.

Under the `legend` element you just added, add an `input` with its `type` attribute set to `checkbox` and give it the option of `Loving`.

# --hints--

The `input` element for your checkbox should have an opening tag, but not a closing tag.

```js
assert($('fieldset > input') && !code.match(/<\/input\>/g));
```

You should only have added one input element for your checkbox. Remove any extras.

```js
assert($('fieldset > input').length === 1);
```

Your new `input` element should be below the `legend` element with the text `What's your cat's personality?`. You have them in the wrong order.

```js
const existingLegendElem = $('fieldset > legend')[1];
assert(
  existingLegendElem &&
    existingLegendElem.nextElementSibling.nodeName === 'INPUT'
);
```

Your new `input` element does not have a `type` attribute. Check that there is a space after the opening tag's name.

```js
assert($('fieldset > input')[0].hasAttribute('type'));
```

Your new `input` element should have a `type` attribute with the value `checkbox`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert(
  $('fieldset > input')[0]
    .getAttribute('type')
    .match(/^checkbox$/i)
);
```

Although you have set the new `input` element's `type` attribute to `checkbox`, it is recommended to always surround the value of an attribute with quotation marks.

```js
assert(!/\<\s*input\s+type\s*=\s*checkbox/i.test(code));
```

The text ` Loving` should be located directly to the right of your checkbox. Make sure there is a space between the element and the text. You have either omitted the text or have a typo.

```js
const checkboxInputElem = $('input[type="checkbox"]')[0];
assert(
  checkboxInputElem.nextSibling.nodeValue.replace(/\s+/g, ' ').match(/ Loving/i)
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
          <fieldset>
            <legend>Is your cat an indoor or outdoor cat?</legend>
            <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
            <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
          </fieldset>
          <fieldset>
--fcc-editable-region--
            <legend>What's your cat's personality?</legend>
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

