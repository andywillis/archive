/* global Company, expect: true */

var spy, spyCall;

describe('Company', function () {

  it('should be an object', function () {
    expect(Company).to.be.instanceof(Object);
  });

  /**
   * getCopyright
   */
  describe('getCopyright', function () {

    before(function () {
      spy = sinon.spy(Company, 'getCopyright');
      Company.getCopyright();
      spyCall = spy.getCall(0);
    });

    after(function () {
      Company.getCopyright.restore();
    });

    it('should return a string', function () {
      expect(spyCall.returnValue).to.be.a('string');
    });

  });

  /**
   * getName
   */
  describe('getVersion', function () {

    before(function () {
      spy = sinon.spy(Company, 'getVersion');
      Company.getVersion();
      spyCall = spy.getCall(0);
    });

    after(function () {
      Company.getVersion.restore();
    });

    it('should return a string', function () {
      expect(spyCall.returnValue).to.be.a('string');
    });

  });

  /**
   * getName
   */
  describe('getName', function () {

    before(function () {
      spy = sinon.spy(Company, 'getName');
      Company.getName();
      spyCall = spy.getCall(0);
    });

    after(function () {
      Company.getName.restore();
    });

    it('should return a string', function () {
      expect(spyCall.returnValue).to.be.a('string');
    });

  });

});
