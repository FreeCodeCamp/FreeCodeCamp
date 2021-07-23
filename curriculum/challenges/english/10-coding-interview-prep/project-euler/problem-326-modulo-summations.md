---
id: 5900f4b21000cf542c50ffc5
title: 'Problem 326: Modulo Summations'
challengeType: 5
forumTopicId: 301983
dashedName: problem-326-modulo-summations
---

# --description--

Let an be a sequence recursively defined by: $a_1 = 1$, $\displaystyle a_n = \left(\sum_{k = 1}^{n - 1} k \times a_k\right)\bmod n$.

So the first 10 elements of $a_n$ are: 1, 1, 0, 3, 0, 3, 5, 4, 1, 9.

Let $f(N, M)$ represent the number of pairs $(p, q)$ such that:

$$ 1 \le p \le q \le N \\; \text{and} \\; \left(\sum_{i = p}^q a_i\right)\bmod M = 0$$

It can be seen that $f(10, 10) = 4$ with the pairs (3,3), (5,5), (7,9) and (9,10).

You are also given that $f({10}^4, {10}^3) = 97\\,158$.

Find $f({10}^{12}, {10}^6)$.

# --hints--

`moduloSummations()` should return `1966666166408794400`.

```js
assert.strictEqual(moduloSummations(), 1966666166408794400);
```

# --seed--

## --seed-contents--

```js
function moduloSummations() {

  return true;
}

moduloSummations();
```

# --solutions--

```js
// solution required
```
