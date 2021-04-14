---
id: 7cf9b03d81a65668421804c3
title: Part 38
challengeType: 0
dashedName: part-38
---

# --description--

In order for a form's data to be accessed by the locaton specified in the `action` attribute, you must give the text field a `name` attribute and assign it a value to represent the data being submitted. For example, you could use the following syntax for an email address text field: `<input type="text" name="email">`.

Add the `name` attribute with the value `catphotourl` to your text field.

# --hints--

You have either deleted your `input` element or it has invalid syntax. All attributes' values should be surrounded by quotation marks.

```js
assert($('input').length);
```

Your `form` should only contain the `input` element. Remove any HTML additional elements or text within the `form` element.

```js
assert(
  $('form')[0].children.length === 1 &&
    $('form')[0].innerText.trim().length === 0
);
```

Your `input` element does not have a `name` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert($('input')[0].hasAttribute('name'));
```

Your `input` element should have a `name` attribute with the value `catphotourl`.  You have either omitted the value or have a typo. Remember that attribute values should be surrounded with quotation marks.

```js
assert(
  $('input')[0]
    .getAttribute('name')
    .match(/^catphotourl$/i)
);
```

Although you have set the `input` element's `name` attribute to `catphotourl`, it is recommended to always surround the value of an attribute with quotation marks.

```js
assert(!/\<\s*input\s+.*\s*=\s*catphotourl/.test(code));
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
          <input type="text">
--fcc-editable-region--
        </form>
      </section>
    </main>
  </body>
</html>
```

