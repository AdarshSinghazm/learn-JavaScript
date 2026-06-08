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

## 3 Steps to Create and Add an Element

```
1. document.createElement('tag')   →  creates element in memory
2. add content to it               →  innerHTML or createTextNode
3. parent.appendChild(el)          →  puts it on the page
```

---

## Basic Way — innerHTML

```js
function addLang(langName) {
    const li = document.createElement('li')    // Step 1 - create
    li.innerHTML = langName                     // Step 2 - add content
    document.querySelector('.language').appendChild(li)  // Step 3 - add to page
}

addLang("Python")
addLang("TypeScript")
```

---

## Optimized Way — createTextNode (Used in Real Projects)

Instead of `innerHTML`, create a **text node separately** and append it into the element.

```js
function addLang(langName) {
    const li = document.createElement('li')

    // create a text node
    const text = document.createTextNode(langName)

    // append text node INTO the li
    li.appendChild(text)

    // append li INTO the ul
    document.querySelector('.language').appendChild(li)
}

addLang("Python")
addLang("TypeScript")
```

---

## Why createTextNode is better than innerHTML?

| | innerHTML | createTextNode |
|---|---|---|
| Security | ❌ Risk of XSS attack | ✅ Safe — treats everything as plain text |
| Performance | Slower (re-parses HTML) | Faster (no HTML parsing) |
| Used in | Small projects / learning | Production / bigger projects |
| Can inject HTML tags? | Yes | No — shows as plain text |

**XSS (Cross Site Scripting)** — if a user types `<script>steal your data</script>` and you use `innerHTML`, it can execute as code. With `createTextNode` it just shows as plain text — completely safe. ✅

---

## The flow (createTextNode)

```
document.createTextNode("Python")   →  creates just the text "Python"
            ↓
    li.appendChild(text)            →  puts that text inside <li>
            ↓
    ul.appendChild(li)              →  puts <li> inside <ul>
```

---

## Quick Reference

```js
// Create element
const li = document.createElement('li')

// Basic way
li.innerHTML = "Python"

// Optimized way (use this in real projects)
const text = document.createTextNode("Python")
li.appendChild(text)

// Add to page
document.querySelector('.language').appendChild(li)
```

---
