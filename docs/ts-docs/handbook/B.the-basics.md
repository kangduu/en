---
prev: ./A.the-typescript-handbook.md
next: ./C.everyday-types.md
---

# The Basics

Each and every value in JavaScript has a set of behaviors you can observe from running different operations. 

> JavaScript 中的每个值都有一组行为，您可以通过运行不同的操作观察到这些行为。

That sounds abstract, but as a quick example, consider some operations we might run on a variable named **message**.

> 这听起来很抽象，但作为一个简单的例子，考虑我们可能对名为 message 的变量运行的一些操作。

```js
// Accessing the property 'toLowerCase' on 'message' and then calling it.
message.toLowerCase();

// Calling 'message'.
message();
```

If we break this down, the first runnable line of code accesses a property called **toLowerCase** and then calls it. 

> 如果我们将其分解，第一行可运行代码访问一个名为 toLowerCase 的属性，然后调用它。

The second one tries to call **message** directly.

> 第二行则尝试直接调用message。 

But assuming(conj. 假设；假定) we don’t know the value of **message** - and that’s pretty common - we can’t reliably(adv.可靠地；确实地) say what results we’ll get from trying to run any of this code. 

> 但是假设我们不知道 message 的值——这很常见——我们无法可靠地说出尝试运行任何这些代码会得到什么结果。 

The behavior of each operation depends entirely on what value we had in the first place.

> 每个操作的行为完全取决于我们最初拥有的值。 

- Is **message** callable?

  *message 可调用吗？*

- Does it have a property called **toLowerCase** on it

  *它有一个名为 toLowerCase 的属性吗？*

- If it does, is **toLowerCase** even callable?

  *如果有， toLowerCase 甚至可以调用吗？*

- If both of these values are callable, what do they return? 

  *如果这两个值都是可调用的，它们会返回什么？*

The answers to these questions are usually things we keep in our heads when we write JavaScript, and we have to hope we got all the details right.

> 这些问题的答案通常是我们在编写 JavaScript 时记在脑子里的东西，我们必须希望所有细节都正确。

<u>*Let’s say*</u>(比如说（用作插入语）) **message** was defined in the following way.

```js
const message = 'Hello World!';
```

As you can probably guess, if we try to run **message.toLowerCase()**, we’ll get the same string only in lower-case.

What about that second line of code? 

If you’re familiar(adj.熟悉的；常见的) with JavaScript, you’ll know this fails with an exception(n.例外，除外；在这里译作‘异常’):

```powershell
TypeError: message is not a function
```

It’d be great if we could avoid mistakes like this.

When we run our code, the way that our JavaScript runtime chooses what to do is by figuring out the type of the value - what sorts of behaviors and capabilities(n. 能力；功能；性能) it has. 

> 当我们运行我们的代码时，我们的 JavaScript 运行时选择做什么的方式是通过确定值的类型——它有什么样的行为和能力。

That’s part of what that TypeError is alluding to - it’s saying that the string "Hello World!" cannot be called as a function.

> 这是 TypeError 所暗示的一部分——它说字符串“Hello World!" 不能作为函数调用。

For some values, such as the primitives string and number, we can identify their type at runtime using the typeof operator. 

> 对于某些值，例如原始字符串和数字，我们可以在运行时使用 typeof 运算符识别它们的类型。

But for other things like functions, there’s no corresponding runtime mechanism to identify their types.

> 但是对于函数之类的其他东西，没有相应的运行时机制来识别它们的类型。

For example, consider this function:

```js
function fn(x) {
	return x.flip();
}
```

We can observe by reading the code that this function will only work if given an object with a callable flip property, but JavaScript doesn’t surface this information in a way that we can check while the code is running. 

> 通过阅读代码，我们可以观察到此函数仅在给定具有可调用 flip 属性的对象时才有效，但 JavaScript 不会以我们可以在代码运行时检查的方式显示此信息。

The only way in pure JavaScript to tell what fn does with a particular value is to call it and see what happens. 

> 在纯 JavaScript 中判断 fn 对特定值做什么的唯一方法是调用它并查看会发生什么。

This kind of behavior makes it hard to predict what code will do before it runs, which means it’s harder to know what your code is going to do while you’re writing it. 

> 这种行为使得很难预测代码在运行之前会做什么，这意味着在编写代码时更难知道代码将要做什么。

Seen in this way, a type is the concept of describing which values can be passed to fn and which will crash(崩溃). 

> 这样看来，类型是描述哪些值可以传递给 fn 以及哪些值会崩溃的概念。 

JavaScript only truly provides dynamic typing - running the code to see what happens. 

> JavaScript 如实地提供了动态类型——运行代码看看会发生什么。

