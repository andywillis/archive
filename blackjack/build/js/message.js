(function (window) {

  function message(type) {
    return {
      blackjack: 'You hit blackjack - you win',
      playerover: 'You have gone over 21 - you lose',
      dealerbeat: 'The dealer has beaten your score - you lose',
      dealerover: 'The dealer has gone over 21 - you win'
    }[type];
  }

  window.game = window.game || {};
  window.game.message = message;

})(window);