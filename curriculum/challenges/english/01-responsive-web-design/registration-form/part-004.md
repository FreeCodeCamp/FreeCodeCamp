---
id: 60f0286404aefb0562a4fdf9
title: Part 4
challengeType: 0
dashedName: part-4
---

# --description--

Add a `title` element to the `head`, and give your project a title of `freeCodeCamp Registration Form Project`. Also, nest a self-closing `link` element in the `head` element. Give it a `rel` attribute value of `stylesheet`, a `type` attribute value of `text/css`, and an `href` attribute value of `styles.css`.

# --hints--

Your code should have a `title` element.

```js
const title = document.querySelector('title');
assert.exists(title);
```

The `title` element should be within the `head` element.

```js
const head = document.querySelector('head');
// TODO: head does not contain title...body contains title
```

Your project should have a title of `freeCodeCamp Registration Form Project`.

```js
const title = document.querySelector('title');
assert.equal(title.text.toLowerCase(), 'freecodecamp registration form project')
```

Remember, the casing and spelling matters for the title.

```js
const title = document.querySelector('title');
assert.equal(title.text, 'freeCodeCamp Registration Form Project');
```

Your code should have a `link` element.

```js
assert.match(code, /<link/)
```

You should not change your existing `head` tags. Make sure you did not delete the closing tag.

```js
const heads = document.querySelectorAll('head');
assert.equal(heads?.length, 1);
```

Your `link` element should be a self-closing element.

```js
assert(code.match(/<link[\w\W\s]+\/>/i));
```

Your `link` element should be within your `head` element.

```js
assert(code.match(/<head>[\w\W\s]*<link[\w\W\s]*\/>[\w\W\s]*<\/head>/i))
```

Your `link` element should have a `rel` attribute with the value `stylesheet`.

```js
assert.match(code, /<link[\s\S]*?rel=('|"|`)stylesheet\1/)
```

Your `link` element should have a `type` attribute with the value `text/css`.

```js
assert.match(code, /<link[\s\S]*?type=('|"|`)text\/css\1/)
```

Your `link` element should have an `href` attribute with the value `styles.css`.

```js
assert.match(code, /<link[\s\S]*?href=('|"|`)(\.\/)?styles\.css\1/)
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html>
  --fcc-editable-region--
  <head>
    
  </head>
  <body>
  </body>
--fcc-editable-region--
</html>
```
