---
id: 5dfa30b9eacea3f48c6300ad
title: Part 14
challengeType: 0
dashedName: part-14
---

# --description--

Turn the image into a link by surrounding it with necessary element tags. Use `https://freecatphotoapp.com` as the anchor's `href` attribute value.

# --hints--

You should have an `img` element with an `src` value of `https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg`. You may have accidentally deleted it.

```js
assert(
  document.querySelector('img') &&
    document.querySelector('img').getAttribute('src') ===
      'https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg'
);
```

Your anchor (`a`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelectorAll('a').length >= 2);
```

You should only add one opening anchor (`a`) tag. Please remove any extras.

```js
assert(document.querySelectorAll('a').length === 2);
```

Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/a>/g).length >= 2);
```

You should only add one closing anchor (`a`) tag. Please remove any extras.

```js
assert(code.match(/<\/a>/g).length === 2);
```

Your anchor (`a`) element does not have an `href` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert(document.querySelector('a').hasAttribute('href'));
```

Your anchor (`a`) element should link to `https://freecatphotoapp.com`. You have either omitted the URL or have a typo.

```js
assert(
  document.querySelectorAll('a')[1].getAttribute('href') ===
    'https://freecatphotoapp.com'
);
```

Your `img` element should be nested within the anchor (`a`) element. The entire `img` element should be inside the opening and closing tags of the anchor (`a`) element.

```js
assert(document.querySelector('img').parentNode.nodeName === 'A');
```

# --seed--

## --seed-contents--

```html
<html>
  <body>
    <h1>CatPhotoApp</h1>
    <main>
      <h2>Cat Photos</h2>
      <!-- TODO: Add link to cat photos -->
      <p>Click here to view more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a>.</p>
--fcc-editable-region--
      <img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
--fcc-editable-region--
    </main>
  </body>
</html>
```

