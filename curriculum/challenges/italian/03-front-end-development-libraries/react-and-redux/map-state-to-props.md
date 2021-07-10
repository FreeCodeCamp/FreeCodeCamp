---
id: 5a24c314108439a4d4036145
title: Mappare lo stato sulle props
challengeType: 6
forumTopicId: 301433
dashedName: map-state-to-props
---

# --description--

Il componente `Provider` consente di fornire `state` e `dispatch` ai componenti React, ma devi specificare esattamente quale stato e azioni desideri. In questo modo, ti assicuri che ogni componente abbia accesso solo allo stato di cui ha bisogno. Lo si ottiene creando due funzioni: `mapStateToProps()` e `mapDispatchToProps()`.

In queste funzioni, dichiari a quali parti dello stato vuoi avere accesso e quali creatori di azione devi essere in grado di inviare. Una volta che queste funzioni saranno pronte, vedrai come utilizzare il metodo React Redux `connect` per collegarli ai tuoi componenti in un'altra sfida.

**Nota:** Dietro le quinte, React Redux utilizza il metodo `store.subscribe()` per implementare `mapStateToProps()`.

# --instructions--

Crea una funzione `mapStateToProps()`. Questa funzione dovrebbe prendere `state` come argomento, quindi restituire un oggetto che mappa quello stato a specifici nomi di proprietà. Queste proprietà diventeranno accessibili al tuo componente tramite `props`. Dal momento che questo esempio mantiene l'intero stato dell'app in un unico array, è possibile passare l'intero stato al tuo componente. Crea una proprietà `messages` nell'oggetto che viene restituito e impostala a `state`.

# --hints--

La costante `state` dovrebbe essere un array vuoto.

```js
assert(Array.isArray(state) && state.length === 0);
```

`mapStateToProps` dovrebbe essere una funzione.

```js
assert(typeof mapStateToProps === 'function');
```

`mapStateToProps` dovrebbe restituire un oggetto.

```js
assert(typeof mapStateToProps() === 'object');
```

Passare un array come stato a `mapStateToProps` dovrebbe restituire questo array associato a una chiave `messages`.

```js
assert(mapStateToProps(['messages']).messages.pop() === 'messages');
```

# --seed--

## --seed-contents--

```jsx
const state = [];

// Change code below this line
```

# --solutions--

```jsx
const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};
```
