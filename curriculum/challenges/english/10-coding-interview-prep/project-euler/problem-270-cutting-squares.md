---
id: 5900f47c1000cf542c50ff8e
title: 'Problem 270: Cutting Squares'
challengeType: 5
forumTopicId: 301920
dashedName: problem-270-cutting-squares
---

# --description--

A square piece of paper with integer dimensions $N×N$ is placed with a corner at the origin and two of its sides along the $x$- and $y$-axes. Then, we cut it up respecting the following rules:

- We only make straight cuts between two points lying on different sides of the square, and having integer coordinates.
- Two cuts cannot cross, but several cuts can meet at the same border point.
- Proceed until no more legal cuts can be made.

Counting any reflections or rotations as distinct, we call $C(N)$ the number of ways to cut an $N×N$ square. For example, $C(1) = 2$ and $C(2) = 30$ (shown below).

<img class="img-responsive center-block" alt="ways to cut 2x2 square, counting reflections and rotations as distinct" src="https://cdn.freecodecamp.org/curriculum/project-euler/cutting-squares.gif" style="background-color: white; padding: 10px;">

What is $C(30)\bmod {10}^8$ ?

# --hints--

`cuttingSquares()` should return `82282080`.

```js
assert.strictEqual(cuttingSquares(), 82282080);
```

# --seed--

## --seed-contents--

```js
function cuttingSquares() {

  return true;
}

cuttingSquares();
```

# --solutions--

```js
// solution required
```
