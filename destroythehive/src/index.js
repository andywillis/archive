import Bee from './Bee';

/**
 * Bee settings
 * @type {Object}
 */
const bees = {
  queen: { quantity: 1, damage: 8, health: 100 },
  worker: { quantity: 5, damage: 10, health: 75 },
  drone: { quantity: 8, damage: 12, health: 50 }
};

/**
 * Element settings
 * @type {Object}
 */
const elements = {
  queen: document.querySelector('#queen'),
  worker: document.querySelector('#worker'),
  drone: document.querySelector('#drone')
};

/**
 * Creates a new hive full of bees using the Bee class
 */
function createHive(bees) {
  let hive = [];
  for (const bee in bees) {
    hive = addBees(hive, Object.assign({ type: bee }, bees[bee]));
  }
  return hive;
}

/**
 * Adds bees of all types to the hive
 */
function addBees(hive, { type, quantity, damage, health }) {
  const tmp = hive.slice(0);
  for (let i = 0; i < quantity; i++) {
    tmp.push(new Bee({ i, type, damage, health }));
  }
  return tmp;
}


/**
 * For each bee in the hive add it to the page under its type
 */
function updatePageWithHive(elements, hive) {
  hive.forEach(el => {
    const tmpl = `<div data-id="${el.id}" class="bee ${el.type}">
                  <div class="type">${el.type}</div>
                  <div class="health">${el.health}</div>
                  </div>`;
    elements[el.type].insertAdjacentHTML('beforeend', tmpl);
  });
}

/**
 * Grabs a random bee from the hive
 */
function getRandomBeeIndex(hive) {
  const min = 0;
  const max = hive.length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Updates the game message
 */
function displayMessage(msg, type) {
  const el = document.querySelector('#message');
  if (type === 'normal') el.classList.remove('warning');
  el.textContent = msg;
  el.classList.add(type);
}

/**
 * Sets all bees to dead, then updates the page with the new
 * bee information. Then updates the message and button so that
 * the user can play again.
 */
function destroyTheHive(hive) {
  hive.forEach(el => el.alive === false);
  const bees = document.querySelectorAll('.bee');
  for (let i = 0; i < bees.length; i++) {
    const bee = bees[i];
    const type = bee.querySelector('.type').textContent;
    bee.classList.add('dead');
    bee.innerHTML = `<div class="type">${type}</div><div class="health">0</div>`;
  }
  displayMessage('Hive destroyed', 'warning');
  const button = document.querySelector('.killbee');
  button.textContent = 'Play again';
  button.addEventListener('click', init);
}

/**
 * Checks whether the queen is still alive. If not, destroy the hive
 */
function checkQueen(hive) {
  const queen = hive.filter(el => el.type === 'queen')[0];
  if (queen.health <= 0) destroyTheHive(hive);
}

/**
 * Chooses a random bee. If the bee is dead, choose a new bee.
 * The bees health is updated and the page is updated.
 */
function fireshot(hive) {
  const index = getRandomBeeIndex(hive);
  const bee = hive[index];
  if (bee.health <= 0) fireshot(hive);
  bee.health = bee.health - bee.damage;
  if (bee.health <= 0) bee.health = 0;
  const el = document.querySelector(`#${bee.type} div[data-id="${bee.id}"]`);
  el.classList.add(bee.health === 0 ? 'dead' : 'hit');
  setTimeout(() => { el.classList.remove('hit'); }, 1000);
  el.innerHTML = `<div class="type">${bee.type}</div>
                  <div class="health">${bee.health}</div>`;
}


/**
 * Removes all the bees from the page
 */
function removeBees() {
  const beeElements = document.querySelectorAll('.bee');
  for (let i = 0; i < beeElements.length; i++) {
    beeElements[i].parentNode.removeChild(beeElements[i]);
  }
}

/**
 * Initialises the game
 */
function init() {

  removeBees();

  const hive = createHive(bees);
  updatePageWithHive(elements, hive);

  const button = document.querySelector('.killbee');
  button.removeEventListener('click', init);
  button.addEventListener('click', () => {
    fireshot(hive);
    checkQueen(hive);
  });

  displayMessage('Destroy the hive!', 'normal');
}


init();
