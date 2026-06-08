# DOM - Creating & Adding Elements 

---

## What is this about?

So far we only **read and selected** elements from the DOM.
Now we learn how to **create new elements** and **add them to the page** using JavaScript.

---

## The HTML we practiced with

```html
<ul class="language">
    <li>JavaScript</li>
</ul>
```

---

## Step 1 — Create an Element

```js
const li = document.createElement('li')
```

- `document.createElement('tagName')` creates a new HTML element in **memory**
- It is NOT on the page yet — just created and stored in a variable
- You can create any HTML tag: `'li'`, `'div'`, `'p'`, `'h1'`, etc.

---

## Step 2 — Add Content to the Element

```js
li.innerHTML = "Python"
```

**Important:** `innerHTML` is a **property**, not a function.

```js
// WRONG ❌ — do not use brackets
li.innerHTML("Python")

// CORRECT ✅ — use = to assign
li.innerHTML = "Python"
```

---

## Step 3 — Add the Element to the Page

```js
document.querySelector('.language').appendChild(li)
```

- `.appendChild()` adds the new element as the **last child** inside the selected element
- Without this step, the element stays in memory and never appears on the page

---

## Full Working Example

```js
function addLang(langName) {
    const li = document.createElement('li')    // Step 1 - create
    li.innerHTML = langName                     // Step 2 - add content
    document.querySelector('.language').appendChild(li)  // Step 3 - add to page
}

addLang("Python")
addLang("TypeScript")
addLang("Rust")
```

**Result on page:**
```
• JavaScript   ← was already in HTML
• Python       ← added by JS
• TypeScript   ← added by JS
• Rust         ← added by JS
```

---

## Common Bugs to Avoid

### Bug 1 — innerHTML is a property, not a function
```js
li.innerHTML("Python")   // ❌ TypeError: li.innerHTML is not a function
li.innerHTML = "Python"  // ✅ correct
```

### Bug 2 — Missing . in querySelector for class
```js
document.querySelector('language')   // ❌ looks for a <language> tag, not found
document.querySelector('.language')  // ✅ correct — . means class
```

---

## innerHTML vs textContent — Which to use when creating elements?

```js
li.innerHTML = "<b>Python</b>"    // renders as bold text — interprets HTML tags
li.textContent = "<b>Python</b>"  // shows as plain text — does NOT interpret tags
```

- Use `innerHTML` when you want to add HTML tags inside
- Use `textContent` when you just want plain text (safer, faster)

---

## Quick Reference

```js
// Create a new element
const el = document.createElement('li')

// Add content
el.innerHTML = "Some text"       // can include HTML tags
el.textContent = "Some text"     // plain text only

// Add to page
parent.appendChild(el)           // adds at the END of parent

// Common mistake — querySelector needs . for class, # for id
document.querySelector('.className')   // class
document.querySelector('#idName')      // id
```

---

## Summary — 3 Steps to Create and Add an Element

```
1. document.createElement('tag')   →  creates element in memory
2. el.innerHTML = "content"        →  adds content to it
3. parent.appendChild(el)          →  puts it on the page
```

---
 