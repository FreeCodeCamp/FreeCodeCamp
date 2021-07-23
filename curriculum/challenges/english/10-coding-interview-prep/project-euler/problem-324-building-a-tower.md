---
id: 5900f4b11000cf542c50ffc3
title: 'Problem 324: Building a tower'
challengeType: 5
forumTopicId: 301981
dashedName: problem-324-building-a-tower
---

# --description--

Let $f(n)$ represent the number of ways one can fill a $3×3×n$ tower with blocks of $2×1×1$. You're allowed to rotate the blocks in any way you like; however, rotations, reflections etc of the tower itself are counted as distinct.

For example (with $q = 100\\,000\\,007$):

$$\begin{align}
  & f(2) = 229, \\\\
  & f(4) = 117\\,805, \\\\
  & f(10)\bmod q = 96\\,149\\,360, \\\\
  & f({10}^3)\bmod q = 24\\,806\\,056, \\\\
  & f({10}^6)\bmod q = 30\\,808\\,124.
\end{align}$$

Find $f({10}^{10000})\bmod 100\\,000\\,007$.

# --hints--

`buildingTower()` should return `96972774`.

```js
assert.strictEqual(buildingTower(), 96972774);
```

# --seed--

## --seed-contents--

```js
function buildingTower() {

  return true;
}

buildingTower();
```

# --solutions--

```js
// solution required
```
