---
id: bd7158d8c442eddfaeb5bd0f
title: Construye un reloj 25 + 5
challengeType: 3
forumTopicId: 301373
dashedName: build-a-25--5-clock
---

# --description--

**Objetivo:** Construye una aplicación funcional [CodePen.io](https://codepen.io) similar a esta: <https://codepen.io/freeCodeCamp/full/XpKrrW>.

Completa las siguientes [historias de usuario](https://en.wikipedia.org/wiki/User_story) y consigue pasar todas las pruebas. Dale tu propio estilo personal.

Puedes utilizar una mezcla de HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux y jQuery para completar este proyecto. Deberías utilizar un framework frontend (como React por ejemplo) porque esta sección trata sobre el aprendizaje de frameworks frontend. No se recomienda utilizar tecnologías adicionales a las indicadas anteriormente, su utilización corre bajo su propio riesgo. Estamos considerando apoyar otros frameworks frontend como Angular y Vue, pero actualmente no están soportados. Aceptaremos e intentaremos solucionar todos los informes de incidencias que utilicen el conjunto de tecnologías sugeridas para este proyecto. ¡Feliz programación!

**Historia de usuario #1:** Puedo ver un elemento con `id="break-label"` que contiene una cadena (por ejemplo: "Break Length").

**Historia de usuario #2:** Puedo ver un elemento con `id="session-label"` que contiene una cadena (p.ej "Session Length").

**Historia de usuario #3:** Puedo ver dos elementos cliqueables con los siguientes IDs: `id="break-decrement"` y `id="session-decrement"`.

**Historia de usuario #4:** Puedo ver dos elemento cliqueables con los siguientes IDs: `id="break-increment"` y `id="session-increment"`.

**Historia de usuario #5:** Puedo ver un elemento con el correspondiente `id="break-length"` que por defecto (al cargarse) muestra el valor 5.

**Historia de usuario #6:** Puedo ver un elemento con el correspondiente `id="session-length"`, que por defecto muestra el valor 25.

**Historia de usuario #7:** Puedo ver un elemento con el correspondiente `id="timer-label"`, que contiene una cadena indicando si la sesión esta inicializada (p.ej. "Session").

**Historia de usuario #8:** Puedo ver un elemento con el correspondiente `id="time-left"`. NOTA: En pausa o en ejecución, el valor en este campo debe mostrarse siempre en formato `mm:ss` (es decir: 25:00).

**User Story #9:** Puedo ver un elemento cliqueable con el correspondiente `id="start_stop"`.

**User Story #10:** Puedo ver un elemento cliqueable con el correspondiente `id="reset"`.

**Historia de usuario #11:** Cuando hago clic en el elemento con el id: `reset`, cualquier temporizador en ejecución debe detenerse. El valor en el `id="break-length"` debe regresar a `5`, el valor en el `id="session-length"` debe regresar a 25 y el elemento con `id="time-left"` debe reiniciarse a su estado predeterminado.

**Historia de usuario #12:** Cuando hago clic en el elemento con id: `break-decrement`, el valor en `id="break-length"` se reduce en 1, y puedo ver el valor actualizado.

**Historia de usuario #13:** Cuando hago clic en el elemento con id: `break-increment`, el valor en `id="break-length"` se incrementa en 1 y puedo ver el valor actualizado.

**Historia de usuario #14:** Cuando hago clic en el elemento con id: `session-decrement`, el valor en `id="session-length"` se reduce en 1 y puedo ver el valor actualizado.

**Historia de usuario #15:** Cuando hago clic en el elemento con id: `session-increment`, el valor en `id="session-length"` se incrementa en 1 y puedo ver el valor actualizado.

**Historia de usuario #16:** No debo ser capaz de establecer una duración de la sesión o pausa &lt;= 0.

**Historia de usuario #17:** No debería poder establecer una duración de la sesión o pausa > 60.

**Historia de usuario #18:** Cuando hago clic por primera vez en el elemento con el correspondiente `id="start_stop"`, el temporizador debe comenzar a correr desde el valor mostrado actualmente en `id="session-length"`, incluso si el valor se incrementó o se redujo respecto al valor original 25.

**Historia de usuario #19:** Si el temporizador se está ejecutando, el elemento con el id: `time-left` debería mostrar el tiempo restante en formato `mm:ss` (reduciendo 1 y actualizando el valor mostrado cada 1000ms).

**Historia de usuario #20:** Si el temporizador se está ejecutando y hago clic en el elemento `id="start_stop"`, la cuenta atrás debería pausarse.

**Historia de usuario #21:** Si el temporizador está pausado y hago clic en el elemento `id="start_stop"`, la cuenta atrás debe reanudarse desde el punto en el que fue pausada.

**Historia de usuario #22:** Cuando la cuenta atrás de la sesión llega a cero (NOTA: temporizador DEBE llegar a 00:00) y una nueva cuenta atrás comienza, el elemento cuyo id es `timer-label` debería mostrar una cadena en la que se indica que el descanso (break) ha comenzado.

**Historia de usuario #23:** Cuando la cuenta atrás de la sesión llega a cero (NOTA: temporizador DEBE llegar a 00:00), una nueva cuenta atrás comienza para el periodo de descanso (break) y se inicia desde el valor mostrado actualmente por el elemento `id="break-length"`.

**Historia de usuario #24:** Cuando la cuenta atrás en el periodo de descanso (break) llega a cero (NOTA: temporizador DEBE llegar a 00:00) y una nueva cuenta atrás debe comenzar, el elemento cuyo id es `timer-label` debe mostrar una cadena en la que se indica que la sesión ha comenzado.

**Historia de usuario #25:** Cuando la cuenta atrás en el periodo de descanso (break) llega a cero (NOTA: temporizador DEBE llegar a 00:00), una nueva cuenta atrás debe comenzar para la sesión, la cual se inicia desde el valor mostrado actualmente por el elemento `id="session-length"`.

**Historia de usuario #26:** Cuando una cuenta atrás llega a cero (NOTA: temporizador DEBE llegar a 00:00), debe reproducirse un sonido que indica que el tiempo se ha agotado. Se debe utilizar una etiqueta HTML5 `audio` y tener un `id="beep"`.

**Historia de usuario #27:** El elemento de audio `id="beep"` debe ser de 1 segundo o mayor.

**Historia de usuario #28:** El elemento de audio con id: `beep` dejará de reproducirse y se reiniciará al hacer clic en el elemento con id: `reset`.

Puedes construir tu proyecto con <a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>usando esta plantilla CodePen</a> y haciendo clic en `Save` para crear tu propio Pen. O puedes utilizar este enlace CDN para ejecutar las pruebas en cualquier entorno que desees: `https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`

Una vez que hayas terminado, envía la URL de tu proyecto con todos los tests pasados.

# --solutions--

```js
// solution required
```
