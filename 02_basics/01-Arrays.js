

// =========================
// ARRAY INITIALIZATION
// =========================

const myar = [1, 2, 3, 4, 5,6]
// direct array initialization

const arr = new Array(2, 1, 4, 5, 6)
// constructor way of creating array

console.log(myar)
console.log(arr)


// =========================
//  BASIC ARRAY METHODS (MUTATING)
// =========================

// add element at end
arr.push(7)

console.log(arr)

// remove last element
arr.pop()

console.log(arr)


// add element at start
arr.unshift(9)
// shifts all elements right (expensive operation)

console.log(arr)

// remove first element
arr.shift()
// removes first element (shifts left)

console.log(arr)


// =========================
// SEARCH METHODS
// =========================

console.log(arr.includes(100))
// 👉 checks if value exists (true/false)

console.log(arr.indexOf(100))
// 👉 returns index if found else -1


// =========================
// JOIN METHOD (ARRAY → STRING)
// =========================

const newar = arr.join()
// converts array to string (default separator ",")

console.log(arr)
// original array NOT changed

console.log(newar)
// string output: "2,1,4,5,6,7"

// you can also customize separator:
// arr.join("-")


// =========================
// IMPORTANT: SLICE vs SPLICE
// =========================


// -------------------------
// SLICE (NON-DESTRUCTIVE)
// -------------------------

const a1 = [1, 2, 3, 4, 5, 6, 7]

const newa1 = a1.slice(1, 5)
// start index included
// end index excluded
// does NOT change original array

console.log(newa1)
console.log(`After slice, original array: ${a1}`)


// -------------------------
// SPLICE (DESTRUCTIVE)
// -------------------------

const b1 = [1, 2, 3, 4, 5, 6, 7]

const newb1 = b1.splice(3, 2, 15)
// start index = 3
// delete 2 elements
// insert 15 at that position
// modifies original array

console.log(newb1)
// removed elements: [4, 5]

console.log(`After splice, modified array: ${b1}`)