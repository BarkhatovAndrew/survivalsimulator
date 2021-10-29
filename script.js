// Initialization

const dayCounter = document.querySelector(".day-counter-area");
const statusArea = document.querySelector(".status-area");
const btnArea = document.querySelector(".btn-area");
const startGameBtn = document.querySelector(".start-game-btn");
const nameInput = document.querySelector(".gamer-name");
const gameRules = document.querySelector(".rules");

let healthBar = document.createElement("p");
let moneyBar = document.createElement("p");
let fatigueBar = document.createElement("p");

nameInput.innerHTML = "";

startGameBtn.addEventListener("click", firstStep);

function firstStep() {
  const name = nameInput.value;
  startGameBtn.innerHTML = "Next";

  gameRules.innerHTML = `<p>Hello, <span style="color: #04e600">${name}</span>!</p><p>You have 3 indicators: <span style="color: red">health</span>, <span style="color: #04e600">money</span> and <span style="color: blue">fatigue</span>.</p><p>Fatigue and health have a scale from 0 to 100. The amount of money is unlimited.</p><p>If one of the indicators reaches 0, you will lose.</p>`;
  nameInput.style.display = "none";

  startGameBtn.addEventListener("click", secondStep);
}

function secondStep() {
  gameRules.innerHTML = `<p>Each turn you can do one of three actions: sleep, begg or eat.</p>
<p>All actions affect your characteristics.</p>
<p>Begg" increases the amount of money, "Sleep" reduces fatigue and "Eat" heals you.</p>
<p>Sometimes it can happen random events that will affect you.</p>
`;

  startGameBtn.addEventListener("click", thirdStep);
}

function thirdStep() {
  startGameBtn.innerHTML = "Start";
  gameRules.innerHTML = `<p>You can also write "Status" to find out your characteristics.</p>
<p>Now you can start the game. Press Start to start :)</p>`;

  startGameBtn.addEventListener("click", startGame);
}

// Start Game

function startGame() {
  gameRules.innerHTML = `<p>Choose what you want to do: beg, sleep, eat, shop or status</p>`;
  startGameBtn.style.display = "none";
  btnArea.style.display = "unset";
  dayCounter.style.display = "unset";

  healthBar.innerHTML = `<span style="color: red">Health</span>: ${health}`;
  moneyBar.innerHTML = `<span style="color: #04e600">Money</span>: ${money}`;
  fatigueBar.innerHTML = `<span style="color: blue">Fatigue</span>: ${fatigue}`;

  statusArea.append(healthBar);
  statusArea.append(moneyBar);
  statusArea.append(fatigueBar);
}

// Characteristics

let game = true;

let health = 100;
let money = 100;
let fatigue = 100;

let dayCount = 0;

// Maximum points

function isMaximumPoints() {
  if (health > 100) {
    health = 100;
  }
  if (fatigue > 100) {
    fatigue = 100;
  }
}

// Lose conditions

function loseCheck() {
  if (health <= 0 || money <= 0 || fatigue <= 0) {
    game = false;
    alert("you lose!");
  }
}

// Win conditions

function winCheck() {
  if (money >= 1000) {
    alert("you win!");
  }
}

// Status refresh

function refreshStatusBars() {
  healthBar.innerHTML = `<span style="color: red">Health</span>: ${health}`;
  moneyBar.innerHTML = `<span style="color: #04e600">Money</span>: ${money}`;
  fatigueBar.innerHTML = `<span style="color: blue">Fatigue</span>: ${fatigue}`;
}

// !!! Turns

function begging() {
  health -= 5;
  fatigue -= 5;
  money += 10;
  regularThings();
}

function sleeping() {
  health -= 5;
  money -= 5;
  fatigue += 15;
  regularThings();
}

function eating() {
  health += 15;
  money -= 15;
  fatigue -= 5;
  regularThings();
}

// Regular things

function regularThings() {
  isMaximumPoints();
  refreshStatusBars();
  loseCheck();
  winCheck();
  dayCount += 1;
}

// Turn Buttons

const begButton = document.querySelector(".begging");
const sleepButton = document.querySelector(".sleeping");
const eatButton = document.querySelector(".eating");

begButton.addEventListener("click", begging);
sleepButton.addEventListener("click", sleeping);
eatButton.addEventListener("click", eating);
