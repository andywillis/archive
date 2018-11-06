import { buttonHTML, buttonStripHTML } from './buttons';
import { appendHTML, QS } from './dom';
import { resultMessage } from './template';
import { getRandomNumber } from './utils.js'

export default class RockPaperScissors {

  constructor(rules, ruleSet) {
		this.rules = rules;
		this.ruleSet = ruleSet || 'default';
		this.html = {};
		this.el = QS('main');
    this.init = this.init.bind(this);
    this.addPlayerOptions = this.addPlayerOptions.bind(this);
		this.addGameButtons = this.addGameButtons.bind(this);
    this.addGameOptions = this.addGameOptions.bind(this);
    this.showResult = this.showResult.bind(this);
    this.forkGame = this.forkGame.bind(this);
    this.playGame = this.playGame.bind(this);
	}

  // Initialises the game
  // Also called when the reset/play again buttons are clicked
	init() {
		this.addPlayerOptions();
	}

  // The first game stage - choosing whether to play against the
  // computer, or asking the computer to play against itself.
  // The 'main' element is cleared, and then buttons are created and
  // added to the screen.
  // This process is used whenever the screen is updated.
  addPlayerOptions() {
    this.getHTML(['Player vs Computer', 'Computer vs Computer'], 'player');
    appendHTML(this.el, [this.html.player, this.addMsg('player')], true);
		this.addEvents('.player', this.forkGame);
  }

  /**
   * @function getHTML
   * @param  {array} arr  Array of button names
   * @param  {string} type The type of button strip
   * @return {string} HTML string
   */
  getHTML(arr, type) {

    // After the first rendering the HTML is cached for future plays
    if (!this.html[type]) {
			const html = buttonHTML(arr);
      this.html[type] = buttonStripHTML(html, type);
    }
    return this.html[type];
  }

	// Skip a step if the computer is playing against itself
	forkGame(e) {
    switch (e.target.textContent) {
      case 'Player vs Computer': this.addGameOptions(); break;
      case 'Computer vs Computer': this.playGame(null); break;
    }
  }

  addEvents(selector, fn) {
    QS(selector).addEventListener('click', fn);
	}

  /**
   * @function getRandomMove
   * @return {string} The name of a button to be checked against the rules
   */
  getRandomMove() {
		const arr = Object.keys(this.rules[this.ruleSet]);
		return arr[getRandomNumber(arr.length)].toLowerCase();
	}

  addInitButton(txt) {
    const initButton = buttonHTML([txt]);
    appendHTML(this.el, [buttonStripHTML(initButton, 'init')], false);
    this.addEvents('.init', this.init);
  }

  /**
   * @function addMsg
   * @param  {string} screen Game-screen name
   * @param  {string} result The game result
   * @param  {string} color  The result color (win/lose/draw)
   * @return {string} Final message
   */
  addMsg(screen, result, color) {
    let msg = null;
    switch (screen) {
      case 'options': msg = 'Choose your game!'; break;
      case 'game': msg = 'Choose your weapon!'; break;
      case 'player': msg = 'Choose players!'; break;
    }
    return `<div class="msg ${color}">${result || msg}</div>`;
  }

	// Add the game rulesets as options (default, spock)
  addGameOptions() {
    this.getHTML(Object.keys(this.rules), 'options');
    appendHTML(this.el, [this.html['options'], this.addMsg('options')], true);
    this.addInitButton('reset');
		this.addEvents('.options', this.addGameButtons);
	}

	// Add the buttons for the chosen ruleset
	addGameButtons(e) {
		this.ruleSet = e.target.textContent.toLowerCase();
    this.getHTML(Object.keys(this.rules[this.ruleSet]), this.ruleSet);
    appendHTML(this.el, [this.html[this.ruleSet], this.addMsg('game')], true);
    this.addInitButton('reset');
		this.addEvents(`.${this.ruleSet}`, this.playGame);
	}

	// Used for either Player vs Computer or Computer vs Computer games
  playGame(e) {
    const p1 = e ? e.target.textContent : this.getRandomMove();
    const p2 = this.getRandomMove();
    const rules = this.rules[this.ruleSet];
    let result = null;
    let isHuman = e ? true : false;
    let win = 'draw';
    if (p1 !== p2) {
      if (rules[p1].hasOwnProperty(p2)) {

        // Uses the tagged template literal to build the response
        result = resultMessage`${isHuman} ${1} ${p1} ${rules[p1][p2]} ${p2}`;
        win = 'win'
      } else {
        result = resultMessage`${isHuman} ${2} ${p2} ${rules[p2][p1]} ${p1}`;
        win = 'lose';
      }
    } else {
      result = `The game is a tie.`;
    }
    this.showResult(result, win);
  }

  showResult(result, color) {
    appendHTML(this.el, [this.addMsg('result', result, color)], true);
    this.addInitButton('play again');
	}

}
