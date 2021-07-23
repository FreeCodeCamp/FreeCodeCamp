---
id: 5900f4b71000cf542c50ffc9
title: 'Problem 330: Euler''s Number'
challengeType: 5
forumTopicId: 301988
dashedName: problem-330-eulers-number
---

# --description--

An infinite sequence of real numbers $a(n)$ is defined for all integers $n$ as follows:

$$ a(n) =
\begin{cases}
1                                                       & n < 0 \\\\
\displaystyle \sum_{i = 1}^{\infty} \frac{a(n - 1)}{i!} & n \ge 0
\end{cases}
$$

For example,

$$\begin{align}
  & a(0) = \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \ldots = e − 1 \\\\
  & a(1) = \frac{e − 1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \ldots = 2e − 3 \\\\
  & a(2) = \frac{2e − 3}{1!} + \frac{e − 1}{2!} + \frac{1}{3!} + \ldots = \frac{7}{2} e − 6
\end{align}$$

with $e = 2.7182818\ldots$ being Euler's constant.

It can be shown that $a(n)$ is of the form $\displaystyle\frac{A(n)e + B(n)}{n!}$ for integers $A(n)$ and $B(n)$.

For example $\displaystyle a(10) = \frac{328161643e − 652694486}{10!}$.

Find $A({10}^9)$ + $B({10}^9)$ and give your answer $\bmod 77\\,777\\,777$.

# --hints--

`eulersNumber()` should return `15955822`.

```js
assert.strictEqual(eulersNumber(), 15955822);
```

# --seed--

## --seed-contents--

```js
function eulersNumber() {

  return true;
}

eulersNumber();
```

# --solutions--

```js
// solution required
```
