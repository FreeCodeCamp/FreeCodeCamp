---
id: 5900f4b01000cf542c50ffc2
title: 'Problem 323: Bitwise-OR operations on random integers'
challengeType: 5
forumTopicId: 301980
dashedName: problem-323-bitwise-or-operations-on-random-integers
---

# --description--

Let $y_0, y_1, y_2, \ldots$ be a sequence of random unsigned 32 bit integers

(i.e. $0 ≤ y_i &lt; 2^{32}$, every value equally likely).

For the sequence $x_i$ the following recursion is given:

- $x_0 = 0$ and
- $x_i = x_{i - 1} \mathbf{|} y_{i - 1}$, for $i > 0$. ($\mathbf{|}$ is the bitwise-OR operator)

It can be seen that eventually there will be an index $N$ such that $x_i = 2^{32} - 1$ (a bit-pattern of all ones) for all $i ≥ N$.

Find the expected value of $N$. Give your answer rounded to 10 digits after the decimal point.

# --hints--

`bitwiseOrOnRandomIntegers()` should return `6.3551758451`.

```js
assert.strictEqual(bitwiseOrOnRandomIntegers(), 6.3551758451);
```

# --seed--

## --seed-contents--

```js
function bitwiseOrOnRandomIntegers() {

  return true;
}

bitwiseOrOnRandomIntegers();
```

# --solutions--

```js
// solution required
```
