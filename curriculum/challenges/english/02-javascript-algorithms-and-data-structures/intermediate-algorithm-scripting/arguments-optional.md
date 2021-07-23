---
id: a97fd23d9b809dac9921074f
title: Arguments Optional
challengeType: 5
forumTopicId: 14271
dashedName: arguments-optional
---

# --description--

Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, `addTogether(2, 3)` should return `5`, and `addTogether(2)` should return a function.

Calling this returned function with a single argument will then return the sum:

```js
var sumTwoAnd = addTogether(2);
```

`sumTwoAnd(3)` returns `5`.

If either argument isn't a valid number, return undefined.

# --hints--

`addTogether(2, 3)` should return 5.

```js
assert.deepEqual(addTogether(2, 3), 5);
```

`addTogether(23, 30)` should return 53.

```js
assert.deepEqual(addTogether(23, 30), 53);
```

`addTogether(5)(7)` should return 12.

```js
assert.deepEqual(addTogether(5)(7), 12);
```

`addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")` should return `undefined`.

```js
assert.isUndefined(addTogether('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));
```

`addTogether(2, "3")` should return `undefined`.

```js
assert.isUndefined(addTogether(2, '3'));
```

`addTogether(2)([3])` should return `undefined`.

```js
assert.isUndefined(addTogether(2)([3]));
```

# --seed--

## --seed-contents--

```js
function addTogether() {
  return false;
}

addTogether(2,3);
```

# --solutions--

```js
function addTogether() {
  var a = arguments[0];
  if (toString.call(a) !== '[object Number]') return;
  if (arguments.length === 1) {
    return function(b) {
      if (toString.call(b) !== '[object Number]') return;
      return a + b;
    };
  }
  var b = arguments[1];
  if (toString.call(b) !== '[object Number]') return;
  return a + arguments[1];
}
```
