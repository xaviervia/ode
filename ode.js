// Ode
// ===
//
// [ ![Codeship Status for xaviervia/ode](https://codeship.com/projects/aa905470-5471-0132-8879-6274f9eea671/status)](https://codeship.com/projects/49197)
//
// Zero overhead CLI adapter for Node modules.
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

var example   = require('washington')
var assert    = require('assert')
var metadata  = require('./package')

var BOLD      = "\u001b[1m"
var CLEAR     = "\u001b[0m"

require('coffee-script/register')

var Ode = function (argv, callback, req, cwd) {
  var libraryName, library, options = {}

  argv = argv || process.argv

  argv = argv.slice(2)

  if (argv.length === 0)
    return console.log(
      BOLD + "Ode (v" + metadata.version + "):" + CLEAR +
      " the task runner that adds no dependencies to your code.\n\n" +
      "Usage:\n\n" +
      "  ode <yourfile>[.js|.coffee] --<someFlag>=<someValue> \\\n" +
      "                              --<someOtherFlag>\n\n" +
      "The flags will be casted as properties in the options object sent to\n" +
      "your file's main function.\n\n" +
      "To see the version number, run:\n\n" +
      "  ode -v\n\n" +
      "or just run ode without arguments and you will see this message again.")

  if (argv.indexOf("-v") !== -1)
    return console.log(metadata.version)

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
  Ode([1, 2, "--string=flag", "library", "--boolean", "--number=3"], null, require, "cwd");

  //! THEN
  assert.equal(require.calls[0][0], "cwd/library")
  assert.equal(library.calls[0][0].string, "flag")
  assert.equal(library.calls[0][0].boolean, true)
  assert.equal(library.calls[0][0].number, 3)
  assert.equal(library.calls[0][0].ignored, void 0)
})

example('Is able to require a .coffee package', function() {
  //! WHEN
  var value = Ode([1, 2, "--name=John", "example/hello.coffee"])

  //! THEN
  assert(value)
})

example('Runs the callback when provided', function () {
  //! GIVEN
  var callback = function (options) { callback.options = options }

  //! WHEN
  Ode([1, 2, "--justName=something"], callback)

  //! THEN
  assert.equal(callback.options.justName, "something")
})

example('Returns the result value from the callback when provided', function () {
  //! GIVEN
  var callback = function (options) {
    return options.name + " " + options.lastName }

  //! WHEN
  var result = Ode([1, 2, "--name=Mister", "--lastName=X"], callback)

  //! THEN
  assert.equal(result, "Mister X")
})

example('Shows only the version number when flag -v is sent', function () {
  //! GIVEN
  var temp = { log: console.log }
  console.log = function () { console.log.args = arguments }

  //! WHEN
  Ode(["1", "2", "-v"])

  //! THEN
  assert.equal(console.log.args[0], metadata.version)
  console.log = temp.log
})

example('Shows a helpful message when ran with no arguments', function () {
  //! GIVEN
  var temp = { log: console.log }
  console.log = function () { console.log.args = arguments }

  //! WHEN
  Ode(["node", "else"])

  //! THEN
  assert.equal(
    console.log.args[0],
    BOLD + "Ode (v" + metadata.version + "):" + CLEAR +
    " the task runner that adds no dependencies to your code.\n\n" +
    "Usage:\n\n" +
    "  ode <yourfile>[.js|.coffee] --<someFlag>=<someValue> \\\n" +
    "                              --<someOtherFlag>\n\n" +
    "The flags will be casted as properties in the options object sent to\n" +
    "your file's main function.\n\n" +
    "To see the version number, run:\n\n" +
    "  ode -v\n\n" +
    "or just run ode without arguments and you will see this message again.")
  console.log = temp.log
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
