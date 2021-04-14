---
id: 5ef9b03c81a63668521804d6
title: Part 34
challengeType: 0
dashedName: part-34
---

# --description--

Now you will add a web form to collect information from users.

After the `Cat Form` heading, add a `form` element.

# --hints--

Your `form` element should have an opening tag and closing tag. You may be missing one or both of the required tags, or have them in the wrong order.

```js
assert(document.querySelector('form') && code.match(/<\/form>/g));
```

Your `form` element tags are not in the correct order.

```js
const noSpaces = code.replace(/\s/g, '');
assert(noSpaces.indexOf('<form>') < noSpaces.indexOf('</form>'));
```

The `form` element nested in the last `section` element should be below the `h2` element. You have the `h2` element and the `form` element in the wrong order.

```js
assert(document.querySelector('form').previousElementSibling.nodeName === 'H2');
```

The `form` element should have no content. Remove any HTML elements or text between the `form` element's tags.

```js
assert($('form')[0].innerHTML.trim().length === 0);
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
--fcc-editable-region--
        <h2>Cat Form</h2>
--fcc-editable-region--
      </section>
    </main>
  </body>
</html>
```

