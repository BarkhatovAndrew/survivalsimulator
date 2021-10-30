// Initialization

const dayCounter = document.querySelector('.day-counter-area');
const statusArea = document.querySelector('.status-area');
const btnArea = document.querySelector('.btn-area');
const startGameBtn = document.querySelector('.start-game-btn');
const nameInput = document.querySelector('.gamer-name');
const gameRules = document.querySelector('.rules');

let healthBar = document.createElement('p');
let moneyBar = document.createElement('p');
let fatigueBar = document.createElement('p');

let waitOneTurn = 0;

nameInput.innerHTML = '';

startGameBtn.addEventListener('click', firstStep);

function firstStep() {
  const name = nameInput.value;
  if (name === '') {
    gameRules.innerHTML = `<p>Hello! This is simple homeless simulator</p><p>Just <span class="red">enter your name</span> to start the game</p>`;
  } else {
    startGameBtn.innerHTML = 'Next';

    gameRules.innerHTML = `<p>Hello, <span class='green'>${name}</span>!</p><p>You have 3 indicators: <span style="color: red">health</span>, <span class='green'>money</span> and <span style="color: blue">fatigue</span>.</p><p>Fatigue and health have a scale from 0 to 100. The amount of money is unlimited.</p><p>If one of the indicators reaches 0, you will lose.</p>`;
    nameInput.style.display = 'none';

    startGameBtn.addEventListener('click', secondStep);
  }
}

function secondStep() {
  gameRules.innerHTML = `<p>Each turn you can do one of three actions: sleep, begg or eat.</p>
<p>All actions affect your characteristics.</p>
<p>Begg" increases the amount of money, "Sleep" reduces fatigue and "Eat" heals you.</p>
<p>Sometimes it can happen random events that will affect you.</p>
`;

  startGameBtn.addEventListener('click', thirdStep);
}

function thirdStep() {
  startGameBtn.innerHTML = 'Start';
  gameRules.innerHTML = `<p>Your goal is to earn 1000 $</p>
<p>Now you can start the game. Press Start to start :)</p>`;

  startGameBtn.addEventListener('click', startGame);
}

// Start Game

function startGame() {
  gameRules.innerHTML = `<p>Choose what you want to do: beg, sleep, eat, shop or status</p>`;
  startGameBtn.style.display = 'none';
  btnArea.style.display = 'unset';
  dayCounter.style.display = 'unset';
  dayCounter.innerHTML = `<p>Day ${dayCount}</p>`;

  healthBar.innerHTML = `<span style="color: red">Health</span>: ${health}`;
  moneyBar.innerHTML = `<span class='green'>Money</span>: ${money}`;
  fatigueBar.innerHTML = `<span style="color: blue">Fatigue</span>: ${fatigue}`;

  statusArea.append(healthBar);
  statusArea.append(moneyBar);
  statusArea.append(fatigueBar);
}

// Characteristics

let health = 100;
let money = 100;
let fatigue = 100;
let totalMoney = 0;

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
    btnArea.style.display = 'none';
    statusArea.style.display = 'none';
    dayCounter.style.display = 'none';

    gameRules.innerHTML = `<p>You <span style="color: yellow">lose</span>.</p><p>You were able to survive for <span style="color: green">${dayCount}</span> days</p><p>During this time you have earned <span style="color: green">${totalMoney}$</span>. Not bad.</p>`;
  }
}

// Win conditions

function winCheck() {
  if (money >= 1000) {
    btnArea.style.display = 'none';
    statusArea.style.display = 'none';
    dayCounter.style.display = 'none';

    gameRules.innerHTML = `<p>You <span style="color: yellow">win</span>!</p><p>You were able to survive for <span style="color: green">${dayCount}</span> days</p><p>During this time you have earned <span style="color: green">${totalMoney}$</span>. Not bad.</p>`;
  }
}

// Status refresh

function refreshStatusBars() {
  healthBar.innerHTML = `<span style="color: red">Health</span>: ${health}`;
  moneyBar.innerHTML = `<span class='green'>Money</span>: ${money}`;
  fatigueBar.innerHTML = `<span style="color: blue">Fatigue</span>: ${fatigue}`;
  dayCounter.innerHTML = `<p>Day ${dayCount}</p>`;

  if (
    (gameRules.innerHTML.includes(`<p>Wow!`) && waitOneTurn === 0) ||
    (gameRules.innerHTML.includes(`<p>Oh shit!`) && waitOneTurn === 0)
  ) {
    waitOneTurn += 1;
  } else if (waitOneTurn === 1) {
    gameRules.innerHTML = `<p>Choose what you want to do: beg, sleep, eat, shop or status</p>`;
    waitOneTurn = 0;
  }
}

// !!! Turns

function begging() {
  health -= 5;
  fatigue -= 5;
  money += 10;
  totalMoney += 10;

  let randomEvent = Math.floor(Math.random() * 11);
  if (randomEvent === 1) {
    let extraMoney = Math.floor(Math.random() * 30) + 20;
    health -= 5;
    fatigue -= 5;
    totalMoney += extraMoney;
    money += extraMoney;
    gameRules.innerHTML += `<p>Wow! It's a nice day today! You earned an extra <span class='green'>${extraMoney}</span>$</p>`;
  }
  regularThings();
}

function sleeping() {
  health -= 5;
  money -= 5;
  fatigue += 15;

  let randomChance = Math.floor(Math.random() * 16);
  switch (randomChance) {
    case 1:
      gameRules.innerHTML += `<p>Oh shit! Teenagers stole <span class='green'>15</span>$ from you</p>`;
      money -= 15;
      break;
    case 2:
      gameRules.innerHTML += `<p>Oh shit! You were attacked by teenagers while you were sleeping. (<span class='red'>-15</span> health)</p>`;
      health -= 15;
      break;
    case 3:
      gameRules.innerHTML += `<p>Oh shit! The police woke you up and chased you away. You <span class='blue'>didn't get enough sleep</span>.</p>`;
      fatigue -= 15;
      break;
  }

  regularThings();
}

function eating() {
  health += 15;
  money -= 15;
  fatigue -= 5;

  let randomChance = Math.floor(Math.random() * 16);
  switch (randomChance) {
    case 1:
      gameRules.innerHTML += `<p>Oh shit! While you were eating, you were <span class='green'>robbed</span> by the schoolchildren. (<span class='green'>-10</span>$)</p>`;
      money -= 10;
      break;
    case 2:
      gameRules.innerHTML += `<p>Oh shit! Today food is <span class='green'>more expensive</span> than usual (<span class='green'>-5</span> $)</p>`;
      money -= 5;
      break;
    case 3:
      gameRules.innerHTML += `<p>Oh shit! Your food was taken away. Are you <span class='red'>hungry</span>.</p>`;
      break;
  }

  regularThings();
}

// Regular things

function regularThings() {
  dayCount += 1;
  isMaximumPoints();
  refreshStatusBars();
  loseCheck();
  winCheck();
}

// Turn Buttons

const begButton = document.querySelector('.begging');
const sleepButton = document.querySelector('.sleeping');
const eatButton = document.querySelector('.eating');

begButton.addEventListener('click', begging);
sleepButton.addEventListener('click', sleeping);
eatButton.addEventListener('click', eating);
