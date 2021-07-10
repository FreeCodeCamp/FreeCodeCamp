---
id: 5a24c314108439a4d403614b
title: Create a Redux Store
challengeType: 6
forumTopicId: 301439
dashedName: create-a-redux-store
---

# --description--

Redux is a state management framework that can be used with a number of different web technologies, including React.

In Redux, there is a single state object that's responsible for the entire state of your application. This means if you had a React app with ten components, and each component had its own local state, the entire state of your app would be defined by a single state object housed in the Redux `store`. This is the first important principle to understand when learning Redux: the Redux store is the single source of truth when it comes to application state.

This also means that any time any piece of your app wants to update state, it **must** do so through the Redux store. The unidirectional data flow makes it easier to track state management in your app.

# --instructions--

The Redux `store` is an object which holds and manages application `state`. There is a method called `createStore()` on the Redux object, which you use to create the Redux `store`. This method takes a `reducer` function as a required argument. The `reducer` function is covered in a later challenge, and is already defined for you in the code editor. It simply takes `state` as an argument and returns `state`.

Declare a `store` variable and assign it to the `createStore()` method, passing in the `reducer` as an argument.

**Note:** The code in the editor uses ES6 default argument syntax to initialize this state to hold a value of `5`. If you're not familiar with default arguments, you can refer to the [ES6 section in the Curriculum](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/set-default-parameters-for-your-functions) which covers this topic.

# --hints--

The Redux store should exist.

```js
assert(typeof store.getState === 'function');
```

The Redux store should have a value of 5 for the state.

```js
assert(store.getState() === 5);
```

# --seed--

## --seed-contents--

```js
const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
```

# --solutions--

```js
const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer);
```
