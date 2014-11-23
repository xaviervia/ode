Ode
===

[ ![Codeship Status for xaviervia/ode](https://codeship.com/projects/aa905470-5471-0132-8879-6274f9eea671/status)](https://codeship.com/projects/49197)

Zero overhead CLI adapter for Node modules.

```javascript
// greeter.js
module.exports = function (options) {
  console.log("Howdy, " + options.name + "!");
  console.log(options.number * options.factor);
  if (options.verbose === true) {
    console.log("Features: Numbers are casted to numbers\n" +
                "unassigned flags are casted to `true` values\n" +
                "otherwise the value is taken as string");
  }
}
```

```sh
ode greeter --name=Johnny --number=2 --factor=4 --verbose
```

It can also be used programmatically to make CLIs out of your modules:

```javascript
var Ode = require("ode");
var yourModule = require("your-module");

Ode(process.argv, function (options) {
  yourModule(options);
});
```

Installation
------------

```sh
npm install -g ode
```

CoffeeScript
------------

Because it is so widespread, **Ode** comes with support for CoffeeScript out
of the box. If you want to use another dialect/transpiler, please pull
request.

Testing
-------

Clone this repo and run

```sh
npm test
```
License
-------

Copyright 2014 Xavier Via

ISC license.

See [LICENSE](LICENSE) attached.
