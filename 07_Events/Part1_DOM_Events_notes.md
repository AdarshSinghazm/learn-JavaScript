# DOM Events — Notes (Part 1)

Learned step by step, first with a small Avengers-themed click demo, then by building a To-Do app. Each section reflects something actually built and tested, not just theory.

---

## 1. Event Propagation — Capturing and Bubbling

When you click something on a page, the click doesn't just happen on that one element. It actually travels through the page in stages, like a signal passing through layers.

There are 3 stages:

1. **Capturing** — the event travels from the outermost part of the page (the `window`) **down** toward the element you clicked
2. **Target** — the event reaches the exact element you clicked
3. **Bubbling** — the event travels back **up** from that element toward the outer page

Most of the time, you only care about the bubbling stage, since that's the default behavior in JavaScript.

```js
document.getElementById('spiderMan').addEventListener('click', function (e) {
    console.log("SpiderMan arrived");
});

document.getElementById('avengers').addEventListener('click', function (e) {
    console.log('Avengers Assemble');
});
```

Here, `spiderMan` is an image inside the `avengers` list. Both listeners are  written the normal way, so both run during the **bubbling** stage.

**Click on Spider-Man → output:**
```
SpiderMan arrived
Avengers Assemble
```

It logs in this order because the click starts at the image itself, then bubbles up to the list around it. The inner element always gets a chance to react first.

`addEventListener` actually accepts a 3rd, optional setting that controls which stage a listener responds to:

| 3rd argument | Listener responds during |
|---|---|
| not given / `false` (normal, default) | Bubbling (bottom → top) |
| `true` | Capturing (top → bottom) |

If you set the outer list's listener to use `true`, it would respond *before* the inner image's listener even runs, because capturing happens first. This is rarely needed in everyday work, but it's good to know it exists.

---

## 2. Stopping an Event From Spreading — `stopPropagation()`

Sometimes you want a click to affect only the element it happened on, and nothing above it. `stopPropagation()` does exactly that — it stops the event from continuing to travel to parent elements.

```js
document.getElementById('loki').addEventListener('click', function (e) {
    e.stopPropagation();
    console.log("Loki click stopped here");
});
```

**Click on Loki → output:**
```
Loki click stopped here
```

Notice `"Avengers Assemble"` never logs. Normally, a click on Loki would bubble up and also trigger the list's listener — but `stopPropagation()` stops it from going any further.

**One important detail:** `stopPropagation()` can only stop something that hasn't happened yet. It cannot undo something that already ran before it. So if a parent listener is set to respond during the *capturing* stage (using `true`), it will already have run on the way down — before the click even reached the element where you call `stopPropagation()`.

---

## 3. Letting Go of the Browser's Default Behavior — `preventDefault()`

Some elements have built-in behavior. A link navigates to a new page. A form reloads the page on submit. `preventDefault()` tells the browser: "don't do that built-in thing this time."

```js
document.getElementById('google').addEventListener('click', function (e) {
    e.preventDefault();   // stops the link from opening google.com
    e.stopPropagation();  // also stops the click from reaching the list around it
    console.log('Google Clicked - navigation prevented');
});
```

**Click the Google link → result:**
- The page does **not** navigate to google.com
- The console logs `'Google Clicked - navigation prevented'`

These two methods solve two completely different problems, and it's easy to mix them up early on:

| Method | What it actually stops |
|---|---|
| `preventDefault()` | The browser's own built-in action (link navigating, form submitting) |
| `stopPropagation()` | The event traveling onward to other elements on the page |

You can use either one on its own, both together, or neither — depending on what you're trying to achieve.

---

## 4. What is an event?

The browser is constantly watching for things happening on the page — clicks, key presses, typing, scrolling — on every element, all the time. Most of the time nobody's listening, so nothing happens.

`addEventListener` is telling the browser: *"When THIS specific thing happens on THIS element, run THIS function."*

```js
button.addEventListener('click', function () {
    console.log('clicked');
});
```

- `button` → which element
- `'click'` → which kind of event
- `function(){...}` → the **handler** — what runs when it happens

**Mental model:** a doorbell. Press the button (event) → the bell rings → you (the listener) decide what to do.

---

## 5. The Event Object (`e`)

The browser doesn't just say "a click happened" — it hands you a detailed report about *what* happened. That report is the parameter (commonly named `e` or `event`).

```js
button.addEventListener('click', function (e) {
    console.log(e.target) // the exact element that triggered it
})
```

