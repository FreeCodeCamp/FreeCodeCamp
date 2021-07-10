---
id: 5a24c314108439a4d4036151
title: Use a Switch Statement to Handle Multiple Actions
challengeType: 6
forumTopicId: 301449
dashedName: use-a-switch-statement-to-handle-multiple-actions
---

# --description--

You can tell the Redux store how to handle multiple action types. Say you are managing user authentication in your Redux store. You want to have a state representation for when users are logged in and when they are logged out. You represent this with a single state object with the property `authenticated`. You also need action creators that create actions corresponding to user login and user logout, along with the action objects themselves.

# --instructions--

The code editor has a store, actions, and action creators set up for you. Fill in the `reducer` function to handle multiple authentication actions. Use a JavaScript `switch` statement in the `reducer` to respond to different action events. This is a standard pattern in writing Redux reducers. The switch statement should switch over `action.type` and return the appropriate authentication state.

**Note:** At this point, don't worry about state immutability, since it is small and simple in this example. For each action, you can return a new object — for example, `{authenticated: true}`. Also, don't forget to write a `default` case in your switch statement that returns the current `state`. This is important because once your app has multiple reducers, they are all run any time an action dispatch is made, even when the action isn't related to that reducer. In such a case, you want to make sure that you return the current `state`.

# --hints--

Calling the function `loginUser` should return an object with type property set to the string `LOGIN`.

```js
assert(loginUser().type === 'LOGIN');
```

Calling the function `logoutUser` should return an object with type property set to the string `LOGOUT`.

```js
assert(logoutUser().type === 'LOGOUT');
```

The store should be initialized with an object with an `authenticated` property set to `false`.

```js
assert(store.getState().authenticated === false);
```

Dispatching `loginUser` should update the `authenticated` property in the store state to `true`.

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(loginUser());
    const afterLogin = store.getState();
    return (
      initialState.authenticated === false && afterLogin.authenticated === true
    );
  })()
);
```

Dispatching `logoutUser` should update the `authenticated` property in the store state to `false`.

```js
assert(
  (function () {
    store.dispatch(loginUser());
    const loggedIn = store.getState();
    store.dispatch(logoutUser());
    const afterLogout = store.getState();
    return (
      loggedIn.authenticated === true && afterLogout.authenticated === false
    );
  })()
);
```

The `authReducer` function should handle multiple action types with a `switch` statement.

```js
(getUserInput) =>
  assert(
    getUserInput('index').toString().includes('switch') &&
      getUserInput('index').toString().includes('case') &&
      getUserInput('index').toString().includes('default')
  );
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};
```

# --solutions--

```js
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'LOGIN':
      return {
        authenticated: true
      }

    case 'LOGOUT':
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};
```
