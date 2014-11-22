var example = require('washington')
var assert = require('assert')
var Ode = require('./ode')

example('should cast array of arguments into options object and send to library', function() {
  var library = function() {
    if (library.calls == null) library.calls = []
    return library.calls.push(arguments) }

  var require = function() {
    if (require.calls == null) require.calls = []
    require.calls.push(arguments)
    return library }

  Ode(["--string=flag", "library", "--boolean", "--number=3"], require, "cwd");

  assert.equal(require.calls[0][0], "cwd/library")
  assert.equal(library.calls[0][0].string, "flag")
  assert.equal(library.calls[0][0].boolean, true)
  assert.equal(library.calls[0][0].number, 3)
  return assert.equal(library.calls[0][0].ignored, void 0)
})

example('should be able to require a .coffee package', function() {
  return Ode(["--name=John", "example/hello.coffee"])
})
