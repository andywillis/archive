define(['utils', 'companyControl'], function (utils, companyControl) {
  'use strict';

  /**
   * [addCompany description]
   * @param {[type]} portfolio [description]
   * @param {[type]} company   [description]
   */
  function addCompany(portfolio, company) {
    return portfolio.push(company);
  }

  /**
   * [encourageMerger description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} company1  [description]
   * @param  {[type]} company2  [description]
   * @return {[type]}           [description]
   */
  function encourageMerger(portfolio) {
    var filtered = filterPortfolioBy(portfolio, 'public-floated');
    if (filtered.length >= 2) {
      var mergingCompanies = utils.buildRandomRange(filtered, 2);
      var company1 = mergingCompanies[0];
      var company2 = mergingCompanies[1];
      if (company1.products.length >= company2.products.length) {
        return mergeCompanies(portfolio, company1, company2);
      } else {
        return mergeCompanies(portfolio, company2, company1);
      }
    }
  }

  /**
   * [mergeCompanies description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} company1  [description]
   * @param  {[type]} company2  [description]
   * @return {[type]}           [description]
   */
  function mergeCompanies(portfolio, company1, company2) {
    company1.name = [company1.name, '&', company2.name].join(' ');
    company1.products = utils.dedupe(company1.products.concat(company2.products));
    portfolio = removeCompany(portfolio, company2.id);
    updateCompany(portfolio, company1);
    return [company1, company2];
  }

  /**
   * [findCompany description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} id        [description]
   * @return {[type]}           [description]
   */
  function findCompany(portfolio, id) {
    for (var i = 0, l = portfolio.length; i < l; i++) {
      if (portfolio[i].id === id) return i;
    }
  }

  /**
   * [updateCompany description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} company   [description]
   * @return {[type]}           [description]
   */
  function updateCompany(portfolio, company) {
    var index = findCompany(portfolio, company.id);
    return portfolio.splice(index, 1, company);
  }

  /**
   * [removeCompany description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} id        [description]
   * @return {[type]}           [description]
   */
  function removeCompany(portfolio, id) {
    return portfolio.filter(function (el) {
      return el.id !== id;
    });
  }

  /**
   * [pickRandomCompany description]
   * @param  {[type]} portfolio [description]
   * @return {[type]}           [description]
   */
  function pickRandomCompany(portfolio, type) {
    if (type) {
      var filtered = filterPortfolioBy(portfolio, type);
      return filtered[utils.random(0, filtered.length - 1)];
    }
    return portfolio[utils.random(0, portfolio.length - 1)];
  }

  /**
   * [filterPortfolioBy description]
   * @param  {[type]} arr  [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  function filterPortfolioBy(portfolio, type) {
    return portfolio.filter(function (company) {
      return company.type === type;
    });
  }

  /**
   * [bankruptCompany description]
   * @param  {[type]} portfolio [description]
   * @param  {[type]} i         [description]
   * @return {[type]}           [description]
   */
  function bankruptCompany(portfolio) {
    var company = pickRandomCompany(portfolio);
    companyControl.updateCompanyType(company, 'bankrupt');
    return company.id;
  }

  /**
   * [floatPrivateCompany description]
   * @param  {[type]} portfolio [description]
   * @return {[type]}           [description]
   */
  function floatPrivateCompany(portfolio) {
    var company = pickRandomCompany(portfolio, 'private');
    companyControl.updateCompanyType(company, 'public-floated');
    return company.id;
  }

  return {
    addCompany: addCompany,
    pickRandomCompany: pickRandomCompany,
    bankruptCompany: bankruptCompany,
    floatPrivateCompany: floatPrivateCompany,
    encourageMerger: encourageMerger
  }

});
