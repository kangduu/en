# Classes

TypeScript offers full support for the `class` keyword introduced in ES2015.

> TypeScript对ES2015中引入的' class '关键字提供了全面支持。

As with other JavaScript language features, TypeScript adds type annotations and other syntax to allow you to express relationships between classes and other types.

> 与其他JavaScript语言特性一样，TypeScript添加了类型注释和其他语法，允许你表达类和其他类型之间的关系。

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
	x:number
    y:number
}

const pt = new Point;
pt.x = 0;
pt.y = 0;
```

As with other locations, the type annotation is optional, but will be an implicit `any` if not specified.

> 与其他位置一样，类型注释是可选的，但如果未指定，则为隐式 any。

Fields can also have *initializers*; these will run automatically when the class is instantiated:

> 字段也可以有初始化器；这些将在实例化类时自动运行：

```tsx
class Point {
    x = 0;
    y = 0;
}

const pt = new Point();
console.log(pt.x, pt.y) // 0,0
```

Just like with `const`, `let`, and `var`, the initializer of a class property will be used to infer its type:

> 就像 const、let 和 var 一样，类属性的初始值设定项将用于推断其类型：

```tsx {4}
const pt = new Ponit();
pt.x = "0";

// Type 'string' is not assignable to type 'number'.
```

### `--strictPropertyInitialization`

The [`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization) setting controls whether class fields need to be initialized in the constructor.

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
    this.name = "hello";
  }
}
```

Note that the field needs to be initialized *in the constructor itself*. 

> 请注意，该字段需要在构造函数本身中进行初始化。 

TypeScript does not analyze methods you invoke from the constructor to detect initializations, because a derived class might override those methods and fail to initialize the members.

> TypeScript 不会分析您从构造函数调用的方法来检测初始化，因为派生类可能会覆盖这些方法并且无法初始化成员。

If you intend to definitely initialize a field through means other than the constructor (for example, maybe an external library is filling in part of your class for you), you can use the *definite assignment assertion operator*, `!`:

> 如果你打算通过构造函数以外的方式明确地初始化一个字段（例如，可能一个外部库正在为你填充你的类的一部分），你可以使用明确的赋值断言运算符，`!`

```tsx {3}
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}
```

## readonly

Fields may be prefixed with the `readonly` modifier. This prevents assignments to the field outside of the constructor.

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

Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads:

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

There are just a few differences between class constructor signatures and function signatures:

> 类构造函数签名和函数签名之间只有一些区别：

- Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later

  > 构造函数不能有类型参数 - 这些属于外部类声明，我们稍后会了解

- Constructors can’t have return type annotations - the class instance type is always what’s returned

  > 构造函数不能有返回类型注释——类实例类型总是返回的

### Super Calls

Just as in JavaScript, if you have a base class, you’ll need to call `super();` in your constructor body before using any `this.` members:

> 就像在 JavaScript 中一样，如果你有一个基类，你需要在你的构造函数体中调用 super()，然后再使用任何 `this.members`：

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

Forgetting to call `super` is an easy mistake to make in JavaScript, but TypeScript will tell you when it’s necessary.

>忘记调用 super 是 JavaScript 中很容易犯的错误，但 TypeScript 会在必要时告诉您。

## Methods

A function property on a class is called a *method*. Methods can use all the same type annotations as functions and constructors:

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

**Other than the standard type annotations, TypeScript doesn’t add anything else new to methods.**

> 除了标准的类型注释，TypeScript 没有向方法中添加任何其他新内容。

Note that inside a method body, it is still mandatory to access fields and other methods via `this.`.

> 请注意，在方法主体内部，仍然必须通过 this.. 访问字段和其他方法。

An unqualified name in a method body will always refer to something in the enclosing scope:

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

Classes can also have *accessors*:

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

>**Note that a field-backed get/set pair with no extra logic is very rarely useful in JavaScript. It’s fine to expose public fields if you don’t need to add additional logic during the get/set operations.**
>
>请注意，没有额外逻辑的字段支持的 get/set 对在 JavaScript 中很少有用。如果您不需要在 get/set 操作期间添加额外的逻辑，那么暴露公共字段很好。

TypeScript has some special inference rules for accessors:

> TypeScript 对访问器有一些特殊的推理规则：

- If `get` exists but no `set`, the property is automatically `readonly`

  > 如果 get 存在但没有 set，则该属性自动为 readonly

- If the type of the setter parameter is not specified, it is inferred from the return type of the getter

  > 如果未指定setter参数的类型，则根据getter的返回类型推断

- Getters and setters must have the same [Member Visibility](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)

Since [TypeScript 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/), it is possible to have accessors with different types for getting and setting.

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

Classes can declare index signatures; these work the same as [Index Signatures for other object types](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures):

> 类可以声明索引签名；这些与其他对象类型的索引签名一样工作：

```tsx
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
```

Because the index signature type needs to also capture the types of methods, it’s not easy to usefully use these types. 

> 因为索引签名类型还需要捕获方法的类型，所以要有效地使用这些类型并不容易。

Generally it’s better to store indexed data in another place instead of on the class instance itself.

> 通常最好将索引数据存储在另一个地方而不是类实例本身。

## Class Heritage