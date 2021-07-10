---
id: 5a24c314108439a4d4036161
title: Tag JSX a chiusura automatica
challengeType: 6
forumTopicId: 301396
dashedName: learn-about-self-closing-jsx-tags
---

# --description--

Finora, hai visto come JSX si differenzia dall'HTML in modo essenziale con l'uso di `className` al posto di `class` per la definizione delle classi HTML.

Un altro aspetto importante in cui JSX differisce da HTML è quello che riguarda i tag a chiusura automatica (self-closing).

In HTML, quasi tutti i tag hanno sia un tag di apertura che di chiusura: `<div></div>`; il tag di chiusura ha sempre una barra in avanti prima del nome del tag che si sta chiudendo. Tuttavia, ci sono dei casi speciali in HTML chiamati “tag a chiusura automatica”, cioè dei tag che non richiedono sia un tag di apertura che di chiusura prima che un altro tag possa iniziare.

Ad esempio, il tag line-break può essere scritto come `<br>` o come `<br />`, ma non dovrebbe mai essere scritto come `<br></br>`, poiché non contiene alcun contenuto.

In JSX, le regole sono un po 'diverse. Qualsiasi elemento JSX può essere scritto con un tag a chiusura automatica, e ogni elemento deve essere chiuso. Il tag line-break, ad esempio, deve essere sempre scritto come `<br />` per essere codice JSX valido che possa essere transcodificato. Un `<div>`, invece, può essere scritto come `<div />` o `<div></div>`. La differenza è che nella prima versione della sintassi non c'è modo di includere nulla nel `<div />`. Vedrai nelle sfide successive che questa sintassi è utile durante il rendering dei componenti React.

# --instructions--

Correggi gli errori nell'editor di codice in modo che sia JSX valido e venga transcodificato con successo. Assicurati di non modificare nessuno dei contenuti - devi solo chiudere i tag dove necessario.

# --hints--

La costante `JSX` dovrebbe restituire un elemento `div`.

```js
assert.strictEqual(JSX.type, 'div');
```

Il `div` dovrebbe contenere un tag `br`.

```js
assert(Enzyme.shallow(JSX).find('br').length === 1);
```

Il `div` dovrebbe contenere un tag `hr`.

```js
assert(Enzyme.shallow(JSX).find('hr').length === 1);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h2>Welcome to React!</h2> <br >
    <p>Be sure to close all tags!</p>
    <hr >
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div>
  <h2>Welcome to React!</h2> <br />
  <p>Be sure to close all tags!</p>
  <hr />
</div>
);
```
