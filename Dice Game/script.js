'use strict';

// DOM elements
const leftScore = document.querySelector('#score--0');
const rightScore = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreLeft = document.getElementById('current--0');
const currentScoreRight = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

leftScore.textContent = 0;
rightScore.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', function () {
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomDiceNumber}.png`;
    dice.classList.remove('hidden');

    if (randomDiceNumber === 1) {
        if (activePlayer === 0) {
            currentScoreLeft.textContent = 0;
            player0.classList.remove('player--active');
            player1.classList.add('player--active');
        }
        else {
            currentScoreRight.textContent = 0;
            player1.classList.remove('player--active');
            player0.classList.add('player--active');
        }
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
    }
    else {
        currentScore += randomDiceNumber;
        if (activePlayer === 0) {
            currentScoreLeft.textContent = currentScore;
        }
        else {
            currentScoreRight.textContent = currentScore;
        }
    }
})

btnHold.addEventListener('click', function () {
    if (activePlayer === 0) {
        leftScore.textContent = Number(leftScore.textContent) + currentScore;
        currentScoreLeft.textContent = 0;
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
        activePlayer = 1;
    }
    else {
        rightScore.textContent = Number(rightScore.textContent) + currentScore;
        currentScoreRight.textContent = 0;
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
        activePlayer = 0;
    }
    currentScore = 0;
})

btnNew.addEventListener('click', function () {
    leftScore.textContent = 0;
    rightScore.textContent = 0;
    currentScoreLeft.textContent = 0;
    currentScoreRight.textContent = 0;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    activePlayer = 0;
    currentScore = 0;
})