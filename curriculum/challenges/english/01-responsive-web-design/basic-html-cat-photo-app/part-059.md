---
id: 5f1a89f1190aff21ae42105a
title: Part 59
challengeType: 0
dashedName: part-59
---

# --description--

Like radio buttons, form data for selected checkboxes are `name` / `value` attribute pairs. While the `value` attribute is optional, it's best practice to include it with any checkboxes or radio buttons on the page.

Add a `value` attribute to each checkbox. For convenience, set each checkbox's `value` attribute to the same value as its `id` attribute.

# --hints--

All three checkboxes should have a `value` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
assert(checkboxes.every((checkbox) => checkbox.hasAttribute('value')));
```

The `value` attribute of the `Loving` checkbox should be set to `loving`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const lovingCheckbox = document.querySelector('#loving');
assert(lovingCheckbox.getAttribute('value').match(/^loving$/));
```

The `value` attribute of the `Lazy` checkbox should be set to `lazy`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const lazyCheckbox = document.querySelector('#lazy');
assert(lazyCheckbox.getAttribute('value').match(/^lazy$/));
```

The `value` attribute of the `Energetic` checkbox should be set to `energetic`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const energeticCheckbox = document.querySelector('#energetic');
assert(energeticCheckbox.getAttribute('value').match(/^energetic$/));
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
          <fieldset>
            <legend>Is your cat an indoor or outdoor cat?</legend>
            <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
            <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
          </fieldset>
          <fieldset>
            <legend>What's your cat's personality?</legend>
            <input id="loving" type="checkbox" name="personality"> <label for="loving">Loving</label>
            <input id="lazy" type="checkbox" name="personality"> <label for="lazy">Lazy</label>
            <input id="energetic" type="checkbox" name="personality"> <label for="energetic"> Energetic</label>
          </fieldset>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

