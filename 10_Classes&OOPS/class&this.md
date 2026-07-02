# JavaScript Notes: `this`, `call()`/`apply()`, and the `new` Keyword

## The Example Code

```javascript
function setUsername(username){
    this.username = username
}

function createUser(username, email, pass){
    setUsername.call(this, username)
    this.email = email
    this.pass = pass
}

const user = new createUser("Adarsh", "adarsh@google.com", 5066)
console.log(user)
```

---

## 1. The core problem: what does `this` mean?

`this` is **not** about where a function is *defined*. It's about **how a function is called**.

If you call a function plainly, with no object before the dot:

```javascript
setUsername(username)   // called with no object
```

Then inside `setUsername`, `this` refers to:
- The **global object** (`window` in browsers) — in normal (non-strict) mode
- `undefined` — in **strict mode**

This means `this.username = username` would actually create/modify `window.username`, **not** attach it to the user object you're trying to build. The variable `username` itself isn't "lost" — `this` is just pointing at the wrong object.

---

## 2. Why `.call(this, username)` fixes it

```javascript
setUsername.call(this, username)
```

`.call()` lets you **manually control what `this` means** for a function call.

- The first argument to `.call()` becomes `this` inside the called function.
- The remaining arguments are passed normally as function parameters.

Inside `createUser`, `this` already refers to the **new object being built** (see section 3 below). So `setUsername.call(this, username)` tells `setUsername`:

> "Run using the *same* `this` that `createUser` has — the new user object — not the global object."

---

## 3. Why `this` inside `createUser` is the new object

This is because of the **`new` keyword**. When you write:

```javascript
const user = new createUser("Adarsh", "adarsh@google.com", 5066)
```

`new` does four things automatically:

1. Creates a brand-new empty object `{}`
2. Sets `this` inside `createUser` to point to that new object
3. Links the new object's internal prototype to `createUser.prototype`
4. Runs the function body, then **automatically returns that object** (unless the function explicitly returns a different object itself)

So every line like `this.email = email` is really doing `newObject.email = email`.

---

## 4. Related concepts to know alongside this

| Method | What it does | When to use |
|---|---|---|
| `.call(thisArg, arg1, arg2, ...)` | Calls function immediately, `this` set manually, args passed one by one | When you want to run the function *right now* with a specific `this` |
| `.apply(thisArg, [arg1, arg2])` | Same as `.call()`, but arguments passed as an **array** | When your arguments are already in array form |

```javascript
// call
setUsername.call(this, "Adarsh")

// apply
setUsername.apply(this, ["Adarsh"])
```

### Arrow functions and `this`
Arrow functions **do not have their own `this`**. They inherit `this` from the surrounding (lexical) scope at the time they're defined — it never changes based on how they're called.

```javascript
const setUsername = (username) => {
    this.username = username   // 'this' here is NOT the calling object
}
```
If `setUsername` were written as an arrow function, `.call()`/`.apply()` would have **no effect** on its `this` — it would keep whatever `this` was in scope when it was created. This is why constructor-style helper functions like `setUsername` are usually written as regular functions, not arrow functions.

### Strict mode difference
```javascript
"use strict"
function setUsername(username){
    this.username = username   // 'this' is undefined here → throws an error
}
```
In non-strict mode, a bare `this` in a plain function call silently becomes `window`, which can cause hard-to-find bugs. In strict mode, it becomes `undefined`, so the mistake crashes loudly and is easier to catch.

---

## Quick Summary
- `this` depends on **how** a function is called, not where it's written.
- Plain call (`fn()`) → `this` is global object (or `undefined` in strict mode).
- `new Fn()` → creates new object, sets `this` to it, returns it automatically.
- `.call()` / `.apply()` → invoke immediately with a custom `this`.
- Arrow functions ignore all of the above — they always use the `this` from their surrounding scope.