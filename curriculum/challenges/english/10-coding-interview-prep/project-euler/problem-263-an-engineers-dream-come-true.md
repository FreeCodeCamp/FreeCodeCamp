---
id: 5900f4741000cf542c50ff86
title: 'Problem 263: An engineers'' dream come true'
challengeType: 5
forumTopicId: 301912
dashedName: problem-263-an-engineers-dream-come-true
---

# --description--

Consider the number 6. The divisors of 6 are: 1,2,3 and 6.

Every number from 1 up to and including 6 can be written as a sum of distinct divisors of 6:

$1 = 1$, $2 = 2$, $3 = 1 + 2$, $4 = 1 + 3$, $5 = 2 + 3$, $6 = 6$.

A number $n$ is called a practical number if every number from 1 up to and including $n$ can be expressed as a sum of distinct divisors of $n$.

A pair of consecutive prime numbers with a difference of six is called a sexy pair (since "sex" is the Latin word for "six"). The first sexy pair is (23, 29).

We may occasionally find a triple-pair, which means three consecutive sexy prime pairs, such that the second member of each pair is the first member of the next pair.

We shall call a number $n$ such that:

- ($n - 9$, $n - 3$), ($n - 3$, $n + 3$), ($n + 3$, $n + 9$) form a triple-pair, and
- the numbers $n - 8$, $n - 4$, $n$, $n + 4$ and $n + 8$ are all practical,

an engineers’ paradise.

Find the sum of the first four engineers’ paradises.

# --hints--

`engineersDreamComeTrue()` should return `2039506520`.

```js
assert.strictEqual(engineersDreamComeTrue(), 2039506520);
```

# --seed--

## --seed-contents--

```js
function engineersDreamComeTrue() {

  return true;
}

engineersDreamComeTrue();
```

# --solutions--

```js
// solution required
```
