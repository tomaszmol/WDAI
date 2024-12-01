const board = document.querySelector("#board");
const h2Score = document.querySelector("#score");
const divReset = document.querySelector("#reset");
const mouseCursor = document.querySelector("#crosshair");
const finalScore = document.querySelector("#final");
const zombies = {};

let score = 30;
let health = 3;
let index = 0;
let gameRunning;

function createZombie() {
  let speed = getRandomInt(25, 50);
  let bottom = getRandomInt(350, 480) / 10;
  let size = getRandomInt(80, 140) / 100;

  spawnZombie(speed, bottom, size);
}

function spawnZombie(speed, bottom, size) {
  let zombie = document.createElement("div");

  zombie.classList.add("zombie");
  zombie.setAttribute("id", index);
  zombie.addEventListener("click", zombieHit);
  zombie.style.bottom = bottom + "vh";
  zombie.style.left = "100vw";
  zombie.style.transform = "scale(" + size + ")";

  board.appendChild(zombie);
  index++;

  animateZombie(zombie, speed);
}

function animateZombie(zombie, speed) {
  let step = 200;
  let windowPosition = 0;
  let position = 0;

  zombies[zombie.id] = setInterval(() => {
    zombie.style.backgroundPositionX = windowPosition + step + "px";
    zombie.style.left = 100 - position + "vw";
    windowPosition -= step;
    position++;

    if (score <= 0) {
      score = 0;
      gameEnd();
    }

    if (windowPosition == -1800) windowPosition = 0;

    if (position == 100) {
      zombie.remove();
      health -= 1;
      for (let i = health; i < 3; i++)
        document.querySelectorAll("img")[i].src = "../images/empty_heart.png";

      if (health <= 0) gameEnd();

      clearInterval(zombies[zombie.id]);
    }
  }, speed);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

function crosshairMove(e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
}

function boardShot() {
  score -= 5;
  h2Score.textContent = score;
}

function zombieHit() {
  score += 20;
  h2Score.textContent = score;

  clearInterval(zombies[this.id]);
  this.remove();
}

function loadGame() {
  health = 3;
  score = 30;
  index = 0;

  h2Score.textContent = score;
  document.body.style.cursor = "none";
  board.addEventListener("click", boardShot);
  window.addEventListener("mousemove", crosshairMove);
  let zombies = document.querySelectorAll("div.zombie");

  for (let i = 0; i < zombies.length; i++) zombies[i].remove();

  gameRunning = setInterval(() => {
    createZombie();
    if (score < 0) gameEnd();
  }, 1000);
}

function resetGame() {
  const gameOverMusic = document.getElementById("game-over-music");
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;

  divReset.style.transform = "translateY(200%)";
  for (let i = 0; i < 3; i++)
    document.querySelectorAll("img")[i].src = "../images/full_heart.png";
  loadGame();
}

function gameEnd() {
  clearInterval(gameRunning);

  Object.keys(zombies).forEach(function (key) {
    clearInterval(zombies[key]);
  });

  board.removeEventListener("click", boardShot);
  finalScore.textContent = score;
  window.removeEventListener("mousemove", crosshairMove);
  document.body.style.cursor = "default";

  divReset.style.transform = "translateY(0%)";

  const gameOverMusic = document.getElementById("game-over-music");
  gameOverMusic.currentTime = 0;
  gameOverMusic.play();

  document.getElementById("resetGame").addEventListener("click", resetGame);
}

loadGame();
