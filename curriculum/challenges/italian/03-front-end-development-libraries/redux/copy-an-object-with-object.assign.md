---
id: 5a24c314108439a4d403615b
title: Copiare un oggetto con Object.assign
challengeType: 6
forumTopicId: 301437
dashedName: copy-an-object-with-object-assign
---

# --description--

Le ultime sfide funzionavano con gli array, ma ci sono modi per aiutare a far rispettare l'immutabilità dello stato anche quando esso è un `object`. Uno strumento utile per gestire gli oggetti è l'utilità `Object.assign()`. `Object.assign()` prende un oggetto di destinazione e degli oggetti di origine e mappa le proprietà dagli oggetti di origine all'oggetto di destinazione. Tutte le proprietà corrispondenti sono sovrascritte dalle proprietà degli oggetti sorgente. Questo comportamento è comunemente usato per fare copie superficiali di oggetti passando un oggetto vuoto come primo argomento seguito dall'oggetto o dagli oggetti che si desidera copiare. Ecco un esempio:

```js
const newObject = Object.assign({}, obj1, obj2);
```

Questo crea `newObject` come nuovo `object`, che contiene le proprietà che attualmente esistono in `obj1` e `obj2`.

# --instructions--

Lo stato di Redux e le azioni sono state modificate per gestire un `object` per lo `state`. Modifica il codice per restituire un nuovo oggetto `state` per le azioni di tipo `ONLINE`, che imposta la proprietà `status` sulla stringa `online`. Prova a usare `Object.assign()` per completare la sfida.

# --hints--

Lo store Redux dovrebbe esistere ed essere inizializzato con uno stato equivalente all'oggetto `defaultState` dichiarato alla riga 1.

```js
assert(
  (function () {
    const expectedState = {
      user: 'CamperBot',
      status: 'offline',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    const initialState = store.getState();
    return DeepEqual(expectedState, initialState);
  })()
);
```

`wakeUp` e `immutableReducer` dovrebbero essere entrambe funzioni.

```js
assert(typeof wakeUp === 'function' && typeof immutableReducer === 'function');
```

L'invio di un'azione di tipo `ONLINE` dovrebbe aggiornare la proprietà `status` allo stato `online` e NON dovrebbe mutare lo stato.

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch({ type: 'ONLINE' });
    const finalState = store.getState();
    const expectedState = {
      user: 'CamperBot',
      status: 'online',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

`Object.assign` dovrebbe essere usato per restituire il nuovo stato.

```js
(getUserInput) => assert(getUserInput('index').includes('Object.assign'));
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      return Object.assign({}, state, {
        status: 'online'
      });
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
```
