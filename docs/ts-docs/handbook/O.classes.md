---
prev: ./N.template-literal-types.md
next: ./P.modules.md
---

# Classes

TypeScript offers full support for the `class` keyword introduced in ES2015.

> TypeScript 对 ES2015 中引入的' class '关键字提供了全面支持。

As with other JavaScript language features, TypeScript adds type annotations and
other syntax to allow you to express relationships between classes and other
types.

> 与其他 JavaScript 语言特性一样，TypeScript 添加了类型注释和其他语法，允许你表
> 达类和其他类型之间的关系。

## Class Members

Here’s the most basic class - an empty one:

> 下面是一个最基本的类——一个空类：

```tsx
class Point {}
```

This class isn’t very useful yet, so let’s start adding some members.

> 这个类还不是很有用，所以让我们开始添加一些成员。

## Fields

A field declaration creates a public writeable property on a class:

> 字段声明在类上创建一个公共可写属性：

```tsx
class Point {
	x: number;
	y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
```

As with other locations, the type annotation is optional, but will be an
implicit `any` if not specified.

> 与其他位置一样，类型注释是可选的，但如果未指定，则为隐式 any。

Fields can also have _initializers_; these will run automatically when the class
is instantiated:

> 字段也可以有初始化器；这些将在实例化类时自动运行：

```tsx
class Point {
	x = 0;
	y = 0;
}

const pt = new Point();
console.log(pt.x, pt.y); // 0,0
```

Just like with `const`, `let`, and `var`, the initializer of a class property
will be used to infer its type:

> 就像 const、let 和 var 一样，类属性的初始值设定项将用于推断其类型：

```tsx {4}
const pt = new Ponit();
pt.x = '0';

// Type 'string' is not assignable to type 'number'.
```

### `--strictPropertyInitialization`

