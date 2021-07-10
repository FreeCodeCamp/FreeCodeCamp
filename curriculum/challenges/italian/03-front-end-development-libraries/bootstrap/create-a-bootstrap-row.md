---
id: bad87fee1348bd9bec908846
title: Creare una riga di Bootstrap
challengeType: 0
forumTopicId: 16813
dashedName: create-a-bootstrap-row
---

# --description--

Ora creeremo una riga (row) di Bootstrap per i nostri elementi in linea.

Crea un elemento `div` sotto il tag `h3`, con una classe `row`.

# --hints--

Dovresti aggiungere un elemento `div` sotto il tuo elemento `h3`.

```js
assert(
  $('div').length > 1 &&
    $('div.row h3.text-primary').length == 0 &&
    $('div.row + h3.text-primary').length == 0 &&
    $('h3.text-primary + div.row').length > 0
);
```

Il tuo elemento `div` dovrebbe avere la classe `row`

```js
assert($('div').hasClass('row'));
```

Il tuo `row div` dovrebbe essere annidato all'interno del `container-fluid div`

```js
assert($('div.container-fluid div.row').length > 0);
```

Il tuo elemento `div` dovrebbe avere un tag di chiusura.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>

</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row"></div>
</div>
```
