---
id: 5900f4ae1000cf542c50ffc0
title: 'Problem 321: Swapping Counters'
challengeType: 5
forumTopicId: 301978
dashedName: problem-321-swapping-counters
---

# --description--

A horizontal row comprising of $2n + 1$ squares has $n$ red counters placed at one end and $n$ blue counters at the other end, being separated by a single empty square in the centre. For example, when $n = 3$.

<img class="img-responsive center-block" alt="three squares with red and blue counters placed on opposite ends of the row, separated by one empty square" src="https://cdn.freecodecamp.org/curriculum/project-euler/swapping-counters-1.gif" style="background-color: white; padding: 10px;">

A counter can move from one square to the next (slide) or can jump over another counter (hop) as long as the square next to that counter is unoccupied.

<img class="img-responsive center-block" alt="allowed moves of the counter" src="https://cdn.freecodecamp.org/curriculum/project-euler/swapping-counters-2.gif" style="background-color: white; padding: 10px;">

Let $M(n)$ represent the minimum number of moves/actions to completely reverse the positions of the coloured counters; that is, move all the red counters to the right and all the blue counters to the left.

It can be verified $M(3) = 15$, which also happens to be a triangle number.

If we create a sequence based on the values of n for which $M(n)$ is a triangle number then the first five terms would be: 1, 3, 10, 22, and 63, and their sum would be 99.

Find the sum of the first forty terms of this sequence.

# --hints--

`swappingCounters()` should return `2470433131948040`.

```js
assert.strictEqual(swappingCounters(), 2470433131948040);
```

# --seed--

## --seed-contents--

```js
function swappingCounters() {

  return true;
}

swappingCounters();
```

# --solutions--

```js
// solution required
```
