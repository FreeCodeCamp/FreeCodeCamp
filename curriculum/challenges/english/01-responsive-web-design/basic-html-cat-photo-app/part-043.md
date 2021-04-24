---
id: 5ef9b03c81a63668521804dc
title: Part 43
challengeType: 0
dashedName: part-43
---

# --description--

You can use radio buttons for questions where you want only one answer out of multiple options.

Here is an example of a radio button with the option of `cat`: `<input type="radio"> cat`. Remember that `input` elements are <dfn>self-closing</dfn>.

Before the text input, add a radio button with the option `Indoor`.

# --hints--

You should create an input element for your radio button. Check the syntax.

```js
assert($('form > input').length >= 2);
```

Your `input` element should have an opening tag, but not a closing tag.

```js
assert($('form > input') && !code.match(/<\/input\>/g));
```

You should only have added one input element for your radio button. Remove any extras.

```js
assert($('form > input').length === 2);
```

Your new `input` element should be above the existing `input` with `type` attribute set to `text`. You have them in the wrong order.

```js
const existingInputElem = document.querySelector('form > input[type="text"]');
assert(
  existingInputElem &&
    existingInputElem.previousElementSibling.nodeName === 'INPUT'
);
```

Your new `input` element does not have a `type` attribute. Check that there is a space after the opening tag's name.

```js
assert($('input')[0].hasAttribute('type'));
```

Your new `input` element should have a `type` attribute with the value `radio`. You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert(
  $('input')[0]
    .getAttribute('type')
    .match(/^radio$/i)
);
```

Although you have set the new `input` element's `type` attribute to `radio`, it is recommended to always surround the value of an attribute with quotation marks.

```js
assert(!/\<\s*input\s+type\s*=\s*radio/i.test(code));
```

The `radio` button's ` Indoor` text should be located after it instead of before it.

```js
const radioInputElem = $('input')[0];
assert(!radioInputElem.previousSibling.nodeValue.match(/Indoor/i));
```

The text ` Indoor` should be located directly to the right of your `radio` button. Make sure there is a space between the element and the text. You have either omitted the text or have a typo.

```js
const radioInputElem = $('input')[0];
assert(
  radioInputElem.nextSibling.nodeValue.replace(/\s+/g, ' ').match(/ Indoor/i)
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
--fcc-editable-region--
          <input type="text" name="catphotourl" placeholder="cat photo URL" required>
--fcc-editable-region--
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

