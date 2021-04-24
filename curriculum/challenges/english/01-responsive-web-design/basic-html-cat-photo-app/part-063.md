---
id: 5ef9b03c81a63668521804e9
title: Part 63
challengeType: 0
dashedName: part-63
---

# --description--

Make the text `freeCodeCamp.org` into a link by enclosing it in an anchor (`a`) element. The `href` attribute should be set to `https://www.freecodecamp.org`.

# --hints--

Your anchor (`a`) element should be nested within the `footer` element. Make sure to added an opening tag and closing tag for the anchor (`a`) element.

```js
assert($('footer > p > a').length);
```

Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
const aElemClosingTags = code.match(/<\/a\>/g);
assert(aElemClosingTags && aElemClosingTags.length === 3);
```

Your anchor (`a`) element should have an `href` attribute with the value `https://www.freecodecamp.org`. You may have omitted the attribute/value, or have a typo.

```js
const nestedAnchor = $('footer > p > a')[0];
assert(nestedAnchor.getAttribute('href') === 'https://www.freecodecamp.org');
```

The link's text should be `freeCodeCamp.org`. You have either omitted the text or have a typo.

```js
const nestedAnchor = $('footer > p > a')[0];
assert(
  nestedAnchor.innerText.toLowerCase().replace(/\s+/g, ' ') ===
    'freecodecamp.org'
);
```

After nesting the anchor (`a`) element, the only `p` element content visible in the browser should be `No Copyright - freeCodeCamp.org`. Double check the text, spacing, or punctuation of both the `p` and nested anchor element.

```js
const pText = $('footer > p')[0].innerText.toLowerCase().replace(/\s+/g, ' ');
assert(pText.match(/^no copyright - freecodecamp.org$/));
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
            <label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked> Indoor</label>
            <label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
          </fieldset>
          <fieldset>
            <legend>What's your cat's personality?</legend>
            <input id="loving" type="checkbox" name="personality" value="loving" checked> <label for="loving">Loving</label>
            <input id="lazy" type="checkbox" name="personality" value="lazy"> <label for="lazy">Lazy</label>
            <input id="energetic" type="checkbox" name="personality" value="energetic"> <label for="energetic">Energetic</label>
          </fieldset>
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
    <footer>
      <p>
--fcc-editable-region--
        No Copyright - freeCodeCamp.org
--fcc-editable-region--
      </p>
    </footer>
  </body>
</html>
```