The
[`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)
setting controls whether class fields need to be initialized in the constructor.

> 设置 strictPropertyInitialization 以控制是否需要在构造函数中初始化类字段

```tsx {3}
class BadGreeter {
	name: string;
	// Property 'name' has no initializer and is not definitely assigned in the constructor.
}
```

```tsx
class GoodGreeter {
	name: string;

	constructor() {
		this.name = 'hello';
	}
}
```

Note that the field needs to be initialized _in the constructor itself_.

> 请注意，该字段需要在构造函数本身中进行初始化。

TypeScript does not analyze methods you invoke from the constructor to detect
initializations, because a derived class might override those methods and fail
to initialize the members.

> TypeScript 不会分析您从构造函数调用的方法来检测初始化，因为派生类可能会覆盖这
> 些方法并且无法初始化成员。

If you intend to definitely initialize a field through means other than the
constructor (for example, maybe an external library is filling in part of your
class for you), you can use the _definite assignment assertion operator_, `!`:

> 如果你打算通过构造函数以外的方式明确地初始化一个字段（例如，可能一个外部库正在
> 为你填充你的类的一部分），你可以使用明确的赋值断言运算符，`!`

```tsx {3}
class OKGreeter {
	// Not initialized, but no error
	name!: string;
}
```

## readonly

Fields may be prefixed with the `readonly` modifier. This prevents assignments
to the field outside of the constructor.

> 字段可以以 `readonly` 修饰符为前缀。这可以防止字段在构造函数之外进行赋值。

```tsx {11,15}
class Greeter {
	readonly name: string = 'world';

	constructor(otherName?: string) {
		if (otherName !== undefined) {
			this.name = otherName;
		}
	}

	err() {
		this.name = 'not ok'; // Cannot assign to 'name' because it is a read-only property.
	}
}
const gr = new Greeter();
gr.name = 'also not ok'; // Cannot assign to 'name' because it is a read-only property.
```

## Constructor

Class constructors are very similar to functions. You can add parameters with
type annotations, default values, and overloads:

> 类构造函数与函数非常相似。您可以添加带有类型注释、默认值和重载的参数：

```tsx
class Point {
	x: number;
	y: number;

	// Normal signature with defaults
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}
```

```tsx
class Point {
	// Overloads
	constructor(x: number, y: string);
	constructor(s: string);
	constructor(xs: any, y?: any) {
		// TBD
	}
}
```

There are just a few differences between class constructor signatures and
function signatures:

> 类构造函数签名和函数签名之间只有一些区别：

- Constructors can’t have type parameters - these belong on the outer class
  declaration, which we’ll learn about later

  > 构造函数不能有类型参数 - 这些属于外部类声明，我们稍后会了解

- Constructors can’t have return type annotations - the class instance type is
  always what’s returned

  > 构造函数不能有返回类型注释——类实例类型总是返回的

### Super Calls

Just as in JavaScript, if you have a base class, you’ll need to call `super();`
in your constructor body before using any `this.` members:

> 就像在 JavaScript 中一样，如果你有一个基类，你需要在你的构造函数体中调用
> super()，然后再使用任何 `this.members`：

```tsx {9}
class Base {
	k = 4;
}

class Derived extends Base {
	constructor() {
		// Prints a wrong value in ES5; throws exception in ES6
		console.log(this.k);
		// 'super' must be called before accessing 'this' in the constructor of a derived class.
		super();
	}
}
```

Forgetting to call `super` is an easy mistake to make in JavaScript, but
TypeScript will tell you when it’s necessary.

> 忘记调用 super 是 JavaScript 中很容易犯的错误，但 TypeScript 会在必要时告诉您
> 。

## Methods

A function property on a class is called a _method_. Methods can use all the
same type annotations as functions and constructors:

> 类的函数属性称为方法。方法可以使用所有与函数和构造函数相同的类型注释：

```tsx
class Point {
	x = 10;
	y = 10;

	scale(n: number): void {
		this.x *= n;
		this.y *= n;
	}
}
```

**Other than the standard type annotations, TypeScript doesn’t add anything else
new to methods.**

> 除了标准的类型注释，TypeScript 没有向方法中添加任何其他新内容。

Note that inside a method body, it is still mandatory to access fields and other
methods via `this.`.

> 请注意，在方法主体内部，仍然必须通过 this.. 访问字段和其他方法。

An unqualified name in a method body will always refer to something in the
enclosing scope:

> 方法主体中的非限定名称将始终引用封闭范围内的内容：

```tsx {8}
let x: number = 0;

class A {
	x: string = 'hello';

	m() {
		// This is trying to modify 'x' from line 1, not the class property
		x = 'word'; //Type 'string' is not assignable to type 'number'.
	}
}
```

## Getters / Setters

Classes can also have _accessors_:

> 类也可以有访问器

```tsx
class A {
	_length = 0;
	get length() {
		return this._length;
	}
	set length(value) {
		this._length = value;
	}
}
```

> **Note that a field-backed get/set pair with no extra logic is very rarely
> useful in JavaScript. It’s fine to expose public fields if you don’t need to
> add additional logic during the get/set operations.**
>
> 请注意，没有额外逻辑的字段支持的 get/set 对在 JavaScript 中很少有用。如果您不
> 需要在 get/set 操作期间添加额外的逻辑，那么暴露公共字段很好。

TypeScript has some special inference rules for accessors:

> TypeScript 对访问器有一些特殊的推理规则：

- If `get` exists but no `set`, the property is automatically `readonly`

  > 如果 get 存在但没有 set，则该属性自动为 readonly

- If the type of the setter parameter is not specified, it is inferred from the
  return type of the getter

  > 如果未指定 setter 参数的类型，则根据 getter 的返回类型推断

- Getters and setters must have the same
  [Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

Since
[TypeScript 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/),
it is possible to have accessors with different types for getting and setting.

> 从 TypeScript 4.3 开始，可以使用不同类型的访问器来 getting 和 setting。

```tsx
class Thing {
	_size = 0;

	get size(): number {
		return this._size;
	}

	set size(value: string | number | boolean) {
		let num = Number(value);

		// Don't allow NaN, Infinity, etc

		if (!Number.isFinite(num)) {
			this._size = 0;
			return;
		}

		this._size = num;
	}
}
```

## Index Signatures

Classes can declare index signatures; these work the same as
[Index Signatures for other object types](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures):

> 类可以声明索引签名；这些与其他对象类型的索引签名一样工作：

```tsx
class MyClass {
	[s: string]: boolean | ((s: string) => boolean);

	check(s: string) {
		return this[s] as boolean;
	}
}
```

Because the index signature type needs to also capture the types of methods,
it’s not easy to usefully use these types.

> 因为索引签名类型还需要捕获方法的类型，所以要有效地使用这些类型并不容易。

Generally it’s better to store indexed data in another place instead of on the
class instance itself.

> 通常最好将索引数据存储在另一个地方而不是类实例本身。

## Class Heritage

Like other languages with object-**oriented** features, classes in JavaScript can inherit from base classes.

> 与其他具有面向对象特性的语言一样，JavaScript 中的类可以从基类继承。

### `implements` Clauses

You can use an `implements` **clause** to check that a class satisfies a particular `interface`. 

> 您可以使用 implements 子句来检查类是否满足特定接口。

An error will be issued if a class fails to correctly implement it:

> 如果类未能正确实现它，将发出错误:

```tsx {12,13}
interface Pingable {
	ping(): void;
}

class Sonar implements Pingable {
	ping(): void {
		console.log('ping!');
	}
}

class Ball implements Pingable {
	// Class 'Ball' incorrectly implements interface 'Pingable'.
	//   Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
	pong(): void {
		console.log('pong!');
	}
}
```

Classes may also implement multiple interfaces, e.g. `class C implements A, B {`.

> 类也可以**implement**多个**interface**，例如：**class C implement A, B { }**

#### Cautions

It’s important to understand that an `implements` clause is only a check that the class can be treated as the interface type. 

> 重要的是要理解 implements 子句只是检查类是否可以被视为接口类型。

It doesn’t change the type of the class or its methods *at all*. 

> 它根本不会改变类的类型或其方法。

A common source of error is to assume that an `implements` clause will change the class type - it doesn’t!

> 一个常见的错误来源是假设 implements 子句将更改类类型——它不会！

```tsx
interface Checkable {
	check(name: string): boolean;
}

class NameCheck implements Checkable {
    // Parameter 'value' implicitly has an 'any' type.
	check(value): boolean {
		return value.toLocaleLowerCase() === 'ok';
	}
}
```

In this example, we perhaps expected that value’s type would be influenced by the name: string parameter of check. 

> 在这个例子中，我们可能期望 value 的类型会受到 name: string 参数的影响。

It is not - implements clauses don’t change how the class body is checked or its type inferred.

> 它不会 - implements 子句不会改变类主体的检查方式或其类型的推断方式。

Similarly, implementing an interface with an optional property doesn’t create that property:

>同样，实现带有可选属性的接口不会创建该属性：

```tsx {10}
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;
//Property 'y' does not exist on type 'C'.
```

### `extends` Clauses

Classes may `extend` from a base class.

> 类可以从基类扩展。 

A derived class has all the properties and methods of its base class, and also define additional members.

> 派生类具有其基类的所有属性和方法，还定义了额外的成员。

```tsx
class Animal {
	move() {
		console.log('Moving along!');
	}
}

class Dog extends Animal {
	woof(times: number) {
		for (let i = 0; i < times; i++) {
			console.log('woff!');
		}
	}
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(2);
```

#### Overriding Methods

A derived class can also override a base class field or property. 

> 派生类也可以覆盖基类的字段或属性。

You can use the `super.` syntax to access base class methods. 

> 你可以使用 `super.` 语法来访问基类的方法。

Note that because JavaScript classes are a simple lookup object, there is no notion of a “super field”.

> 注意，因为JavaScript的类是一个简单的查找对象，所以没有`super 字段`的概念。

TypeScript enforces that a derived class is always a subtype of its base class.

> TypeScript 强制派生类始终是其基类的子类型。

For example, here’s a legal way to override a method:

> 例如，这是一个覆盖方法的合法操作。

```tsx
class Base {
	greet() {
		console.log('Base!');
	}
}

class Derived extends Base {
	greet(name?: string): void {
		if (name === undefined) {
			super.greet();
		} else {
			console.log(`Derived! ${name}`);
		}
	}
}

const d = new Derived();
d.greet(); // Base!
d.greet('NoSugar'); // Derived! NoSugar
```

It’s important that a derived class follow its base class contract. 

> 派生类遵循其基类契约很重要。

Remember that it’s very common (and always legal!) to refer to a derived class instance through a base class reference:

> 请记住，通过基类引用来引用派生类实例是很常见的（而且总是合法的！）

```tsx
// Alias the derived instance through a base class reference.
const b: Base = d;
// No problem
b.greet();
```

What if `Derived` didn’t follow `Base`’s contract?

> 如果 Derived 不遵守 Base 的约定怎么办？

```tsx {10,11}
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // Make this parameter required
  greet(name: string) {
// Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
//   Type '(name: string) => void' is not assignable to type '() => void'.
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

If we compiled this code despite the error, this sample would then crash:

> 如果我们不顾错误地编译这段代码，那么这个示例就会崩溃：

```tsx
const b: Base = new Derived();
// Crashes because "name" will be undefined
b.greet();
```

#### Type-only Field Declarations

When `target >= ES2022` or [`useDefineForClassFields`](https://www.typescriptlang.org/tsconfig#useDefineForClassFields) is `true`, class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class. 

> 当 target >= ES2022 或 useDefineForClassFields 为真时，类字段在父类构造函数完成后初始化，覆盖父类设置的任何值。

This can be a problem when you only want to re-declare a more accurate type for an inherited field. 

> 当您只想为继承的字段重新声明更准确的类型时，这可能会成为问题。

To handle these cases, you can write `declare` to indicate to TypeScript that there should be no runtime effect for this field declaration.

> 要处理这些情况，您可以编写 declare 以向 TypeScript 指示此字段声明不应有运行时影响。

```tsx {17,18}
interface Animal {
	dateOfBirth: any;
}

interface Dog extends Animal {
	breed: any;
}

class AnimalHouse {
	resident: Animal;
	constructor(animal: Animal) {
		this.resident = animal;
	}
}

class DogHouse extends AnimalHouse {
    // Does not emit JavaScript code, only ensures the types are correct
	declare	resident: Dog;
	constructor(dog: Dog) {
		super(dog);
	}
}
```

#### Initialization Order

The order that JavaScript classes initialize can be surprising in some cases. Let’s consider this code:

> 在某些情况下，JavaScript 类初始化的顺序可能会令人惊讶。让我们考虑一下这段代码：

```tsx
class Base {
	name = 'base';
	constructor() {
		console.log('My name is', this.name);
	}
}

class Derived extends Base {
	name = 'derived';
}

// Prints 'base', not 'derived'.
const d = new Derived();
```

What happened here?

> 这段代码发生了什么？

The order of class initialization, as defined by JavaScript, is:

> JavaScript 定义的类初始化顺序是：

- The base class fields are initialized	    基类字段被初始化
- The base class constructor runs             基类构造函数运行
- The derived class fields are initialized   派生类字段被初始化
- The derived class constructor runs        派生类构造函数运行

This means that the base class constructor saw its own value for `name` during its own constructor, because the derived class field initializations hadn’t run yet.

> 这意味着基类构造函数在其自己的构造函数中看到了自己的 name 值，因为派生类字段初始化尚未运行。

#### Inheriting Built-in Types

> Note: If you don’t plan to inherit from built-in types like `Array`, `Error`, `Map`, etc. or your compilation target is explicitly set to `ES6`/`ES2015` or above, you may skip this section
> 注意：如果你不打算继承Array、Error、Map等内置类型，或者你的编译目标明确设置为ES6/ES2015或更高版本，你可以跳过本节

In ES2015, constructors which return an object implicitly substitute the value of `this` for any callers of `super(...)`. 

> 在 ES2015 中，返回对象的构造函数隐式地将 this 的值替换为 super(...) 的任何调用者。

It is necessary for generated constructor code to capture any potential return value of `super(...)` and replace it with `this`.

> 生成的构造函数代码有必要捕获 `super(...)` 的任何潜在返回值并将其替换为 `this`。

As a result, subclassing `Error`, `Array`, and others may no longer work as expected. 

> 因此，子类化 `Error`、`Array` 和其他类可能不再按预期工作。

This is due to the fact that constructor functions for `Error`, `Array`, and the like use ECMAScript 6’s `new.target` to adjust the prototype chain; 

>这是因为 `Error`、`Array` 等构造函数使用 ECMAScript 6 的 `new.target` 来调整原型链；

however, there is no way to ensure a value for `new.target` when invoking a constructor in ECMAScript 5. 

> 然而，在 ECMAScript 5 中调用构造函数时无法确保 new.target 的值。

Other downlevel compilers generally have the same limitation by default.

> 默认情况下，其他下层编译器通常具有相同的限制。

For a subclass like the following:

> 对于像下面这样的子类：

```tsx {11}
class MsgError extends Error {
	constructor(m: string) {
		super(m);
	}
	sayHello() {
		return 'hello ' + this.message;
	}
}

const error = new MsgError('error');
console.log(error instanceof MsgError); // false
error.sayHello(); // TypeError: error.sayHello is not a function
```

you may find that:

> 你可能会发现

- methods may be `undefined` on objects returned by constructing these subclasses, so calling `sayHello` will result in an error.

  > 构造这些子类返回的对象上的方法可能未定义，因此调用 sayHello 将导致错误。

- `instanceof` will be broken between instances of the subclass and their instances, so `(new MsgError()) instanceof MsgError` will return `false`.

  > instanceof 将在子类的实例及其实例之间中断，因此 (new MsgError()) instanceof MsgError 将返回 false。

As a recommendation, you can manually adjust the prototype immediately after any `super(...)` calls.

> 作为建议，您可以在任何 super(...) 调用后立即手动调整原型。

```tsx {6}
class MsgError extends Error {
	constructor(m: string) {
		super(m);

		// Set the prototype explicitly. 
        // Note: tsconfig.json >>> compilerOptions.target >= ES2015
		Object.setPrototypeOf(this, MsgError.prototype);
	}
	sayHello() {
		return 'hello ' + this.message;
	}
}

const error = new MsgError('error');
console.log(error instanceof MsgError); // true
error.sayHello(); // no error
```

However, any subclass of `MsgError` will have to manually set the prototype as well. 

>然而，MsgError 的任何子类也必须手动设置原型。

For runtimes that don’t support [`Object.setPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf), you may instead be able to use [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto).

> 对于不支持 Object.setPrototypeOf 的运行时，您可以改为使用 \_\_proto_\_。

Unfortunately, [these workarounds will not work on Internet Explorer 10 and prior](https://msdn.microsoft.com/en-us/library/s4esdbwz(v=vs.94).aspx). 

> 遗憾的是，这些解决方法不适用于 Internet Explorer 10 及更早版本。 

One can manually copy methods from the prototype onto the instance itself (i.e. `MsgError.prototype` onto `this`), but the prototype chain itself cannot be fixed.

> 可以手动将方法从原型复制到实例本身（即 MsgError.prototype 复制到实例本身），但原型链本身无法修复。

## Member Visibility

You can use TypeScript to control whether **certain** methods or properties are visible to code outside the class.

> 您可以使用 TypeScript 来控制某些方法或属性是否对类外部的代码可见。

### public

The default visibility of class members is `public`. A `public` member can be accessed anywhere:

> 类成员的默认可见性是公开的。`public` 成员可以在任何地方访问：

```tsx
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

Because `public` is already the default visibility modifier, you don’t ever *need* to write it on a class member, but might choose to do so for style/readability reasons.

> 因为 public 已经是默认的可见性修饰符，所以您永远不需要将它写在类成员上，但出于样式/可读性原因可能会选择这样做。

### protected

`protected` members are only visible to subclasses of the class they’re declared in.

> protected 成员只对声明它们的类和其子类可见。(实例无法获取)

```tsx {21}
class Greeter {
	public greet() {
		console.log('this.getName:', this.getName());
	}

	protected getName() {
		return 'hi';
	}
}

class SpecialGreeter extends Greeter {
	public howdy() {
		// OK to access protected member here
		console.log('special greeter', this.getName());
	}
}

const sg = new SpecialGreeter();
sg.greet(); // OK 
sg.getName(); // Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.
```

#### Exposure of `protected` members

Derived classes need to follow their base class contracts, but may choose to expose a subtype of base class with more capabilities. 

>派生类需要遵循它们的基类契约，但可以选择公开具有更多功能的基类的子类型。

This includes making `protected` members `public`:

>这包括让“protected”成员成为“public”：

```tsx {7}
class Base {
	protected name = 'base';
}

class Derived extends Base {
	// No modifier, so default is 'public'
	name = 'derived';
}
const d = new Derived();
console.log(d.name);

```

Note that `Derived` was already able to freely read and write `name`, so this doesn’t meaningfully alter the “security” of this situation. 

>请注意，`Derived` 已经能够自由读写 `name`，所以这并不能有效地改变这种情况的“安全性”。

这里主要要注意的是，在派生类中，如果这种暴露不是故意的，我们需要小心地重复 `protected` 修饰符。

The main thing to note here is that in the derived class, we need to be careful to repeat the `protected` modifier if this exposure isn’t intentional.

> 在派生类中需要注意的主要事情是，如果这次曝光不是有意的，我们需要小心地重复“protected”修饰符。

#### Cross-hierarchy `protected` access

Different OOP languages disagree about whether it’s legal to access a `protected` member through a base class reference:

> 不同的面向对象编程语言对于通过基类引用访问受保护成员是否合法存在分歧：

```tsx {12,13}
class Base {
	protected name = 'base';
}

class Derived1 extends Base {
	protected name = 'derived';
}
class Derived2 extends Base {
	f1(other: Derived2) {
		other.name = 'd2';
	}
	f2(other: Base) {
		other.name = 'd2';
        //Property 'name' is protected and only accessible through an instance of class 'Derived2'. This is an instance of class 'Base'.
	}
}
```

Java, for example, considers this to be legal. On the other hand, C# and C++ chose that this code should be illegal.

>例如，Java 认为这是合法的。 另一方面，C# 和 C++ 选择此代码应该是非法的。

TypeScript sides with C# and C++ here, because accessing `name` in `Derived2` should only be legal from `Derived2`’s subclasses, and `Derived1` isn’t one of them. 

> TypeScript 在这里支持 C# 和 C++，因为访问 Derived2 中的 name 应该只在 Derived2 的子类中是合法的，而 Derived1 不是其中之一。

Moreover, if accessing `name` through a `Derived1` reference is illegal (which it certainly should be!), then accessing it through a base class reference should never improve the situation.

> 此外，如果通过 `Derived1` 引用访问 `name` 是非法的（这当然应该是！），那么通过基类引用访问它永远不会改善这种情况。

See also [Why Can’t I Access A Protected Member From A Derived Class?](https://blogs.msdn.microsoft.com/ericlippert/2005/11/09/why-cant-i-access-a-protected-member-from-a-derived-class/) which explains more of C#‘s reasoning.

### private

`private` is like `protected`, but doesn’t allow access to the member even from subclasses:

> private 类似于 protected，但不允许从子类访问该成员：

```tsx {2,8}
class Base {
  private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
// Property 'x' is private and only accessible within class 'Base'.
```

```tsx {5}
class Derived extends Base {
  showX() {
    // Can't access in subclasses
    console.log(this.x);
// Property 'x' is private and only accessible within class 'Base'.
  }
}
```

Because `private` members aren’t visible to derived classes, a derived class can’t increase its visibility:

> 因为私有成员对派生类不可见，所以派生类不能增加其可见性：

```tsx {5,6}
class Base {
  private x = 0;
}
class Derived extends Base {
// Class 'Derived' incorrectly extends base class 'Base'.
//  Property 'x' is private in type 'Base' but not in type 'Derived'.
  x = 1;
}
```

#### Cross-instance `private` access

Different OOP languages disagree about whether different instances of the same class may access each others’ `private` members. 

> 不同的 OOP 语言对于同一类的不同实例是否可以访问彼此的私有成员存在分歧。 

While languages like **Java**, **C#**, **C++**, **Swift**, and **PHP** allow this, **Ruby** does not.

> 虽然 Java、C#、C、Swift 和 PHP 等语言允许这样做，但 Ruby 不允许。 

TypeScript does allow cross-instance `private` access:

> TypeScript 确实允许跨实例私有访问：

```tsx
class A {
  private x = 10;
 
  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

#### Caveats

Like other aspects of TypeScript’s type system, `private` and `protected` [are only enforced during type checking](https://www.typescriptlang.org/play?removeComments=true&target=99&ts=4.3.4#code/PTAEGMBsEMGddAEQPYHNQBMCmVoCcsEAHPASwDdoAXLUAM1K0gwQFdZSA7dAKWkoDK4MkSoByBAGJQJLAwAeAWABQIUH0HDSoiTLKUaoUggAW+DHorUsAOlABJcQlhUy4KpACeoLJzrI8cCwMGxU1ABVPIiwhESpMZEJQTmR4lxFQaQxWMm4IZABbIlIYKlJkTlDlXHgkNFAAbxVQTIAjfABrAEEC5FZOeIBeUAAGAG5mmSw8WAroSFIqb2GAIjMiIk8VieVJ8Ar01ncAgAoASkaAXxVr3dUwGoQAYWpMHBgCYn1rekZmNg4eUi0Vi2icoBWJCsNBWoA6WE8AHcAiEwmBgTEtDovtDaMZQLM6PEoQZbA5wSk0q5SO4vD4-AEghZoJwLGYEIRwNBoqAzFRwCZCFUIlFMXECdSiAhId8YZgclx0PsiiVqOVOAAaUAFLAsxWgKiC35MFigfC0FKgSAVVDTSyk+W5dB4fplHVVR6gF7xJrKFotEk-HXIRE9PoDUDDcaTAPTWaceaLZYQlmoPBbHYx-KcQ7HPDnK43FQqfY5+IMDDISPJLCIuqoc47UsuUCofAME3Vzi1r3URvF5QV5A2STtPDdXqunZDgDaYlHnTDrrEAF0dm28B3mDZg6HJwN1+2-hg57ulwNV2NQGoZbjYfNrYiENBwEFaojFiZQK08C-4fFKTVCozWfTgfFgLkeT5AUqiAA).

>与 TypeScript 类型系统的其他方面一样，private 和 protected 仅在类型检查期间强制执行。

This means that JavaScript runtime constructs like `in` or simple property lookup can still access a `private` or `protected` member:

>这意味着像 in 或简单的属性查找这样的 JavaScript 运行时构造仍然可以访问私有或受保护的成员：

```tsx
class MySafe {
  private secretKey = 12345;
}
```

```js
// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s.secretKey);
```

`private` also allows access using bracket notation during type checking. 

>private 还允许在类型检查期间使用括号表示法进行访问。

This makes `private`-declared fields potentially easier to access for things like unit tests, with the drawback that these fields are *soft private* and don’t strictly enforce privacy.

>这使得私有声明的字段可能更容易访问单元测试之类的东西，缺点是这些字段是软私有的并且不严格执行隐私。

```tsx
class MySafe {
  private secretKey = 12345;
}
 
const s = new MySafe();
 
// Not allowed during type checking
console.log(s.secretKey);
Property 'secretKey' is private and only accessible within class 'MySafe'.
 
// OK
console.log(s["secretKey"]);
```

Unlike TypeScripts’s `private`, JavaScript’s [private fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) (`#`) remain private after compilation and do not provide the previously mentioned escape hatches like bracket notation access, making them *hard private*.

> 与 TypeScripts 的私有字段不同，JavaScript 的私有字段 (#) 在编译后仍然是私有的，并且不提供前面提到的像括号表示法访问这样的逃生通道，使它们很难私有。

```tsx
class Dog {
  #barkAmount = 0;
  personality = "happy";
 
  constructor() {}
}
```
```tsx
"use strict";
class Dog {
    #barkAmount = 0;
    personality = "happy";
    constructor() { }
}
```
When compiling to ES2021 or less, TypeScript will use WeakMaps in place of #.

> 编译为 ES2021 或更低版本时，TypeScript 将使用 WeakMaps 代替 #。

```tsx
"use strict";
var _Dog_barkAmount;
class Dog {
    constructor() {
        _Dog_barkAmount.set(this, 0);
        this.personality = "happy";
    }
}
_Dog_barkAmount = new WeakMap();
```
If you need to protect values in your class from malicious actors, you should use mechanisms that offer hard runtime privacy, such as closures, WeakMaps, or private fields. 

>如果您需要保护您的类中的值免受恶意行为者的侵害，您应该使用提供硬性运行时隐私的机制，例如闭包、WeakMaps 或私有字段。

Note that these added privacy checks during runtime could affect performance.

>请注意，这些在运行时添加的隐私检查可能会影响性能。

## Static Members



### Special Static Names

### Why No Static Classes?



## `static` Blocks in Classes





## Generic Classes

### Type Parameters in Static Members



## `this` at Runtime in Classes

### Arrow Functions

### `this` parameters



## `this` Types

### `this`-based type guards



## Parameter Properties



## Class Expressions



## `abstract` Classes and Members

### Abstract Construct Signatures



## Relationships Between Classes
