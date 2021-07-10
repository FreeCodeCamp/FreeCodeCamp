---
id: 5a24c314108439a4d4036158
title: Mai mutare lo stato
challengeType: 6
forumTopicId: 301445
dashedName: never-mutate-state
---

# --description--

Queste ultime sfide descrivono diversi metodi per far rispettare il principio fondamentale dell'immutabilità dello stato in Redux. Immutabilità dello stato significa che non si modifica mai direttamente lo stato, ma si restituisce una nuova copia di esso.

Se scattassi un'istantanea dello stato di un'applicazione Redux nel tempo, vedresti qualcosa come `state 1`, `state 2`, `state 3`,`state 4`, `...` e così via dove ogni stato può essere simile al precedente, ma ognuno è un dato distinto. Questa immutabilità, infatti, è ciò che fornisce caratteristiche come il debugging time-travel (viaggio nel tempo) di cui potresti aver sentito parlare.

Redux non applica attivamente l'immutabilità dello stato nel suo store o nei reducer: questa responsabilità ricade sul programmatore. Fortunatamente, JavaScript (specialmente ES6) fornisce diversi strumenti utili che puoi usare per far rispettare l'immutabilità del tuo stato, che si tratti di una `string`, `number`, `array` o `object`. Nota che le stringhe e i numeri sono valori primitivi e sono immutabili per natura. In altre parole, 3 è sempre 3. Non è possibile modificare il valore del numero 3. Un `array` o `object`, invece, è mutabile. In pratica, il tuo stato sarà probabilmente costituito da un `array` o da un `object`, trattandosi di strutture di dati utili per rappresentare molti tipi di informazioni.

# --instructions--

Nell'editor di codice ci sono uno `store` e un `reducer` per gestire gli elementi della lista to-do. Termina la scrittura del caso `ADD_TO_DO` nel reducer per aggiungere una nuova cosa da fare allo stato. Ci sono alcuni modi per realizzarlo con standard JavaScript o ES6. Vedi se puoi trovare un modo per restituire un nuovo array con l'elemento preso da `action.todo` aggiunto alla fine.

# --hints--

Lo store Redux dovrebbe esistere ed essere inizializzato con uno stato uguale all'array `todos` nell'editor di codice.

```js
assert(
  (function () {
    const todos = [
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code'
    ];
    const initialState = store.getState();
    return (
      Array.isArray(initialState) && initialState.join(',') === todos.join(',')
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
    const expectedState = [
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code',
      '__TEST__TO__DO__'
    ];
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

# --seed--

## --seed-contents--

```js
const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const ADD_TO_DO = 'ADD_TO_DO';

const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return state.concat(action.todo);
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```
