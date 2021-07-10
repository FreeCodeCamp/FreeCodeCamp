---
id: 5a24c314108439a4d4036145
title: Map State to Props
challengeType: 6
forumTopicId: 301433
dashedName: map-state-to-props
---

# --description--

The `Provider` component allows you to provide `state` and `dispatch` to your React components, but you must specify exactly what state and actions you want. This way, you make sure that each component only has access to the state it needs. You accomplish this by creating two functions: `mapStateToProps()` and `mapDispatchToProps()`.

In these functions, you declare what pieces of state you want to have access to and which action creators you need to be able to dispatch. Once these functions are in place, you'll see how to use the React Redux `connect` method to connect them to your components in another challenge.

**Note:** Behind the scenes, React Redux uses the `store.subscribe()` method to implement `mapStateToProps()`.

# --instructions--

Create a function `mapStateToProps()`. This function should take `state` as an argument, then return an object which maps that state to specific property names. These properties will become accessible to your component via `props`. Since this example keeps the entire state of the app in a single array, you can pass that entire state to your component. Create a property `messages` in the object that's being returned, and set it to `state`.

# --hints--

The const `state` should be an empty array.

```js
assert(Array.isArray(state) && state.length === 0);
```

`mapStateToProps` should be a function.

```js
assert(typeof mapStateToProps === 'function');
```

`mapStateToProps` should return an object.

```js
assert(typeof mapStateToProps() === 'object');
```

Passing an array as state to `mapStateToProps` should return this array assigned to a key of `messages`.

```js
assert(mapStateToProps(['messages']).messages.pop() === 'messages');
```

# --seed--

## --seed-contents--

```jsx
const state = [];

// Change code below this line
```

# --solutions--

```jsx
const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};
```
