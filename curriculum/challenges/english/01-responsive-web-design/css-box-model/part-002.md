---
id: 60a3e3396c7b40068ad6996b
title: Part 2
challengeType: 0
dashedName: part-2
---

# --description--

Within the `head` element, add a `meta` tag which sets the `charset` to `UTF-8`, and a `title` element with the value `Rothko`.

Within the `body` element, add an `img` element with a `src` of `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png`.
# --hints--

Your code should have a `meta` tag.

```js
assert(document.querySelectorAll('meta').length === 1);
```

The `meta` tag should set the `charset` to `UTF-8`.

```js
assert(document.querySelector('meta').getAttribute('charset') === 'UTF-8');
```

Your code should have a `title` element.

```js
assert(document.querySelectorAll('title').length === 1);
```

The `title` should be `Rothko`.

```js
assert(document.querySelector('title').innerText === 'Rothko');
```

Your code should have an `img` element.

```js
assert(document.querySelectorAll('img').length === 1);
```

The `img` element should have a `src` of `https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png`.

```js
assert(document.querySelector('img').getAttribute('src') === 'https://cdn.freecodecamp.org/curriculum/css-box-model/diagram-1.png');
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html lang="en">
--fcc-editable-region--
  <head>
  </head>
  <body>
  </body>
--fcc-editable-region--
</html>
```
