// Ode
// ===
//
// Zero overhead CLI adapter for Node.
//
// ```javascript
// // greeter.js
// module.exports = function (options) {
//   console.log("Howdy, " + options.name + "!");
//   console.log(options.number * options.factor);
//   if (options.verbose === true) {
//     console.log("Features: Numbers are casted to numbers\n" +
//                 "unassigned flags are casted to `true` values\n" +
//                 "otherwise the value is taken as string");
//   }
// }
// ```
//
// ```sh
// ode greeter --name=Johnny --number=2 --factor=4 --verbose
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
// CoffeeScript
// ------------
//
// Because it is so widespread, **Ode** comes with support for CoffeeScript out
// of the box. If you want to use another dialect/transpiler, please pull
// request.
//
"use strict"

var example = require('washington')
var assert  = require('assert')

require('coffee-script/register')

var Ode = function (argv, callback, req, cwd) {
  var libraryName, library, options = {}

  argv = argv || process.argv

  argv.forEach(function (arg) {
    if (arg.match(/^--([a-zA-Z]+)=(.+)$/))
      options[RegExp.$1] = isNaN(+RegExp.$2) ? RegExp.$2 : +RegExp.$2

    else if (arg.match(/^--([a-zA-Z]+)$/))
      options[RegExp.$1] = true

    else
      libraryName = arg })

  cwd = cwd || process.cwd()

  if (callback && callback.call instanceof Function)
    return callback(options)

  else {
    library = req ?
      req(cwd + "/" + libraryName) :
      require(cwd + "/" + libraryName)

    return library(options) }
}

// Testing
// -------
//
// Clone this repo and run
//
// ```sh
// npm test
// ```
example('Casts array of args into options object and sends it to library', function() {
  //! GIVEN
  var library = function() {
    if (library.calls == null) library.calls = []
      return library.calls.push(arguments) }

  var require = function() {
    if (require.calls == null) require.calls = []
    require.calls.push(arguments)
    return library }

  //! WHEN
  Ode(["--string=flag", "library", "--boolean", "--number=3"], null, require, "cwd");

  //! THEN
  assert.equal(require.calls[0][0], "cwd/library")
  assert.equal(library.calls[0][0].string, "flag")
  assert.equal(library.calls[0][0].boolean, true)
  assert.equal(library.calls[0][0].number, 3)
  assert.equal(library.calls[0][0].ignored, void 0)
})

example('Is able to require a .coffee package', function() {
  //! WHEN
  var value = Ode(["--name=John", "example/hello.coffee"])

  //! THEN
  assert(value)
})

example('Runs the callback when provided', function () {
  //! GIVEN
  var callback = function (options) { callback.options = options }

  //! WHEN
  Ode(["--justName=something"], callback)

  //! THEN
  assert.equal(callback.options.justName, "something")
})

example('Returns the result value from the callback when provided', function () {
  //! GIVEN
  var callback = function (options) {
    return options.name + " " + options.lastName }

  //! WHEN
  var result = Ode(["--name=Mister", "--lastName=X"], callback)

  //! THEN
  assert.equal(result, "Mister X")
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
