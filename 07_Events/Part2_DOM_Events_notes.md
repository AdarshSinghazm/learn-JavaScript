# DOM Events — Notes (Part 2)

Continued from Part 1. Everything here was learned step by step on the same To-Do app built in Part 1. Each section reflects something actually built and tested, not just theory.

---

## 1. `this` vs `e.currentTarget` vs `e.target`

Three things that  all sound like "the element" but mean very different things.

```js
ul.addEventListener('click', function(e) {
    console.log(e.target)         // the exact thing clicked — could be a button, span, anything inside
    console.log(e.currentTarget)  // always the element the listener is ATTACHED to (ul)
    console.log(this)             // same as e.currentTarget — the element with the listener
})
```

In the todo app — when the Delete button is clicked:
- `e.target` → the Delete button
- `e.currentTarget` → the `ul` (where the listener lives)
- `this` → also the `ul`

### The arrow function gotcha

`this` breaks if you use an arrow function:

```js
// Arrow function — this is WRONG
ul.addEventListener('click', (e) => {
    console.log(this) // undefined or window, NOT ul
})

// Regular function — this works
ul.addEventListener('click', function(e) {
    console.log(this) // ul ✅
})
```

Arrow functions don't have their own `this` — they inherit it from wherever they were written. Regular functions get `this` set by the browser to the element the listener is on.

**Rule: always use regular functions in event listeners if you ever need `this`.**

### Quick practical rule

| You want... | Use |
|---|---|
| What was actually clicked | `e.target` |
| The element the listener is on | `e.currentTarget` or `this` (regular fn only) |
| Arrow function `this` | Don't — it won't be what you expect |

**Real world use:** `e.target` is what you use 90% of the time, especially in delegation. `e.currentTarget`/`this` is useful when you need to reference the parent container itself inside the handler.

---

## 2. `removeEventListener()` and the Anonymous Function Gotcha

`addEventListener` turns listening ON. `removeEventListener` turns it OFF — the browser stops reacting to that event on that element.

```js
function handleClick() {
    console.log('clicked')
}

btn.addEventListener('click', handleClick)    // start listening
btn.removeEventListener('click', handleClick) // stop listening
```

### The gotcha — anonymous functions can't be removed

```js
// This does NOT work
btn.addEventListener('click', function() { console.log('clicked') })
btn.removeEventListener('click', function() { console.log('clicked') })
```

These look identical but JS compares functions by **reference**, not content. Two anonymous functions written separately are two different objects in memory — like two xerox copies of the same document. `removeEventListener` is looking for the original, you're handing it a copy.

**The fix — always use a named function if you need to remove it later:**

```js
function handleClick() {
    console.log('clicked')
}

btn.addEventListener('click', handleClick)    // attach the original
btn.removeEventListener('click', handleClick) // remove THE SAME original ✅
```

### When you actually need this

- Modal opens → start listening for Escape key → modal closes → stop listening
- Game starts → listen for arrow keys → game ends → stop listening
- Limit reached → stop a button from working

**Most of the time you don't need it at all.** The entire todo app never needs `removeEventListener`. Know it exists, use a named function when you do need it.

---

## 3. `addEventListener` Options — `{ once: true }` and `{ passive: true }`

`addEventListener` accepts an options object as the 3rd argument instead of just `true`/`false`:

```js
element.addEventListener('click', handler, { once: true, passive: true })
```

### `once: true`

Runs the handler exactly one time, then automatically removes itself. No manual `removeEventListener` needed.

```js
add.addEventListener('click', function() {
    console.log('this fires only once, ever')
}, { once: true })
```

**Real world uses:**
- Welcome tip that shows only on first interaction
- "Click anywhere to continue" intro screen
- Confirmation dialog that should only trigger once

### `passive: true`

For scroll and touch events — the browser normally waits to see if you called `preventDefault()` before it scrolls, causing slight lag. `passive: true` tells the browser: *"I won't call preventDefault() here, so don't wait — just scroll immediately."*

```js
window.addEventListener('scroll', function() {
    // navbar update, progress bar, etc.
}, { passive: true })
```

**Rule: add `{ passive: true }` on `scroll`, `touchstart`, `touchmove` events. Never on `click`.**

| Option | What it does | When to use |
|---|---|---|
| `{ once: true }` | Handler runs once then auto-removes | Modals, onboarding, first-click actions |
| `{ passive: true }` | Tells browser you won't preventDefault | Scroll and touch handlers — for performance |

---

## 4. Keyboard Events — `keydown` / `keyup`

| Event | Fires when |
|---|---|
| `keydown` | Key is pressed down |
| `keyup` | Key is released |

Use `keydown` 99% of the time — it feels instant. `keyup` feels slightly delayed since you have to release the key first.

### `e.key` — which key was pressed

