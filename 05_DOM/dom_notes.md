# DOM Notes - Chai aur Code
> Based on: DOM Part 1 (Introduction) + Part 2 (All DOM Selectors)

---

## PART 1 — What is the DOM?

### The Basic Idea

When a browser loads an HTML file, it does not just display it.
It converts the entire HTML into a tree-like structure made of objects.
This tree is called the **DOM — Document Object Model**.

JavaScript can then read, change, add, or delete anything in this tree.
That is how websites become interactive.

```
HTML File  →  Browser reads it  →  Creates DOM (a tree of objects)  →  JS can now control it
```

---

### The DOM Tree

Every HTML element becomes a **node** in the tree.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── p
        └── div
            └── ul
                ├── li
                ├── li
                └── li
```

- `document` is the root. Everything starts from here.
- Each tag (h1, p, div, li) becomes an **element node**.
- The text inside a tag becomes a **text node**.

---

### window vs document

| | window | document |
|---|---|---|
| What it is | The browser tab itself | The HTML page loaded inside the tab |
| Is it global? | Yes, it is the global object | No, it lives inside window |
| Example | `window.alert()` | `document.getElementById()` |

```js
// These two are the same thing:
window.document
document

// window is the top-level object
console.log(window)        // shows everything available in browser
console.log(document)      // shows the HTML tree
```

---

### What Can You Do With the DOM?

- Read content from the page
- Change text, HTML, styles, attributes
- Add or remove elements
- React to user events (clicks, typing, scrolling)

---
---

## PART 2 — DOM Selectors

> Selectors are how you "grab" an element from the page so you can do something with it.

---

### 1. getElementById

Selects **one element** by its `id` attribute.

```html
<h1 id="title">Hello World</h1>
```

```js
const heading = document.getElementById("title")
console.log(heading)         // logs the h1 element
console.log(typeof heading)  // "object"
```

**Key points:**
- Returns a single element (not a list)
- Returns `null` if no element with that id exists
- id must be unique in the page (only one element should have any given id)

```js
// Common thing to do after selecting:
heading.style.color = "red"           // change color
heading.innerHTML = "New Heading"     // change content
```

---

### 2. getElementsByClassName

Selects **all elements** that have a specific class. Returns an **HTMLCollection**.

```html
<li class="item">Apple</li>
<li class="item">Banana</li>
<li class="item">Mango</li>
```

```js
const items = document.getElementsByClassName("item")
console.log(items)       // HTMLCollection(3) [li, li, li]
console.log(items[0])    // first li
console.log(items.length) // 3
```

**Key points:**
- Returns an HTMLCollection (looks like an array but is NOT an array)
- You access elements using index: `items[0]`, `items[1]`
- If you want to loop through it, use a regular `for` loop or convert to array first

```js
// Convert to real array
const itemsArray = Array.from(items)
itemsArray.forEach(item => {
  item.style.backgroundColor = "yellow"
})
```

---

### 3. getElementsByTagName

Selects **all elements** with a specific HTML tag.

```js
const allLis = document.getElementsByTagName("li")
const allDivs = document.getElementsByTagName("div")
const allPs   = document.getElementsByTagName("p")
```

**Key points:**
- Also returns an HTMLCollection
- Tag name is case-insensitive (`"LI"` and `"li"` both work)
- Useful when you want all elements of a type regardless of class/id

---

### 4. querySelector  ← Most Used

Selects the **first element** that matches a CSS selector.

```html
<div id="box">
  <p class="text">Hello</p>
  <p class="text">World</p>
</div>
```

```js
// By id (use # like CSS)
const box = document.querySelector("#box")

// By class (use . like CSS)
const firstText = document.querySelector(".text")   // only grabs the FIRST .text

// By tag
const firstP = document.querySelector("p")

// Nested selector (like CSS)
const pInsideDiv = document.querySelector("div p")

// By attribute
const input = document.querySelector("input[type='text']")
```

**Key points:**
- Uses **CSS selector syntax** — whatever works in CSS works here
- Always returns only **one element** (the first match)
- Returns `null` if nothing matches
- This is the most powerful and commonly used selector

---

### 5. querySelectorAll  ← Also Very Used

Same as `querySelector` but returns **ALL matching elements** as a **NodeList**.

```js
const allTexts = document.querySelectorAll(".text")
console.log(allTexts)      // NodeList(2) [p, p]

// Loop through using forEach (NodeList supports forEach unlike HTMLCollection)
allTexts.forEach(el => {
  el.style.color = "blue"
})
```

**Key points:**
- Returns a **NodeList** (different from HTMLCollection)
- NodeList supports `.forEach()` directly — no need to convert
- If you need array methods like `.map()` or `.filter()`, convert: `Array.from(allTexts)`
- Returns an empty NodeList (not null) if nothing matches
- **Always returns a NodeList — even if only ONE element matches**

```js
// Only 1 element with class "title" on the page
document.querySelectorAll(".title")  // NodeList(1) [h1]  ← still a NodeList, not a raw element
```

---

### HTMLCollection vs NodeList — Quick Comparison

| Feature | HTMLCollection | NodeList |
|---|---|---|
| Returned by | `getElementsByClassName`, `getElementsByTagName` | `querySelectorAll` |
| Is it an array? | No | No |
| Supports forEach? | No (need to convert) | Yes |
| Live or Static? | Live (updates automatically) | Static (snapshot at time of call) |

**"Live"** means: if you add a new element to the page, the HTMLCollection automatically includes it.
NodeList does NOT update — it's a snapshot.

> **Important:** `getElementsByClassName` and `getElementsByTagName` **always return an HTMLCollection** — even if only ONE element matches. Same way, `querySelectorAll` always returns a NodeList even for a single match. The only methods that give you a raw single element directly are `querySelector` and `getElementById`.

```js
// Only 1 element has class "title"
document.getElementsByClassName("title")  // HTMLCollection(1) [h1]  ← still wrapped
document.querySelectorAll(".title")        // NodeList(1) [h1]        ← still wrapped
document.querySelector(".title")          // h1                       ← raw single element
document.getElementById("title")          // h1                       ← raw single element
```

---

### Changing Content After Selecting

Once you have an element, you can change it in several ways:

#### innerHTML
Gets or sets the HTML inside an element (including tags).

```js
const div = document.querySelector("#box")

