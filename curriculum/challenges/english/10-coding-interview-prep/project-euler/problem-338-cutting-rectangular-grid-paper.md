---
id: 5900f4be1000cf542c50ffd1
title: 'Problem 338: Cutting Rectangular Grid Paper'
challengeType: 5
forumTopicId: 301996
dashedName: problem-338-cutting-rectangular-grid-paper
---

# --description--

A rectangular sheet of grid paper with integer dimensions $w$ × $h$ is given. Its grid spacing is 1.

When we cut the sheet along the grid lines into two pieces and rearrange those pieces without overlap, we can make new rectangles with different dimensions.

For example, from a sheet with dimensions 9 × 4, we can make rectangles with dimensions 18 × 2, 12 × 3 and 6 × 6 by cutting and rearranging as below:

<img class="img-responsive center-block" alt="sheet with 9 x 4 dimensions cut in three different ways to make rectangles with 18 x 2, 12 x 3 and 6 x 6 dimensions" src="https://cdn.freecodecamp.org/curriculum/project-euler/cutting-recangular-grid-paper.gif" style="background-color: white; padding: 10px;">

Similarly, from a sheet with dimensions 9 × 8, we can make rectangles with dimensions 18 × 4 and 12 × 6.

For a pair $w$ and $h$, let $F(w, h)$ be the number of distinct rectangles that can be made from a sheet with dimensions $w$ × $h$. For example, $F(2, 1) = 0$, $F(2, 2) = 1$, $F(9, 4) = 3$ and $F(9, 8) = 2$. Note that rectangles congruent to the initial one are not counted in $F(w, h)$. Note also that rectangles with dimensions $w$ × $h$ and dimensions $h$ × $w$ are not considered distinct.

For an integer $N$, let $G(N)$ be the sum of $F(w, h)$ for all pairs $w$ and $h$ which satisfy $0 &lt; h ≤ w ≤ N$. We can verify that $G(10) = 55$, $G({10}^3) = 971\\,745$ and $G({10}^5) = 9\\,992\\,617\\,687$.

Find $G({10}^{12})$. Give your answer modulo ${10}^8$.

# --hints--

`cuttingRectangularGridPaper()` should return `15614292`.

```js
assert.strictEqual(cuttingRectangularGridPaper(), 15614292);
```

# --seed--

## --seed-contents--

```js
function cuttingRectangularGridPaper() {

  return true;
}

cuttingRectangularGridPaper();
```

# --solutions--

```js
// solution required
```
