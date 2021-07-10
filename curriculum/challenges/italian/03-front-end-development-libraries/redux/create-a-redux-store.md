---
id: 5a24c314108439a4d403614b
title: Creare uno store di Redux
challengeType: 6
forumTopicId: 301439
dashedName: create-a-redux-store
---

# --description--

Redux è un framework di gestione dello stato che può essere utilizzato con una serie di diverse tecnologie web, tra cui React.

In Redux c'è un singolo oggetto di stato che è responsabile per l'intero stato della tua applicazione. Ciò significa che se hai un'app React con dieci componenti, e ogni componente aveva il proprio stato locale, l'intero stato della tua app sarà definito da un singolo oggetto di stato ospitato nello `store` di Redux. Questo è il primo principio importante da capire quando si studia Redux: lo store di Redux è la singola fonte di verità quando si tratta di stato dell'applicazione.

Questo significa anche che ogni volta che una parte della tua app vuole aggiornare lo stato, essa **deve** farlo attraverso lo store di Redux. Il flusso di dati unidirezionale rende più facile monitorare la gestione dello stato nella tua app.

# --instructions--

Lo `store` di Redux è un oggetto che detiene e gestisce lo `state` dell'applicazione. Nell'oggetto Redux c'è un metodo chiamato `createStore()` che si usa per creare lo `store` di Redux. Questo metodo prende una funzione `reducer` come argomento richiesto. La funzione `reducer` è spiegata da una sfida successiva, ed è già definita per te nell'editor di codice. Essa richiede semplicemente `state` come argomento e restituisce `state`.

Dichiara una variabile `store` e assegnala al metodo `createStore()`, passando il `reducer` come argomento.

**Nota:** Il codice nell'editor utilizza la sintassi predefinita degli argomenti ES6 per inizializzare questo stato in modo da contenere un valore di `5`. Se non hai familiarità con gli argomenti predefiniti, puoi fare riferimento alla [sezione ES6 nel Curriculum](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/set-default-parameters-for-your-functions) che copre questo argomento.

# --hints--

Lo store di Redux dovrebbe esistere.

```js
assert(typeof store.getState === 'function');
```

Lo store di Redux dovrebbe avere un valore di 5 per lo stato.

```js
assert(store.getState() === 5);
```

# --seed--

## --seed-contents--

```js
const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
```

# --solutions--

```js
const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer);
```