The alternative is to use a static type system to make predictions(n. 预测，预言) about what code is expected before it runs.

> 另一种方法是使用静态类型系统在运行前预测代码的预期。

## Static type-checking

Think back to that `TypeError` we got earlier from trying to call a `string` as a function. 

> 回想一下我们之前尝试将字符串作为函数调用时遇到的TypeError。

*Most people* don’t like to get any sorts of errors when running their code - those are considered bugs! 

> 大多数人不喜欢在运行他们的代码时出现任何类型的错误——那些被认为是错误！

And when we write new code, we try our best to avoid introducing new bugs.

> 当我们编写新代码时，我们会尽力避免引入新的错误。

If we add just a bit of code, save our file, re-run the code, and immediately see the error, we might be able to isolate the problem quickly; but that’s not always the case. 

> 如果我们只添加一点代码，保存我们的文件，重新运行代码，并立即看到错误，我们可能能够快速隔离问题；但情况并非总是如此。

We might not have tested the feature thoroughly enough, so we might never actually run into a potential error that would be thrown! 

> 我们可能没有对该功能进行足够彻底的测试，因此我们可能永远不会真正遇到会抛出的潜在错误！

Or if we were lucky enough to witness the error, we might have ended up doing large refactorings and adding a lot of different code that we’re forced to dig through.

> 或者，如果我们足够幸运地看到了错误，我们可能最终会进行大量重构并添加许多我们被迫挖掘的不同代码。

Ideally, we could have a tool that helps us find these bugs *before* our code runs. 

> 理想情况下，我们可以有一个工具来帮助我们在代码运行之前找到这些错误。

That’s what a static type-checker like TypeScript does. 

> 这就是像 TypeScript 这样的静态类型检查器所做的。

*Static types systems* describe the shapes and behaviors of what our values will be when we run our programs. 

> 静态类型系统描述了我们运行程序时我们编写的值的形状和行为。

A type-checker like TypeScript uses that information and tells us when things might be going off the rails.

> 像 TypeScript 这样的类型检查器使用该信息并告诉我们什么时候事情可能会偏离轨道。

```js
const message = "hello!"; 

message();
// This expression is not callable.
// Type 'String' has no call signatures.
```

Running that last sample with TypeScript will give us an error message before we run the code in the first place.

> 使用 TypeScript 运行最后一个示例将在我们首先运行代码之前给我们一条错误消息。

## Non-exception Failures

So far we’ve been discussing certain things like runtime errors - cases where the JavaScript runtime tells us that it thinks something is nonsensical. 

> 到目前为止，我们一直在讨论某些事情，比如运行时错误——JavaScript 运行时告诉我们它认为某些事情是无意义的情况。