```js
document.addEventListener('keydown', function(e) {
    console.log(e.key) // "Enter", "Escape", "a", "1", "ArrowUp" etc.
})
```

### Practical use — Enter to add, Escape to clear (todo app)

```js
inputFeild.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        add.click() // simulates clicking the add button — reuses existing logic
    }
    if(e.key === 'Escape') {
        inputFeild.value = ''
        charCount.innerHTML = '0/50 characters'
        charCount.classList.remove('maxChar')
    }
})
```

**Why `add.click()` instead of rewriting the logic?** Because the add button already has all the logic. Triggering `.click()` on it reuses everything without duplication.

### Common keys you'll actually use

| Key | Common use |
|---|---|
| `Enter` | Submit form, add item, send message |
| `Escape` | Close modal, cancel action, clear input |
| `ArrowUp` / `ArrowDown` | Navigate dropdown options |

---

## 5. `focus` / `blur` vs `focusin` / `focusout`

**Focus** = an input field is active (cursor inside it). **Blur** = it lost focus (clicked somewhere else).

| Event | Fires when | Bubbles? |
|---|---|---|
| `focus` | Element gains focus | ❌ No |
| `blur` | Element loses focus | ❌ No |
| `focusin` | Element gains focus | ✅ Yes |
| `focusout` | Element loses focus | ✅ Yes |

### Practical use — input validation on blur (todo app)

```js
inputFeild.addEventListener('focus', function() {
    inputFeild.style.outline = '2px solid blue'
})

inputFeild.addEventListener('blur', function() {
    if(inputFeild.value.trim() === '') {
        inputFeild.style.outline = '2px solid red'
    } else {
        inputFeild.style.outline = '2px solid green'
    }
})
```

Click the input → blue border. Click away → red if empty, green if filled. You see this on every signup form.

### When to use `focusin` / `focusout`

Only when you have multiple inputs inside a container and want one delegated listener on the parent:

```js
// One listener handles all inputs inside the form
form.addEventListener('focusin', function(e) {
    e.target.style.outline = '2px solid blue'
})

form.addEventListener('focusout', function(e) {
    e.target.style.outline = 'none'
})
```

**Rule:** single input → `focus`/`blur` directly on it. Multiple inputs → `focusin`/`focusout` on the parent with delegation.

---

## 6. Debouncing

### The problem

An `input` event fires on every single keystroke. Fine for a character counter — but if you're calling an API (e.g. search suggestions), that's one API call per keystroke. Someone typing "javascript" = 10 API calls. Wasteful.

### What debouncing does

Wait until the user **stops typing** for X milliseconds, then fire. Instead of 10 calls, you get 1 — after they pause.

```js
let timer

inputFeild.addEventListener('input', function(e) {
    clearTimeout(timer)           // cancel the previous timer on every keystroke
    timer = setTimeout(function() {
        // only runs after user stops typing for 500ms
        console.log('search for:', e.target.value)
    }, 500)
})
```

**What's happening:** every keystroke cancels the previous timer and starts a new one. Only the last timer (when the user stops) ever completes.

### Practical use — suggestion text (todo app)

```js
let timer

inputFeild.addEventListener('input', function(e) {
    suggestion.innerHTML = ''   // clear immediately on each keystroke

    clearTimeout(timer)
    timer = setTimeout(function() {
        if(e.target.value.trim() !== '') {
            suggestion.innerHTML = `Add "${e.target.value}" as a todo?`
        }
    }, 500)
})
```

Type something → suggestion appears after you pause. Keep typing → suggestion disappears and waits again.

### Common delays by use case

| Use case | Delay |
|---|---|
| Search suggestions | 300–500ms |
| Autosave a form | 1000–2000ms |
| Live username availability check | 500ms |

**One line to remember:** debouncing = wait until user stops doing something, then react. Pattern is always `clearTimeout` + `setTimeout`.

---

## 7. Window / Document Events

### `DOMContentLoaded` vs `load`

| Event | Fires when |
|---|---|
| `DOMContentLoaded` | HTML is fully parsed — DOM is ready |
| `load` | Everything loaded — HTML, images, CSS, fonts |

```js
document.addEventListener('DOMContentLoaded', function() {
    // safe to select elements and run JS
})

window.addEventListener('load', function() {
    // everything including images is loaded
})
```

**Use `DOMContentLoaded` 99% of the time.** `load` waits for images too — slower and rarely needed.

**Why this matters:** if your `<script>` tag is in `<head>` instead of bottom of `<body>`, the DOM doesn't exist yet when JS runs — `querySelector` returns `null`. Wrapping everything in `DOMContentLoaded` fixes this. Scripts at the bottom of `<body>` don't need it, but wrapping in `DOMContentLoaded` is a safe habit anyway.

### `resize`

Fires when the browser window is resized.

```js
window.addEventListener('resize', function() {
    console.log(window.innerWidth, window.innerHeight)
}, { passive: true })
```

