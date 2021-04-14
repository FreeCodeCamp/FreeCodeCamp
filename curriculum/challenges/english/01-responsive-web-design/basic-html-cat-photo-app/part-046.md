---
id: 5f05a1d8e233dff4a68508d8
title: Part 46
challengeType: 0
dashedName: part-46
---

# --description--

Nest a another radio button with the option `Outdoor` in a new `label` element. The new radio button should be placed after the first one. Also, set its `id` attribute value to `outdoor`.

# --hints--

You will need to add a new `label` element in which to nest your new radio button. Make sure it has both an opening and closing tag.

```js
assert(
  document.querySelectorAll('label').length === 2 &&
    code.match(/<\/label\>/g).length === 2
);
```

The text ` Outdoor` should be located directly to the right of your new `radio` button. Make sure there is a space between the element and the text. You have either omitted the text or have a typo.

```js
const radioButtons = [...$('input')];
assert(
  radioButtons.filter((btn) =>
    btn.nextSibling.nodeValue.replace(/\s+/g, ' ').match(/ Outdoor/i)
  ).length
);
```

Your new radio button and associated label should be below the first one. You have them in the wrong order.

```js
const collection = [
  ...document.querySelectorAll('input[type="radio"]')
].map((node) => node.nextSibling.nodeValue.replace(/\s+/g, ''));
assert(collection.indexOf('Indoor') < collection.indexOf('Outdoor'));
```

Your new radio button should have an `id` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert($('input')[1].hasAttribute('id'));
```

Your new radio element should have an `id` attribute with the value `outdoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert($('input')[1].id.match(/^outdoor$/));
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
          <label><input id="indoor" type="radio"> Indoor</label>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