Those cases come up because [the ECMAScript specification](https://tc39.github.io/ecma262/) has explicit instructions on how the language should behave when it runs into something unexpected.

> 出现这些情况是因为 ECMAScript 规范对语言在遇到意外情况时应如何表现有明确的说明。

For example, the specification says that trying to call something that isn’t callable should throw an error. 

Maybe that sounds like “obvious behavior”, but you could imagine that accessing a property that doesn’t exist on an object should throw an error too. 

Instead, JavaScript gives us different behavior and returns the value `undefined`:

```js
const user = {
  name: "Daniel",
  age: 26,
};

user.location; // returns undefined
```

Ultimately, a static type system has to make the call over what code should be flagged as an error in its system, even if it’s “valid” JavaScript that won’t immediately throw an error. 

In TypeScript, the following code produces an error about `location` not being defined:

```js
const user = {
  name: "Daniel",
  age: 26,
};
 
user.location;Property 'location' does not exist on type '{ name: string; age: number; }'.Property 'location' does not exist on type '{ name: string; age: number; }'.Try
```

While sometimes that implies a trade-off in what you can express, the intent is to catch legitimate bugs in our programs. And TypeScript catches *a lot* of legitimate bugs.

For example: typos,

```js
const announcement = "Hello World!";
 
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
 
// We probably meant to write this...
announcement.toLocaleLowerCase();
```

uncalled functions,

```js
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;Operator '<' cannot be applied to types '() => number' and 'number'.Operator '<' cannot be applied to types '() => number' and 'number'.
}
```

or basic logic errors.

```js
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.
  // Oops, unreachable
}
```

## Types for Tooling

TypeScript can catch bugs when we make mistakes in our code. 

That’s great, but TypeScript can *also* prevent us from making those mistakes in the first place.

The type-checker has information to check things like whether we’re accessing the right properties on variables and other properties. 

Once it has that information, it can also start *suggesting* which properties you might want to use.

That means TypeScript can be leveraged for editing code too, and the core type-checker can provide error messages and code completion as you type in the editor. 

That’s part of what people often refer to when they talk about tooling in TypeScript.

```js
import express from "express";
const app = express();
 
app.get("/", function (req, res) {
  res.sen
         send
         sendDate
         sendfile
         sendFile
         sendStatus
});
 
app.listen(3000);
```

TypeScript takes tooling seriously, and that goes beyond completions and errors as you type. 

An editor that supports TypeScript can deliver “quick fixes” to automatically fix errors, refactorings to easily re-organize code, and useful navigation features for jumping to definitions of a variable, or finding all references to a given variable. 

All of this is built on top of the type-checker and is fully cross-platform, so it’s likely that [your favorite editor has TypeScript support available](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

## tsc, the TypeScript compiler

We’ve been talking about type-checking, but we haven’t yet used our type-*checker*.

Let’s get acquainted with our new friend `tsc`, the TypeScript compiler. First we’ll need to grab it via npm.

```powershell
npm install -g typescript
```

> This installs the TypeScript Compiler `tsc` globally. You can use `npx` or similar tools if you’d prefer to run `tsc` from a local `node_modules` package instead.

Now let’s move to an empty folder and try writing our first TypeScript program: `hello.ts`:

```js
// Greets the world.
console.log("Hello world!");
```

Notice there are no frills here; this “hello world” program looks identical to what you’d write for a “hello world” program in JavaScript. 

And now let’s type-check it by running the command `tsc` which was installed for us by the `typescript` package.

```powershell
tsc hello.ts
```

Tada!

Wait, “tada” *what* exactly? We ran `tsc` and nothing happened! Well, there were no type errors, so we didn’t get any output in our console since there was nothing to report.

But check again - we got some *file* output instead. If we look in our current directory, we’ll see a `hello.js` file next to `hello.ts`. 

That’s the output from our `hello.ts` file after `tsc` *compiles* or *transforms* it into a plain JavaScript file. 

And if we check the contents, we’ll see what TypeScript spits out after it processes a `.ts` file:

```js
// Greets the world.
console.log("Hello world!");
```

In this case, there was very little for TypeScript to transform, so it looks identical to what we wrote. 

The compiler tries to emit clean readable code that looks like something a person would write. 

While that’s not always so easy, TypeScript indents consistently, is mindful of when our code spans across different lines of code, and tries to keep comments around.

What about if we *did* introduce a type-checking error? Let’s rewrite `hello.ts`:

```js
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}
 
greet("Brendan");
```

If we run `tsc hello.ts` again, notice that we get an error on the command line!

```
Expected 2 arguments, but got 1.
```

TypeScript is telling us we forgot to pass an argument to the `greet` function, and rightfully so. 

So far we’ve only written standard JavaScript, and yet type-checking was still able to find problems with our code. 

Thanks TypeScript!

## Emitting with Errors

One thing you might not have noticed from the last example was that our `hello.js` file changed again. 

If we open that file up then we’ll see that the contents still basically look the same as our input file. 

That might be a bit surprising given the fact that `tsc` reported an error about our code, but this is based on one of TypeScript’s core values: much of the time, *you* will know better than TypeScript.

To reiterate from earlier, type-checking code limits the sorts of programs you can run, and so there’s a tradeoff on what sorts of things a type-checker finds acceptable.

Most of the time that’s okay, but there are scenarios where those checks get in the way. 

For example, imagine yourself migrating JavaScript code over to TypeScript and introducing type-checking errors. 

Eventually you’ll get around to cleaning things up for the type-checker, but that original JavaScript code was already working! 

Why should converting it over to TypeScript stop you from running it?

So TypeScript doesn’t get in your way. 

Of course, over time, you may want to be a bit more defensive against mistakes, and make TypeScript act a bit more strictly. 

In that case, you can use the [`noEmitOnError`](https://www.typescriptlang.org/tsconfig#noEmitOnError) compiler option. 

Try changing your `hello.ts` file and running `tsc` with that flag:

```powershell
tsc --noEmitOnError hello.ts
```

You’ll notice that `hello.js` never gets updated.

## Erased Types

Let’s take a look at what happens when we compile the above function `greet` with `tsc` to output JavaScript:

```js
"use strict";
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
```

Notice two things here:

1. Our `person` and `date` parameters no longer have type annotations.
2. Our “template string” - that string that used backticks (the ``` character) - was converted to plain strings with concatenations.

More on that second point later, but let’s now focus on that first point. 

Type annotations aren’t part of JavaScript (or ECMAScript to be pedantic), so there really aren’t any browsers or other runtimes that can just run TypeScript unmodified. 

That’s why TypeScript needs a compiler in the first place - it needs some way to strip out or transform any TypeScript-specific code so that you can run it. 

Most TypeScript-specific code gets erased away, and likewise, here our type annotations were completely erased.

> **Remember**: Type annotations never change the runtime behavior of your program.

## Downleveling

One other difference from the above was that our template string was rewritten from

```javascript
`Hello ${person}, today is ${date.toDateString()}!`;
```

to

```js
"Hello " + person + ", today is " + date.toDateString() + "!";
```

Why did this happen?

Template strings are a feature from a version of ECMAScript called ECMAScript 2015 (a.k.a. ECMAScript 6, ES2015, ES6, etc. - *don’t ask*). 

TypeScript has the ability to rewrite code from newer versions of ECMAScript to older ones such as ECMAScript 3 or ECMAScript 5 (a.k.a. ES3 and ES5). 

This process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is sometimes called *downleveling*.

By default TypeScript targets ES3, an extremely old version of ECMAScript. 

We could have chosen something a little bit more recent by using the [`target`](https://www.typescriptlang.org/tsconfig#target) option. 

Running with `--target es2015` changes TypeScript to target ECMAScript 2015, meaning code should be able to run wherever ECMAScript 2015 is supported. 

So running `tsc --target es2015 hello.ts` gives us the following output:

```js
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```

>While the default target is ES3, the great majority of current browsers support ES2015. 
>
>Most developers can therefore safely specify ES2015 or above as a target, unless compatibility with certain ancient browsers is important.

## Strictness

Different users come to TypeScript looking for different things in a type-checker. 

Some people are looking for a more loose opt-in experience which can help validate only some parts of their program, and still have decent tooling. 

This is the default experience with TypeScript, where types are optional, inference takes the most lenient types, and there’s no checking for potentially `null`/`undefined` values. 

Much like how `tsc` emits in the face of errors, these defaults are put in place to stay out of your way. 

If you’re migrating existing JavaScript, that might be a desirable first step.

In contrast, a lot of users prefer to have TypeScript validate as much as it can straight away, and that’s why the language provides strictness settings as well. 

These strictness settings turn static type-checking from a switch (either your code is checked or not) into something closer to a dial. 

The further you turn this dial up, the more TypeScript will check for you. 

This can require a little extra work, but generally speaking it pays for itself in the long run, and enables more thorough checks and more accurate tooling. 

When possible, a new codebase should always turn these strictness checks on.

TypeScript has several type-checking strictness flags that can be turned on or off, and all of our examples will be written with all of them enabled unless otherwise stated. 

The [`strict`](https://www.typescriptlang.org/tsconfig#strict) flag in the CLI, or `"strict": true` in a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) toggles them all on simultaneously, but we can opt out of them individually. 

The two biggest ones you should know about are [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) and [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks).

## noImplicitAny

Recall that in some places, TypeScript doesn’t try to infer types for us and instead falls back to the most lenient type: `any`. 

> 回想一下，在某些地方，TypeScript 不会尝试为我们推断类型，而是回退到最宽松的类型：any。

This isn’t the worst thing that can happen - after all, falling back to `any` is just the plain JavaScript experience anyway.

> 这不是可能发生的最糟糕的事情——毕竟，回退到 any 只是普通的 JavaScript 体验。

However, using `any` often defeats the purpose of using TypeScript in the first place. 

> 然而，使用 any 通常会违背使用 TypeScript 的初衷。 

The more typed your program is, the more validation and tooling you’ll get, meaning you’ll run into fewer bugs as you code. 

> 您的程序类型越多，您获得的验证和工具就越多，这意味着您在编写代码时遇到的错误会更少。 

Turning on the [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) flag will issue an error on any variables whose type is implicitly inferred as `any`.

> 开启 noImplicitAny 标志将对类型被隐式推断为 `any` 的任何变量发出错误。

## strictNullChecks

By default, values like **null** and **undefined** are <u>*assignable*</u>(adj.可分配的) to any other type.

> 默认情况下，像 null 和 undefined 这样的值可以分配给任何其它类型。

This can make writing some code easier, but forgetting to handle **null** and **undefined** is the cause of <u>*countless*</u>(adj. 无数的，数不尽的) bugs in the world - *some consider it a billion dollar mistake!*

>  这可以使得编写一写代码更加容易，但是忘记处理 null 和 undefined 是世界上无数 bugs 的原因。

The [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) flag makes handling **null** and **undefined** more explicit , and *spares* us form worrying about whether we forgot to handle **null** and **undefined** 

> strictNullChecks 标志使处理 null 和 undefined 更加明确，并且让我们不必担心我们是否忘记处理 null 和 undefined 。
