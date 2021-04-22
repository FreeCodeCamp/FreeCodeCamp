---
id: 56bbb991ad1ed5201cd392cf
title: Escribe JavaScript reutilizable utilizando funciones
challengeType: 1
videoUrl: 'https://scrimba.com/c/cL6dqfy'
forumTopicId: 18378
dashedName: write-reusable-javascript-with-functions
---

# --description--

En JavaScript, podemos dividir nuestro código en partes reutilizables llamadas <dfn>funciones</dfn>.

Este es un ejemplo de una función:

```js
function functionName() {
  console.log("Hello World");
}
```

Puedes llamar o <dfn>invocar</dfn> esta función usando su nombre seguido por paréntesis, así: `functionName();` Cada vez que se llame la función se imprimirá el mensaje `Hello World` en la consola de desarrollo. Todo el código entre las llaves se ejecutará cada vez que se llame la función.

# --instructions--

<ol>
  <li>
    Crea una función llamada <code>reusableFunction</code> que imprima la cadena <code>Hi World</code> en la consola de desarrollo.
  </li>
  <li>
    Llama a la función.
  </li>
</ol>

# --hints--

`reusableFunction` debe ser una función.

```js
assert(typeof reusableFunction === 'function');
```

Si `reusableFunction` es llamado, este debe mostrar la cadena `Hi World` en la consola.

```js
assert(testConsole());
```

Debes llamar `reusableFunction` después de definirla.

```js
const functionStr = reusableFunction && __helpers.removeWhiteSpace(reusableFunction.toString());
const codeWithoutFunction = __helpers.removeWhiteSpace(code).replace(/reusableFunction\(\)\{/g, '');
assert(/reusableFunction\(\)/.test(codeWithoutFunction));
```

# --seed--

## --after-user-code--

```js

function testConsole() {
  var logOutput = "";
  var originalConsole = console;
  var nativeLog = console.log;
  var hiWorldWasLogged = false;
  console.log = function (message) {
    if(message === 'Hi World')  {
      console.warn(message)
      hiWorldWasLogged = true;
    }
    if(message && message.trim) logOutput = message.trim();
    if(nativeLog.apply) {
      nativeLog.apply(originalConsole, arguments);
    } else {
      var nativeMsg = Array.prototype.slice.apply(arguments).join(' ');
      nativeLog(nativeMsg);
    }
  };
  reusableFunction();
  console.log = nativeLog;
  return hiWorldWasLogged;
}

```

## --seed-contents--

```js

```

# --solutions--

```js
function reusableFunction() {
  console.log("Hi World");
}
reusableFunction();
```
