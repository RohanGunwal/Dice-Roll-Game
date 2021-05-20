'use strict';

let scores, count, activePlayer, playing;

const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const img = document.getElementById('dice');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const init = function () {
  scores = [0, 0];
  count = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  img.style.display = `none`;
};
init();

const setCurrentScore = function (value) {
  player0.classList.contains('player--active')
    ? (currentScore0.textContent = value)
    : (currentScore1.textContent = value);
};

const switchPlayer = function () {
  count = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  setCurrentScore(count);
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    let randomNumber = Math.ceil(Math.random() * 6);
    img.style.display = 'block';
    img.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
      count += randomNumber;
      setCurrentScore(count);
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += count;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      img.style.display = 'none';
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
