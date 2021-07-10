---
id: 5a24c314108439a4d4036159
title: Usare l'operatore di propagazione sugli array
challengeType: 6
forumTopicId: 301452
dashedName: use-the-spread-operator-on-arrays
---

# --description--

Una soluzione di ES6 per contribuire a far rispettare l'immutabilità dello stato in Redux è l'operatore di propagazione (spred): `...`. L'operatore di propagazione ha una varietà di applicazioni, una delle quali si adatta bene alla precedente sfida di produrre un nuovo array da un array esistente. Si tratta di una sintassi relativamente nuova, ma comunemente usata. Ad esempio, se hai un array `myArray` e scrivi:

```js
let newArray = [...myArray];
```

`newArray` è ora un clone di `myArray`. Entrambi gli array esistono ancora separatamente in memoria. Se esegui una mutazione come `newArray.push(5)`, `myArray` non cambia. L'operatore `...` effettivamente *propaga* i valori di `myArray` a un nuovo array. Per clonare un array con dei valori aggiuntivi nel nuovo array, potresti scrivere `[...myArray, 'new value']`. Questo restituirebbe un nuovo array composto dai valori in `myArray` e la stringa `new value` come ultimo valore. La sintassi di propagazione può essere usata più volte in una composizione di array come questa, ma è importante notare che fa solo una copia superficiale dell'array. Vale a dire, fornisce operazioni di array immutabili solo per array unidimensionali.

# --instructions--

Usa l'operatore di propagazione per restituire una nuova copia dello stato quando viene aggiunta una cosa da fare.

# --hints--

Lo store Redux dovrebbe esistere ed essere inizializzato con uno stato uguale a `["Do not mutate state!"]`.

```js
assert(
  (function () {
    const initialState = store.getState();
    return (
      Array.isArray(initialState) === true &&
      initialState[0] === 'Do not mutate state!'
    );
  })()
);
```

`addToDo` e `immutableReducer` dovrebbero essere entrambe funzioni.

```js
assert(typeof addToDo === 'function' && typeof immutableReducer === 'function');
```

L'invio di un'azione di tipo `ADD_TO_DO` allo store di Redux dovrebbe aggiungere un elemento `todo` e NON dovrebbe mutare lo stato.

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch(addToDo('__TEST__TO__DO__'));
    const finalState = store.getState();
    const expectedState = ['Do not mutate state!', '__TEST__TO__DO__'];
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

L'operatore di propagazione deve essere utilizzato per restituire il nuovo stato.

```js
(getUserInput) => assert(getUserInput('index').includes('...state'));
```

# --seed--

## --seed-contents--

```js
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return [
        ...state,
        action.todo
      ];
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```
