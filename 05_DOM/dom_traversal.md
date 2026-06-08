# DOM Traversal Notes

---

## What is DOM Traversal?

Once you select an element, you can **move around the DOM tree** from that element.
- Move to its parent
- Move to its children
- Move to its siblings

This is called **DOM Traversal**.

---

## The HTML we practiced with

```html
<div class="parent">
    <div class="day">Monday</div>
    <div class="day">Tuesday</div>
    <div class="day">Wednesday</div>
    <div class="day">Thursday</div>
</div>
```

---

## 1. Accessing Children

### .children
Returns all **direct child elements** as an HTMLCollection.

```js
const parent = document.querySelector('.parent')
console.log(parent.children)
// HTMLCollection(4) [div.day, div.day, div.day, div.day]
```

### Looping through children

```js
for (let i = 0; i < parent.children.length; i++) {
    console.log(parent.children[i].innerHTML)
}
// Monday
// Tuesday
// Wednesday
// Thursday
```

### Accessing a specific child by index

```js
parent.children[1].style.backgroundColor = "steelblue"
parent.children[1].style.padding = "5px"
// styles the second child (Tuesday)
```

---

## 2. First and Last Child

### .firstElementChild
Returns the **first child element**.

```js
console.log(parent.firstElementChild.innerHTML)  // "Monday"
```

### .lastElementChild
Returns the **last child element**.

```js
console.log(parent.lastElementChild.innerHTML)   // "Thursday"
```

---

## 3. Parent Traversal

### .parentElement
From a child element, move up to its **parent**.

```js
const dayone = document.querySelector('.day')
console.log(dayone.parentElement)
// <div class="parent">...</div>
```

---

## 4. Sibling Traversal

### .nextElementSibling
Returns the **next sibling element** (the one after it).

```js
const dayone = document.querySelector('.day')  // Monday
console.log(dayone.nextElementSibling.innerHTML)  // "Tuesday"
```

> Note: `querySelector('.day')` always grabs the **first** matching element — so `dayone` is Monday, and its next sibling is Tuesday.

---

## 5. childNodes

### .childNodes
Returns **all nodes** inside an element — including text nodes, comment nodes, and element nodes as a **NodeList**.

```js
console.log(parent.childNodes)
// NodeList(9) [text, div.day, text, div.day, text, div.day, text, div.day, text]
```

**Why so many?**
The whitespace (spaces, new lines) between HTML tags also counts as **text nodes**. That's why you see `text` in between the actual `div` elements.

---

## children vs childNodes — Key Difference

| | .children | .childNodes |
|---|---|---|
| What it returns | Only element nodes | Everything (elements + text + comments) |
| Type | HTMLCollection | NodeList |
| Includes whitespace? | No | Yes |
| Use case | When you want only HTML elements | Rarely used directly |

> In most real projects, you will use `.children` — not `.childNodes`.

---

## Quick Reference

```js
const parent = document.querySelector('.parent')

parent.children              // all child elements (HTMLCollection)
parent.children[0]           // first child by index
parent.firstElementChild     // first child element
parent.lastElementChild      // last child element

const child = document.querySelector('.day')

child.parentElement          // parent of this element
child.nextElementSibling     // next sibling element
child.previousElementSibling // previous sibling element (opposite of next)

parent.childNodes            // all nodes including text nodes (NodeList)
```

---

## Summary — What We Learned

- `.children` — get all child elements
- `.firstElementChild` — get first child
- `.lastElementChild` — get last child
- `.parentElement` — move up to parent
- `.nextElementSibling` — move to next sibling
- `.childNodes` — get all nodes (including text/whitespace)

---