// Read
console.log(div.innerHTML)   // "<p class='text'>Hello</p><p class='text'>World</p>"

// Write (you can write HTML tags here)
div.innerHTML = "<h2>New Content</h2>"
```

**Warning:** Never put user-typed content directly into innerHTML — it can be a security risk (XSS attack).

---

#### innerText
Gets or sets only the **visible text** inside an element. Ignores hidden elements and extra whitespace.

```js
const p = document.querySelector("p")

console.log(p.innerText)     // "Hello"

p.innerText = "Updated text" // changes visible text
```

---

#### textContent
Gets or sets **all text** inside an element, including text inside hidden elements and preserving whitespace.

```js
console.log(p.textContent)   // includes hidden text too
```

---

#### innerHTML vs innerText vs textContent

```html
<div id="test">
  Hello <span style="display:none">Secret</span> World
</div>
```

```js
const el = document.querySelector("#test")

console.log(el.innerHTML)    // Hello <span style="display:none">Secret</span> World
console.log(el.innerText)    // Hello World        (ignores hidden span)
console.log(el.textContent)  // Hello Secret World (includes hidden text)
```

| | innerHTML | innerText | textContent |
|---|---|---|---|
| Includes HTML tags? | Yes | No | No |
| Ignores hidden elements? | No | Yes | No |
| Performance | Slowest | Medium | Fastest |
| Use for? | Reading/writing HTML | Visible text only | All raw text |

---

### Changing Styles After Selecting

```js
const el = document.querySelector("h1")

// Change individual CSS properties
el.style.color = "red"
el.style.fontSize = "32px"           // camelCase, not font-size
el.style.backgroundColor = "yellow"  // camelCase
el.style.padding = "10px"
```

**Important:** CSS property names become camelCase in JS.
`background-color` → `backgroundColor`
`font-size` → `fontSize`
`border-radius` → `borderRadius`

---

### Getting and Setting Attributes

```js
const img = document.querySelector("img")

// Read attribute
img.getAttribute("src")         // "/images/cat.jpg"
img.getAttribute("alt")         // "a cat"

// Set attribute
img.setAttribute("src", "/images/dog.jpg")
img.setAttribute("alt", "a dog")

// Remove attribute
img.removeAttribute("alt")

// Check if attribute exists
img.hasAttribute("src")         // true or false
```

---

### Working with Classes

```js
const el = document.querySelector(".box")

// Add a class
el.classList.add("active")

// Remove a class
el.classList.remove("active")

// Toggle a class (adds if not present, removes if present)
el.classList.toggle("active")

// Check if a class exists
el.classList.contains("active")   // true or false
```

This is better than manually editing `el.className` because it doesn't overwrite existing classes.

---

## Quick Reference Cheatsheet

```js
// --- SELECTING ELEMENTS ---
document.getElementById("myId")             // one element by id
document.getElementsByClassName("myClass")  // HTMLCollection by class
document.getElementsByTagName("p")          // HTMLCollection by tag
document.querySelector(".myClass")          // first match (CSS selector)
document.querySelectorAll(".myClass")       // all matches (CSS selector)

// --- READING / CHANGING CONTENT ---
el.innerHTML     // HTML content (with tags)
el.innerText     // visible text only
el.textContent   // all text (including hidden)

// --- STYLES ---
el.style.color = "red"
el.style.fontSize = "20px"

// --- ATTRIBUTES ---
el.getAttribute("href")
el.setAttribute("href", "https://example.com")
el.removeAttribute("href")
el.hasAttribute("href")

// --- CLASSES ---
el.classList.add("active")
el.classList.remove("active")
el.classList.toggle("active")
el.classList.contains("active")
```

---

## Common Mistakes to Avoid

1. **Using wrong selector syntax**
   ```js
   // WRONG
   document.querySelector("myId")       // missing #
   document.querySelector("myClass")    // missing .

   // CORRECT
   document.querySelector("#myId")
   document.querySelector(".myClass")
   ```

2. **Trying to use forEach on HTMLCollection**
   ```js
   // WRONG - will throw error
   document.getElementsByClassName("item").forEach(...)

   // CORRECT
   Array.from(document.getElementsByClassName("item")).forEach(...)
   // OR just use querySelectorAll which returns NodeList
   document.querySelectorAll(".item").forEach(...)
   ```

3. **CSS property names in JS are camelCase**
   ```js
   // WRONG
   el.style.background-color = "red"   // syntax error

   // CORRECT
   el.style.backgroundColor = "red"
   ```

4. **querySelector returns null if element not found — always check**
   ```js
   const el = document.querySelector("#doesNotExist")
   if (el) {
     el.style.color = "red"  // safe
   }
   ```

---
