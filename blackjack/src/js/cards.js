(function (window) {

  // const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const suits = ['♥', '♠', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function createCards(suits, values) {
    let cards = [];
    for (let i = 0; i < suits.length; i++) {
      for (let ii = 0; ii < values.length; ii++) {
        let card = { suit: suits[i], value: values[ii] };
        cards.push(card);
      }
    }
    return cards;
  }

  window.game = window.game || {};
  window.game.cards = createCards(suits, values);

})(window);
