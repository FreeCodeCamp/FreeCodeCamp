---
id: 587d7dbc367417b2b2512bb1
title: Creare un semplice elemento JSX
challengeType: 6
forumTopicId: 301390
dashedName: create-a-simple-jsx-element
---

# --description--

React è una libreria di visualizzazione Open Source creata e mantenuta da Facebook. È un ottimo strumento per presentare l'interfaccia utente (UI) delle moderne applicazioni web.

React utilizza un'estensione della sintassi di JavaScript chiamata JSX che consente di scrivere HTML direttamente all'interno di JavaScript. Questo ha diversi vantaggi. Ti permette di utilizzare la potenza programmatica completa di JavaScript all'interno di HTML, e aiuta a mantenere il codice leggibile. Per la maggior parte, JSX è simile all'HTML che hai già imparato, tuttavia vi sono alcune differenze fondamentali che saranno affrontate nel corso di queste sfide.

Ad esempio, poiché JSX è un'estensione sintattica di JavaScript, è possibile scrivere JavaScript direttamente all'interno di JSX. Per fare questo, è sufficiente includere il codice che si desidera trattare come JavaScript all'interno di parentesi graffe: `{ 'questo è trattato come codice JavaScript' }`. Tienilo a mente, dato che sarà utilizzato in diverse sfide future.

Tuttavia, poiché JSX non è JavaScript valido, il codice JSX deve essere compilato in JavaScript. Il transpiler Babel è uno strumento popolare per questo processo. Per tua convenienza, è già aggiunto dietro le quinte per queste sfide. Se ti capita di scrivere JSX sintatticamente non valido, vedrai il primo test in queste sfide fallire.

Vale la pena notare che sotto il cofano le sfide chiamano `ReactDOM.render(JSX, document.getElementById('root'))`. Questa chiamata di funzione è ciò che posiziona il tuo JSX nella rappresentazione leggera del DOM propria di React. React usa delle istantanee del proprio DOM per ottimizzare l'aggiornamento di parti specifiche del DOM.

# --instructions--

Il codice corrente utilizza JSX per assegnare un elemento `div` alla costante `JSX`. Sostituisci il `div` con un elemento `h1` e aggiungi il testo `Hello JSX!` al suo interno.

# --hints--

La costante `JSX` dovrebbe restituire un elemento `h1`.

```js
assert(JSX.type === 'h1');
```

Il tag `h1` dovrebbe includere il testo `Hello JSX!`

```js
assert(Enzyme.shallow(JSX).contains('Hello JSX!'));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = <div></div>;
```

# --solutions--

```jsx
const JSX = <h1>Hello JSX!</h1>;
```