**Real world use — responsive behavior CSS can't handle alone:**

```js
window.addEventListener('resize', function() {
    if(window.innerWidth < 768) {
        // mobile adjustments
    }
}, { passive: true })
```

### `scroll`

Fires when user scrolls. `window.scrollY` = how many px scrolled from the top.

```js
window.addEventListener('scroll', function() {
    if(window.scrollY > 50) {
        navbar.classList.add('shrink')
    } else {
        navbar.classList.remove('shrink')
    }
}, { passive: true })
```

JS adds/removes the class. CSS handles what `shrink` actually looks like:

```css
nav { height: 80px; transition: all 0.3s ease; }
nav.shrink { height: 40px; background: black; }
```

JS toggles the class → CSS handles the visual. Always add `{ passive: true }` on scroll.

| Event | Use |
|---|---|
| `DOMContentLoaded` | Safe starting point for all your JS |
| `resize` | Responsive JS behavior |
| `scroll` | Navbar effects, progress bars, lazy loading |

---

## 8. Custom Events

Built-in events are `click`, `keydown`, `scroll`. Custom events are events **you create and fire yourself** — useful when multiple parts of your code need to react to the same thing without being directly connected.

### Create and fire:

```js
const event = new CustomEvent('todoAdded', {
    detail: { text: 'Buy milk' }  // any data you want to pass along
})

document.dispatchEvent(event)  // fire it
```

### Listen for it:

```js
document.addEventListener('todoAdded', function(e) {
    console.log('new todo:', e.detail.text)
})
```

### In the todo app:

```js
function addTodo() {
    // ...add the todo to DOM...

    const event = new CustomEvent('todoAdded', {
        detail: { text: inputFeild.value }
    })
    document.dispatchEvent(event)
}

document.addEventListener('todoAdded', function(e) {
    console.log(`"${e.detail.text}" was added`)
})
```

**Honest note:** custom events are more of an architecture pattern used in larger projects where different parts of code need to communicate without directly calling each other. At this stage, just know the syntax. You'll appreciate it more when projects get bigger.

---

## Quick Reference — Part 2

| Name | Type | Notes |
|---|---|---|
| `e.target` | Property | Exact element clicked |
| `e.currentTarget` / `this` | Property | Element the listener is attached to (regular fn only for `this`) |
| `removeEventListener(type, fn)` | Method | Stops listening — needs named function reference |
| `{ once: true }` | Option | Handler fires once then auto-removes |
| `{ passive: true }` | Option | Scroll/touch performance hint to browser |
| `e.key` | Property | Which key was pressed — `"Enter"`, `"Escape"`, etc. |
| `keydown` | Event | Key pressed — use this over `keyup` for responsiveness |
| `focus` / `blur` | Events | Gain/lose focus — don't bubble, attach directly |
| `focusin` / `focusout` | Events | Gain/lose focus — bubble, use for delegation |
| `DOMContentLoaded` | Event | DOM ready — safe to query elements |
| `window.scrollY` | Property | Pixels scrolled from top |
| `new CustomEvent(name, {detail})` | Constructor | Creates a custom event with optional data |
| `element.dispatchEvent(event)` | Method | Fires a custom event |
| `clearTimeout` + `setTimeout` | Pattern | Debouncing — wait until user stops, then react |

---

## Status Check

### ✅ Completed Part 2

- [x] `this` vs `e.currentTarget` vs `e.target` — arrow function gotcha
- [x] `removeEventListener()` — named function requirement
- [x] `{ once: true }` and `{ passive: true }` options
- [x] Keyboard events — `keydown`/`keyup`, `e.key`, Enter + Escape patterns
- [x] `focus`/`blur` vs `focusin`/`focusout` — bubbling difference
- [x] Debouncing — `clearTimeout` + `setTimeout` pattern
- [x] Window/document events — `DOMContentLoaded`, `resize`, `scroll`
- [x] Custom events — `CustomEvent` + `dispatchEvent`
- [x] Combined project — upgraded todo app with all Part 2 concepts

### 📌 Reference only — pick up as-needed, not part of core path

- [ ] Drag and drop events (`dragstart`, `dragover`, `drop`)
- [ ] Touch events (`touchstart`, `touchmove`, `touchend`)
- [ ] Pointer events (unified mouse/touch/stylus model)
- [ ] Animation/transition events (`transitionend`, `animationend`)
- [ ] `online`/`offline`, `visibilitychange`
- [ ] Throttling (rate-limiting) vs debouncing (delay-until-pause)
- [ ] Hover events — `mouseenter`/`mouseleave` vs `mouseover`/`mouseout`

### ⏳ Up Next

- [ ] Async JavaScript — callbacks, promises, async/await
- [ ] API requests — `fetch`, handling responses, error handling
- [ ] V8 engine — how JS actually runs (call stack, event loop, task queue)