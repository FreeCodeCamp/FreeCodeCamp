---
id: 5a24c314108439a4d403614f
title: Inviare un evento azione
challengeType: 6
forumTopicId: 301442
dashedName: dispatch-an-action-event
---

# --description--

Il metodo `dispatch` è quello che usi per inviare azioni allo store Redux. Chiamando `store.dispatch()` e passando il valore restituito da un creatore di azione, un'azione viene inviata di rimando allo store.

Ricorda che i creatori di azione restituiscono un oggetto con una proprietà type che specifica l'azione che si è verificata. Quindi il metodo invia un oggetto di azione allo store di Redux. Sulla base dell'esempio della sfida precedente, le seguenti righe sono equivalenti, ed entrambe inviano l'azione di tipo `LOGIN`:

```js
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

# --instructions--

Lo store Redux nell'editor di codice ha uno stato inizializzato con un oggetto contenente una proprietà `login`, attualmente impostata a `false`. C'è anche un creatore di azione denominato `loginAction()` che restituisce un'azione di tipo `LOGIN`. Invia l'azione `LOGIN` allo store Redux chiamando il metodo `dispatch`, e passandole l'azione creata da `loginAction()`.

# --hints--

Chiamare la funzione `loginAction` dovrebbe restituire un oggetto con la proprietà `type` impostata alla stringa `LOGIN`.

```js
assert(loginAction().type === 'LOGIN');
```

Lo store dovrebbe essere inizializzato con un oggetto con proprietà `login` impostata su `false`.

```js
assert(store.getState().login === false);
```

Il metodo `store.dispatch()` dovrebbe essere utilizzato per inviare un'azione di tipo `LOGIN`.

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
