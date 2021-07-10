---
id: 587d7dbc367417b2b2512bae
title: Crea una batería electrónica
challengeType: 3
forumTopicId: 301370
dashedName: build-a-drum-machine
---

# --description--

**Objetivo:** Construye una aplicación en [CodePen.io](https://codepen.io) que funcionalmente sea similar a esta: <https://codepen.io/freeCodeCamp/full/MJyNMd>.

Completa las siguientes [historias de usuario](https://en.wikipedia.org/wiki/User_story) y consigue que se aprueben todas las pruebas. Dale tu estilo personal.

Puede utilizar cualquier mezcla de HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, y jQuery para completar este proyecto. Debe usar un framework de frontend (como React por ejemplo). Porque esta sección trata sobre el aprendizaje de frameworks frontend. No se recomienda utilizar tecnologías adicionales a las indicadas anteriormente, su utilización, corre bajo tu propio riesgo. Estamos buscando dar soporte a otros frameworks de frontend como Angular y Vue, pero actualmente no están soportados. Aceptaremos e intentaremos solucionar todos los informes de incidencias que utilicen el conjunto de tecnologías sugeridas para este proyecto. ¡Feliz programación!

**Historia de usuario #1:** Debe ser capaz de ver un contenedor externo con un correspondiente `id="drum-machine"` que contiene todos los demás elementos.

**Historia de usuario #2:** Dentro de `#drum-machine` Puedo ver un elemento con un `id="display"` correspondiente.

**Historia de usuario #3:** Dentro de `#drum-machine` Puedo ver 9 elementos del panel de tambores clickables, cada una con un nombre de clase de `drum-pad`, un identificador único que describe el clip de audio que el pad de tambor será configurado para activar, y un texto interno que corresponde a una de las siguientes teclas del teclado: `Q`, `W`, `E`, `A`, `S`, `D`, `Z`, `X`, `C`. Los pads de la batería DEBEN estar en este orden.

**Historia de usuario #4:** Dentro de cada `.drum-pad`, debe haber un elemento HTML5 `audio` que tenga un atributo `src` apuntando a un clip de audio, un nombre de clase `clip`, y un id correspondiente al texto interno de su padre `.drum-pad` (e.g. `id="Q"`, `id="W"`, `id="E"` etc.).

**Historia de usuario #5:** Cuando hago clic en `.drum-pad` elemento, el clip de audio contenido en su elemento hijo `audio` debe ser activado.

**Historia de usuario #6:** Cuando presione la tecla de activación asociada con cada `.drum-pad`, el clip de audio contenido en su elemento hijo `audio` debe ser activado (p. ej. pulsando la tecla `Q` debería activar el tambor que contiene la cadena `Q`, pulsando la tecla `W` debería activar la tecla Tambor que contiene la cadena `W`, etc.).

**Historia de usuario #7:** Cuando es un `.drum-pad` es activado, una cadena que describe el clip de audio asociado se muestra como el texto interior del elemento `#display` (cada cadena debe ser única).

Puedes construir tu proyecto usando <a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>esta plantilla CodePen</a> y haciendo clic en `Save` para crear tu propio pen. O puedes utilizar este enlace CDN para ejecutar las pruebas en cualquier entorno que desees: `https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`

Una vez que hayas terminado, envía la URL de tu proyecto funcional con todas las pruebas aprobadas.

# --solutions--

```js
// solution required
```
