# Getters and Setters

Getters and setters are special functions that *look* like normal properties when you use them, but actually run code behind the scenes.

## The problem they solve

A normal property just holds a static value:

```javascript
const user = {
    firstName: "Adarsh",
    lastName: "Singh"
}

console.log(user.firstName); // "Adarsh"
```

But what if you want a property whose value is calculated, or needs to be validated before it's stored? That's what getters and setters are for.

## Getter — runs code when you *read* a property

```javascript
const user = {
    firstName: "Adarsh",
    lastName: "Singh",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

console.log(user.fullName); // "Adarsh Singh"
```

Even though `fullName` is a function under the hood, you access it like a plain property: `user.fullName`, **no parentheses**. Every time you read it, the function runs fresh and returns a value.

## Setter — runs code when you *write* to a property

```javascript
const user = {
    firstName: "Adarsh",
    lastName: "Singh",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
}

user.fullName = "Rahul Kumar"; // triggers the setter
console.log(user.firstName); // "Rahul"
console.log(user.lastName);  // "Kumar"
```

You write `user.fullName = "..."` like a normal assignment, but it secretly runs the setter function, which splits the string and updates `firstName`/`lastName`.

## Validation example — the classic use case

```javascript
const product = {
    _price: 100,
    get price() {
        return `₹${this._price}`;
    },
    set price(value) {
        if (value < 0) {
            console.log("Price can't be negative");
            return;
        }
        this._price = value;
    }
}

console.log(product.price); // ₹100
product.price = 250;
console.log(product.price); // ₹250
product.price = -50;        // rejected, logs "Price can't be negative"
console.log(product.price); // ₹250 (unchanged)
```

**Flow when you write `product.price = 250`:**

```
product.price = 250
        ↓
setter runs, value = 250
        ↓
check: value < 0 ? → no, so continue
        ↓
this._price = 250   ← the real value is stored here
```

`price` itself never holds a value directly — it's just a get/set pair controlling access to the real property, `_price`.

## The underscore convention

`_price` (with an underscore) is just a naming convention meaning "this is the internal/real value, don't touch it directly." You're expected to interact with it only through `price` (the getter/setter), not `_price` directly.

## Important gotcha — naming conflicts

**Never define a plain property and a getter/setter with the same name in one object.** Whichever is defined last wins and completely overwrites the other:

```javascript
// ❌ Wrong — the plain value is silently discarded
const product = {
    price: 200,           // this gets thrown away
    get price() {
        return `@${this._price}`;
    },
    set price(value) {
        this._price = value;
    }
}

console.log(product.price); // @undefined
// _price was never actually set, because "price: 200" got overwritten
// by the getter/setter pair before it ever reached "_price"
```

```javascript
// ✅ Correct — initialize the real storage variable directly
const product = {
    _price: 200,   // store the initial value under the real name
    get price() {
        return `@${this._price}`;
    },
    set price(value) {
        if (value < 0) return;
        this._price = value;
    }
}

console.log(product.price); // @200 ✅
```

## Read-only properties (getter with no setter)

If you only define a `get` and no `set`, the property becomes effectively read-only. Trying to assign to it does nothing (silently ignored in normal mode, throws an error in strict mode):

```javascript
const circle = {
    radius: 7,
    get diameter() {
        return this.radius * 2;
    }
}

circle.diameter = 100; // ignored — no setter exists
console.log(circle.diameter); // still 14
```

Think of `get`/`set` as two separate doors guarding a property:
- `get` = the door for **reading**
- `set` = the door for **writing**

If only the `get` door exists, writing just hits a wall — nothing happens, nothing breaks.

If a setter *did* exist, writing would actually trigger it:

```javascript
const circle = {
    radius: 7,
    get diameter() {
        return this.radius * 2;
    },
    set diameter(value) {
        this.radius = value / 2;
    }
}

circle.diameter = 100;
console.log(circle.diameter); // 100
console.log(circle.radius);   // 50 — updated by the setter
```

## Computed values with no storage at all

A getter doesn't always need a setter or a `_variable`. It can just calculate something fresh from other properties every time it's read:

```javascript
const rectangle = {
    width: 10,
    height: 5,
    get area() {
        return this.width * this.height;
    }
}

console.log(rectangle.area); // 50
```

No `_area` exists anywhere. If `width` changes later, `area` automatically reflects the new value — no manual updating needed.

## Works the same way in classes

```javascript
class Product {
    constructor(price) {
        this._price = price;
    }
    get price() {
        return `₹${this._price}`;
    }
    set price(value) {
        if (value < 0) return;
        this._price = value;
    }
}

const p = new Product(100);
p.price = 300;
console.log(p.price); // ₹300
```

Same exact concept as object literals — just written inside a class.

## Quick summary

- `get` runs a function when a property is **read**, `set` runs a function when a property is **written to**.
- Both are used like normal properties from the outside — no parentheses, no special syntax to call them.
- Common uses: validation before storing a value, computed/derived values, hiding internal complexity, making a property read-only.
- Real data is usually stored in a separate variable (commonly prefixed with `_`) — the getter/setter name itself holds no value.
- Never give a plain property and an accessor (get/set) the same name in one object — the one defined later wins and silently overwrites the other.