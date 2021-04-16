# Cómo ayudar con los desafíos de vídeo

Los retos en vídeo son un nuevo tipo de desafío en el currículo de freeCodeCamp.

Un desafío de vídeo es una pequeña sección de un curso de vídeo completo sobre un tema en particular. Una página de desafío de vídeo inserta un vídeo de YouTube. Cada página de desafío tiene una única pregunta de selección múltiple relacionada con el vídeo. El usuario deberá responder correctamente la pregunta antes de avanzar al siguiente desafío de video en el curso.

Las páginas de desafío de vídeo son creadas por miembros del equipo freeCodeCamp. Los vídeos de YouTube también son subidos por miembros del equipo freeCodeCamp. Muchos de los desafíos de video todavía no tienen preguntas asociadas con ellos.

Puedes ayudar creando preguntas de selección múltiple relacionadas con las secciones de video y agregando las preguntas a los archivos markdown para los desafíos de video.


## Plantilla de desafío

A continuación se muestra una plantilla de cómo se ven los archivos markdown de los desafíos.

````md
---
id: Unique identifier (alphanumerical, MongoDB_id)
title: Challenge Title
challengeType: 11
videoId: 'YouTube videoId for video challenge'
forumTopicId: 12345
---

# --description--

Challenge description text, in markdown

```html
<div>
  example code
</div>
````

# --question--

Estos campos se utilizan actualmente para los desafíos de Python de opción múltiple.

## --text--

El texto de la pregunta va aquí.

## --answers--

Respuesta 1

---

Respuesta 2

---

Más respuestas

## --video-solution--

El número para la respuesta correcta va aquí.

````

## Creando preguntas para los desafíos de video

### Accede a los archivos markdown del desafío de video

Puedes encontrar los archivos markdown de los desafíos de video en las siguientes ubicaciones del currículum:

- [Curso de análisis de datos con Python](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/data-analysis-with-python-course)
- [Curso de TensorFlow 2.0](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/tensorflow)
- [Curso de Numpy](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/numpy)
- [Curso de como funcionan las redes neuronales](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/how-neural-networks-work)

Elige un archivo markdown de las opciones anteriores.

### Dale un vistazo al video asociado con el desafío y crea una pregunta de opción múltiple

Primero, encuentra la videoId (id del vídeo).

Por ejemplo, en el siguiente código de la cabecera de un archivo markdown de desafío de video, el videoId es "nVAaxZ34khk". En GitHub, la información debe ser colocada en un formato de tabla.
````
---
id: 5e9a093a74c4063ca6f7c14d title: Data Analysis Example A challengeType: 11
videoId: nVAaxZ34khk
---
```

A continuación, accede al vídeo de YouTube con esa `videoId`. La URL del video será:
https://www.youtube. om/watch?v=[videoId]    (reemplaza `videoId` en la URL con la ID del video sin los corchetes)

En el ejemplo anterior, la URL es https://www.youtube.com/watch?v=nVAaxZ34khk

Dale un vistazo al video de YouTube con ese videoId y piensa en una pregunta de selección múltiple basada en el contenido del video.

### Añade la pregunta al archivo markdown

Puedes añadir la pregunta localmente o utilizando la interfaz de GitHub. Para añadir la pregunta localmente, necesitas [configurar freeCodeCamp localmente](how-to-setup-freecodecamp-locally.md). También puede encontrar el archivo en GitHub y hacer clic en el botón Editar para añadir la pregunta directamente en su navegador.

Si aún no se ha agregado una pregunta a un desafío de video en particular, tendrá la siguiente pregunta predeterminada:

```md
# --question--

## --text--

Question text

## --answers--

Answer 1

---

Answer 2

---

More answers

## --video-solution--

1
```

Añade/Actualiza el texto de la pregunta debajo de la parte que muestra:
```
# --question--

## --text--
```
Añade/Actualiza las respuestas (`Answer 1`, `Answer 2`, y así) debajo de `## --answers--`. Asegúrate de actualizar el número debajo de ` ## --video-solution-- ` con el número de respuesta correcto. Puede añadir más respuestas posibles usando el mismo formato. La pregunta y las respuestas pueden estar rodeadas de comillas.

### Ejemplos de preguntas

````md
# --question--

## --text--
¿Qué imprime este código de JavaScript en la consola?
```js
console.log('hello world');
````

## --answers--

hola *mundo*

---

**hola** mundo

---

hola mundo

---

## --video-solution--
3
````

````md

# --question--

## --text--

¿Qué se imprimirá después de ejecutar este código?:

```py
width = 15
height = 12.0
print(height/3)
````

## --answers--

39

---

4

---

4.0

---

5.0

---

5

## --video-solution--

3 ````

Para más ejemplos, puede ver los archivos de markdown para el siguiente curso de video. Todos los desafíos ya tienen preguntas: [Curso de Python para todos](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/07-scientific-computing-with-python/python-for-everybody)

## Abrir una pull request

Después de crear una o más preguntas, puedes enviar los cambios a una nueva rama y [abrir una pull request](how-to-open-a-pull-request.md).
