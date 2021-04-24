---
id: 5efc575c8d6a74d05e68af77
title: Part 58
challengeType: 0
dashedName: part-58
---

# --description--

Add a final checkbox after the previous one with an `id` attribute value of `energetic`. The `name` and attribute should be the same as the last checkbox.

Also add a `label` element to the right of the new checkbox with text `Energetic`. Make sure to associate the `label` element with the new checkbox.

# --hints--

You need to add a new checkbox.

```js
assert($('input[type="checkbox"]').length === 3);
```

Your new checkbox should have an `id` attribute with the value `energetic` and a `name` attribute with the value `personality`. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
const checkboxes = [...$('input[type="checkbox"]')];
assert(
  checkboxes.some(
    (checkbox) =>
      checkbox.id === 'energetic' &&
      checkbox.getAttribute('name') === 'personality'
  )
);
```

Your new checkbox should be after the first one. You have them in the wrong order.

```js
const checkboxes = [...$('input[type="checkbox"]')].map(
  (checkbox) => checkbox.id
);
assert(checkboxes.indexOf('lazy') < checkboxes.indexOf('energetic'));
```

On the right side of your new checkbox, there should be `label` element with the text `Energetic`.

```js
const nextElementSibling = $('input[type="checkbox"]')[2].nextElementSibling;
assert(
  nextElementSibling.nodeName === 'LABEL' &&
    nextElementSibling.innerText.replace(/\s+/g, '').match(/^Energetic$/i)
);
```

The new `label` should have a `for` attribute with the same value as the `id` attribute of the new checkbox. You have either omitted the value or have a typo.

```js
assert(
  $('input[type="checkbox"]')[2].nextElementSibling.getAttribute('for') ===
    'energetic'
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
            <legend>What's your cat's personality?</legend>
--fcc-editable-region--
            <input id="loving" type="checkbox" name="personality"> <label for="loving">Loving</label>
            <input id="lazy" type="checkbox" name="personality"> <label for="lazy">Lazy</label>
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

