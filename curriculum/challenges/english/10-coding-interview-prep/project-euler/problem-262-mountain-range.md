---
id: 5900f4731000cf542c50ff85
title: 'Problem 262: Mountain Range'
challengeType: 5
forumTopicId: 301911
dashedName: problem-262-mountain-range
---

# --description--

The following equation represents the continuous topography of a mountainous region, giving the elevation $h$ at any point ($x$,$y$):

$$h = \left(5000 - \frac{x^2 + y^2 + xy}{200} + \frac{25(x + y)}{2}\right) \times e^{-\left|\frac{x^2 + y^2}{1\\,000\\,000} - \frac{3(x + y)}{2000} + \frac{7}{10}\right|}$$

A mosquito intends to fly from A(200,200) to B(1400,1400), without leaving the area given by $0 ≤ x$, $y ≤ 1600$.

Because of the intervening mountains, it first rises straight up to a point A', having elevation $f$. Then, while remaining at the same elevation $f$, it flies around any obstacles until it arrives at a point B' directly above B.

First, determine $f_{min}$ which is the minimum constant elevation allowing such a trip from A to B, while remaining in the specified area. Then, find the length of the shortest path between A' and B', while flying at that constant elevation $f_{min}$.

Give that length as your answer, rounded to three decimal places.

**Note:** For convenience, the elevation function shown above is repeated below, in a form suitable for most programming languages: `h=( 5000-0.005*(x*x+y*y+x*y)+12.5*(x+y) )* exp( -abs(0.000001*(x*x+y*y)-0.0015*(x+y)+0.7) )`.

# --hints--

`mountainRange()` should return `2531.205`.

```js
assert.strictEqual(mountainRange(), 2531.205);
```

# --seed--

## --seed-contents--

```js
function mountainRange() {

  return true;
}

mountainRange();
```

# --solutions--

```js
// solution required
```
