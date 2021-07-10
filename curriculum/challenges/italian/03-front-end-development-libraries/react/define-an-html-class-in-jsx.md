---
id: 5a24c314108439a4d4036160
title: Definire una classe HTML in JSX
challengeType: 6
forumTopicId: 301393
dashedName: define-an-html-class-in-jsx
---

# --description--

Ora che sei a tuo agio con la scrittura in JSX, potresti chiederti come questo differisca dall'HTML.

Finora, può sembrare che HTML e JSX siano esattamente la stessa cosa.

Una differenza chiave in JSX è che non puoi più usare la parola `class` per definire le classi HTML. Questo perché `class` è una parola riservata in JavaScript. JSX utilizza invece `className`.

Infatti, la convenzione di denominazione per tutti gli attributi HTML e riferimenti a eventi in JSX diventa camelCase. Ad esempio, un evento di click in JSX è `onClick`, invece di `onclick`. Allo stesso modo, `onchange` diventa `onChange`. Anche se questa è una differenza sottile, è importante tenerla a mente andando avanti.

# --instructions--

Applica una classe `myDiv` al `div` fornito nel codice JSX.

# --hints--

La costante `JSX` dovrebbe restituire un elemento `div`.

```js
assert.strictEqual(JSX.type, 'div');
```

Il `div` dovrebbe essere di classe `myDiv`.

```js
assert.strictEqual(JSX.props.className, 'myDiv');
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
    <h1>Add a class to this div</h1>
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div className = 'myDiv'>
  <h1>Add a class to this div</h1>
</div>);
```
