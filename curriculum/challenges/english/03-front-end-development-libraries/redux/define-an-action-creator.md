---
id: 5a24c314108439a4d403614e
title: Define an Action Creator
challengeType: 6
forumTopicId: 301441
dashedName: define-an-action-creator
---

# --description--

After creating an action, the next step is sending the action to the Redux store so it can update its state. In Redux, you define action creators to accomplish this. An action creator is simply a JavaScript function that returns an action. In other words, action creators create objects that represent action events.

# --instructions--

Define a function named `actionCreator()` that returns the `action` object when called.

# --hints--

The function `actionCreator` should exist.

```js
assert(typeof actionCreator === 'function');
```

Running the `actionCreator` function should return the `action` object.

```js
assert(typeof action === 'object');
```

The returned `action` should have a key property `type` with value `LOGIN`.

```js
assert(action.type === 'LOGIN');
```

# --seed--

## --seed-contents--

```js
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
const actionCreator = () => {
  return action;
};
```
