---
id: 5f07c98cdb9413cbd4b16750
title: Part 16
challengeType: 0
dashedName: part-16
---

# --description--

It is time to add a new section. Add a second `section` element below the existing `section` element.

# --hints--

Your `section` element should have an opening tag. Opening tags have this syntax: `<elementName>`.

```js
assert(document.querySelectorAll('section').length >= 2);
```

You should only add one opening `section` tag. Please remove any extras.

```js
assert(document.querySelectorAll('section').length === 2);
```

Your `section` element should have a closing tag. Closing tags have a `/` just after the `<` character.

```js
assert(code.match(/<\/section>/g).length >= 2);
```

You should only add one closing `section` tag. Please remove any extras.

```js
assert(code.match(/<\/section>/g).length === 2);
```

The second `section` element should not be nested in the first `section` element.

```js
const childrenOf1stSection = [
  ...document.querySelector('main > section').children
];
const foundElems = childrenOf1stSection.filter((child) => {
  return child.nodeName === 'SECTION';
});
assert(foundElems.length === 0);
```

Both `section` elements should be between the opening and closing tags of the `main` element.

```js
const childrenOfMain = [...document.querySelector('main').children];
const foundElems = childrenOfMain.filter((child) => {
  return child.nodeName === 'SECTION';
});
assert(foundElems.length === 2);
```

# --seed--

## --seed-contents--

```html
<html>
  <body>
    <h1>CatPhotoApp</h1>
    <main>
--fcc-editable-region--
      <section>
        <h2>Cat Photos</h2>
        <!-- TODO: Add link to cat photos -->
        <p>Click here to view more <a target="_blank" href="https://freecatphotoapp.com">cat photos</a>.</p>
        <a href="https://freecatphotoapp.com"><img src="https://freecodecamp.s3.amazonaws.com/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
      </section>
--fcc-editable-region--
    </main>
  </body>
</html>
```

