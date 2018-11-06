define(function () {
  'use strict';

  /**
   * [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  return function (type) {

    return {

      company: [
        '<div class="company" data-id="#{id}">',
        '<span class="name">#{name}</span>',
        '<ul class="assets">#{productHtml}</ul>',
        '</div>'
      ],

      product: ['<li>#{product}</li>']

    }[type].join('');

  };

});
