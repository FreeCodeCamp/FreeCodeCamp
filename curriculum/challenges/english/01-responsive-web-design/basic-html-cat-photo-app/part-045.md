---
id: 5ef9b03c81a63668521804df
title: Part 45
challengeType: 0
dashedName: part-45
---

# --description--

The `id` attribute is used to identify specific HTML elements. Each `id` attribute's value must be unique all other `id` values for the entire page.

Add an `id` attribute with the value `indoor` to the radio button. When elements have multiple attributes, the order of the attributes doesn't matter.

# --hints--

Your radio button should still be located between the opening and closing tags of the `label` element.

```js
const labelChildNodes = [...$('form > label')[0].childNodes];
assert(
  labelChildNodes.filter((childNode) => childNode.nodeName === 'INPUT').length
);
```

Your radio button should have an `id` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert($('input')[0].hasAttribute('id'));
```

Your radio element should have an `id` attribute with the value `indoor`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert($('input')[0].id.match(/^indoor$/));
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
          <label><input type="radio"> Indoor</label>
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

