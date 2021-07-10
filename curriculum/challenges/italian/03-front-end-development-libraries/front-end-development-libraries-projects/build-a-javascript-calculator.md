---
id: bd7158d8c442eddfaeb5bd17
title: Costruisci una Calcolatrice JavaScript
challengeType: 3
forumTopicId: 301371
dashedName: build-a-javascript-calculator
---

# --description--

**Obiettivo:** Costruisci un'app [CodePen.io](https://codepen.io) funzionalmente simile a questa: <https://codepen.io/freeCodeCamp/full/wgGVVX>.

Compila le [user stories](https://en.wikipedia.org/wiki/User_story) qui sotto e fai passare tutti i test. Dalle il tuo stile personale.

Puoi utilizzare qualsiasi mix di HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux e jQuery per completare questo progetto. Dovresti usare un framework frontend (come React per esempio) perché questa sezione riguarda l'apprendimento dei framework per il frontend. Ulteriori tecnologie non elencate sopra non sono raccomandate e usarle è a tuo rischio. Stiamo cercando di supportare altri framework per il frontend come Angular e Vue, ma attualmente non sono supportati. Accetteremo e cercheremo di risolvere tutte le segnalazioni di problemi che utilizzano lo stack tecnologico suggerito per questo progetto. Happy coding!

**User Story #1:** La mia calcolatrice dovrebbe contenere un elemento cliccabile contenente un `=` (segno uguale) con un corrispondente `id="equals"`.

**User Story #2:** La mia calcolatrice dovrebbe contenere 10 elementi cliccabili contenenti ciascuno un numero da 0-9, con i seguenti ID corrispondenti: `id="zero"`, `id="one"`, `id="two"`, `id="three"`, `id="four"`, `id="five"`, `id="six"` `id="seven"`, `id="eight"` e `id="nine"`.

**User Story #3:** La mia calcolatrice dovrebbe contenere 4 elementi cliccabili contenenti ognuno uno degli operatori matematici primari con i seguenti ID corrispondenti: `id="add"`, `id="subtract"`, `id="multiply"`, `id="divide"`.

**User Story #4:** La mia calcolatrice dovrebbe contenere un elemento cliccabile contenente un simbolo `.` (punto decimale) con un corrispondente `id="decimal"`.

**User Story #5:** La mia calcolatrice dovrebbe contenere un elemento cliccabile con un `id="clear"`.

**User Story #6:** La mia calcolatrice dovrebbe contenere un elemento per visualizzare i valori con un corrispondente `id="display"`.

**User Story #7:** In qualsiasi momento, premendo il pulsante `clear` dovrebbero essere cancellati i valori di input e output, e la calcolatrice dovrebbe tornare suo stato iniziale; nell'elemento con l'id `display` dovrebbe essere mostrato 0.

**User Story #8:** Quando inserisco dei numeri, dovrei essere in grado di vedere il mio input nell'elemento con l'id `display`.

**User Story #9:** Dovrei essere in grado di aggiungere, sottrarre, moltiplicare e dividere una catena di numeri di qualsiasi lunghezza e in qualsiasi ordine, e quando premo `=`, il risultato corretto dovrebbe essere mostrato nell'elemento con l'id `display`.

**User Story #10:** La mia calcolatrice non dovrebbe consentire a un numero di iniziare con zeri multipli.

**User Story #11:** Quando l'elemento decimale viene cliccato, un `.` dovrebbe essere accodato al valore attualmente visualizzato; non dovrebbero essere accettati due `.` in un numero.

**User Story #12:** Dovrei essere in grado di eseguire qualsiasi operazione (`+`, `-`, `*`, `/`) sui numeri contenenti punti decimali.

**User Story #13:** Se 2 o più operatori sono inseriti consecutivamente, l'operazione effettuata dovrebbe essere l'ultimo operatore inserito (escluso il segno meno (`-`). Ad esempio, se viene inserito `5 + * 7 =`, il risultato dovrebbe essere `35` (cioè `5 * 7`); se viene inserito `5 * - 5 =`, il risultato dovrebbe essere `-25` (cioè `5 * (-5)`).

**User Story #14:** Premere un operatore immediatamente dopo `=` dovrebbe avviare un nuovo calcolo che funzioni sul risultato dell'elaborazione precedente.

**User Story #15:** La mia calcolatrice dovrebbe avere diversi decimali di precisione quando si tratta di arrotondamento (nota che non c'è uno standard esatto, ma si dovrebbe essere in grado di gestire calcoli come `2 / 7` con ragionevole precisione ad almeno 4 decimali).

**Nota sulla logica della calcolatrice:** Va notato che ci sono due principali scuole di pensiero sulla logica dell'input della calcolatrice: <dfn>logica a esecuzione immediata</dfn> e <dfn>logica della formula</dfn>. Il nostro esempio utilizza la logica della formula e osserva l'ordine di precedenza degli operatori, mentre l'esecuzione immediata non lo fa. Entrambe sono accettabili, ma nota che a seconda di quale sceglierai, la calcolatrice potrà produrre risultati diversi rispetto ai nostri per alcune equazioni (vedi l'esempio in basso). Finché la matematica può essere verificata da un altro calcolatore di produzione, non considerarlo un bug.

**ESEMPIO:** `3 + 5 x 6 - 2 / 4 =`

-   **Logica a esecuzione immediata:** `11.5`
-   **Logica della formula:** `32.5`

Puoi costruire il tuo progetto <a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>usando questo modello CodePen</a> e facendo clic su `Save` per creare il tuo pen. Oppure puoi usare questo link CDN per eseguire i test in qualsiasi ambiente tu voglia: `https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`

Una volta fatto, invia l'URL del tuo progetto di lavoro con tutti i suoi test passati.

# --solutions--

```js
// solution required
```
