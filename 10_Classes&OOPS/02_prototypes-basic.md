# JavaScript Prototypes — Easiest Way Possible

## The Core Idea
A **prototype** is just a fallback object JS checks when it can't find a property/method on the object itself — like asking your parent when you don't know something yourself.

Every JS object has a hidden link to another object (its "parent"). When you access a property:
1. JS first looks on the object itself (**own property**)
2. If not found, it walks up to the object's **prototype**
3. If still not found, it walks up to *that* prototype's prototype
4. ...and so on until it hits `null`

This chain of lookups is called the **prototype chain**.

```js
const animal = {
  eats: true,
  walk() {
    console.log("I can walk");
  }
};

const dog = {
  barks: true,
  __proto__: animal   // dog's "parent" is animal
};

console.log(dog.barks); // true → own property
console.log(dog.eats);  // true → found on prototype (animal)
dog.walk();             // "I can walk" → inherited method
```

`dog` doesn't actually *own* `eats` or `walk` — JS found them on `animal` because they weren't on `dog` directly.

---

## A Prototype Is Just a Normal Object
This is the key mental shift:

> **A prototype is not a special container/class. It's literally a regular JS object. It only "becomes a prototype" the moment some other object points to it via `__proto__`.**

```js
const animal = { eats: true }; // just a normal object
const dog = { __proto__: animal }; // now `animal` acts as dog's prototype
```

If nothing points to `animal`, it's not a "prototype" of anything — it's just an object sitting there. **"Prototype" describes a relationship/role, not a special type of thing.**

---

## Why This Matters — JS's Way of Doing "Inheritance"
Instead of copying the same methods onto every single object (wasteful), objects can **share** one prototype object that holds common methods.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Aman");
const p2 = new Person("Riya");

p1.greet(); // "Hi, I'm Aman"
p2.greet(); // "Hi, I'm Riya"
```

`greet` is defined **once**, on `Person.prototype` — not duplicated on every Person object. Both `p1` and `p2` share it through the prototype chain.

```js
console.log(p1.greet === p2.greet); // true — same function in memory
console.log(p1.hasOwnProperty('greet')); // false — it's inherited, not their own
```

---

## Real Example: Arrays Already Work This Way
```js
const arr = [1, 2, 3];
arr.push(4); // push isn't "on" arr — it's on Array.prototype
```

- `arr` only directly owns the data: `0:1, 1:2, 2:3, length:3`
- `Array.prototype` holds the shared **behavior**: `push()`, `map()`, `filter()`, `forEach()`, etc. — NOT data.

```js
console.log(arr.__proto__ === Array.prototype); // true
console.log(Object.keys(arr));                   // ['0','1','2'] — only own props
console.log(arr.hasOwnProperty('push'));          // false — inherited
console.log(Array.prototype.hasOwnProperty('push')); // true — lives here
```

### The chain doesn't stop at Array.prototype
```js
Array.prototype.__proto__ === Object.prototype // true
```

Full chain for any array:
```
arr  →  Array.prototype  →  Object.prototype  →  null
```
That's why arrays can also use `.toString()` or `.hasOwnProperty()` — those live one more step up, on `Object.prototype`.

**One-liner:** `Array.prototype` = the shared toolbox of methods every array gets access to, without each array carrying its own copy.

---

## Functions Are Objects Too — `function.prototype`
Every function automatically gets a `.prototype` property the moment it's created — an empty object by default:

```js
function dishDetails(name, price) {
  this.name = name;
  this.price = price;
}
```

This `dishDetails.prototype` object is **not** the prototype of `dishDetails` itself. It's the object that will become the prototype of every instance created using `new dishDetails(...)`.

```js
dishDetails.prototype.increment = function() {
  this.price++;
};
dishDetails.prototype.printDetail = function() {
  console.log(`Price of ${this.name} is ${this.price}`);
};
```

Now `dishDetails.prototype` looks like:
```js
{ increment: fn, printDetail: fn }
```
This is the shared toolbox — same concept as `Array.prototype`.

---

## What Actually Happens with `new`
```js
const paneer = new dishDetails("Paneer", 250);
```

`new` does **3 things automatically**:
1. Creates a brand new empty object `{}`
2. Links that object's `__proto__` to `dishDetails.prototype`
3. Runs the function with `this` = the new object, so `this.name` / `this.price` get set directly on it

Conceptually, `paneer` ends up looking like:
```js
paneer = {
  name: "Paneer",
  price: 250,
  __proto__: dishDetails.prototype   // ← the link
}
```

### Lookup when calling `paneer.printDetail()`
1. JS checks: does `paneer` have `printDetail` directly? → **No** (paneer only owns `name`, `price`)
2. JS walks up via `__proto__` → finds `printDetail` on `dishDetails.prototype` → runs it with `this` still bound to `paneer`

```js
console.log(biryani.printDetail === paneer.printDetail); // true — same shared function
console.log(paneer.hasOwnProperty('printDetail'));         // false — inherited
```

---

## Modern Ways to Set Up Prototypes (Real World Usage)

### 1. Classes with `extends` — most common in real projects (90% of codebases)
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log(`${this.name} is walking`);
  }
}

class Dog extends Animal {  // sets up prototype chain automatically
  bark() {
    console.log("woof!");
  }
}

const d = new Dog("Bruno");
d.walk(); // inherited from Animal via prototype chain
d.bark(); // own method
```
`extends` wires up the prototype chain under the hood — `Dog.prototype.__proto__ === Animal.prototype`. You get inheritance without manually touching `.prototype` at all. Classes don't replace prototypes, they're just cleaner syntax over the same mechanism.

