---
id: 5a24bbe0dba28a8d3cbd4c5e
title: Aggiungere commenti in JSX
challengeType: 6
forumTopicId: 301376
dashedName: add-comments-in-jsx
---

# --description--

JSX è una sintassi che viene compilata in JavaScript valido. A volte, per la leggibilità, potresti aver bisogno di aggiungere commenti al tuo codice. Come la maggior parte dei linguaggi di programmazione, JSX ha il proprio modo di farlo.

Per inserire i commenti all'interno di JSX, si utilizza la sintassi `{/* */}` per racchiudere il testo del commento.

# --instructions--

L'editor di codice contiene un elemento JSX simile a quello creato nell'ultima sfida. Aggiungi un commento da qualche parte all'interno dell'elemento `div` fornito, senza modificare gli elementi `h1` o `p`.

# --hints--

La costante `JSX` dovrebbe restituire un elemento `div`.

```js
assert(JSX.type === 'div');
```

Il `div` dovrebbe contenere un tag `h1` come primo elemento.

```js
assert(JSX.props.children[0].type === 'h1');
```

Il `div` dovrebbe contenere un tag `p` come secondo elemento.

```js
assert(JSX.props.children[1].type === 'p');
```

Gli elementi `h1` e `p` esistenti non dovrebbero essere modificati.

```js
assert(
  JSX.props.children[0].props.children === 'This is a block of JSX' &&
    JSX.props.children[1].props.children === "Here's a subtitle"
);
```

Il `JSX` dovrebbe usare la sintassi valida per i commenti.

```js
assert(/<div>[\s\S]*{\s*\/\*[\s\S]*\*\/\s*}[\s\S]*<\/div>/.test(code));
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
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>This is a block of JSX</h1>
  { /* this is a JSX comment */ }
  <p>Here's a subtitle</p>
</div>);
```
