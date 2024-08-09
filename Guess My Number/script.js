'use strict';

let message = document.querySelector('.message');
let userInput = document.querySelector('.guess');
let number = document.querySelector('.number');
let check = document.querySelector('.check');
let score = document.querySelector('p.label-score span.score');
let highscore = document.querySelector('p.label-highscore span.highscore');
let body = document.querySelector('body');
let reset = document.querySelector('button.btn.reset');
let randomNumber;

startGame();

reset.removeEventListener('click', startGame);
reset.addEventListener('click', startGame);
check.addEventListener('click', checkNumber);

function startGame() {
    score.innerHTML = "20";
    message.textContent = 'Start guessing...';
    userInput.value = '';
    number.textContent = '?';
    body.style.backgroundColor = '#222';
    highscore.innerHTML = localStorage.getItem('highscore') || 0;
    randomNumber = Math.trunc(Math.random() * 20) + 1;
}

function checkNumber() {
    const userInputAsNumber = Number(userInput.value);

    if (Number(score.textContent) < 1) {
        message.textContent = '💥 You Lost The Game 💥';
        score.innerHTML = 0;
        body.style.backgroundColor = 'red';
    }
    else if (!userInputAsNumber || userInputAsNumber < 0) {
        message.textContent = '⛔ Try Something Valid ⛔';
        score.innerHTML = Number(score.textContent) - 1;
    }
    else if (userInputAsNumber === randomNumber) {
        message.textContent = '🎉 Correct Number 🎉';
        number.textContent = randomNumber;
        body.style.backgroundColor = '#60b347';

        const tempScore = Number(localStorage.getItem('highscore'));

        if (tempScore < Number(score.textContent) || (typeof tempScore === 'undefined')) {
            localStorage.setItem('highscore', Number(score.textContent));
            highscore.innerHTML = Number(score.textContent);
        }
    }
    else if (userInputAsNumber < randomNumber) {
        message.textContent = '📉 Too Low 📉';
        body.style.backgroundColor = 'red';
        tempBackgroundColor();
        score.innerHTML = Number(score.textContent) - 1;
    }
    else if (userInputAsNumber > randomNumber) {
        message.textContent = '📈 Too High 📈';
        body.style.backgroundColor = 'red';
        tempBackgroundColor();
        score.innerHTML = Number(score.textContent) - 1;
    }
}

function tempBackgroundColor() {
    setTimeout(() => {
        body.style.backgroundColor = '#222';
    }, 500);
}