---
id: 5a24c314108439a4d4036146
title: Mappare la spedizione delle props
challengeType: 6
forumTopicId: 301432
dashedName: map-dispatch-to-props
---

# --description--

La funzione `mapDispatchToProps()` viene utilizzata per fornire specifici creatori di azioni ai componenti React in modo che possano inviare azioni allo store di Redux. La struttura è simile alla funzione `mapStateToProps()` che hai scritto nell'ultima sfida. Essa restituisce un oggetto che mappa azioni di invio a nomi di proprietà, che diventano `props` del componente. Tuttavia, invece di restituire una parte dello `state`, ogni proprietà restituisce una funzione che chiama `dispatch` con un creatore di azione e tutti i dati rilevanti per l'azione. Hai accesso a questa `dispatch` perché è passata a `mapDispatchToProps()` come parametro quando definisci la funzione, proprio come hai passato `state` a `mapStateToProps()`. Dietro le quinte, React Redux sta usando `store.dispatch()` di Redux per eseguire queste spedizioni con `mapDispatchToProps()`. Questo è simile a come usa `store.subscribe()` per i componenti che sono mappati allo `state`.

Ad esempio, hai un creatore di azione `loginUser()` che richiede uno `username` come payload dell'azione. L'oggetto restituito da `mapDispatchToProps()` per questo creatore di azione sarà di questo tipo:

```jsx
{
  submitLoginUser: function(username) {
    dispatch(loginUser(username));
  }
}
```

# --instructions--

L'editor di codice fornisce un creatore di azioni chiamato `addMessage()`. Scrivi la funzione `mapDispatchToProps()` che richiede `dispatch` come argomento, quindi restituisce un oggetto. L'oggetto dovrebbe avere una proprietà `submitNewMessage` impostata alla funzione dispatch, che prende un parametro per il nuovo messaggio quando effettua il dispatch di `addMessage()`.

# --hints--

`addMessage` dovrebbe restituire un oggetto con chiavi `type` e `message`.

```js
assert(
  (function () {
    const addMessageTest = addMessage();
    return (
      addMessageTest.hasOwnProperty('type') &&
      addMessageTest.hasOwnProperty('message')
    );
  })()
);
```

`mapDispatchToProps` dovrebbe essere una funzione.

```js
assert(typeof mapDispatchToProps === 'function');
```

`mapDispatchToProps` dovrebbe restituire un oggetto.

```js
assert(typeof mapDispatchToProps() === 'object');
```

Spedire `addMessage` con `submitNewMessage` da `mapDispatchToProps` dovrebbe restituire un messaggio alla funzione dispatch.

```js
assert(
  (function () {
    let testAction;
    const dispatch = (fn) => {
      testAction = fn;
    };
    let dispatchFn = mapDispatchToProps(dispatch);
    dispatchFn.submitNewMessage('__TEST__MESSAGE__');
    return (
      testAction.type === 'ADD' && testAction.message === '__TEST__MESSAGE__'
    );
  })()
);
```

# --seed--

## --seed-contents--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line
```

# --solutions--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: function(message) {
      dispatch(addMessage(message));
    }
  }
};
```
