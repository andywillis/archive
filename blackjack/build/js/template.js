(function (window) {

  const template = (type, val = 1) => {
    return {
      card: `<div class="card">\
              <div class="suit">${val.suit}</div>\
              <div class="value">${val.value}</div>\
              </div>`,
      total: `Total ${val}`
    }[type];
  }

  window.game = window.game || {};
  window.game.template = template;

})(window);