---
id: bd7158d8c442eddfaeb5bd0f
title: Costruisci un Orologio 25 + 5
challengeType: 3
forumTopicId: 301373
dashedName: build-a-25--5-clock
---

# --description--

**Obiettivo:** Costruisci un'app [CodePen.io](https://codepen.io) funzionalmente simile a questa: <https://codepen.io/freeCodeCamp/full/XpKrrW>.

Compila le [user stories](https://en.wikipedia.org/wiki/User_story) qui sotto e fai passare tutti i test. Dalle il tuo stile personale.

Puoi utilizzare qualsiasi mix di HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux e jQuery per completare questo progetto. Dovresti usare un framework frontend (come React per esempio) perché questa sezione riguarda l'apprendimento dei framework per il frontend. Ulteriori tecnologie non elencate sopra non sono raccomandate e usarle è a tuo rischio. Stiamo cercando di supportare altri framework per il frontend come Angular e Vue, ma attualmente non sono supportati. Accetteremo e cercheremo di risolvere tutte le segnalazioni di problemi che utilizzano lo stack tecnologico suggerito per questo progetto. Happy coding!

**User Story #1:** Posso vedere un elemento con `id="break-label"` che contiene una stringa (ad esempio "Break Length").

**User Story #2:** Posso vedere un elemento con `id="session-label"` che contiene una stringa (ad esempio "Session Length").

**User Story #3:** Posso vedere due elementi cliccabili con gli id rispettivamente: `id="break-decrement"` e `id="session-decrement"`.

**User Story #4:** Posso vedere due elementi cliccabili con gli id rispettivamente: `id="break-increment"` e `id="session-increment"`.

**User Story #5:** Posso vedere un elemento con un corrispondente `id="break-length"`, che per impostazione predefinita (al caricamento) visualizza un valore di 5.

**User Story #6:** Posso vedere un elemento con un corrispondente `id="session-length"`, che per impostazione predefinita visualizza un valore di 25.

**User Story #7:** Posso vedere un elemento con un corrispondente `id="timer-label"`, che contiene una stringa che indica che una sessione è inizializzata (es. "Session").

**User Story #8:** Posso vedere un elemento con corrispondente `id="time-left"`. NOTA: In pausa o in esecuzione, il valore in questo campo deve essere sempre visualizzato in formato `mm:ss` (cioè 25:00).

**User Story #9:** Posso vedere un elemento cliccabile con un corrispondente `id="start_stop"`.

**User Story #10:** Posso vedere un elemento cliccabile con un corrispondente `id="reset"`.

**User Story #11:** Quando clicco sull'elemento con l'id di `reset`, qualsiasi timer in esecuzione deve essere fermato, il valore in `id="break-length"` dovrebbe tornare a `5`, il valore in `id="session-length"` dovrebbe ritornare a 25, e l'elemento con `id="time-left"` dovrebbe tornare al suo stato predefinito.

**User Story #12:** Quando clicco sull'elemento con l'id `break-decrement`, il valore all'interno di `id="break-length"` diminuisce di 1, e posso vedere il valore aggiornato.

**User Story #13:** Quando clicco sull'elemento con l'id di `break-increment`, il valore all'interno di `id="break-length"` aumenta di 1, e posso vedere il valore aggiornato.

**User Story #14:** Quando clicco sull'elemento con l'id di `session-decrement`, il valore in `id="session-length"` diminuisce di 1, e riesco a vedere il valore aggiornato.

**User Story #15:** Quando clicco sull'elemento con l'id di `session-increment`, il valore all'interno di `id="session-length"` aumenta di 1, e posso vedere il valore aggiornato.

**User Story #16:** Non dovrei essere in grado di impostare la lunghezza di una sessione o di una pausa &lt;= 0.

**User Story #17:** Non dovrei essere in grado di impostare la lunghezza di una sessione o di una pausa > 60.

**User Story #18:** Quando faccio click per la prima volta sull'elemento con `id="start_stop"`, il timer dovrebbe iniziare dal valore attualmente visualizzato in `id="session-length"`, anche se il valore è stato incrementato o diminuito rispetto al valore originario di 25.

**User Story #19:** Se il timer è in esecuzione, l'elemento con l'id di `time-left` dovrebbe visualizzare il tempo rimanente nel formato `mm:ss` (decrementando di un valore di 1 e aggiornando il display ogni 1000ms).

**User Story #20:** Se il timer è in esecuzione e clicco sull'elemento con `id="start_stop"`, il conto alla rovescia dovrebbe andare in pausa.

**User Story #21:** Se il timer è in pausa e clicco sull'elemento con `id="start_stop"`, il conto alla rovescia dovrebbe riprendere dal punto in cui è stato messo in pausa.

**User Story #22:** Quando un conto alla rovescia di una sessione raggiunge lo zero (NOTA: il timer DEVE raggiungere le 00:00), e inizia un nuovo conto alla rovescia, l'elemento con l'id di `timer-label` dovrebbe mostrare una stringa che indica che è iniziata una pausa.

**User Story #23:** Quando il conto alla rovescia di una sessione raggiunge lo zero (NOTA: il timer DEVE raggiungere le 00:00), dovrebbe iniziare un nuovo conto alla rovescia, contando alla rovescia dal valore attualmente visualizzato nell'elemento `id="break-length"`.

**User Story #24:** Quando un conto alla rovescia raggiunge lo zero (NOTA: il timer DEVE raggiungere le 00:00), e inizia un nuovo conto alla rovescia, l'elemento con l'id di `timer-label` dovrebbe mostrare una stringa che indica che è iniziata una sessione.

**User Story #25:** Quando il conto alla rovescia della pausa raggiunge lo zero (NOTA: il timer DEVE raggiungere le 00:00), dovrebbe iniziare un nuovo conto alla rovescia, contando alla rovescia dal valore attualmente visualizzato nell'elemento `id="session-length"`.

**User Story #26:** Quando un conto alla rovescia raggiunge lo zero (NOTA: il timer DEVE raggiungere le 00:00), dovrebbe essere riprodotto un suono che indica che il tempo è scaduto. Questo dovrebbe utilizzare un tag HTML5 `audio` e avere un corrispondente `id="beep"`.

**User Story #27:** L'elemento audio con `id="beep"` deve essere lungo un secondo o più.

**User Story #28:** L'elemento audio con id di `beep` deve terminare la riproduzione e tornare all'inizio quando viene cliccato l'elemento con l'id `reset`.

Puoi costruire il tuo progetto <a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>usando questo modello CodePen</a> e facendo clic su `Save` per creare il tuo pen. Oppure puoi usare questo link CDN per eseguire i test in qualsiasi ambiente tu voglia: `https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`

Una volta fatto, invia l'URL del tuo progetto di lavoro con tutti i suoi test passati.

# --solutions--

```js
// solution required
```
