---
id: 5900f4b11000cf542c50ffc4
title: 'Problem 325: Stone Game II'
challengeType: 5
forumTopicId: 301982
dashedName: problem-325-stone-game-ii
---

# --description--

A game is played with two piles of stones and two players. On each player's turn, the player may removes a number of stones from the larger pile. The number of stones removes must be a positive multiple of the number of stones in the smaller pile.

E.g., let the ordered pair (6,14) describe a configuration with 6 stones in the smaller pile and 14 stones in the larger pile, then the first player can remove 6 or 12 stones from the larger pile.

The player taking all the stones from a pile wins the game.

A winning configuration is one where the first player can force a win. For example, (1,5), (2,6) and (3,12) are winning configurations because the first player can immediately remove all stones in the second pile.

A losing configuration is one where the second player can force a win, no matter what the first player does. For example, (2,3) and (3,4) are losing configurations: any legal move leaves a winning configuration for the second player.

Define $S(N)$ as the sum of ($x_i + y_i$) for all losing configurations ($x_i$, $y_i$), $0 &lt; x_i &lt; y_i ≤ N$. We can verify that $S(10) = 211$ and $S({10}^4) = 230\\,312\\,207\\,313$.

Find $S({10}^{16})\bmod 7^{10}$.

# --hints--

`stoneGameTwo()` should return `54672965`.

```js
assert.strictEqual(stoneGameTwo(), 54672965);
```

# --seed--

## --seed-contents--

```js
function stoneGameTwo() {

  return true;
}

stoneGameTwo();
```

# --solutions--

```js
// solution required
```
