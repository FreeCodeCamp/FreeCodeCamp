---
id: 5a24c314108439a4d4036155
title: Inviare i dati delle azioni allo store
challengeType: 6
forumTopicId: 301448
dashedName: send-action-data-to-the-store
---

# --description--

Finora hai imparato come inviare azioni allo store Redux, ma queste azioni non contenevano alcuna informazione diversa da un `type`. Puoi anche inviare dati specifici insieme alle tue azioni. In realtà, questo è molto comune perché le azioni di solito provengono da alcune interazioni dell'utente e tendono a portare dei dati con loro. Lo store di Redux ha spesso bisogno di conoscere questi dati.

# --instructions--

Nell'editor di codice ci sono un `notesReducer()` di base e un creatore di azione `addNoteText()`. Termina il corpo della funzione `addNoteText()` in modo che restituisca un oggetto `action`. L'oggetto dovrebbe includere una proprietà `type` con un valore di `ADD_NOTE`, e anche una proprietà `text` impostata al dato `note` passato al creatore di azione. Quando chiami il creatore di azione, passi specifiche informazioni alle quali puoi accedere per l'oggetto.

Successivamente, termina la scrittura dell'istruzione `switch` in `notesReducer()`. Dovrai aggiungere un caso che gestisca le azioni `addNoteText()`. Questo caso dovrebbe essere attivato ogni volta che c'è un'azione di tipo `ADD_NOTE` e dovrebbe restituire la proprietà `text` dell'`action` in arrivo come nuovo `state`.

L'azione viene spedita nella parte finale del codice. Una volta finito, esegui il codice e guarda la console. Questo è tutto ciò che serve per inviare dati specifici dell'azione allo store e usarli quando aggiorni lo `state` dello store.

# --hints--

Il creatore di azioni `addNoteText` dovrebbe restituire un oggetto con chiavi `type` e `text`.

```js
assert(
  (function () {
    const addNoteFn = addNoteText('__TEST__NOTE');
    return addNoteFn.type === ADD_NOTE && addNoteFn.text === '__TEST__NOTE';
  })()
);
```

La spedizione di un'azione di tipo `ADD_NOTE` con il creatore di azione `addNoteText` dovrebbe aggiornare lo `state` alla stringa passata al creatore dell'azione.

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(addNoteText('__TEST__NOTE'));
    const newState = store.getState();
    return initialState !== newState && newState === '__TEST__NOTE';
  })()
);
```

# --seed--

## --seed-contents--

```js
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line

    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());
```

# --solutions--

```js
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line
    case ADD_NOTE:
      return action.text;
    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line
  return {
    type: ADD_NOTE,
    text: note
  }
  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello Redux!'));
console.log(store.getState());
```
