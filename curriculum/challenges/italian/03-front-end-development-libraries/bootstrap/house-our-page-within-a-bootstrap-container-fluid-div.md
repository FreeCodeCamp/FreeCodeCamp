---
id: bad87fee1348bd9aec908746
title: Accomodare la pagina all'interno di un div container-fluid di Bootstrap
challengeType: 0
forumTopicId: 18198
dashedName: house-our-page-within-a-bootstrap-container-fluid-div
---

# --description--

Ora assicuriamoci che tutti i contenuti sulla tua pagina siano responsivi sui dispositivi mobili.

Nidifichiamo l'elemento `h3` all'interno di un elemento `div` di classe `container-fluid`.

# --hints--

Il tuo elemento `div` dovrebbe avere la classe `container-fluid`.

```js
assert($('div').hasClass('container-fluid'));
```

Ognuno dei tuoi elementi `div` dovrebbe avere un tag di chiusura.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

Il tuo elemento `h3` dovrebbe essere annidato all'interno di un elemento `div`.

```js
assert($('div').children('h3').length > 0);
```

# --seed--

## --seed-contents--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```

# --solutions--

```html
<div class="container-fluid">
    <h3 class="text-primary text-center">jQuery Playground</h3>
</div>
```
