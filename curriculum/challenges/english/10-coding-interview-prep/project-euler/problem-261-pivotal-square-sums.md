---
id: 5900f4711000cf542c50ff84
title: 'Problem 261: Pivotal Square Sums'
challengeType: 5
forumTopicId: 301910
dashedName: problem-261-pivotal-square-sums
---

# --description--

Let us call a positive integer $k$ a square-pivot, if there is a pair of integers $m > 0$ and $n ≥ k$, such that the sum of the ($m + 1$) consecutive squares up to $k$ equals the sum of the $m$ consecutive squares from ($n + 1$) on:

$${(k - m)}^2 + \ldots + k^2 = {(n + 1)}^2 + \ldots + {(n + m)}^2$$

Some small square-pivots are

$$\begin{align}
  & \mathbf{4}: 3^2 + \mathbf{4}^2 = 5^2 \\\\
  & \mathbf{21}: {20}^2 + \mathbf{21}^2 = {29}^2 \\\\
  & \mathbf{24}: {21}^2 + {22}^2 + {23}^2 + \mathbf{24}^2 = {25}^2 + {26}^2 + {27}^2 \\\\
  & \mathbf{110}: {108}^2 + {109}^2 + \mathbf{110}^2 = {133}^2 + {134}^2 \\\\
\end{align}$$

Find the sum of all distinct square-pivots $≤ {10}^{10}$.

# --hints--

`pivotalSquareSums()` should return `238890850232021`.

```js
assert.strictEqual(pivotalSquareSums(), 238890850232021);
```

# --seed--

## --seed-contents--

```js
function pivotalSquareSums() {

  return true;
}

pivotalSquareSums();
```

# --solutions--

```js
// solution required
```
