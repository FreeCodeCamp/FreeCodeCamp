---
id: bd7158d8c442eddfaeb5bd17
title: Crea una calculadora con JavaScript
challengeType: 3
forumTopicId: 301371
dashedName: build-a-javascript-calculator
---

# --description--

**Objetivo:** Construye una aplicación en [CodePen.io](https://codepen.io) que funcionalmente sea similar a esta: <https://codepen.io/freeCodeCamp/full/wgGVVX>.

Completa las siguientes [historias de usuario](https://en.wikipedia.org/wiki/User_story) y consigue que se aprueben todas las pruebas. Dale tu propio estilo personal.

Puede utilizar cualquier mezcla de HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux y jQuery para completar este proyecto. Debe usar un framework frontend (como React por ejemplo), ya que esta sección trata sobre el aprendizaje de frameworks frontend. No se recomienda utilizar tecnologías adicionales a las indicadas anteriormente, su uso corre bajo tu propio riesgo. Estamos buscando dar soporte a otros frameworks de frontend como Angular y Vue, pero actualmente no están soportados. Aceptaremos e intentaremos arreglar todos los informes de incidencias que utilicen la pila de tecnología sugerida para este proyecto. ¡Feliz codificación!

**Historia de usuario #1:** Mi calculadora debe contener un elemento cliqueable que contenga un `=` (signo igual) con un correspondiente `id="equals"`.

**Historia de usuario #2:** Mi calculadora debe contener 10 elementos que contienen un número cada uno de 0-9 con los siguientes IDs correspondientes: `id="zero"`, `id="one"`, `id="two"`, `id="three"`, `id="four"`, `id="five"`, `id="six"`, `id="seven"`, `id="eight"`, and `id="nine"`.

**Historia de usuario #3:** Mi calculadora debe contener 4 elementos que contengan uno de los 4 operadores matemáticos primarios con los siguientes identificadores correspondientes: `id="add"` `id="subtract"`, `id="multiply"`, `id="divide"`.

**Historia de usuario #4:** Mi calculadora debe contener un elemento cliqueable que contenga un `.` (punto decimal) símbolo con el correspondiente `id="decimal"`.

**Historia de usuario #5:** Mi calculadora debe contener un elemento cliqueable con un `id="clear"`.

**Historia de usuario #6:** Mi calculadora debe contener un elemento para mostrar valores con un correspondiente `id="display"`.

**Historia de usuario #7:** En cualquier momento, pulsando el botón `clear` elimina los valores de entrada y salida. Luego devuelve la calculadora a su estado inicial; debe mostrar 0 en el elemento con el id de `display`.

**Historia de usuario #8:** Al introducir números, Debe ser capaz de ver mi entrada en el elemento con el id de `display`.

**Historia de usuario #9:** En cualquier orden, debe poder añadir, restar, multiplicar y dividir una cadena de números de cualquier longitud. Además cuando presione `=`, el resultado correcto debe mostrarse en el elemento con el id de `display`.

**Historia de usuario #10:** Al introducir números, mi calculadora no debe permitir que un número comience con varios ceros.

**Historia de usuario #11:** Cuando se hace clic en el elemento decimal, un `.` debe añadirse al valor mostrado actualmente; dos `.` en un número no debe ser aceptado.

**Historia de usuario #12:** Debe ser capaz de realizar cualquier operación (`+`, `-`, `*`, `/`) en números que contienen puntos decimales.

**Historia de usuario #13:** Si se introducen 2 o más operadores consecutivamente, la operación realizada debe ser el último operador introducido (excluyendo el signo negativo (`-`). Por ejemplo, si `5 + * 7 =` es introducido, el resultado debe ser `35` (p.e. `5 * 7`); si `5 * - 5 =` es introducido, el resultado debe ser `-25` (p.e `5 * (-5)`).

**Historia de usuario #14:** Presionando un operador inmediatamente después de `=` debe comenzar un nuevo cálculo que opere sobre el resultado de la evaluación anterior.

**Historia de usuario #15:** Mi calculadora debe tener varios decimales de precisión a la hora de redondear (tenga en cuenta que no hay un estándar exacto, pero debe ser capaz de manejar cálculos como `2 / 7` con una precisión razonable de al menos 4 decimales.

**Nota sobre la lógica de la calculadora:** Debe tener en cuenta que hay dos escuelas principales de pensamiento sobre la lógica de entrada de las calculadoras: <dfn>lógica de ejecución inmediata</dfn> y <dfn>lógica de la fórmula</dfn>. Nuestro ejemplo utiliza lógica de la fórmula. Observa el orden de precedencia de la operación, la ejecución inmediata no lo hace. Ambas son aceptables, pero ten en cuenta que dependiendo de cuál elijas, tu calculadora puede producir resultados diferentes a los nuestros para ciertas ecuaciones (ver ejemplo a continuación). Mientras sus matemáticas puedan ser verificadas por otra calculadora de producción, por favor no considere esto un error.

**EXAMPLE:** `3 + 5 x 6 - 2 / 4 =`

-   **Lógica de ejecución inmediata:** `11.5`
-   **Fórmula/Expresión lógica:** `32.5`

Puedes construir tu proyecto con <a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>usando esta plantilla de CodePen</a> y haciendo clic en `Save` para crear tu propio borrador. O puedes utilizar este enlace CDN(Red de distribución de contenidos) para ejecutar las pruebas en cualquier entorno que desees: `https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`

Una vez que hayas terminado, envía la URL de tu proyecto funcional con todos los tests aprobados.

# --solutions--

```js
// solution required
```
