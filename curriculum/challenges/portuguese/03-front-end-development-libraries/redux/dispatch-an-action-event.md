---
id: 5a24c314108439a4d403614f
title: Dispatch an Action Event
challengeType: 6
forumTopicId: 301442
dashedName: dispatch-an-action-event
---

# --description--

`dispatch` method is what you use to dispatch actions to the Redux store. Calling `store.dispatch()` and passing the value returned from an action creator sends an action back to the store.

Recall that action creators return an object with a type property that specifies the action that has occurred. Then the method dispatches an action object to the Redux store. Based on the previous challenge's example, the following lines are equivalent, and both dispatch the action of type `LOGIN`:

```js
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

# --instructions--

The Redux store in the code editor has an initialized state that's an object containing a `login` property currently set to `false`. There's also an action creator called `loginAction()` which returns an action of type `LOGIN`. Dispatch the `LOGIN` action to the Redux store by calling the `dispatch` method, and pass in the action created by `loginAction()`.

# --hints--

Calling the function `loginAction` should return an object with `type` property set to the string `LOGIN`.

```js
assert(loginAction().type === 'LOGIN');
```

The store should be initialized with an object with property `login` set to `false`.

```js
assert(store.getState().login === false);
```

The `store.dispatch()` method should be used to dispatch an action of type `LOGIN`.

```js
(getUserInput) =>
  assert(
    (function () {
      let noWhiteSpace = getUserInput('index').replace(/\s/g, '');
      return (
        noWhiteSpace.includes('store.dispatch(loginAction())') ||
        noWhiteSpace.includes("store.dispatch({type: 'LOGIN'})") === true
      );
    })()
  );
```

# --seed--

## --seed-contents--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
```

# --solutions--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

store.dispatch(loginAction());
```
