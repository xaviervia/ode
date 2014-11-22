module.exports = function (options) {
  console.log("Howdy, " + options.name + "!");
  console.log(options.number * options.factor);
  if (options.verbose === true) {
    console.log("Features: Numbers are casted to numbers\n" +
    "unassigned flags are casted to `true` values\n" +
    "otherwise the value is taken as string");
  }
}