Two of the most-used members early on:

- **`e.target`** — the exact element that was interacted with. Critical when one listener handles many elements (delegation).
- **`e.preventDefault()`** — stops the browser's built-in default behavior for that event (e.g. a form reloading the page, a link navigating away).

---

## 6. Forms: `submit` vs `click` — a real gotcha

**The mistake:** listening for `click` on the submit *button* instead of `submit` on the *form*.

**Why it matters:** users can submit a form two ways — clicking the button, OR pressing Enter while focused in a field. If you only listen for the button's `click`, pressing Enter bypasses your logic entirely (and the page may reload, since nothing called `preventDefault()` on that path).

```js
// FRAGILE — misses the Enter-key path
btn.addEventListener('click', function(e) {
    e.preventDefault()
})

// ROBUST — catches every way the form can be submitted
form.addEventListener('submit', function(e) {
    e.preventDefault()
})
```

**Lesson:** listen for what the user is trying to *accomplish* ("submit this form"), not the one specific physical action they happened to take. Multiple physical paths can lead to the same intent — the right event type abstracts over all of them.

---

## 7. Event Delegation

**The problem:** if you have many similar dynamic elements (e.g. delete buttons in a to-do list), attaching a listener to each one individually doesn't scale and breaks for elements created later unless you remember to re-attach.

**The insight:** events bubble up from child to parent. So instead of N listeners on N children, put **ONE listener on the parent**, and use `e.target` to figure out which child was actually clicked.

```js
ul.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.closest('li').remove()
    }
})
```

**Why this matters in real projects:**
- One listener instead of hundreds/thousands → better performance
- Automatically covers elements added *later* — no need to re-attach anything, since the listener lives on a parent that already existed

### `.closest()` vs `.parentElement`

- `.parentElement` → goes up **exactly one level**, no matter what's there. Breaks if you ever add a wrapper element later (e.g. wrapping buttons in a `<div class="actions">`).
- `.closest(selector)` → walks **up however many levels needed** until it finds a match. Resilient to structural changes later.

**Rule of thumb:** prefer `.closest()` when delegating — it survives HTML restructuring that `.parentElement` would silently break under.

---

## 8. `classList` methods

| Method | What it does |
|---|---|
| `.add('x')` | Adds class `x` |
| `.remove('x')` | Removes class `x` |
| `.contains('x')` | Returns `true`/`false` — does the element have class `x`? |
| `.toggle('x')` | Adds `x` if missing, removes it if present |
| `.toggle('x', condition)` | **Forces** `x` on if condition is `true`, off if `false` — no if/else needed |

```js
// One-liner instead of writing if/else yourself
charCount.classList.toggle('maxChar', len > 50)
```

These four methods cover almost everything you'll ever need to do with classes in JavaScript — adding a highlight, removing it, checking if something is already active, or flipping it on/off based on a condition.

---

## 9. Identifying class vs. State class — an important separation

When a delegated button needs to represent two things — "what kind of button is this" AND "what state is something in" — **don't use the same class for both.**

```js
// Identifying class: NEVER changes. Used to recognize "this is a complete button" in delegation.
completeBtn.classList.add('completeBtn')

// State class: DOES change. Represents "is this todo done?"
span.classList.toggle('done')
```

**Why:** if you toggle the *identifying* class off, your delegation `if (e.target.classList.contains('completeBtn'))` check stops recognizing the button at all — clicking it again silently does nothing, with no error.

This pattern (constant identifying class + separate toggled state class) shows up constantly in real UI work: tabs, accordions, modals, active nav links.

---

## 10. State drives UI, not the reverse

**The mistake:** deciding what to show next by reading the *current displayed text*:

```js
// Fragile — breaks if the button text ever changes (e.g. adding an icon)
if (e.target.innerHTML === 'Complete') {
    e.target.innerHTML = 'Undo'
}
```

**The fix:** check the actual state you're tracking (a class), and let the UI text follow from it:

```js
// Robust — UI is a reflection of state, not a thing you inspect to infer state
span.classList.toggle('done')
e.target.innerHTML = span.classList.contains('done') ? 'Undo' : 'Complete'
```

**Lesson:** don't ask the UI what state it's in by reading its text/appearance — ask your actual state (usually a class or variable) and let the UI update *from* that. This is the core idea behind how frameworks like React think about UI.

---

## 11. CSS selector syntax — a quick refresher

