# Object Oriented JavaScript

---

## 1. The Problem with Object Literals

You can create an object like this:

```js
const user = {
    username: 'Adarsh',
    email: 'adarsh@gmail.com',
    greetings: function() {
        console.log(`Welcome ${this.username}`)
    }
}
```

Problem — if you need 100 users, you write 100 object literals. Not scalable. That's where constructors come in.

---

## 2. Constructor Functions

A blueprint for creating multiple objects of the same type.

```js
function newUser(username, email, phNo) {
    this.username = username
    this.email = email
    this.phNo = phNo
    this.greetings = function() {
        console.log(`Welcome ${this.username}`)
    }
}

const userOne = new newUser('Adarsh', 'adarsh@gmail.com', 8689896848)
const userTwo = new newUser('Rishu', 'rishu@gmail.com', 7857875874)
```

### What `new` does automatically:
1. Creates a new empty object
2. Sets `this` to that new object
3. Runs the function
4. Returns `this` (the object) — no explicit return needed

### Important
Don't manually return a primitive (string, number) from a constructor — it does nothing. The `new` keyword always returns the object regardless.

---

## 3. `this` in Objects

`this` refers to the current object the function belongs to.

```js
const user = {
    username: 'Adarsh',
    greetings: function() {
        console.log(this.username) // 'Adarsh' — this = user object
    }
}
```

In a constructor function — `this` refers to the new object being created.

**Arrow function gotcha** — never use arrow functions as methods in objects/constructors. Arrow functions don't have their own `this`.

```js
// Wrong
this.greetings = () => {
    console.log(this.username) // undefined
}

// Correct
this.greetings = function() {
    console.log(this.username) // works
}
```

---

## 4. Classes — Cleaner Syntax for the Same Thing

Classes are just cleaner syntax on top of constructor functions. Under the hood JS still uses the same prototype system.

```js
class User {
    constructor(username, email, phNo) {
        this.username = username
        this.email = email
        this.phNo = phNo
    }

    greetings() {
        console.log(`Welcome ${this.username}`)
    }
}

const userOne = new User('Adarsh', 'adarsh@gmail.com', 8689896848)
const userTwo = new User('Rishu', 'rishu@gmail.com', 7857875874)

console.log(userOne)
userOne.greetings()
```

### Constructor function vs Class

| | Constructor Function | Class |
|---|---|---|
| Syntax | Old way | Modern way |
| `new` keyword | Required | Required |
| Methods | Inside function body | Outside constructor, inside class |
| Under the hood | Same — both use prototypes | Same — both use prototypes |

### Key difference — methods in classes go outside constructor

```js
class User {
    constructor(username) {
        this.username = username  // properties here
    }

    greetings() {               // methods here — NOT inside constructor
        console.log(this.username)
    }
}
```

Methods defined outside constructor are added to the **prototype** — shared across all instances. Methods inside constructor are recreated for every new object — wastes memory.

---

## Quick Reference

| Concept | One line |
|---|---|
| Object literal | Single object — not scalable |
| Constructor function | Blueprint using `function` + `new` |
| `new` keyword | Creates object, sets `this`, returns object automatically |
| `this` | Refers to the current object |
| Class | Cleaner syntax for constructor functions |
| `constructor()` | Runs automatically when `new` is used |
| Methods in class | Go outside constructor, inside class body |

---

## Status

### ✅ Covered
- Object literals
- Constructor functions
- `new` keyword
- `this` in objects
- Classes and constructor method

### ⏳ Up Next
- Prototype — how JS inheritance actually works under the hood