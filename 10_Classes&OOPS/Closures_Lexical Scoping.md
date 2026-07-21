# Closures and Lexical Scoping

## Lexical Scoping (quick revision)

Lexical scoping means: **a function's access to variables is decided by where it's *written* in the code, not by where/how it's called.**

```javascript
function outer() {
    let name = "Adarsh";

    function inner() {
        console.log(name); // works, because inner is written INSIDE outer
    }

    inner();
}

outer(); // "Adarsh"
```

`inner()` can see `name` only because it's physically nested inside `outer()`. JS looks at where a function is **defined** to decide what it can access — not who calls it or from where.

```javascript
function inner() {
    console.log(name); // ❌ ReferenceError
}

function outer() {
    let name = "Adarsh";
    inner();
}

outer();
```

Here `inner` is NOT written inside `outer`, so it can't see `name`, even though `outer` is the one calling it.

**One-liner:** scope is fixed at write-time based on nesting, not runtime.

---

## Closure — the actual new concept

A closure is what happens when a function **remembers** the variables from its outer scope, **even after the outer function has already finished running and is gone.**

### One sentence to remember

> A function does not forget the variables it was born next to — even after its parent function has already finished and left.

### Example

```javascript
function outer() {
    let count = 0;

    function inner() {
        count = count + 1;
        console.log(count);
    }

    return inner; // returning the function itself, not calling it
}

const myFunction = outer();

myFunction(); // 1
myFunction(); // 2
myFunction(); // 3
```

`outer()` already finished running. Normally `count` should be gone once a function returns. But it isn't — `inner` still remembers it, forever, because `inner` uses `count` inside its own body.

**Mental picture:** `outer()` is a factory that builds a robot (`inner`). Before the factory shuts down, it slips a note into the robot's pocket saying `count = 0`. The factory closes forever, but the robot still carries that note in its pocket — every time you press its button, it reads the note, updates it, and keeps it.

That pocket/backpack of remembered variables = **closure**.

---

## Real, practical use — private counter

```javascript
function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        }
    }
}

const counter1 = createCounter();
counter1.increment(); // 1
counter1.increment(); // 2
counter1.decrement(); // 1

const counter2 = createCounter();
counter2.increment(); // 1 — completely separate count, doesn't affect counter1
```

Each call to `createCounter()` creates a **new, private** `count`. `counter1` and `counter2` don't interfere with each other. Nobody outside can directly access or mess with `count` — only through `increment`/`decrement`. This is real data privacy in JS.

---

## Why this matters for React

This exact "backpack of remembered variables" idea is the foundation of how React's `useState` works internally.

```javascript
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>{count}</button>
    );
}
```

- Every time `Counter` re-renders, it's technically running the function again — but React uses closures internally to make sure `count` "remembers" its current value between renders, instead of resetting to `0` every time.
- `handleClick` is a closure — it "closes over" `count` and `setCount` from the render it was created in. This is also why you sometimes hear about "stale closures" in React — a `handleClick` created in an old render might remember an **old** value of `count`, if you're not careful with dependencies in `useEffect`/`useCallback`.
- Any time you see a function defined **inside** a component that uses a variable from that component's scope, that's a closure — this happens constantly in React (event handlers, `useEffect` callbacks, custom hooks all rely on this).

**Bottom line:** if closures feel shaky now, revisit this note once you start `useState`/`useEffect` in React — seeing it in action with real UI will make it click even more.

---

## Quick summary

- **Lexical scoping** = the rule deciding what a function can see, based on where it's *written*.
- **Closure** = the *result* of that rule — a function keeps access to its outer variables even after the outer function has finished executing.
- Closures let you create **private, persistent** data (like counters) that can only be touched through specific functions.
- Calling an outer function (like `greet("Rahul")`) just builds and returns the inner function — it does NOT execute the inner function. You must call the returned function separately for anything to actually happen.
- React's `useState` and event handlers rely on closures under the hood — this concept is not just theory, you'll use it constantly.