This isn't a JavaScript topic exactly, but it matters a lot when using `querySelector` and writing CSS rules, since both use the same selector syntax.

| Selector | Meaning |
|---|---|
| `span` | tag named `<span>` |
| `.foo` | element with class `foo` |
| `#foo` | element with id `foo` |
| `span.foo` (no space) | a `<span>` that ALSO has class `foo` — same element, both conditions |
| `span .foo` (with space) | any `.foo` element **inside** a `<span>` — two different elements, nested |

**Good habit:** selector mistakes don't throw errors — they just quietly match nothing. If something isn't working and there's no error in the console, check whether the selector is actually finding the right element (e.g. `console.log(document.querySelector(...))` and see if it returns `null`).

---

## 12. `input` vs `change` events

| Event | Fires when |
|---|---|
| `input` | Immediately, on every single change to the value — every keystroke, paste, autocomplete |
| `change` | Only when the value is **committed** — typically when the field loses focus after being changed |

**Real use case for `input`:** live character counters, live search-as-you-type, instant validation feedback.
**Real use case for `change`:** a `<select>` dropdown — you usually only care about the final choice, not every hover.

```js
inputField.addEventListener('input', function (e) {
    let len = e.target.value.length
    charCount.innerHTML = `${len}/50 characters`
    charCount.classList.toggle('maxChar', len > 50)
})
```

---

## Quick Reference — Methods & Properties Covered So Far

| Name | Type | Notes |
|---|---|---|
| `addEventListener(type, fn)` | Method | Attaches a handler for an event type |
| Capturing / Bubbling | Concept | Two directions an event travels through the page; bubbling (bottom→top) is the default |
| `e.stopPropagation()` | Method | Stops the event from reaching other elements above it |
| `e.preventDefault()` | Method | Stops the browser's default action (link navigation, form reload) |
| `e.target` | Property | The exact element that triggered the event |
| `.closest(selector)` | Method | Walks up ancestors until a match is found |
| `.parentElement` | Property | Goes up exactly one level (fragile to structure changes) |
| `classList.add/remove/contains/toggle` | Methods | Class manipulation; `toggle(class, condition)` forces on/off |
| `input` event | Event type | Fires on every value change (keystroke-level) |
| `change` event | Event type | Fires when value is committed (usually on blur) |

---

## Status Check — What's Done, What's Left

### ✅ Completed (read AND practiced/tested)

- [x] Event propagation — capturing vs bubbling
- [x] `stopPropagation()`
- [x] `preventDefault()`
- [x] What is an event — `addEventListener` basics
- [x] The event object — `e.target`
- [x] Forms — `submit` vs `click` gotcha
- [x] Event delegation — one listener on a parent
- [x] `.closest()` vs `.parentElement`
- [x] `classList` methods — `add`, `remove`, `contains`, `toggle` (incl. 2-argument force version)
- [x] Identifying class vs. state class separation
- [x] State drives UI, not the reverse
- [x] CSS selector syntax refresher
- [x] `input` vs `change` events (live character counter)

### ⏳ Not yet covered — Part 2

- [ ] Hover events — `mouseenter`/`mouseleave` vs `mouseover`/`mouseout` (Task 7 — pending)
- [ ] `removeEventListener()` and the anonymous-function gotcha
- [ ] `addEventListener` options object: `{ once: true, passive: true }`
- [ ] Keyboard events in practice: `keydown`/`keyup`, Enter-to-submit, Escape-to-cancel
- [ ] Debouncing input events (search boxes, autosave)
- [ ] `focus`/`blur` vs `focusin`/`focusout`
- [ ] Window/document events: `DOMContentLoaded` vs `load`, `resize`, `scroll`
- [ ] Custom events: `CustomEvent` + `dispatchEvent()`
- [ ] `this` vs `e.currentTarget` vs `e.target` (arrow function gotcha)
- [ ] Combined project: editable to-dos, live filtered search, reactive "items remaining" counter

### 📌 Reference only — pick up as-needed in real projects, not part of core path

- [ ] Drag and drop events (`dragstart`, `dragover`, `drop`)
- [ ] Touch events (`touchstart`, `touchmove`, `touchend`)
- [ ] Pointer events (unified mouse/touch/stylus model)
- [ ] Animation/transition events (`transitionend`, `animationend`)
- [ ] `online`/`offline`, `visibilitychange`
- [ ] Throttling (rate-limiting) vs debouncing (delay-until-pause)