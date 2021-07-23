---
id: 5900f4b41000cf542c50ffc7
title: 'Problem 328: Lowest-cost Search'
challengeType: 5
forumTopicId: 301985
dashedName: problem-328-lowest-cost-search
---

# --description--

We are trying to find a hidden number selected from the set of integers {1, 2, ..., $n$} by asking questions. Each number (question) we ask, has a <u>cost equal to the number asked</u> and we get one of three possible answers:

- "Your guess is lower than the hidden number", or
- "Yes, that's it!", or
- "Your guess is higher than the hidden number".

Given the value of $n$, an optimal strategy minimizes the total cost (i.e. the sum of all the questions asked) <u>for the worst possible case</u>. E.g.

If $n = 3$, the best we can do is obviously to ask the number "<strong>2</strong>". The answer will immediately lead us to find the hidden number (at a total cost = 2).

If $n = 8$, we might decide to use a "binary search" type of strategy: Our first question would be "<strong>4</strong>" and if the hidden number is higher than 4 we will need one or two additional questions. Let our second question be "<strong>6</strong>". If the hidden number is still higher than 6, we will need a third question in order to discriminate between 7 and 8. Thus, our third question will be "<strong>7</strong>" and the total cost for this worst-case scenario will be $4 + 6 + 7 = \mathbf{\color{red}{17}}$.

We can improve considerably the worst-case cost for $n = 8$, by asking "<strong>5</strong>" as our first question. If we are told that the hidden number is higher than 5, our second question will be "<strong>7</strong>", then we'll know for certain what the hidden number is (for a total cost of $5 + 7 = \mathbf{\color{blue}{12}}$). If we are told that the hidden number is lower than 5, our second question will be "<strong>3</strong>" and if the hidden number is lower than 3 our third question will be "<strong>1</strong>", giving a total cost of $5 + 3 + 1 = \mathbf{\color{blue}{9}}$. Since $\mathbf{\color{blue}{12 > 9}}$, the worst-case cost for this strategy is <strong><span style="color: red;">12</span></strong>. That's better than what we achieved previously with the "binary search" strategy; it is also better than or equal to any other strategy. So, in fact, we have just described an optimal strategy for $n = 8$.

Let $C(n)$ be the worst-case cost achieved by an optimal strategy for $n$, as described above. Thus $C(1) = 0$, $C(2) = 1$, $C(3) = 2$ and $C(8) = 12$.

Similarly, $C(100) = 400$ and $\displaystyle\sum_{n = 1}^{100} C(n) = 17575$.

Find $\displaystyle\sum_{n = 1}^{2\\,000\\,000} C(n)$.

# --hints--

`lowestCostSearch()` should return `260511850222`.

```js
assert.strictEqual(lowestCostSearch(), 260511850222);
```

# --seed--

## --seed-contents--

```js
function lowestCostSearch() {

  return true;
}

lowestCostSearch();
```

# --solutions--

```js
// solution required
```
