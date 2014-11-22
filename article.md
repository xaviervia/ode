Zero overhead CLI adapter for Node.js modules
=============================================

![Demonstration of Ode](http://g.recordit.co/NEXLyaPNWl.gif)

The current trend in task-runners is to minimize tool-specific code, which I think is great. A [Gulp](http://gulpjs.com) pipeable, for example, is just an interface with no mandatory dependencies, and Gulp itself is a thin wrapper around
[Vinyl-fs](https://github.com/wearefractal/vinyl-fs)). On top of that trend, I felt like there is space for a zero dependency, zero requirements task runner in the ecosystem.

Enter [Ode](https://github.com/xaviervia/ode), the task runner that is just a very thin wrapper around `node` (or `coffee`), responsible of parsing the command line arguments for you. Let's say you have a file called `task.js`:

```javascript
// Vanilla Node.js module that exposes a function that takes
// an options object.
module.exports = function (options) {
  // Do something with the arguments
}
```

Then you run it with the command (the file can be referenced by either "task" of "task.js", under the curtains Ode is doing a `require` so the difference is irrelevant in this case):

```sh
ode task --someOption=300 --booleanFlag
```

That's all.

> CoffeeScript is supported out of the box, which actually gives `ode` an edge over plain `node`. You can also use Ode programmatically.  For further explanations please refer to the [repository page in Github](https://github.com/xaviervia/ode)

Rationale
---------

**Ode** enforces a couple of best practices for organizing and maintaining tasks (or code in general).

- Use the filesystem. You get autocompletion for free in most shells, and you get an automatic namespace convention. For example, you can have the master `build` task in the file `task/build/index.js` that you can invoke with `ode task/build`, and then also have particular tasks to be invoked separately, such as a `task/build/coffee.js`.
- Be vanilla. The actual code of the tasks doesn't depend on **Ode** at all and can actually be consumed from other runners.
- Enable programatic consumption. You _will_ feel the need to run your tasks programatically. With **Ode** as part of the stack, tasks are just plain Node.js modules that accept an `options` object, a very widespread practice.
- Be native. Take advantage of the tools already provided by the environment.

Conclusion
----------

Building Ode for me is part of a series of development productivity
tools for Node.js that is currently my largest solo project, but besides the tools themselves what I find myself doing a lot is simply refining my understanding of what makes a codebase good, what makes a programmer good and what makes an application successful. In the process I keep finding out the layers refer to each other a lot and learnings from one are usually readily applicable in the other. One of the findings that keeps popping up and reinforcing itself is: keep it vanilla. Keep it unopinionated. Keep it interoperable, small and to the point.

Pretty much the UNIX philosophy.
