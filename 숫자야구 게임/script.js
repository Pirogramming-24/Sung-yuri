let targetNumbers = [];
let remainingAttempts = 9;

function initGame() {
    remainingAttempts = 9;
    document.getElementById('attempts').innerText = remainingAttempts;

    targetNumbers = [];
    while (targetNumbers.length < 3) {
        const randomNum = Math.floor(Math.random() * 10);
        if (!targetNumbers.includes(randomNum)) {
            targetNumbers.push(randomNum);
        }
    }

    clearInputs();
    document.getElementById('results').innerHTML = '';
    document.getElementById('game-result-img').src = '';
    document.querySelector('.submit-button').disabled = false;
}

function clearInputs() {
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('number3').value = '';
    document.getElementById('number1').focus();
}

function check_numbers() {
    const n1 = document.getElementById('number1').value;
    const n2 = document.getElementById('number2').value;
    const n3 = document.getElementById('number3').value;

    if (n1 === '' || n2 === '' || n3 === '') {
        clearInputs();
        return;
    }

    const userNumbers = [Number(n1), Number(n2), Number(n3)];
    
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
        if (userNumbers[i] === targetNumbers[i]) {
            strikes++;
        } else if (targetNumbers.includes(userNumbers[i])) {
            balls++;
        }
    }

    let resultText = "";
    if (strikes === 0 && balls === 0) {
        resultText = "O";
    } else {
        resultText = `${strikes} S ${balls} B`;
    }

    updateUI(resultText, strikes);
}

function updateUI(resultText, strikes) {
    const resultsDiv = document.getElementById('results');
    const resultItem = document.createElement('div');
    resultItem.innerText = resultText;
    resultsDiv.appendChild(resultItem);

    remainingAttempts--;
    document.getElementById('attempts').innerText = remainingAttempts;

    const resultImg = document.getElementById('game-result-img');
    const submitBtn = document.querySelector('.submit-button');

    if (strikes === 3) {
        resultImg.src = "success.png";
        endGame(submitBtn);
    } else if (remainingAttempts <= 0) {
        resultImg.src = "fail.png";
        endGame(submitBtn);
    }

    clearInputs();
}

function endGame(button) {
    button.disabled = true;
}

window.onload = initGame;