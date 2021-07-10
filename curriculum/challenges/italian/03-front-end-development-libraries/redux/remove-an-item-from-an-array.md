---
id: 5a24c314108439a4d403615a
title: Rimuovere un elemento da un Array
challengeType: 6
forumTopicId: 301447
dashedName: remove-an-item-from-an-array
---

# --description--

È ora di fare pratica con la rimozione di elementi da un array. L'operatore di propagazione può essere utilizzato anche qui. Altri utili metodi JavaScript includono `slice()` e `concat()`.

# --instructions--

Il reducer e il creatore di azione sono stati modificati per rimuovere un elemento da un array in base all'indice dell'elemento. Termina la scrittura del reducer in modo che un nuovo array di stato venga restituito senza l'elemento all'indice specificato.

# --hints--

Lo store di Redux dovrebbe esistere ed essere inizializzato con uno stato uguale a `[0,1,2,3,4,5]`

```js
assert(
  (function () {
    const initialState = store.getState();
    return (
      Array.isArray(initialState) === true &&
      DeepEqual(initialState, [0, 1, 2, 3, 4, 5])
    );
  })()
);
```

`removeItem` e `immutableReducer` dovrebbero essere entrambe funzioni.

```js
assert(
  typeof removeItem === 'function' && typeof immutableReducer === 'function'
);
```

La spedizione del creatore di azione `removeItem` dovrebbe rimuovere gli elementi dallo stato e NON dovrebbe mutare lo stato.

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch(removeItem(3));
    const state_1 = store.getState();
    store.dispatch(removeItem(2));
    const state_2 = store.getState();
    store.dispatch(removeItem(0));
    store.dispatch(removeItem(0));
    store.dispatch(removeItem(0));
    const state_3 = store.getState();
    return (
      isFrozen &&
      DeepEqual(state_1, [0, 1, 2, 4, 5]) &&
      DeepEqual(state_2, [0, 1, 4, 5]) &&
      DeepEqual(state_3, [5])
    );
  })()
);
```

# --seed--

## --seed-contents--

```js
const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);
```
