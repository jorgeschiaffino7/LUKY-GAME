'use strict';

// two ways to select ID from HTML
// Selecting elements

// changing player active to disable
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
/////////////////////////////////////////////////////////
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// CREAMOS LA FUNCION PARA CAMBIAR DE JUGADOR PORQUE VAMOS A UTILZAR EL BLOQUE DE CODIGO EN VARIAS SITUACIONES Y NO HAY NECESIDAD DE ESCRIBIR TANTAS VECES EL MISMO CODIGO, POR ESO LO GUARDAMOS EN UNA VARIABLE LA FUNCION.

//const scores = [0, 0]; // SON LOS SCORES FINALES, QUE SE ACUMULARAN
//let currentScore = 0; // lo definimos afuera de la funcion porque adentro se reiniciaria cada vez que le hacemos click y nosotros necesitamos almacenar.

//NECESITAMOS SABER QUE JUGADOR ESTA ACTIVO CUANDO TIRA EL DADO
//let activePlayer = 0; // (PLAYER 1=activePlayer = 0) definimos con valor 0 debido a que vamos a manejar un array donde el player 1 = 0 y player 2 = 1.

//let playing = true;

let scores, currentScore, activePlayer, playing;
// Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  //document.querySelector('#score--0').textContent = 0;
  //document.getElementById('score--1').textContent = 0;
  current0El.textContent = 0;
  //document.getElementById('current--0').textContent = 0;
  current1El.textContent = 0;
  //document.getElementById('current--1').textContent = 0;
  //document.querySelector('.dice').classList.add('hidden');

  diceEl.classList.add('hidden');
  // vamos a crear el selector .hidden {display:none;} en CSS

  document.querySelector('.player--0').classList.remove('player--winner'); // removemos 'player--winner' la clase de CSS

  document.querySelector('.player--1').classList.remove('player--winner'); // removemos 'player--winner' la clase de CSS

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // TENEMOS QUE LLAMAR LA FUNCION PARA QUE AL RECARGAR LA PAGINA SE INICIE EL JUEGO, PORQUE LA FUNCION SI NO LA LAMOS NO SE VA A EJECUTAR SOLA Y NADA FUNCIONARA. ( PLAYING TRUE)

const switchPlayer = function () {
  // switch the NEXT PLAYER
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // CAMBIAMOS DE PLAYER
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // metodo "toggle" permite agregar o quitar la clase "active"
};

// Rollind DICE Funcionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // solo se podra jugar si playing is true

    // 1. Generating a random dice roll:
    // vamos a crear una variable para eso =
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden'); // al hacer click se remueve la propiedad que oculta el dado o dice.
    diceEl.src = `dice-${dice}.png`; // asi cargamos dinamicamente las imagenes dependiendo del numero que salio en el RANDOM

    // 3. Check for rolled 1
    if (dice !== 1) {
      // cuando el dice no es 1
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // SE AGREGA EL PUNTAJE DINAMICAMENTE AL PLAYER QUE CORRESPONDE
    } else {
      // switch the NEXT PLAYER
      switchPlayer(); // llamamos la funcion que creamos
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // solo se podra jugar si playing is true
    // 1. Add current score to active player´s score
    scores[activePlayer] += currentScore;
    //           score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player´s score is >=100
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false; // cortamos el juego
      diceEl.classList.add('hidden'); // hacemos desaparecer el dado al terminar el partido.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // agregamos la clase de CSS
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // tenemos que remover la clase player active de CSS para que no choquen esas dos clases.

      // Switch to the next player
    }
  }
  switchPlayer(); // llamamos la funcion que creamos
});

btnNew.addEventListener('click', init);
