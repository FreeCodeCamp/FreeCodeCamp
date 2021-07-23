---
id: 60a3e3396c7b40068ad69970
title: Part 7
challengeType: 0
dashedName: part-7
---

# --description--

Before you can start styling the `div` you added, you need to link your CSS to your HTML.

Add a `link` element to link your `styles.css` file. Set the `href` to `./styles.css`, and remember to set the `rel` attribute to `stylesheet`.

# --hints--

Your code should have a `link` element.

```js
assert(document.querySelectorAll('link').length)
```

The `link` element should have an `href` of `./styles.css`.

```js
assert(document.querySelectorAll('link')[1].getAttribute('href') === './styles.css');
```

The `rel` attribute should have the value `stylesheet`.

```js
assert(document.querySelectorAll('link')[1].getAttribute('rel') === 'stylesheet');
```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Rothko</title>
--fcc-editable-region--

--fcc-editable-region--
  </head>
  <body>
    <div class="canvas">
    </div>
  </body>
</html>
```
