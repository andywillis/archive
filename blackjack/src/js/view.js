(function (window) {

  class View {

    constructor(template, message) {
      this.template = template;
      this.message = message;
    }

    displayCard(type, card) {
      let selector = `.${type} .cards`;
      let html = this.template('card', card);
      utils.qs(selector).insertAdjacentHTML('beforeend', html);
    }

    displayTotal(type, total) {
      let selector = `.${type} .total`;
      let html = this.template('total', total);
      utils.qs(selector).innerHTML = html;
    }

    displayMessage(type, result) {
      let selector = '.player .total';
      let html = this.message(type);
      utils.qs(selector).innerHTML = html;
      this.setTotalBackgroundColor(result);
    }

    clearBoard() {
      utils.qsa('.cards, .total').forEach((el) => {
        el.innerHTML = '';
      });
      this.setTotalBackgroundColor(null);
    }

    setColor(divs, col) {
      divs.forEach(el => el.style.backgroundColor = col);
    }

    setTotalBackgroundColor(type) {
      let divs = utils.qsa('.total');
      switch (type) {
        case 'win': this.setColor(divs, '#85BA89'); break;
        case 'lose': this.setColor(divs, '#D2A3A3'); break;
        default: this.setColor(divs, '#A3A4D2'); break;
      }
    }

  }

  window.game = window.game || {};
  window.game.View = View;

})(window);