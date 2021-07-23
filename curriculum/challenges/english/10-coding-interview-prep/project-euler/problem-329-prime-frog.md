---
id: 5900f4b51000cf542c50ffc8
title: 'Problem 329: Prime Frog'
challengeType: 5
forumTopicId: 301986
dashedName: problem-329-prime-frog
---

# --description--

Susan has a prime frog.

Her frog is jumping around over 500 squares numbered 1 to 500.

He can only jump one square to the left or to the right, with equal probability, and he cannot jump outside the range [1;500]. (if it lands at either end, it automatically jumps to the only available square on the next move.)

When he is on a square with a prime number on it, he croaks 'P' (PRIME) with probability $\frac{2}{3}$ or 'N' (NOT PRIME) with probability $\frac{1}{3}$ just before jumping to the next square. When he is on a square with a number on it that is not a prime he croaks 'P' with probability $\frac{1}{3}$ or 'N' with probability $\frac{2}{3}$ just before jumping to the next square.

Given that the frog's starting position is random with the same probability for every square, and given that she listens to his first 15 croaks, what is the probability that she hears the sequence PPPPNNPPPNPPNPN?

Give your answer as a string as a fraction `p/q` in reduced form.

# --hints--

`primeFrog()` should return a string.

```js
assert(typeof primeFrog() === 'string');
```

`primeFrog()` should return the string `199740353/29386561536000`.

```js
assert.strictEqual(primeFrog(), '199740353/29386561536000');
```

# --seed--

## --seed-contents--

```js
function primeFrog() {

  return true;
}

primeFrog();
```

# --solutions--

```js
// solution required
```
