---
prev: ./the-typescript-handbook.md
next: ./everyday-types.md
---

# The Basics

Each and every value in JavaScript has a set of behaviors you can observe from
running different operations. That sounds abstract, but as a quick
example,consider some operations we might run on a variable named **message**.
<Translate content='JavaScript 中的每个值都有一组行为，您可以通过运行不同的操作观察到这些行为。 这听起来很抽象，但作为一个简单的例子，考虑我们可能对名为 message 的变量运行的一些操作。'/>

```js
// Accessing the property 'toLowerCase' on 'message' and then calling it.
message.toLowerCase();

// Calling 'message'.
message();
```

If we break this down, the first runnable line of code accesses a property
called **toLowerCase** and then calls it. The second one tries to call
**message** directly.
<Translate content='如果我们将其分解，第一行可运行代码访问一个名为 toLowerCase 的属性，然后调用它。 第二行则尝试直接调用message。'/>

But assuming(conj. 假设；假定) we don’t know the value of **message** - and
that’s pretty common - we can’t reliably(adv.可靠地；确实地) say what results
we’ll get from trying to run any of this code. The behavior of each operation
depends entirely on what value we had in the first place.
<Translate content='但是假设我们不知道 message 的值——这很常见——我们无法可靠地说出尝试运行任何这些代码会得到什么结果。 每个操作的行为完全取决于我们首先拥有的价值。'/>

- Is **message** callable?
- Does it have a property called **toLowerCase** on it?
- If it does, is **toLowerCase** even callable?
- If both of these values are callable, what do they return?

The answers to these questions are usually things we keep in our heads when we
write JavaScript, and we have to hope we got all the details
right.<Translate content='这些问题的答案通常是我们在编写 JavaScript 时记在脑子里的东西，我们必须希望所有细节都正确。'/>

<u>Let’s say</u>(比如说（用作插入语）) **message** was defined in the following
way.

```js
const message = 'Hello World!';
```

As you can probably guess, if we try to run **message.toLowerCase()**, we’ll get
the same string only in lower-case.

What about that second line of code? If you’re familiar(adj.熟悉的；常见的) with
JavaScript, you’ll know this fails with an exception(n.例外，除外；在这里译作‘异
常’):

```
TypeError: message is not a function
```

It’d be great if we could avoid mistakes like this.

When we run our code, the way that our JavaScript runtime chooses what to do is
by figuring out the type of the value - what sorts of behaviors and
capabilities(n. 能力；功能；性能) it has. That’s part of what that TypeError is
alluding to - it’s saying that the string "Hello World!" cannot be called as a
function.<Translate content='当我们运行我们的代码时，我们的 JavaScript 运行时选择做什么的方式是通过确定值的类型——它有什么样的行为和能力。 这是 TypeError 所暗示的一部分——它说字符串“Hello World!” 不能作为函数调用。'/>

For some values, such as the primitives string and number, we can identify their
type at runtime using the typeof operator. But for other things like functions,
there’s no corresponding runtime mechanism to identify their
types.<Translate content='对于某些值，例如原始字符串和数字，我们可以在运行时使用 typeof 运算符识别它们的类型。 但是对于函数之类的其他东西，没有相应的运行时机制来识别它们的类型。'/>

For example, consider this function:

```js
function fn(x) {
	return x.flip();
}
```

We can observe by reading the code that this function will only work if given an
object with a callable flip property, but JavaScript doesn’t surface this
information in a way that we can check while the code is running. The only way
in pure JavaScript to tell what fn does with a particular value is to call it
and see what happens. This kind of behavior makes it hard to predict what code
will do before it runs, which means it’s harder to know what your code is going
to do while you’re writing it.
<Translate content='通过阅读代码，我们可以观察到此函数仅在给定具有可调用 flip 属性的对象时才有效，但 JavaScript 不会以我们可以在代码运行时检查的方式显示此信息。 在纯 JavaScript 中判断 fn 对特定值做什么的唯一方法是调用它并查看会发生什么。 这种行为使得很难预测代码在运行之前会做什么，这意味着在编写代码时更难知道代码将要做什么。'/>

Seen in this way, a type is the concept of describing which values can be passed
to fn and which will crash(崩溃). JavaScript only truly provides dynamic
typing - running the code to see what happens.
<Translate content='这样看来，类型是描述哪些值可以传递给 fn 以及哪些值会崩溃的概念。 JavaScript 如实地提供了动态类型——运行代码看看会发生什么。'/>

The alternative is to use a static type system to make predictions(n. 预测，预言
) about what code is expected before it runs.
<Translate content='另一种方法是使用静态类型系统在运行前预测代码的预期。'/>

## Static type-checking

## Non-exception Failures

## Types for Tooling

## tsc, the TypeScript compiler
