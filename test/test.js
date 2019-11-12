var assert = require('assert');
const parser = require('../cron_parser');
const resources = require('./resources/input_and_expectations')

describe('Cron Parser', function() {
  it('should handle simple singular inputs', function() {
    var actualOutput = parser.parse(resources.simple.get("input"))
    assert.equal(actualOutput, resources.simple.get("expected"))
  });

  it('should handle * containing inputs', function() {
    var actualOutput = parser.parse(resources.astericks.get("input"))
    assert.equal(actualOutput, resources.astericks.get("expected"))
  });

  it('should handle inputs containing lists', function() {
    var actualOutput = parser.parse(resources.lists.get("input"))
    assert.equal(actualOutput, resources.lists.get("expected"))
  });

  it('should handle inputs containing dashes', function() {
    var actualOutput = parser.parse(resources.dashes.get("input"))
    assert.equal(actualOutput, resources.dashes.get("expected"))
  });

  it('should handle inputs containing increments', function() {
    var actualOutput = parser.parse(resources.increments.get("input"))
    assert.equal(actualOutput, resources.increments.get("expected"))
  });

  it('should handle inputs containing increments with dashes', function() {
    var actualOutput = parser.parse(resources.incrementsWithDashes.get("input"))
    assert.equal(actualOutput, resources.incrementsWithDashes.get("expected"))
  });

  it('should error when \'?\' is used in an incorrect time field', function() {
    assert.throws(() => parser.parse(resources.questionMarkError), Error, "Question mark syntax used in incorrect field")
  });

  it('should error when field is given an out of range number', function() {
    assert.throws(() => parser.parse(resources.outOfRangeError), Error, "Number used in hours field is out of range")
  });

  it('should error when field is given an our of range number in a increment argument', function() {
    assert.throws(() => parser.parse(resources.outOfRangeError1), Error, "Number used in dayOfMonth field is out of range")
  });

  it('should error when field is given an our of range number in an list argument', function() {
    assert.throws(() => parser.parse(resources.outOfRangeError2), Error, "Number used in minutes field is out of range")
  });

  it('should error when field is given an our of range number in an hyphen argument', function() {
    assert.throws(() => parser.parse(resources.outOfRangeError3), Error, "Number used in dayOfMonth field is out of range")
  });

  it('should error when an incorrect number of arguments are provided', function() {
    assert.throws(() => parser.parse(resources.incorrectNumberOfArguments), Error, "Incorrect number of arguments provided")
  });
});
