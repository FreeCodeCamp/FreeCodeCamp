---
id: 5a24c314108439a4d4036150
title: Gestire un'azione nello store
challengeType: 6
forumTopicId: 301444
dashedName: handle-an-action-in-the-store
---

# --description--

Dopo che un'azione è stata creata e spedita, lo store di Redux deve sapere come rispondere a quell'azione. Questo è il lavoro di una funzione `reducer` (riduttore). I reducer in Redux sono responsabili delle modifiche allo stato che si verificano in risposta alle azioni. Un `reducer` prende `state` e `action` come argomenti, e restituisce sempre un nuovo `state`. È importante capire che questo è l'**unico** ruolo del reducer. Questo non ha effetti collaterali - non chiama mai un endpoint API e non ha mai sorprese nascoste. Il reducer è semplicemente una funzione pura che prende uno stato e un'azione, e restituisce un nuovo stato.

Un altro principio chiave in Redux è che lo `state` è di sola lettura. In altre parole, la funzione `reducer` deve **sempre** restituire una nuova copia dello `state` e non modificare mai direttamente lo state. Redux non applica l'immutabilità dello stato, tuttavia sei responsabile di applicarlo nel codice delle tue funzioni reducer. Nelle prossime sfide farai pratica con questo.

# --instructions--

L'editor di codice contiene l'esempio precedente e l'inizio di una funzione `reducer` pronti per te. Compila il corpo della funzione `reducer` in modo che se riceve un'azione di tipo `'LOGIN'` restituisca un oggetto stato con `login` impostato a `true`. Altrimenti, restituisce lo `state` attuale. Nota che lo `state` corrente e l'`action` inviata sono passati al reducer, in modo da poter accedere direttamente al tipo di azione con `action.type`.

# --hints--

Chiamare la funzione `loginAction` dovrebbe restituire un oggetto con proprietà type impostata sulla stringa `LOGIN`.

```js
assert(loginAction().type === 'LOGIN');
```

Lo store dovrebbe essere inizializzato con un oggetto con proprietà `login` impostata su `false`.

```js
assert(store.getState().login === false);
```

Inviare `loginAction` dovrebbe aggiornare la proprietà `login` nello stato dello store a `true`.

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(loginAction());
    const afterState = store.getState();
    return initialState.login === false && afterState.login === true;
  })()
);
```

Se l'azione non è di tipo `LOGIN`, lo store dovrebbe restituire lo stato corrente.

```js
assert(
  (function () {
    store.dispatch({ type: '__TEST__ACTION__' });
    let afterTest = store.getState();
    return typeof afterTest === 'object' && afterTest.hasOwnProperty('login');
  })()
);
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```

# --solutions--

```js
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {

  if (action.type === 'LOGIN') {
    return {login: true}
  }

  else {
    return state
  }

};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```
