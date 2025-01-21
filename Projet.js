// ----------------- Calculatrice -----------------
const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll("#calc-buttons button");

let currentInput = "";
let operator = "";
let previousInput = "";

// Fonction pour effectuer des calculs sans utiliser eval
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 === 0 ? 'Erreur' : num1 / num2; // Gérer la division par zéro
        default:
            return;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            operator = "";
            previousInput = "";
            display.value = "";
        } else if (value === "=") {
            if (currentInput && previousInput && operator) {
                const result = calculate();
                display.value = result;
                currentInput = result;
                operator = "";
                previousInput = "";
            }
        } else if ("+-*/".includes(value)) {
            operator = value;
            previousInput = currentInput;
            currentInput = "";
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// ----------------- Chronomètre -----------------
let seconds = 0;
let intervalId = null;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

// Fonction pour formater le temps
function formatTime(s) {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            seconds++;
            timeDisplay.textContent = formatTime(seconds);
        }, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    timeDisplay.textContent = "00:00:00";
});

// ----------------- Jeu de clics -----------------
let score = 0;
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score-display");

// Fonction pour déplacer la cible aléatoirement
function moveTarget() {
    const container = document.getElementById("game-container");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const targetSize = 40;

    const newX = Math.random() * (containerWidth - targetSize);
    const newY = Math.random() * (containerHeight - targetSize);

    target.style.left = `${newX}px`;
    target.style.top = `${newY}px`;
}

// Initialisation du jeu en plaçant la cible au hasard
moveTarget();

target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = `Score : ${score}`;
    moveTarget(); // Déplacer la cible après chaque clic
});
