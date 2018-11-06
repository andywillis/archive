define([
  'utils',
  'templates',
  'companyFactory',
  'products'
  ], function (utils, templates, companyFactory, products) {
  'use strict';

  /**
   * [addRandomProduct description]
   * @param {[type]} company [description]
   */
  function addRandomProduct(company) {
    var product = products[utils.random(0, products.length - 1)];
    if (company.products.indexOf(product) === - 1) {
      company.products.push(product);
    } else {
      addRandomProduct(company);
    }
    return company.id;
  }

  /**
   * [createCompany description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  function createCompany(params) {
    return companyFactory(params);
  }

  /**
   * [updateCompanyType description]
   * @param  {[type]} company [description]
   * @param  {[type]} to      [description]
   * @return {[type]}         [description]
   */
  function updateCompanyType(company, to) {
    return company.type = to;
  }

  /**
   * [getProductHtml description]
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  function getProductHtml(arr) {
    var template = templates('product');
    return arr.reduce(function (p, c) {
      return p.concat(template.replace('#{product}', c));
    }, []).join('');
  }

  /**
   * [getCompanyHtml description]
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  function getCompanyHtml(obj) {
    return utils.applyTemplate(obj, templates('company'));
  }

  /**
   * [getHtml description]
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  function getHtml(obj) {
    var companyHtml = getCompanyHtml(obj);
    var productHtml = getProductHtml(obj.products);
    return getCompanyHtml(obj).replace('#{productHtml}', productHtml);
  }

  /**
   * [addProduct description]
   * @param {[type]} arr   [description]
   * @param {[type]} product [description]
   */
  function addProduct(company, product) {
    return arr.push(product);
  }

  /**
   * [renderHtml description]
   * @param  {[type]} html [description]
   * @param  {[type]} el   [description]
   * @return {[type]}      [description]
   */
  function render(company, el, replaceId) {
    var html = getHtml(company);
    if (replaceId) {
      var div = 'div.company[data-id="' + company.id + '"]';
      $(el).find(div).replaceWith(html);
    } else {
      $(el).append(html);
    }
  }

  return {
    addProduct: addProduct,
    render: render,
    createCompany: createCompany,
    updateCompanyType: updateCompanyType,
    addRandomProduct: addRandomProduct
  }

});
