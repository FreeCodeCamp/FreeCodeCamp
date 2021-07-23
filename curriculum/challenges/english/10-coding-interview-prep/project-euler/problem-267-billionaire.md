---
id: 5900f4771000cf542c50ff8a
title: 'Problem 267: Billionaire'
challengeType: 5
forumTopicId: 301916
dashedName: problem-267-billionaire
---

# --description--

You are given a unique investment opportunity.

Starting with £1 of capital, you can choose a fixed proportion, $f$, of your capital to bet on a fair coin toss repeatedly for 1000 tosses.

Your return is double your bet for heads and you lose your bet for tails.

For example, if $f = \frac{1}{4}$, for the first toss you bet £0.25, and if heads comes up you win £0.5 and so then have £1.5. You then bet £0.375 and if the second toss is tails, you have £1.125.

Choosing $f$ to maximize your chances of having at least £1,000,000,000 after 1,000 flips, what is the chance that you become a billionaire?

All computations are assumed to be exact (no rounding), but give your answer rounded to 12 digits behind the decimal point in the form 0.abcdefghijkl.

# --hints--

`billionaire()` should return `0.999992836187`.

```js
assert.strictEqual(billionaire(), 0.999992836187);
```

# --seed--

## --seed-contents--

```js
function billionaire() {

  return true;
}

billionaire();
```

# --solutions--

```js
// solution required
```
