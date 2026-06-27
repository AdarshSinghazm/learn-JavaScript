# How JavaScript Runs — Call Stack, Event Loop, Async

---

## 1. JavaScript is Single Threaded

JS can only do **one thing at a time**. One line runs, finishes, then the next line runs. This is called being single threaded.

---

## 2. The Call Stack

JS keeps track of what's running using a **call stack** — think of it as a stack of plates.

- Function gets called → added on top
- Function finishes → removed from top
- Whatever is on top is what's currently running

```js
console.log('one')
console.log('two')
console.log('three')
```

Output:
```
one
two
three
```

Simple. One thing at a time, top to bottom. This is **synchronous** code.

---

## 3. The Problem — Slow Tasks

What if something takes time — like fetching data from a server?

```js
const data = fetchData() // takes 3 seconds
console.log('done')      // has to wait 3 seconds
```

If JS just sat and waited — your entire page would freeze. No clicks, no scrolling. Nothing.

**That's the problem async solves.**

---

## 4. Synchronous vs Asynchronous

| | Synchronous | Asynchronous |
|---|---|---|
| What it means | Wait for each task to finish before moving on | Start the task, move on, come back when it's done |
| Example | Normal JS code | API calls, timers, file reads |
| Problem | Page freezes on slow tasks | No freezing |

---

## 5. How Async Actually Works — The Full Picture

When JS hits a slow task, it doesn't wait. It hands it off to the **Web API** (the browser handles it), and JS moves on immediately.

```
Your JS Code
     ↓
Call Stack — executes code line by line
     ↓
Slow task? → handed to Web API (browser waits, JS moves on)
                    ↓
             Web API finishes
                    ↓
             Callback goes into a Queue
                    ↓
             Event Loop checks — is the call stack empty?
                    ↓
             If yes → moves callback onto the call stack
                    ↓
             JS executes it
```

---

## 6. Web APIs — What the Browser Handles

Web APIs are tools the browser gives to JS. They're not part of JS itself — the browser runs them separately so JS doesn't have to wait.

- `setTimeout` / `setInterval` — timers
- `fetch()` — network requests
- `addEventListener` — DOM events
- `localStorage` — store data in browser
- `geolocation` — get user's location

JS doesn't wait. It registers the task with the browser and immediately moves to the next line.

---

## 7. setTimeout and setInterval

Both are Web APIs for running code after a delay. Handed to the browser — JS moves on immediately.

### `setTimeout` — run once after a delay

```js
setTimeout(function() {
    console.log('runs after 2 seconds')
}, 2000)  // delay in milliseconds
```

To cancel it before it fires:

```js
const id = setTimeout(function() {
    console.log('this will never run')
}, 3000)

clearTimeout(id)  // cancelled
```

### `setInterval` — run repeatedly every X ms

```js
const id = setInterval(function() {
    console.log('runs every second')
}, 1000)
```

To stop it:

```js
clearInterval(id)  // stops the interval
```

### Important — always store the ID

`setTimeout` and `setInterval` both return an ID. Store it in a variable — it's the only way to cancel them later.

```js
let intervalID  // store here

// start
intervalID = setInterval(changeColor, 1000)

// stop
clearInterval(intervalID)
intervalID = null  // reset so you can start again
```

Setting `intervalID = null` after clearing is important — it lets you check `if(!intervalID)` before starting again, so you don't accidentally run multiple intervals at once.

### Practical example — color cycling with HSL

```js
let hue = 0
let intervalID

const changeColor = function() {
    document.body.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
    hue = (hue + 10) % 360  // cycles 0→360 then resets smoothly
}

document.querySelector('#start').addEventListener('click', function() {
    if(!intervalID) {
        intervalID = setInterval(changeColor, 1000)
    }
})

document.querySelector('#stop').addEventListener('click', function() {
    clearInterval(intervalID)
    intervalID = null
})
```

HSL is the best color format for smooth cycling — hue just goes 0 to 360 and loops.

### setTimeout vs setInterval

| | `setTimeout` | `setInterval` |
|---|---|---|
| Runs | Once after delay | Repeatedly every X ms |
| Cancel with | `clearTimeout(id)` | `clearInterval(id)` |
| Use case | Delay an action | Repeat an action |

---

## 8. The Event Loop

The event loop has one job:

> **If the call stack is empty — take the next callback from the queue and put it on the stack.**

It's constantly checking:
- Is the stack empty?
- Is there anything waiting in the queue?
- If both yes → move it over

---

## 9. Seeing It in Action

```js
console.log('start')

setTimeout(function() {
    console.log('timeout')
}, 2000)

console.log('end')
```

Output:
```
start
end
timeout   ← appears after 2 seconds
```

Step by step:
1. `console.log('start')` → runs immediately
2. `setTimeout` → handed to browser, JS moves on
3. `console.log('end')` → runs immediately
4. 2 seconds later → browser says "done" → callback goes to queue
5. Event loop sees stack is empty → moves callback to stack
6. `console.log('timeout')` → runs

---

## 10. The Surprising One

```js
setTimeout(function() {
    console.log('timeout')
}, 0)   // 0ms delay

console.log('after')
```

Output:
```
after
timeout
```

Even with 0ms — `setTimeout` still goes through the browser → queue → event loop. So `console.log('after')` runs first because it's already on the stack.

**Async code never runs before synchronous code, even with 0 delay.**

---

## 11. Two Queues — Not One

There are actually two queues with different priorities:

| Queue | What goes in it | Priority |
|---|---|---|
| **Microtask Queue** | Promise callbacks | HIGH — always runs first |
| **Task Queue** | setTimeout, setInterval, DOM events | NORMAL — runs after microtasks |

The event loop always empties the **microtask queue completely** before touching the task queue.

```js
console.log('start')

setTimeout(function() {
    console.log('setTimeout')   // task queue
}, 0)

Promise.resolve().then(function() {
    console.log('promise')      // microtask queue
})

console.log('end')
```

Output:
```
start
end
promise      ← microtask runs first (high priority)
setTimeout   ← task queue runs after
```

---

## 12. Reading the Diagram

```
JS Engine
├── Memory Heap — where variables and functions are stored
└── Call Stack — where code actually executes

Web API (browser handles these)
├── DOM API
├── setTimeout / setInterval
└── fetch() → returns a Promise

Two Queues
├── Microtask Queue (pink, high priority) ← Promise callbacks go here
└── Task Queue (white, normal priority)   ← setTimeout callbacks go here

Event Loop
└── Constantly checks: stack empty? → move next item from queue to stack
```

- `fetch()` → Web API handles the network request → response comes back as a Promise → callback goes to **microtask queue** (high priority)
- `setTimeout` → Web API handles the timer → callback goes to **task queue** (normal priority)

---

## Quick Summary

| Concept | One line |
|---|---|
| Single threaded | JS does one thing at a time |
| Call stack | Tracks what's currently running |
| Synchronous | Wait for each line to finish |
| Asynchronous | Hand off slow tasks, move on, come back later |
| Web API | Browser handles slow tasks outside of JS |
| setTimeout | Run something once after a delay |
| setInterval | Run something repeatedly every X ms |
| clearTimeout / clearInterval | Cancel a timer using its ID |
| Task Queue | Where setTimeout/event callbacks wait |
| Microtask Queue | Where Promise callbacks wait — higher priority |
| Event Loop | Moves callbacks from queue to stack when stack is empty |