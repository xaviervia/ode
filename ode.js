// Ode
// ===
//
// Zero overhead CLI adapter for Node.
//
// ```javascript
// // greeter.js
// module.exports = function (options) {
//   console.log("Howdy, " + options.name + "!");
// }
// ```
//
// ```sh
// ode greeter --name=Johnny
// ```
//
// It can also be used programmatically to make CLIs out of your modules:
//
// ```javascript
// var Ode = require("ode");
// var yourModule = require("your-module");
//
// Ode(process.argv, function (options) {
//   yourModule(options);
// });
// ```
//
// Installation
// ------------
//
// ```sh
// npm install -g ode
// ```
//
"use strict"

var example = require('washington')
var assert = require('assert')

var Ode = function (argv, req, cwd) {
  var libraryName = undefined
  var library = undefined
  var options = {}
  argv  = argv || process.argv

  argv.forEach(function (arg) {
    if (arg.match(/^--([a-zA-Z]+)=(.+)$/)) {
      options[RegExp.$1] = isNaN(+RegExp.$2) ? RegExp.$2 : +RegExp.$2;
    }
    else if (arg.match(/^--([a-zA-Z]+)$/)) {
      options[RegExp.$1] = true;
    }
    else
      libraryName = arg
  })

  cwd = cwd || process.cwd()

  library = req ?
    req(cwd + "/" + libraryName) :
    require(cwd + "/" + libraryName)

  library(options)
}

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


module.exports = Ode
// License
// -------
//
// Copyright 2014 Xavier Via
//
// ISC license.
//
// See [LICENSE](LICENSE) attached.
