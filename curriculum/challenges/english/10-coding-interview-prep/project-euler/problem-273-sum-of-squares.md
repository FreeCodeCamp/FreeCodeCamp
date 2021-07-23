---
id: 5900f47e1000cf542c50ff90
title: 'Problem 273: Sum of Squares'
challengeType: 5
forumTopicId: 301923
dashedName: problem-273-sum-of-squares
---

# --description--

Consider equations of the form: $a^2 + b^2 = N$, $0 ≤ a ≤ b$, $a$, $b$ and $N$ integer.

For $N = 65$ there are two solutions:

$a = 1, b = 8$ and $a = 4, b = 7$.

We call $S(N)$ the sum of the values of $a$ of all solutions of $a^2 + b^2 = N$, $0 ≤ a ≤ b$, $a$, $b$ and $N$ integer.

Thus $S(65) = 1 + 4 = 5$.

Find $\sum S(N)$, for all squarefree $N$ only divisible by primes of the form $4k + 1$ with $4k + 1 &lt; 150$.

# --hints--

`sumOfSquares()` should return `2032447591196869000`.

```js
assert.strictEqual(sumOfSquares(), 2032447591196869000);
```

# --seed--

## --seed-contents--

```js
function sumOfSquares() {

  return true;
}

sumOfSquares();
```

# --solutions--

```js
// solution required
```
