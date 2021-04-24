---
id: 5ef9b03c81a63668521804d8
title: Part 36
challengeType: 0
dashedName: part-36
---

# --description--

The `input` element is allows you several ways to collect data from a web form. Like anchor (`a`) elements, `input` elements are <dfn>self-closing</dfn> and do not need closing tags.

Nest an `input` element in the `form` element.

# --hints--

Your `form` element should have an opening tag and closing tag in the correct order. You may be missing one or both of the required tags, or have them in the wrong order.

```js
const noSpaces = code.replace(/\s/g, '');
assert(
  document.querySelector('form') &&
    code.match(/<\/form>/g) &&
    noSpaces.indexOf('<form') < noSpaces.indexOf('</form>')
);
```

Your `form` element's opening tag should only have an `action` attribute. Remove anything else you may have typed in it.

```js
assert([...document.querySelector('form').attributes].length < 2);
```

You should create an input element. Check the syntax.

```js
assert(document.querySelector('input'));
```

Your `input` element should have an opening tag, but not a closing tag.

```js
assert(document.querySelector('input') && !code.match(/<\/input\>/g));
```

Your `input` element should be nested within the `form` element.

```js
assert(document.querySelector('form > input'));
```

Your `form` should only contain the `input` element. Remove any HTML elements or text between the `form` element's tags.

```js
assert(
  $('form')[0].children.length === 1 &&
    $('form')[0].innerText.trim().length === 0
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
--fcc-editable-region--
        <form action="https://freecatphotoapp.com/submit-cat-photo">
        </form>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

