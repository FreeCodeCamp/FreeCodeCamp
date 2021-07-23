---
id: 60f027c87bc98f050395c139
title: Part 3
challengeType: 0
dashedName: part-3
---

# --description--

Next, add opening and closing `head` and `body` tags within the `html` element.

# --hints--

You should have an opening `head` tag.

```js
assert(code.match(/<head\s*>/i));
```

You should have a closing `head` tag.

```js
assert(code.match(/<\/head\s*>/i));
```

You should have an opening `body` tag.

```js
assert(code.match(/<body\s*>/i));
```

You should have a closing `body` tag.

```js
assert(code.match(/<\/body\s*>/i));
```

The `head` and `body` elements should be siblings.

```js
assert(document.querySelector('head').nextElementSibling.localName === 'body');
```

The `head` element should be within the `html` element.

```js
assert([...document.querySelector('html').children].some(x => x.localName === 'head'));
```

The `body` element should be within the `html` element.

```js
assert([...document.querySelector('html').children].some(x => x.localName === 'body'));
```

# --seed--

## --seed-contents--

```html
--fcc-editable-region--
<!DOCTYPE html>
<html>

</html>
--fcc-editable-region--
```
