---
id: 5dc24614f86c76b9248c6ebd
title: Part 10
challengeType: 0
dashedName: part-10
---

# --description--

You can link to another page with the anchor (`a`) element. For example, `<a href='https://freecodecamp.org'></a>` would link to `freecodecamp.org`.

Add an anchor element after the paragraph that links to `https://freecatphotoapp.com`. At this point, the link won’t show up in the preview.

# --hints--

Your anchor (`a`) element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelector('a'));
```

Your anchor (`a`) element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/a\>/));
```

Your anchor (`a`) element should be below the `p` element. You have them in the wrong order.

```js
const collection = [...document.querySelectorAll('a, p')].map(
  (node) => node.nodeName
);
assert(collection.indexOf('P') < collection.indexOf('A'));
```

Your anchor (`a`) element does not have an `href` attribute. Check that there is a space after the opening tag's name and/or there are spaces before all attribute names.

```js
assert(document.querySelector('a').hasAttribute('href'));
```

Your anchor (`a`) element should link to `https://freecatphotoapp.com`. You have either omitted the URL or have a typo.

```js
assert(
  document.querySelector('a').getAttribute('href') ===
    'https://freecatphotoapp.com'
);
```

Although you have set the anchor ('a') element's `href` attribute to the correct link, it is recommended to always surround the value of an attribute with quotation marks.

```js
assert(
  !/\<a\s+href\s*=\s*https:\/\/www.freecodecamp.org\/cat-photos/.test(code)
);
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
--fcc-editable-region--
      <p>Click here to view more cat photos.</p>
--fcc-editable-region--
      <img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg" alt="A cute orange cat lying on its back.">
    </main>
  </body>
</html>
```

