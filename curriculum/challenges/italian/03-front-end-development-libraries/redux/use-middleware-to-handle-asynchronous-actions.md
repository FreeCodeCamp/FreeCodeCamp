---
id: 5a24c314108439a4d4036156
title: Usare il middleware per gestire azioni asincrone
challengeType: 6
forumTopicId: 301451
dashedName: use-middleware-to-handle-asynchronous-actions
---

# --description--

Finora queste sfide hanno evitato di discutere di azioni asincrone, ma esse sono una parte inevitabile dello sviluppo del web. Ad un certo punto dovrai chiamare gli endpoint asincroni nell'app Redux, quindi come gestirai questi tipi di richiesta? Redux fornisce un middleware (software di intermediazione) progettato specificamente per questo scopo, chiamato Redux Thunk middleware. Ecco una breve descrizione di come usarlo con Redux.

Per includere il Redux Thunk middleware, lo passi come argomento a `Redux.applyMiddleware()`. Questa istruzione viene quindi fornita come secondo parametro opzionale alla funzione `createStore()`. Dai un'occhiata al codice in fondo all'editor per vederlo. Poi, per creare un'azione asincrona, restituisci una funzione nel creatore di azione che richiede `dispatch` come argomento. All'interno di questa funzione, è possibile inviare azioni ed eseguire richieste asincrone.

In questo esempio, una richiesta asincrona viene simulata con una chiamata `setTimeout()`. È comune inviare un'azione prima di iniziare qualsiasi comportamento asincrono in modo che lo stato dell'applicazione sappia che sono stati richiesti alcuni dati (questo stato potrebbe mostrare un'icona di caricamento, per esempio). Poi, una volta ricevuti i dati, si invia un'altra azione che trasporta i dati come payload insieme all'informazione che l'azione è completata.

Ricorda che stai passando `dispatch` come parametro a questo creatore di azioni speciale. Questo è quello che userai per inviare le tue azioni: passerai l'azione direttamente al dispatch e il middleware si occuperà del resto.

# --instructions--

Scrivi entrambi i dispatch nel creatore di azioni `handleAsync()`. Fai un dispatch di `requestingData()` prima di `setTimeout()` (la chiamata API simulata). Poi, dopo aver ricevuto i dati (simulati), invia l'azione `receivedData()`, passando questi dati. Ora sai come gestire le azioni asincrone in Redux. Tutto il resto continua a funzionare come prima.

# --hints--

Il creatore di azione `requestingData` dovrebbe restituire un oggetto type pari al valore di `REQUESTING_DATA`.

```js
assert(requestingData().type === REQUESTING_DATA);
```

Il creatore di azione `receivedData` dovrebbe restituire un oggetto type pari al valore di `RECEIVED_DATA`.

```js
assert(receivedData('data').type === RECEIVED_DATA);
```

`asyncDataReducer` dovrebbe essere una funzione.

```js
assert(typeof asyncDataReducer === 'function');
```

Il dispatch del creatore di azione `requestingData` dovrebbe aggiornare la proprietà fetching dello `state` dello store a `true`.

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(requestingData());
    const reqState = store.getState();
    return initialState.fetching === false && reqState.fetching === true;
  })()
);
```

Il dispatch di `handleAsync` dovrebbe inviare l'azione di richiesta di dati e quindi inviare l'azione di ricezione dei dati dopo un certo ritardo.

```js
assert(
  (function () {
    const noWhiteSpace = __helpers.removeWhiteSpace(handleAsync.toString());
    return (
      noWhiteSpace.includes('dispatch(requestingData())') === true &&
      noWhiteSpace.includes('dispatch(receivedData(data))') === true
    );
  })()
);
```

# --seed--

## --seed-contents--

```js
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    // Dispatch request action here

    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // Dispatch received data action here

    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);
```

# --solutions--

```js
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    dispatch(requestingData());
    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      dispatch(receivedData(data));
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);
```
