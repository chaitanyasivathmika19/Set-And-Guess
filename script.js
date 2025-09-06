const setNumberInput = document.getElementById("setNumber");
const startBtn = document.getElementById("startGame");
const guessInput = document.getElementById("guessInput");
const submitGuessBtn = document.getElementById("submitGuess");
const message = document.getElementById("message");
const attemptsLeftText = document.getElementById("attemptsLeft");
const darkToggle = document.getElementById("darkToggle");

const setupScreen = document.getElementById("setupScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");

let secretNumber = null;
let attemptsLeft = 10;

startBtn.addEventListener("click", () => {
  const value = Number(setNumberInput.value);
  if (value >= 1 && value <= 100) {
    secretNumber = value;
    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

submitGuessBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "⛔ Enter a number between 1 and 100!";
    return;
  }

  attemptsLeft--;

  if (guess === secretNumber) {
    showEndScreen("🎉 Correct! You win!", "win");
  } else if (attemptsLeft === 0) {
    showEndScreen(`❌ Out of attempts! The number was ${secretNumber}.`, "lose");
  } else if (Math.abs(guess - secretNumber) <= 2) {
    message.textContent = guess < secretNumber
      ? "😬 So close, but a bit low!"
      : "😬 So close, but a bit high!";
  } else {
    message.textContent = guess < secretNumber
      ? "📉 Too low!"
      : "📈 Too high!";
  }

  attemptsLeftText.textContent = `Attempts left: ${attemptsLeft}`;
  guessInput.value = "";
});

function showEndScreen(text, result) {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  endMessage.textContent = text;

  if (result === "win") {
    document.body.style.background = "linear-gradient(135deg, #00e676, #1de9b6)";
  } else {
    document.body.style.background = "linear-gradient(135deg, #f44336, #e53935)";
  }
}

// Dark Mode
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
