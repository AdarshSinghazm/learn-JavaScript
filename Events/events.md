# JavaScript DOM Events — Notes

Companion notes for `event-practice.html`. Structured to match the code, in the order things are demonstrated.

---

## 1. Event Propagation Basics (Bubbling)

```js
document.getElementById('spiderMan').addEventListener('click', function (e) {
    console.log("SpiderMan arrived");
});

document.getElementById('avengers').addEventListener('click', function (e) {
    console.log('Avengers Assemble');
});
```

Both listeners use the default (no 3rd argument), which means **bubbling**.

There are 3 phases when an event fires on a nested element:

1. **Capturing phase** — event travels top → bottom (window → document → ... → target)
2. **Target phase** — event reaches the actual clicked element
3. **Bubbling phase** — event travels bottom → top (target → ... → document)

The 3rd argument of `addEventListener(type, listener, useCapture)` controls when a listener fires:

| 3rd argument | Fires during |
|---|---|
| `false` (default) | Bubbling phase |
| `true` | Capturing phase |

**Click Spider-Man → console output:**
```
SpiderMan arrived
Avengers Assemble
```
The event starts at the target (`spiderMan`) and bubbles up to its ancestor (`ul#avengers`), so the inner listener fires first.

> **Note:** if `avengers`'s listener were registered with `true` instead, it would fire during capturing — **before** Spider-Man's own listener — flipping the order. Worth testing both ways to build intuition.

---

## 2. `stopPropagation()`

```js
document.getElementById('loki').addEventListener('click', function (e) {
    e.stopPropagation();
    console.log("Loki click stopped here");
});
```

`stopPropagation()` stops the event from continuing to other elements in the chain — it does **not** stop other listeners on the *same* element, and it does **not** stop the browser's default action (that's `preventDefault()`'s job).

**Click Loki → console output:**
```
Loki click stopped here
```
`"Avengers Assemble"` never logs — `stopPropagation()` blocks the event from bubbling up to `ul#avengers`.

**Key rule:** `stopPropagation()` can only stop phases that haven't happened yet. If a capturing listener on an ancestor already fired on the way *down* (before reaching the target), calling `stopPropagation()` at the target can't undo that — it only prevents what comes *after*.

### `stopPropagation()` vs `stopImmediatePropagation()`

| Method | Blocks other elements? | Blocks other listeners on the SAME element? |
|---|---|---|
| `stopPropagation()` | Yes | No |
| `stopImmediatePropagation()` | Yes | Yes |

```js
el.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("Listener 1");
});
el.addEventListener('click', (e) => {
    console.log("Listener 2"); // still runs - stopPropagation doesn't block siblings
});
```

---

## 3. `preventDefault()`

```js
document.getElementById('google').addEventListener('click', function (e) {
    e.preventDefault();   // stops navigation to google.com
    e.stopPropagation();  // stops bubbling up to ul#avengers
    console.log('Google Clicked - navigation prevented');
});
```

`preventDefault()` stops the **browser's default behavior** for that event — e.g., following a link's `href`, submitting a form, checking a checkbox. It does **not** stop the event from propagating; that's a separate concern handled by `stopPropagation()`.

**Click the Google link → result:**
- Browser does **not** navigate to google.com
- Console logs `'Google Clicked - navigation prevented'`
- Because `stopPropagation()` is also called, `"Avengers Assemble"` does **not** log either

### `preventDefault()` vs `stopPropagation()` — don't confuse these

| Method | What it stops |
|---|---|
| `preventDefault()` | The browser's default action for that event (e.g. link navigation, form submit) |
| `stopPropagation()` | The event traveling to other elements (ancestors/descendants) |

They're independent — you can call one, the other, both, or neither, depending on what you need.

---

## 4. Event Object Properties

