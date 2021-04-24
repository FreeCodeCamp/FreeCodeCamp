---
id: 5ef9b03c81a63668521804da
title: Part 41
challengeType: 0
dashedName: part-41
---

# --description--

Use the `button` element to create a clickable button. For example, `<button>Click Here</button>` creates a button with the text `Click Here`.

Add a `button` element with the text `Submit` below the `input` element. Note the default behavior of clicking a form button with any attributes submits the form to the location specified in the form's `action` attribute.

# --hints--

Your `button` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('button'));
```

Your `button` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/button\>/));
```

Your `button` element's text should be 'Submit'. You have either omitted the text or have a typo.

```js
assert(document.querySelector('button').innerText.toLowerCase() === 'submit');
```

Your `button` element should be below the `input` element. You have them in the wrong order.

```js
const collection = [...document.querySelectorAll('input, button')].map(
  (node) => node.nodeName
);
assert(collection.indexOf('INPUT') < collection.indexOf('BUTTON'));
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
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
--fcc-editable-region--
        </form>
      </section>
    </main>
  </body>
</html>
```

