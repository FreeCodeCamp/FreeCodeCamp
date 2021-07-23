---
id: 5900f4831000cf542c50ff95
title: 'Problem 278: Linear Combinations of Semiprimes'
challengeType: 5
forumTopicId: 301928
dashedName: problem-278-linear-combinations-of-semiprimes
---

# --description--

Given the values of integers $1 &lt; a_1 &lt; a_2 &lt; \ldots &lt; a_n$, consider the linear combination $q_1a_1 + q_2a_2 + \ldots + q_na_n = b$, using only integer values $q_k ≥ 0$.

Note that for a given set of $a_k$, it may be that not all values of $b$ are possible. For instance, if $a_1 = 5$ and $a_2 = 7$, there are no $q_1 ≥ 0$ and $q_2 ≥ 0$ such that $b$ could be 1, 2, 3, 4, 6, 8, 9, 11, 13, 16, 18 or 23.

In fact, 23 is the largest impossible value of $b$ for $a_1 = 5$ and $a_2 = 7$. We therefore call $f(5, 7) = 23$. Similarly, it can be shown that $f(6, 10, 15)=29$ and $f(14, 22, 77) = 195$.

Find $\sum f(pq,pr,qr)$, where $p$, $q$ and $r$ are prime numbers and $p &lt; q &lt; r &lt; 5000$.

# --hints--

`linearCombinationOfSemiprimes()` should return `1228215747273908500`.

```js
assert.strictEqual(linearCombinationOfSemiprimes(), 1228215747273908500);
```

# --seed--

## --seed-contents--

```js
function linearCombinationOfSemiprimes() {

  return true;
}

linearCombinationOfSemiprimes();
```

# --solutions--

```js
// solution required
```
