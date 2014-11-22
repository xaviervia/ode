Zero overhead CLI adapter for Node.js modules
=============================================

![Demonstration of Ode](http://g.recordit.co/NEXLyaPNWl.gif)

The current trend in task-runners is to minimize tool-specific code, which I think is great. A [Gulp](http://gulpjs.com) pipeable, for example, is just an interface with no mandatory dependencies, and Gulp itself is a thin wrapper around
[Vinyl-fs](https://github.com/wearefractal/vinyl-fs)). On top of that trend, I felt like there is space for a zero dependency, zero requirements task runner in the ecosystem.

Enter [Ode](https://github.com/xaviervia/ode), the task runner that is just a very thin wrapper around `node` (or `coffee`), responsible of parsing the command line arguments for you. Let's say you have a file called `task.js`:

```
module.exports = function (options) {
  // Do something with the arguments
}
```

Then you run it with:

```sh
ode task --someOption=300 --booleanFlag
```

That's all.

> CoffeeScript is supported out of the box, which actually gives `ode` an edge over plain `node`. You can also use Ode programmatically.  For further explanations please refer to the [repository page in Github](https://github.com/xaviervia/ode)

Rationale
---------

**Ode** enforces a couple of best practices for organizing and maintaining tasks (or code in general).

- _Use the filesystem._ You get autocompletion for free in most shells, and you get an automatic namespace convention. For example, you can have the master `build` task in the file `task/build/index.js` that you can invoke with `ode task/build`, and then also have particular tasks to be invoked separately, such as a `task/build/coffee.js`.
- _Be vanilla._ The actual code of the tasks doesn't depend on **Ode** at all and can actually be consumed from other runners.
- _Enable programmatic consumption._ You _will_ feel the need to run your tasks programatically. With **Ode** as part of the stack, tasks are just plain Node.js modules that accept an `options` object, a very widespread practice.
- _Be native._ Take advantage of the tools already provided by the environment.

Conclusion
----------

Building Ode for me is part of the quest to build a series of development productivity
tools for Node.js. That quest is currently my largest solo project, and besides the tools themselves what I often find myself doing is simply refining my understanding of what makes a codebase good, what makes a programmer good and what makes an application successful. Learnings from one are usually readily applicable in the other, and one of the key findings so far has been: keep it vanilla. Keep it unopinionated. Keep it interoperable, small and to the point. Reduce overhead instead of adding it.

That's what I tried to do with Ode, I hope you find it as useful as I did.
