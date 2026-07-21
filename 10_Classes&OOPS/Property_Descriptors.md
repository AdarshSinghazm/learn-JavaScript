# Property Descriptors

Every property on an object isn't just a "key: value" pair. JS also stores some hidden settings for it called a **descriptor**. You can see these with `Object.getOwnPropertyDescriptor()`.

```javascript
console.log(Math.PI)
// 3.141592653589793

const descriptor = Object.getOwnPropertyDescriptor(Math, 'PI')
console.log(descriptor);

// {
//   value: 3.141592653589793,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## The 4 flags

Every property descriptor has these 4 things:

| Flag | Meaning |
|---|---|
| `value` | the actual value stored |
| `writable` | can you change the value? (`chai.name = "x"` works or not) |
| `enumerable` | does it show up in loops like `for...in` or `Object.keys()` / `Object.entries()`? |
| `configurable` | can you delete the property, or change its descriptor again later? |

`Math.PI` has all 3 flags `false` — that's why you can't overwrite it, loop over it, or delete it. It's basically locked.

By default, when you create a property normally (like inside an object literal), all 3 flags are `true`.

```javascript
const chai = {
    "name": "kadak chai",
    "price": 200,
    "chaistore": function(){
        console.log("Avl");   
    }
}

console.log(Object.getOwnPropertyDescriptor(chai, "name"));
// {
//   value: 'kadak chai',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

## Changing the descriptor with `Object.defineProperty()`

You can manually lock down or change these flags using `Object.defineProperty(obj, key, {options})`.

```javascript
Object.defineProperty(chai, "name", {
  enumerable: false, // this property won't show up in loops now
})

console.log(Object.getOwnPropertyDescriptor(chai, "name"));
// {
//   value: 'kadak chai',
//   writable: true,
//   enumerable: false,   <-- changed
//   configurable: true
// }
```

Note: `defineProperty` only changes the flags you mention — the rest stay as they were. It doesn't reset everything to default.

## Why the loop skips "name" now

```javascript
for (let [key, value] of Object.entries(chai)) {
    if (typeof value != "function") console.log(`${key}:${value}`);
}

// output: price:200
// "name" is missing even though it still exists on the object!
```

`Object.entries(obj)` only picks up properties where `enumerable` is `true`. Since we set `name`'s `enumerable` to `false`, it's now invisible to:
- `for...in`
- `Object.keys()`
- `Object.entries()`
- `Object.values()`
- `JSON.stringify()`

But `chai.name` still works fine if you access it directly — it's just hidden from loops, not deleted.

## What the `[key, value]` part is doing

`Object.entries(chai)` returns an array of `[key, value]` pairs, like:
```javascript
[["name", "kadak chai"], ["price", 200], ["chaistore", function]]
```
The `for...of` loop then destructures each pair directly into `key` and `value` — that's why you can write `[key, value]` instead of `entry` and then `entry[0]`, `entry[1]`.

## Quick summary

- Descriptors control **how** a property behaves, not just its value.
- 4 flags: `value`, `writable`, `enumerable`, `configurable`.
- Object literal properties default to `true` for all 3 boolean flags.
- `Object.defineProperty()` lets you change one or more flags without touching the others.
- `enumerable: false` = hidden from loops/`Object.keys`/`JSON.stringify`, but still directly accessible.
- This is exactly how JS hides its own built-in properties (like `Math.PI`) from your everyday loops.