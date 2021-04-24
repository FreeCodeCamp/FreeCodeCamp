---
id: 5f0d4d04b435f13ab6550053
title: Part 52
challengeType: 0
dashedName: part-52
---

# --description--

Add a `legend` element with the text `What's your cat's personality?` inside the second `fieldset` element.

# --hints--

You have either deleted the second `fieldset` element or it is missing an opening tag or closing tag."

```js
assert(
  document.querySelectorAll('fieldset').length === 2 &&
    code.match(/<\/fieldset>/g).length === 2
);
```

Your `legend` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
const secondFieldset = $('fieldset')[1];
assert(
  secondFieldset &&
    [...secondFieldset.children].filter((child) => child.nodeName === 'LEGEND')
      .length
);
```

Your `legend` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/legend\>/g).length === 2);
```

The `legend` element should have the text `What's your cat's personality?`. You have either omitted the text or have a typo.

```js
const secondFieldset = $('fieldset')[1];
assert(
  secondFieldset &&
    [...secondFieldset.children].filter((child) => {
      const extraSpacesRemoved = child.innerText.replace(/\s+/g, ' ');
      return (
        child.nodeName === 'LEGEND' &&
        extraSpacesRemoved.match(/What's your cat's personality\??$/i)
      );
    }).length
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
--fcc-editable-region--
          <fieldset>
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