### 2. `Object.create` — when you want pure prototype linking without classes
```js
const animal = {
  walk() { console.log("walking"); }
};

const dog = Object.create(animal); // dog.__proto__ === animal
dog.bark = function() { console.log("woof"); };

dog.walk(); // inherited
dog.bark(); // own
```
Used in functional/composition patterns where constructor functions or classes feel like overkill. Very explicit — you can clearly see what the prototype is.

### 3. `__proto__` in object literal — quick and simple
```js
const dog = {
  __proto__: animal,
  barks: true
};
```
Fine for quick scripting/prototyping but not commonly seen in large codebases.

### 4. `Object.setPrototypeOf` — avoid in real projects
```js
Object.setPrototypeOf(dog, animal); // changes prototype after object is created
```
This exists but is **discouraged** — changing the prototype of an already existing object kills JS engine performance. Engines optimize prototype chains at creation time; mutating them later breaks those optimizations. Only used in rare edge cases like runtime patching or meta-programming in library code. You'll almost never write this in a normal project.

### Real world ranking
| Method | When used |
|---|---|
| `class` + `extends` | Everyday code — most common |
| `Object.create` | Functional patterns, utility libs |
| `__proto__` in literals | Quick scripting/prototyping |
| `Object.setPrototypeOf` | Avoid — performance killer |

---

## Full Mental Model (One Sentence)
> **If JS can't find a property/method on the object itself, it looks at the object's prototype, and keeps going up the chain until it finds it or hits `null`.**

Everything else (`Object.create`, `__proto__` vs `.prototype`, `class extends`) is just different syntax for setting up this same chain.

---

## Quick Terms Cheat Sheet
| Term | Meaning |
|---|---|
| `__proto__` | The actual hidden link an object has to its prototype |
| `.prototype` | A property that exists ONLY on functions — becomes the `__proto__` of objects created with `new` |
| Prototype chain | The sequence of fallback objects JS walks through during lookup |
| Own property | A property that lives directly on the object itself (not inherited) |
| Inherited property | A property found further up the prototype chain |

```js
// quick way to check things yourself
Object.getPrototypeOf(paneer) === dishDetails.prototype; // true
paneer.hasOwnProperty('name');       // true (own)
paneer.hasOwnProperty('printDetail'); // false (inherited)
```

---
**Quick revision checklist:**
- [ ] Can you explain prototype chain lookup in one sentence?
- [ ] Do you know the difference between `__proto__` and `.prototype`?
- [ ] Can you trace what `new` does in 3 steps from memory?
- [ ] Do you understand why shared methods on `.prototype` save memory vs copying onto every instance?
- [ ] Can you explain the 4 modern ways to set up prototypes and when to use each?
- [ ] Do you know why `Object.setPrototypeOf` is discouraged in real projects?