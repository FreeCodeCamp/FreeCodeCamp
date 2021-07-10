---
id: 5a24c314108439a4d4036154
title: Combinare reducers multipli
challengeType: 6
forumTopicId: 301436
dashedName: combine-multiple-reducers
---

# --description--

Quando lo stato della tua app comincia a diventare più complesso, potresti essere tentato di dividere lo stato in più parti. Ricorda invece il primo principio di Redux: tutto lo stato dell'app è tenuto in un singolo oggetto di stato nello store. Detto questo, Redux fornisce la composizione di reducers come soluzione per un modello di stato complesso. Definisci più reducer per gestire diverse parti dello stato della tua applicazione, quindi componi questi reducer insieme in un root reducer (riduttore radice). Il root reducer viene quindi passato nel metodo Redux `createStore()`.

Per farci combinare più reducer insieme, Redux fornisce il metodo `combineReducers()`. Questo metodo accetta come argomento un oggetto in cui si definiscono le proprietà che associano le chiavi a specifiche funzioni reducer. Il nome dato alle chiavi sarà usato da Redux come nome per la parte di stato associata.

Tipicamente, è una buona pratica creare un reducer per ogni parte dello stato dell'applicazione quando essi sono distinti o unici in qualche modo. Ad esempio, in un'applicazione per prende appunti con autenticazione dell'utente, un reducer potrebbe gestire l'autenticazione mentre un altro gestisce il testo e le note che l'utente sta scrivendo. Per tale applicazione, potremmo scrivere il metodo `combineReducers()` in questo modo:

```js
const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});
```

Ora, la chiave `notes` conterrà tutto lo stato associato alle nostre note e gestito dal nostro `notesReducer`. Questo è il modo in cui più reducer possono essere composti per gestire uno stato dell'applicazione più complesso. In questo esempio, lo stato mantenuto nello store di Redux sarebbe quindi un singolo oggetto contenente le proprietà `auth` e `notes`.

# --instructions--

Nell'editor di codice trovi le funzioni `counterReducer()` e `authReducer()`, insieme a uno store di Redux. Completa la funzione `rootReducer()` usando il metodo `Redux.combineReducers()`. Assegna `counterReducer` a una chiave denominata `count` e `authReducer` a una chiave denominata `auth`.

# --hints--

Il `counterReducer` dovrebbe aumentare e diminuire lo `state`.

```js
assert(
  (function () {
    const initialState = store.getState().count;
    store.dispatch({ type: INCREMENT });
    store.dispatch({ type: INCREMENT });
    const firstState = store.getState().count;
    store.dispatch({ type: DECREMENT });
    const secondState = store.getState().count;
    return firstState === initialState + 2 && secondState === firstState - 1;
  })()
);
```

`authReducer` dovrebbe commutare lo `state` di `authenticated` tra `true` e `false`.

```js
assert(
  (function () {
    store.dispatch({ type: LOGIN });
    const loggedIn = store.getState().auth.authenticated;
    store.dispatch({ type: LOGOUT });
    const loggedOut = store.getState().auth.authenticated;
    return loggedIn === true && loggedOut === false;
  })()
);
```

Lo `state` dello store dovrebbe avere due chiavi: `count`, che contiene un numero, e `auth`, che contiene un oggetto. L'oggetto `auth` dovrebbe avere una proprietà `authenticated`, che contiene un booleano.

```js
assert(
  (function () {
    const state = store.getState();
    return (
      typeof state.auth === 'object' &&
      typeof state.auth.authenticated === 'boolean' &&
      typeof state.count === 'number'
    );
  })()
);
```

Il `rootReducer` dovrebbe essere una funzione che combina il `counterReducer` e l'`authReducer`.

```js
(getUserInput) =>
  assert(
    (function () {
      const noWhiteSpace = __helpers.removeWhiteSpace(getUserInput('index'));
      return (
        typeof rootReducer === 'function' &&
        noWhiteSpace.includes('Redux.combineReducers')
      );
    })()
  );
```

# --seed--

## --seed-contents--

```js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = // Define the root reducer here

const store = Redux.createStore(rootReducer);
```

# --solutions--

```js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer
});

const store = Redux.createStore(rootReducer);
```
