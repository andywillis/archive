define(function () {
  'use strict';

  /**
   * [dedupe description]
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  function dedupe(arr) {
    return arr.filter(function (el, i, a) {
      return a.indexOf(el) === i;
    });
  }

  /**
   * [random description]
   * @param  {[type]} min [description]
   * @param  {[type]} max [description]
   * @return {[type]}     [description]
   */
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * [buildRandomRange description]
   * @param  {[type]} arr  [description]
   * @param  {[type]} n    [description]
   * @param  {[type]} base [description]
   * @return {[type]}      [description]
   */
  function buildRandomRange(arr, n, base) {
    base = base || [];
    if (base.length === n) return base;
    var rand = random(0, arr.length - 1);
    if (base.indexOf(arr[rand]) === - 1) base.push(arr[rand]);
    return buildRandomRange(arr, n, base);
  }

  /**
   * [replaceAll description]
   * @param  {[type]} find    [description]
   * @param  {[type]} replace [description]
   * @param  {[type]} str     [description]
   * @return {[type]}         [description]
   */
  function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  /**
   * [applyTemplate description]
   * @param  {[type]} obj      [description]
   * @param  {[type]} template [description]
   * @return {[type]}          [description]
   */
  function applyTemplate(obj, template) {
    var html = template;
    for (var p in obj) {
      var param = '#{param}'.replace('param', p);
      html = replaceAll(param, obj[p], html);
    }      
    return html;
  }

  return {
    random: random,
    applyTemplate: applyTemplate,
    buildRandomRange: buildRandomRange,
    dedupe: dedupe
  }

});
