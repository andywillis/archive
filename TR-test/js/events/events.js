define([
  'jquery',
  'companyFactory',
  'companyControl',
  'portfolioControl'
  ], function (jquery, companyFactory, companyControl, portfolioControl) {
  'use strict';

  return function (portfolio) {

    $(function () {

      var $world = $('#world');

      $(document).on('click', '#createCompanyBtn', function () {
        var company = companyControl.createCompany({
          id: portfolio.length,
          name: $('#nameInput').val(),
          type: 'private'
        });
        portfolioControl.addCompany(portfolio, company);
        companyControl.render(company, $world);
      });

      $(document).on('click', '#bankruptBtn', function () {
        var id = portfolioControl.bankruptCompany(portfolio);
        $('div.company[data-id="' + id + '"]').addClass('bankrupt');
      });

      $(document).on('click', '#addProductBtn', function () {
        var company = portfolioControl.pickRandomCompany(portfolio, 'private');
        companyControl.addRandomProduct(company);
        companyControl.render(company, $world, true);
      });

      $(document).on('click', '#floatRandomBtn', function () {
        var id = portfolioControl.floatPrivateCompany(portfolio);
        $('div.company[data-id="' + id + '"]').addClass('public');
      });

      $(document).on('click', '#encourageMergersBtn', function () {
        var companies = portfolioControl.encourageMerger(portfolio);
        $('div.company[data-id="' + companies[1].id + '"]').remove();
        companyControl.render(companies[0], $world, true);
        $('div.company[data-id="' + companies[0].id + '"]').addClass('public');        
      });

    });

  }

});
