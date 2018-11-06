/**
 * This file is auto loaded by require JS.
 * Require JS has been provided for quick
 * startup, feel free to change this approach
 * as you see fit and add dependencies
 *
 * A List of button and text box ID's are
 * included below to speed up development
 * and reduce the need to scan through the
 * index file to acquire them.

	nameInput
	createCompanyBtn
	bankruptBtn
	addProductBtn
	floatRandomBtn
	encourageMergersBtn

 * Good luck
 *
 **/
requirejs.config({
	paths: {
    'jquery': 'vendor/jquery',
    'companyFactory': 'factories/company',
    'portfolioFactory': 'factories/portfolio',
    'templates': 'templates/templates',
    'events': 'events/events',
    'utils': 'utils/utils',
    'companyControl': 'controllers/company',
    'portfolioControl': 'controllers/portfolio',
    'products': 'products/products'
	}
});

define(['events', 'portfolioFactory'], function (eventsRegister, portfolioFactory) {
  'use strict';

  var portfolio = portfolioFactory();
  eventsRegister(portfolio);

});
