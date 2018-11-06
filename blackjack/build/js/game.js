(function (window) {

  class Game {
    
    constructor(deck, view, utils) {
      this.deck = deck;
      this.view = view;
      this.utils = utils;
      this.total = { player: [], dealer: [] }
    }
  
    init() {
      this.setButtonEvents();
      this.reset();
    }

    setButtonEvents() {
      utils.qs('.hit').addEventListener('click', this.hit.bind(this));
      utils.qs('.stick').addEventListener('click', this.stick.bind(this));
      utils.qs('.reset').addEventListener('click', this.reset.bind(this));
    }

    resetTotals() {
      this.total.player.length = 0;
      this.total.dealer.length = 0;
    }

    startGame() {
      this.addCard('player');
      this.addCard('player');
      this.addCard('dealer');
    }

    reset() {
      clearInterval(this.interval);
      this.deck.resetDeck();
      this.view.clearBoard();
      this.resetTotals();
      this.startGame();
    }

    hit() {
      this.addCard('player');
      this.checkTotal('player');
    }

    stick() {
      this.interval = setInterval(() => {
        this.addCard('dealer');
        this.checkTotal('dealer');
      }, 1000);
    }

    addToTotal(type, value) {
      this.total[type].push(value);
      return this.sumTotal(type);
    }

    getValue(value) {
      if (/[JQK]/.test(value)) return 10;
      if (value === 'A') return 1;
      return Number(value);
    }

    addCard(type) {
      let card = this.deck.dealCard();
      let value = this.getValue(card.value);
      let total = this.addToTotal(type, value);
      this.view.displayCard(type, card);
      this.view.displayTotal(type, total);
    }

    sumTotal(type) {
      return this.total[type].reduce((p, c) => {
        return p + c;
      });
    }

    isBlackjack(total) {
      return total === 21;
    }

    over21(total) {
      return total > 21;
    }

    dealerBeatsPlayer(total, playerTotal) {
      return total <= 21 && ((21 - total) < (21 - playerTotal));
    }

    checkTotal(type) {

      let playerTotal = this.sumTotal('player');
      let dealerTotal = this.sumTotal('dealer');

      switch (type) {
        case 'player':
          let hasAce = this.total.player.indexOf('1') > -1 ? 11 : 0;
          if (this.isBlackjack(playerTotal)) {
            this.view.displayMessage('blackjack', 'win');
          }
          if (this.over21(playerTotal + hasAce)) {
            this.view.displayMessage('playerover', 'lose');
          }
          break;

        case 'dealer':
          if (this.dealerBeatsPlayer(dealerTotal, playerTotal)) {
            this.view.displayMessage('dealerbeat', 'lose');
            this.clearInterval();
          } else {
            if (this.over21(dealerTotal)) {
              this.view.displayMessage('dealerover', 'win');
              this.clearInterval();
            }
          }
          break;

      }
    }

    clearInterval() {
      clearInterval(this.interval);
    }

  }

  const view = new game.View(game.template, game.message);
  const deck = new game.Deck(game.cards);
  const blackjack = new Game(deck, view);
  blackjack.init();

})(window);