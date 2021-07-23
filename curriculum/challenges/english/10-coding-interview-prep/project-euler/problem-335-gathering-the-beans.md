---
id: 5900f4bd1000cf542c50ffce
title: 'Problem 335: Gathering the beans'
challengeType: 5
forumTopicId: 301993
dashedName: problem-335-gathering-the-beans
---

# --description--

Whenever Peter feels bored, he places some bowls, containing one bean each, in a circle. After this, he takes all the beans out of a certain bowl and drops them one by one in the bowls going clockwise. He repeats this, starting from the bowl he dropped the last bean in, until the initial situation appears again. For example with 5 bowls he acts as follows:

<img class="img-responsive center-block" alt="animation of moving beans in 5 bowls" src="https://cdn.freecodecamp.org/curriculum/project-euler/gathering-the-beans.gif" style="background-color: white; padding: 10px;">

So with 5 bowls it takes Peter 15 moves to return to the initial situation.

Let $M(x)$ represent the number of moves required to return to the initial situation, starting with $x$ bowls. Thus, $M(5) = 15$. It can also be verified that $M(100) = 10920$.

Find $\displaystyle\sum_{k = 0}^{{10}^{18}} M(2^k + 1)$. Give your answer modulo $7^9$.

# --hints--

`gatheringTheBeans()` should return `5032316`.

```js
assert.strictEqual(gatheringTheBeans(), 5032316);
```

# --seed--

## --seed-contents--

```js
function gatheringTheBeans() {

  return true;
}

gatheringTheBeans();
```

# --solutions--

```js
// solution required
```