```js
function logEventDetails(e) {
    console.log("type:", e.type);
    console.log("timeStamp:", e.timeStamp);
    console.log("defaultPrevented:", e.defaultPrevented);
    console.log("target:", e.target);
    console.log("currentTarget:", e.currentTarget);
    console.log("clientX, clientY:", e.clientX, e.clientY);
    console.log("screenX, screenY:", e.screenX, e.screenY);
    console.log("altKey:", e.altKey);
    console.log("ctrlKey:", e.ctrlKey);
    console.log("shiftKey:", e.shiftKey);
    console.log("toElement (legacy, IE-only):", e.toElement);
    console.log("srcElement (legacy, old IE alias for target):", e.srcElement);
}
```

| Property | Meaning |
|---|---|
| `type` | The event name, e.g. `"click"`, `"keydown"` |
| `timeStamp` | Milliseconds since the page loaded when the event fired |
| `defaultPrevented` | `true`/`false` — whether `preventDefault()` was called on this event |
| `target` | The actual element that triggered the event (e.g. the exact `<img>` clicked) |
| `currentTarget` | The element the *current listener* is attached to (changes depending on which handler is running, even for the same event) |
| `toElement` | **Legacy, non-standard.** Old IE property, the element the mouse moved *to* (mostly relevant to `mouseover`/`mouseout`). Don't use in modern code. |
| `srcElement` | **Legacy.** Old IE's version of `target`. Still works in most browsers as an alias but is non-standard — use `target` instead. |
| `clientX`, `clientY` | Mouse coordinates relative to the **viewport** (visible browser window), ignoring scroll position |
| `screenX`, `screenY` | Mouse coordinates relative to the **entire physical screen** |
| `altKey`, `ctrlKey`, `shiftKey` | Boolean — `true` if that modifier key was held during the event |
| `keyCode` | **Deprecated.** Numeric code for the key pressed (keyboard events only). Use `e.key` (the actual character/name, e.g. `"Enter"`) or `e.code` (physical key position, e.g. `"KeyA"`) instead. |

> **target vs currentTarget — common interview trip-up:**
> - `target` = the element that was *actually* clicked/interacted with
> - `currentTarget` = the element the *listener you're inside right now* is attached to
>
> If you click an `<img>` inside `<ul id="avengers">`, and the `avengers` listener fires (via bubbling): `e.target` is the `<img>`, but `e.currentTarget` is the `<ul>`.

---

## 5. Legacy / Interview-Only Concepts

These come up in interviews to test depth, but aren't used in modern code:

- **`attachEvent()`** — Internet Explorer's (pre-IE9) old alternative to `addEventListener()`. Deprecated, dead, IE-only. Worth knowing it existed, never worth using.
- **jQuery `.on()`** — jQuery's unified method for binding event handlers, which replaced jQuery's older `.bind()`, `.live()`, and `.delegate()` methods. Used in legacy jQuery codebases; not needed for plain modern JS, which uses `addEventListener()` directly.

---

## 6. Quick Reference Table — All Properties/Methods Covered

| Name | Type | Notes |
|---|---|---|
| `preventDefault()` | Method | Stops browser's default action |
| `stopPropagation()` | Method | Stops event reaching other elements |
| `stopImmediatePropagation()` | Method | Stops event reaching other elements AND other listeners on same element |
| `attachEvent()` | Legacy method | Old IE equivalent of `addEventListener()` — don't use |
| `type` | Property | Event name string |
| `timeStamp` | Property | Time event fired |
| `defaultPrevented` | Property | Whether `preventDefault()` was called |
| `target` | Property | Element that triggered the event |
| `currentTarget` | Property | Element the active listener is attached to |
| `toElement` | Legacy property | Old IE, mouse-target for mouseover/out |
| `srcElement` | Legacy property | Old IE alias for `target` |
| `clientX` / `clientY` | Property | Mouse position relative to viewport |
| `screenX` / `screenY` | Property | Mouse position relative to screen |
| `altKey` / `ctrlKey` / `shiftKey` | Property | Modifier key held (boolean) |
| `keyCode` | Deprecated property | Use `key` or `code` instead |

---

## Open Questions / To Revisit

- [ ] Event delegation patterns (attaching one listener to a parent to handle many children)
- [ ] `passive` and `once` options in `addEventListener(type, listener, options)`
- [ ] Custom events (`new CustomEvent()`, `dispatchEvent()`)