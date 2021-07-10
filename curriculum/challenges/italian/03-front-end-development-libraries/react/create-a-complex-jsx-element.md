---
id: 5a24bbe0dba28a8d3cbd4c5d
title: Creare un elemento JSX complesso
challengeType: 6
forumTopicId: 301382
dashedName: create-a-complex-jsx-element
---

# --description--

L'ultima sfida è stata un semplice esempio di JSX, ma JSX può rappresentare anche HTML più complesso.

Una cosa importante da sapere sul JSX annidato è che deve restituire un singolo elemento.

Questo elemento genitore avvolgerà tutti gli altri livelli di elementi annidati.

Per esempio, diversi elementi JSX scritti come fratelli senza un elemento genitore che li contenga, non saranno transcodificati.

Ecco un esempio:

**JSX valido:**

```jsx
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

**JSX non valido:**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

# --instructions--

Definisci una nuova costante `JSX` che esegua il render di un `div` che contenga i seguenti elementi in ordine:

Un `h1`, un `p`e una lista non ordinata che contiene tre elementi `li`. Puoi includere qualsiasi testo desideri all'interno di ogni elemento.

**Nota:** Quando si visualizzano più elementi come questo, è possibile avvolgerli tutti in parentesi, ma non è strettamente necessario. Nota anche che questa sfida utilizza un tag `div` per avvolgere tutti gli elementi figli all'interno di un singolo elemento genitore. Se rimuovi il `div`, il JSX non sarà più transcodificato. Tienilo a mente, perché questo si applicherà anche quando restituirai elementi JSX in componenti React.

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

Il `div` dovrebbe contenere un tag `ul` come terzo elemento.

```js
assert(JSX.props.children[2].type === 'ul');
```

L'elemento `ul` dovrebbe contenere tre elementi `li`.

```js
assert(
  JSX.props.children
    .filter((ele) => ele.type === 'ul')[0]
    .props.children.filter((ele) => ele.type === 'li').length === 3
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx

```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
</div>);
```
