const chai = require('chai');
const expect = chai.expect;

describe('green test suite', function() {
  it('should pass', function() {
    expect(true).to.be.true;
  });
});

const ep = require('../src/');

describe('entry point', function() {
  it('should be an Object', function() {
    expect(ep).to.be.instanceOf(Object);
  });
  it('should have configLoader Function', function() {
    expect(ep.configLoader).to.be.instanceOf(Function);
  });
  describe('configLoader', function() {
    it('should load an conf object', function() {
      expect(ep.configLoader()).to.be.instanceOf(Object);
    });
  });
});
