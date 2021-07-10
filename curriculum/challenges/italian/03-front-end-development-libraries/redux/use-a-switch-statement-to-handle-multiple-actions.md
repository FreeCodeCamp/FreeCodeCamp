---
id: 5a24c314108439a4d4036151
title: Usare un'istruzione switch per gestire più azioni
challengeType: 6
forumTopicId: 301449
dashedName: use-a-switch-statement-to-handle-multiple-actions
---

# --description--

È possibile dire allo store di Redux come gestire diversi tipi di azione. Diciamo che tu debba gestire l'autenticazione dell'utente nel tuo store di Redux. Vuoi avere una rappresentazione dello stato per quando gli utenti sono connessi e per quando sono disconnessi. Lo rappresenti con un singolo oggetto di stato con la proprietà `authenticated`. Hai anche bisogno di creatori di azione che creino azioni corrispondenti al login e al logout dell'utente, insieme agli oggetti azione stessi.

# --instructions--

L'editor di codice ha già uno store, delle azioni e dei creatori di azioni configurati per te. Completa la funzione `reducer` perché gestisca più azioni di autenticazione. Usa un'istruzione JavaScript `switch` nel `reducer` per rispondere a diversi eventi di azione. Questo è un modello standard nella scrittura di reducer Redux. L'istruzione switch dovrebbe smistare in base a `action.type` e restituire lo stato di autenticazione appropriato.

**Nota:** Non preoccuparti per l'immutabilità dello stato, dato che è piccolo e semplice in questo esempio. Per ogni azione, puoi restituire un nuovo oggetto — per esempio, `{authenticated: true}`. Inoltre, non dimenticare di scrivere un caso di `default` nella tua istruzione switch che restituisca lo `state` corrente. Questo è importante perché una volta che l'app ha più reducer, essi vengono eseguiti tutti ogni volta che viene spedita un'azione, anche quando l'azione non è correlata a quel reducer. In questo caso, vuoi assicurarti di restituire lo `state` corrente.

# --hints--

Chiamando la funzione `loginUser` dovrebbe essere restituito un oggetto con proprietà type impostata alla stringa `LOGIN`.

```js
assert(loginUser().type === 'LOGIN');
```

Chiamando la funzione `logoutUser` dovrebbe essere restituito un oggetto con proprietà type impostata alla stringa `LOGOUT`.

```js
assert(logoutUser().type === 'LOGOUT');
```

Lo store dovrebbe essere inizializzato con un oggetto con una proprietà `authenticated` impostata a `false`.

```js
assert(store.getState().authenticated === false);
```

L'invio di `loginUser` dovrebbe impostare a `true` la proprietà `authenticated` nello stato dello store.

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

La spedizione di `logoutUser` dovrebbe impostare a `false` la proprietà `authenticated` nello stato dello store.

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

La funzione `authReducer` dovrebbe gestire più tipi di azione con un'istruzione `switch`.

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
