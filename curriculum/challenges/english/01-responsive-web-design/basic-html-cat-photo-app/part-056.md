---
id: 5efc518e8d6a74d05e68af75
title: Part 56
challengeType: 0
dashedName: part-56
---

# --description--

Add the `name` attribute with the value `personality` to the checkbox `input` element.

While you won't notice this in the browser, doing this makes it easier for a server to process your web form, especially when there are multiple checkboxes.

# --hints--

You should make sure the checkbox is still present.

```js
assert($('input[type="checkbox"]')[0]);
```

The checkbox `input` element does not have a `name` attribute. Check that there is a space after the opening tag's name.

```js
assert($('input[type="checkbox"]')[0].hasAttribute('name'));
```

The checkbox `input` element should have a `name` attribute with the value `personality`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert(
  $('input[type="checkbox"]')[0]
    .getAttribute('name')
    .match(/^personality$/)
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
            <input id="loving" type="checkbox"> <label for="loving">Loving</label>
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

