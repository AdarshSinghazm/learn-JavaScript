# Promises in JavaScript

---

## 1. What is a Promise?

A promise is an object that represents a **future value** — something that will be available later after an async task finishes.

Three states a promise can be in:
- **Pending** — task is still running
- **Resolved** — task finished successfully
- **Rejected** — task failed

---

## 2. Creating a Promise

```js
const promiseOne = new Promise(function(resolve, reject) {
    // do async task here — DB call, network request etc
    setTimeout(function() {
        console.log('Async task done')
        resolve() // mark as successful
    }, 1000)
})
```

- `resolve()` → task succeeded
- `reject()` → task failed
- `.then()` is connected to `resolve`
- `.catch()` is connected to `reject`

---

## 3. Consuming a Promise — `.then()`

```js
promiseOne.then(function() {
    console.log('Promise consumed')
})
```

Can also create and consume without storing in a variable:

```js
new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('Async 2 done')
        resolve()
    }, 1000)
}).then(function() {
    console.log('Async 2 resolved')
})
```

---

## 4. Passing Data Through resolve()

Most of the time in real world you'll resolve with an object:

```js
const promiseThree = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve({ username: 'Adarsh', email: 'adarsh@gmail.com' })
    }, 1000)
})

promiseThree.then(function(user) {
    console.log(user) // { username: 'Adarsh', email: 'adarsh@gmail.com' }
})
```

Whatever you pass into `resolve()` — you get it back as the parameter in `.then()`.

---

## 5. resolve and reject + `.catch()` + `.finally()`

```js
const promiseFour = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true
        if(!error) {
            resolve({ name: 'Adarsh', password: '5066' })
        } else {
            reject('Not able to fetch data')
        }
    }, 1000)
})

promiseFour.then(function(user) {
    console.log(user)
    return user.name        // passing value to next .then()
}).then(function(name) {
    console.log(name)       // receives user.name from above
}).catch(function(err) {
    console.log(err)        // catches rejection
}).finally(function() {
    console.log('Promise is either resolved or rejected') // always runs
})
```

- `.then()` → runs on resolve
- `.catch()` → runs on reject
- `.finally()` → always runs regardless of result
- Returning a value from `.then()` passes it to the next `.then()` — this is **promise chaining**

---

## 6. Promise Chaining

Returning a value from one `.then()` passes it into the next:

```js
promiseFour
    .then(function(user) {
        return user.name    // pass name forward
    })
    .then(function(name) {
        console.log(name)   // receives name here
    })
```

Each `.then()` can transform the data and pass it along. Keeps async code flat instead of nested.

---

## 7. async / await

Cleaner way to consume promises — makes async code look like normal synchronous code.

```js
const promiseFive = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true
        if(!error) {
            resolve({ name: 'Rishu', age: 21 })
        } else {
            reject('Error: Something went wrong')
        }
    }, 1000)
})

async function consumePromiseFive() {
    try {
        const response = await promiseFive  // wait for promise to resolve
        console.log(response)
    } catch (error) {
        console.log(error)                  // catches rejection
    }
}
consumePromiseFive()
```

- `async` before a function — makes it return a promise
- `await` inside — pauses until the promise resolves, then gives you the value
- `try/catch` replaces `.then()/.catch()`

---

## 8. fetch — Real World Promise

### With .then() chaining

```js
fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
        return response.json()   // response.json() is also a promise
    })
    .then(function(data) {
        console.log(data[0])     // first user
    })
    .catch(function(err) {
        console.log(`Error: ${err}`)
    })
    .finally(function() {
        console.log('Promise is either resolved or rejected')
    })
```

### With async/await

```js
async function getUserDetail() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(`Err: ${error}`)
    }
}
getUserDetail()
```

### Why two awaits?

`fetch` works in two steps:

1. `await fetch(url)` — server responds with headers. Body hasn't arrived yet.
2. `await response.json()` — reads and parses the body. Also async, also a promise.

```
await fetch()        → delivery guy arrives at door
await response.json() → you open the bag and get the food
```

Skip either `await` → you get a pending promise instead of actual data.

---

## 9. Accessing Fetched Data

```
/users     → returns array  → use data[0] for first user
/users/1   → returns single object → use data.name directly, no [0]
```

```js
// array endpoint
data[0]              // first user object
data[0].name         // name of first user
data[0].address.city // nested property

// single object endpoint
data.name
data.email
data.company.name
```

---

## Quick Reference

| Concept | One line |
|---|---|
| `new Promise(resolve, reject)` | Creates a promise |
| `resolve(value)` | Marks promise as successful, passes value to .then() |
| `reject(value)` | Marks promise as failed, passes value to .catch() |
| `.then(fn)` | Runs when resolved |
| `.catch(fn)` | Runs when rejected |
| `.finally(fn)` | Always runs |
| Promise chaining | Return value from .then() passes to next .then() |
| `async/await` | Cleaner syntax for consuming promises |
| `try/catch` | Error handling with async/await |
| `await fetch(url)` | Wait for server response |
| `await response.json()` | Wait for body to be read and parsed |

---

## Status

### ✅ Covered
- Creating promises
- resolve and reject
- .then() .catch() .finally()
- Promise chaining
- async/await
- try/catch
- fetch with .then()
- fetch with async/await

### ❌ Not yet covered
- Promise.all / Promise.race / Promise.allSettled
- POST requests with fetch
- CORS