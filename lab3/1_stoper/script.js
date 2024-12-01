let timerInterval = null;
let elapsedSeconds = 0;

const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function updateDisplay() {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  if (minutes > 0) {
    timerDisplay.textContent = `${minutes}min ${seconds}s`;
  } else {
    timerDisplay.textContent = `${seconds}s`;
  }
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      updateDisplay();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  elapsedSeconds = 0;
  updateDisplay();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize display
updateDisplay();
