---
id: 5a24c314108439a4d403614e
title: Definire un creatore di azione
challengeType: 6
forumTopicId: 301441
dashedName: define-an-action-creator
---

# --description--

Dopo aver creato un'azione, il passo successivo è l'invio dell'azione allo store di Redux in modo che possa aggiornare il suo stato. Per farlo, in Redux si definiscono i creatori di azione. Un creatore di azione è semplicemente una funzione JavaScript che restituisce un'azione. In altre parole, i creatori di azione creano oggetti che rappresentano gli eventi di azione.

# --instructions--

Definisci una funzione `actionCreator()` che restituisce l'oggetto `action` quando chiamata.

# --hints--

La funzione `actionCreator` dovrebbe esistere.

```js
assert(typeof actionCreator === 'function');
```

L'esecuzione della funzione `actionCreator` dovrebbe restituire l'oggetto `action`.

```js
assert(typeof action === 'object');
```

L'`action` restituita dovrebbe avere una proprietà di chiave `type` con valore `LOGIN`.

```js
assert(action.type === 'LOGIN');
```

# --seed--

## --seed-contents--

```js
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
const actionCreator = () => {
  return action;
};
```
