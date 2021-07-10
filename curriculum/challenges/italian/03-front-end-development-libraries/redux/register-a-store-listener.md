---
id: 5a24c314108439a4d4036153
title: Registrare un listener dello store
challengeType: 6
forumTopicId: 301446
dashedName: register-a-store-listener
---

# --description--

Un altro metodo a cui hai accesso dall'oggetto `store` di Redux è `store.subscribe()`. Questo ti permette di iscrivere delle funzioni listener (di ascolto) nello store, che vengono chiamate ogni volta che un'azione viene spedita allo store. Un semplice utilizzo per questo metodo è quello di iscrivere una funzione al tuo store, in modo che registri semplicemente un messaggio ogni volta che un'azione viene ricevuta e lo store viene aggiornato.

# --instructions--

Scrivi una funzione di callback che incrementa la variabile globale `count` ogni volta che lo store riceve un'azione, e passa questa funzione al metodo `store.subscribe()`. Vedrai che `store.dispatch()` è chiamato tre volte di fila, ogni volta che passa direttamente in un oggetto azione. Guarda l'output della console tra le azioni inviate per vedere gli aggiornamenti effettuati.

# --hints--

La spedizione dell'azione `ADD` allo store dovrebbe aumentare lo stato di `1`.

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch({ type: 'ADD' });
    const newState = store.getState();
    return newState === initialState + 1;
  })()
);
```

Dovrebbe esserci una funzione listener iscritta allo store usando `store.subscribe`.

```js
(getUserInput) => assert(getUserInput('index').match(/store\s*\.\s*subscribe\(/gm));
```

`store.subscribe` dovrebbe ricevere una funzione.

```js
(getUserInput) => assert(getUserInput('index').match(/(\s*function\s*)|(\s*\(\s*\)\s*=>)/gm)) 
```

La callback `store.subscribe` dovrebbe anche aumentare la variabile globale `count` quando lo store viene aggiornato.

```js
assert(store.getState() === count);
```

# --seed--

## --before-user-code--

```js
count = 0;
```

## --seed-contents--

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;

// Change code below this line

// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
```

# --solutions--

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);
 let count = 0;
// Change code below this line

store.subscribe( () =>
 {
 count++;
 }
);

// Change code above this line

store.dispatch({type: ADD});
store.dispatch({type: ADD});
store.dispatch({type: ADD});
```
