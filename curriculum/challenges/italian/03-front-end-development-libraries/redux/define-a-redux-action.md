---
id: 5a24c314108439a4d403614d
title: Definire un'azione Redux
challengeType: 6
forumTopicId: 301440
dashedName: define-a-redux-action
---

# --description--

Dal momento che Redux è un framework di gestione dello stato, l'aggiornamento dello stato è uno dei suoi compiti fondamentali. In Redux, tutti gli aggiornamenti di stato vengono attivati dalle azioni di dispatching (invio). Un'azione è semplicemente un oggetto JavaScript che contiene informazioni su un evento di azione che si è verificato. Lo store Redux riceve questi oggetti di azione, quindi aggiorna il suo stato di conseguenza. A volte un'azione Redux contiene anche dei dati. Ad esempio, l'azione contiene uno username dopo il login di un utente. Mentre i dati sono facoltativi, le azioni devono contenere una proprietà `type` che specifica il 'tipo' di azione che si è verificato.

Pensa alle azioni Redux come a messaggeri che portano informazioni sugli eventi che accadono nella tua app allo store di Redux. Lo store conduce poi l'attività di aggiornamento dello stato in base all'azione che si è verificata.

# --instructions--

Scrivere un'azione Redux è semplice come dichiarare un oggetto con una proprietà type. Dichiara un oggetto `action` e dagli una proprietà `type` impostata alla stringa `'LOGIN'`.

# --hints--

Dovrebbe esistere un oggetto `action`.

```js
assert(
  (function () {
    return typeof action === 'object';
  })()
);
```

L'oggetto `action` dovrebbe avere una proprietà `type` con valore `LOGIN`.

```js
assert(
  (function () {
    return action.type === 'LOGIN';
  })()
);
```

# --seed--

## --seed-contents--

```js
// Define an action here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
```
