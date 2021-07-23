---
id: 5900f4751000cf542c50ff87
title: 'Problem 264: Triangle Centres'
challengeType: 5
forumTopicId: 301913
dashedName: problem-264-triangle-centres
---

# --description--

Consider all the triangles having:

- All their vertices on lattice points.
- Circumcentre at the origin O.
- Orthocentre at the point H(5, 0).

There are nine such triangles having a $\text{perimeter} ≤ 50$.

Listed and shown in ascending order of their perimeter, they are:

<table>
  <tbody>
    <tr>
      <td>
A(-4, 3), B(5, 0), C(4, -3)<br>
A(4, 3), B(5, 0), C(-4, -3)<br>
A(-3, 4), B(5, 0), C(3, -4)<br>
<br><br>
A(3, 4), B(5, 0), C(-3, -4)<br>
A(0, 5), B(5, 0), C(0, -5)<br>
A(1, 8), B(8, -1), C(-4, -7)<br>
<br><br>
A(8, 1), B(1, -8), C(-4, 7)<br>
A(2, 9), B(9, -2), C(-6, -7)<br>
A(9, 2), B(2, -9), C(-6, 7)<br>
      </td>
      <td><img class="img-responsive center-block" alt="nine triangles ABC with perimeter ≤ 50" src="https://cdn.freecodecamp.org/curriculum/project-euler/triangle-centres.gif" style="background-color: white; padding: 10px;"></td>
    </tr>
  </tbody>
</table>

The sum of their perimeters, rounded to four decimal places, is 291.0089.

Find all such triangles with a $\text{perimeter} ≤ {10}^5$. Enter as your answer the sum of their perimeters rounded to four decimal places.

# --hints--

`triangleCentres()` should return `2816417.1055`.

```js
assert.strictEqual(triangleCentres(), 2816417.1055);
```

# --seed--

## --seed-contents--

```js
function triangleCentres() {

  return true;
}

triangleCentres();
```

# --solutions--

```js
// solution required
```
