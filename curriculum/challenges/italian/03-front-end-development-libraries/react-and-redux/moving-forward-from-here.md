---
id: 5a24c314108439a4d403614a
title: Andare oltre
challengeType: 6
forumTopicId: 301434
dashedName: moving-forward-from-here
---

# --description--

Congratulazioni! Hai finito le lezioni su React e Redux. C'è un ultima cosa che vale la pena di sottolineare prima di andare avanti. In genere, non scriverai le applicazioni React in un editor di codice come questo. Questa sfida ti dà uno sguardo su come appare la sintassi se stai lavorando con npm e un file system sulla tua macchina. Il codice dovrebbe apparire simile, tranne per l'uso delle istruzioni `import` (queste importano tutte le dipendenze che ti sono sono state fornite nelle sfide). La sezione "Gestire i pacchetti con npm" copre npm in maggiore dettaglio.

Infine, scrivere codice React e Redux richiede generalmente una certa configurazione. Questo può diventare rapidamente complicato. Se sei interessato a sperimentare sulla tua macchina, la <a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="nofollow">Create React App</a> viene configurata ed è pronta all'uso.

In alternativa, puoi abilitare Babel come Preprocessore JavaScript in CodePen, aggiungere React e ReactDOM come risorse JavaScript esterne e lavorare anche lì.

# --instructions--

Scrivi il messaggio `'Now I know React and Redux!'` nella console.

# --hints--

Il messaggio `Now I know React and Redux!` dovrebbe essere scritto nella console.

```js
(getUserInput) =>
  assert(
    /console\s*\.\s*log\s*\(\s*('|"|`)Now I know React and Redux!\1\s*\)/.test(
      getUserInput('index')
    )
  );
```

# --seed--

## --seed-contents--

```jsx
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/

// Only change code below this line
```

# --solutions--

```jsx
console.log('Now I know React and Redux!');
```
