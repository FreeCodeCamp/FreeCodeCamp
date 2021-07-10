---
id: 5a24bbe0dba28a8d3cbd4c5f
title: Presentare gli elementi HTML nel DOM
challengeType: 6
forumTopicId: 301406
dashedName: render-html-elements-to-the-dom
---

# --description--

Finora, hai imparato che JSX è uno strumento utile per scrivere HTML leggibile all'interno di JavaScript. Con React, possiamo presentare questo JSX direttamente nel DOM HTML utilizzando l'API di rendering di React conosciuta come ReactDOM.

ReactDOM offre un metodo semplice per presentare gli elementi React nel DOM che appare così: `ReactDOM.render(componentToRender, targetNode)`, dove il primo argomento è l'elemento React o il componente che si desidera presentare, e il secondo argomento è il nodo DOM nel quale si desidera visualizzare il componente.

Come ci si aspetterebbe, `ReactDOM.render()` deve essere chiamato dopo le dichiarazioni degli elementi JSX, proprio come è necessario dichiarare le variabili prima di usarle.

# --instructions--

L'editor di codice contiene un semplice componente JSX. Usa il metodo `ReactDOM.render()` per presentare questo componente nella pagina. Puoi passare gli elementi JSX che hai definito direttamente come primo argomento e utilizzare `document.getElementById()` per selezionare il nodo DOM nel quale fare il render. C'è un `div` con `id='challenge-node'` pronto all'uso per te. Assicurati di non modificare la costante `JSX`.

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

L'elemento JSX fornito dovrebbe essere presentato nel nodo DOM con id `challenge-node`.

```js
assert(
  document.getElementById('challenge-node').childNodes[0].innerHTML ===
    '<h1>Hello World</h1><p>Lets render this to the DOM</p>'
);
```

# --seed--

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);
// Change code below this line
```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello World</h1>
  <p>Lets render this to the DOM</p>
</div>
);
// Change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));
```
