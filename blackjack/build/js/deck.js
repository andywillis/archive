(function (window) {

  class Deck {

    constructor(cards) {
      this.cards = cards;
      this.deck = cards;
      this.dealt = [];
    }

    resetDeck() {
      this.deck = this.cards.slice();
    }

    dealCard() {
      let card = this.deck.splice(this.random(), 1)[0];
      this.dealt.push(card);
      return card;
    }

    random() {
      return Math.floor(Math.random() * this.deck.length);
    }

  }

  window.game = window.game || {};
  window.game.Deck = Deck;

})(window);
