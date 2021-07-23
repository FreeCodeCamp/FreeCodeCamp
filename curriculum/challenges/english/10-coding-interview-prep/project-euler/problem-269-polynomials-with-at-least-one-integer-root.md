---
id: 5900f4791000cf542c50ff8c
title: 'Problem 269: Polynomials with at least one integer root'
challengeType: 5
forumTopicId: 301918
dashedName: problem-269-polynomials-with-at-least-one-integer-root
---

# --description--

A root or zero of a polynomial $P(x)$ is a solution to the equation $P(x) = 0$.

Define $P_n$ as the polynomial whose coefficients are the digits of $n$.

For example, $P_{5703}(x) = 5x^3 + 7x^2 + 3$.

We can see that:

- $P_n(0)$ is the last digit of $n$,
- $P_n(1)$ is the sum of the digits of $n$,
- $Pn(10)$ is $n$ itself.

Define $Z(k)$ as the number of positive integers, $n$, not exceeding $k$ for which the polynomial $P_n$ has at least one integer root.

It can be verified that $Z(100\\,000)$ is 14696.

What is $Z({10}^{16})$?

# --hints--

`polynomialsWithOneIntegerRoot()` should return `1311109198529286`.

```js
assert.strictEqual(polynomialsWithOneIntegerRoot(), 1311109198529286);
```

# --seed--

## --seed-contents--

```js
function polynomialsWithOneIntegerRoot() {

  return true;
}

polynomialsWithOneIntegerRoot();
```

# --solutions--

```js
// solution required
```
