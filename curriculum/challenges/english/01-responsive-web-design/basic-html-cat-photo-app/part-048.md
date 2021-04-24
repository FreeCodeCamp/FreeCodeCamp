---
id: 5f1a80975fc4bcae0edb3497
title: Part 48
challengeType: 0
dashedName: part-48
---

# --description--

If you select the `Indoor` radio button and submit the form, the form data for the button is based on its `name` and `value` attributes. Since your radio buttons do not have a `value` attribute, the form data will include `indoor-outdoor=on`, which is not useful when you have multiple buttons.

Add a `value` attribute to both radio buttons. For convenience, set the button's `value` attribute to the same value as its `id` attribute.

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

Both radio buttons should have a `value` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
const radioButtons = [...document.querySelectorAll('input[type="radio"]')];
assert(radioButtons.every((btn) => btn.hasAttribute('value')));
```

The `Indoor` radio button's `value` attribute should be set to `indoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const indoorRadioButton = document.querySelector('#indoor');
assert(indoorRadioButton.getAttribute('value').match(/^indoor$/));
```

The `Outdoor` radio button's `value` attribute should be set to `outdoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
const outdoorRadioButton = document.querySelector('#outdoor');
assert(outdoorRadioButton.getAttribute('value').match(/^outdoor$/));
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
          <label><input id="indoor" type="radio" name="indoor-outdoor"> Indoor</label>
          <label><input id="outdoor" type="radio" name="indoor-outdoor"> Outdoor</label>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

