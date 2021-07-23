---
id: 5900f4c21000cf542c50ffd4
title: 'Problem 340: Crazy Function'
challengeType: 5
forumTopicId: 301999
dashedName: problem-340-crazy-function
---

# --description--

For fixed integers $a$, $b$, $c$, define the crazy function $F(n)$ as follows:

$$\begin{align}
  & F(n) = n - c \\;\text{ for all } n > b \\\\
  & F(n) = F(a + F(a + F(a + F(a + n)))) \\;\text{ for all } n ≤ b.
\end{align}$$

Also, define $S(a, b, c) = \displaystyle\sum_{n = 0}^b F(n)$.

For example, if $a = 50$, $b = 2000$ and $c = 40$, then $F(0) = 3240$ and $F(2000) = 2040$. Also, $S(50, 2000, 40) = 5\\,204\\,240$.

Find the last 9 digits of $S({21}^7, 7^{21}, {12}^7)$.

# --hints--

`crazyFunction()` should return `291504964`.

```js
assert.strictEqual(crazyFunction(), 291504964);
```

# --seed--

## --seed-contents--

```js
function crazyFunction() {

  return true;
}

crazyFunction();
```

# --solutions--

```js
// solution required
```
