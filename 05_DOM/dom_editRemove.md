# DOM - Edit & Remove Elements 

---

## What is this about?

We already know how to **create and add** elements.
Now we learn how to **replace** and **remove** existing elements from the DOM.

---

## The HTML we practiced with

```html
<ul class="language">
    <li>JavaScript</li>
    <li>TypeScript</li>
    <li>Python</li>
</ul>
```

---

## 1. Replace an Element — .replaceWith()

Replaces an existing element with a completely new one.

```js
// Select the element you want to replace
const secLang = document.querySelector("li:nth-child(2)")

// Create a new element
const li = document.createElement('li')
const text = document.createTextNode("Golang")
li.appendChild(text)

// Replace it
secLang.replaceWith(li)
```

**Before:** JavaScript, TypeScript, Python
**After:** JavaScript, Golang, Python

> TypeScript was replaced by Golang.

---

## 2. Remove an Element — .remove()

Removes the element completely from the page.

```js
const firstLang = document.querySelector('li:first-child')
firstLang.remove()
```

**Before:** JavaScript, Golang, Python
**After:** Golang, Python

> JavaScript was removed from the list.

---

## Important — .remove() has no arguments

```js
element.remove()       // ✅ correct — no arguments needed
element.remove(child)  // ❌ wrong — remove() does not take arguments
```

If you want to remove a **child** from a parent, use:
```js
parent.removeChild(child)  // older way, still works
child.remove()             // newer way, cleaner
```

---

## Quick Reference

```js
// Replace
element.replaceWith(newElement)

// Remove
element.remove()

// Remove child from parent (older way)
parent.removeChild(child)
```

---

## Summary

| Method | What it does |
|---|---|
| `replaceWith(newEl)` | Swaps the element with a new one |
| `remove()` | Deletes the element from the DOM |
| `removeChild(child)` | Removes a specific child from parent (older way) |

---
