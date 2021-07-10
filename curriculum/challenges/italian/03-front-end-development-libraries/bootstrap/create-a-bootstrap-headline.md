---
id: bad87fee1348bd9aec908846
title: Creare un titolo con Bootstrap
challengeType: 0
forumTopicId: 16812
dashedName: create-a-bootstrap-headline
---

# --description--

Ora costruiamo qualcosa da zero per fare pratica con le nostre abilità HTML, CSS e Bootstrap.

Costruiremo un "terreno di gioco" che presto useremo con le nostre sfide jQuery.

Per iniziare, crea un elemento `h3`, con il testo `jQuery Playground`.

Colora il tuo elemento `h3` con la classe Bootstrap `text-primary` e centralo con la classe `text-center` Bootstrap.

# --hints--

Dovresti aggiungere un elemento `h3` alla tua pagina.

```js
assert($('h3') && $('h3').length > 0);
```

Il tuo elemento `h3` dovrebbe avere un tag di chiusura.

```js
assert(
  code.match(/<\/h3>/g) &&
    code.match(/<h3/g) &&
    code.match(/<\/h3>/g).length === code.match(/<h3/g).length
);
```

Il tuo elemento `h3` dovrebbe essere colorato applicando la classe `text-primary`

```js
assert($('h3').hasClass('text-primary'));
```

Il tuo elemento `h3` dovrebbe essere centrato applicando la classe `text-center`

```js
assert($('h3').hasClass('text-center'));
```

Il tuo elemento `h3` dovrebbe avere il testo `jQuery Playground`.

```js
assert.isTrue(/jquery(\s)+playground/gi.test($('h3').text()));
```

# --seed--

## --seed-contents--

```html

```

# --solutions--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```
