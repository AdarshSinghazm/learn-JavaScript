/*
What is map()?

map() creates a NEW array by transforming every element
of the original array.

Think:

forEach() -> iterate
filter()  -> select
map()     -> transform
reduce()  -> combine
*/


// =============================================================
// Syntax
// =============================================================

/*
array.map((element) => {
    return transformedValue;
});
*/


// =============================================================
// Example 1: Add 10 to Every Element
// =============================================================

const nums = [1, 2, 3, 4, 5];

const newNums = nums.map((num) => {
    return num + 10;
});

console.log(newNums);

/*
Output:

[11, 12, 13, 14, 15]
*/


// =============================================================
// Short Form
// =============================================================

const updatedNums = nums.map(num => num + 10);

console.log(updatedNums);


// =============================================================
// Original Array is NOT Modified
// =============================================================

const arr = [1, 2, 3];

const doubled = arr.map(num => num * 2);

console.log(arr);      // [1, 2, 3]
console.log(doubled);  // [2, 4, 6]


// =============================================================
// Example 2: Square Every Number
// =============================================================

const squares = nums.map(num => num * num);

console.log(squares);

/*
[1, 4, 9, 16, 25]
*/


// =============================================================
// Example 3: Extract Titles from Objects
// =============================================================

const books = [
    { title: "The Hobbit", genre: "Fantasy" },
    { title: "Harry Potter", genre: "Fantasy" },
    { title: "Clean Code", genre: "Programming" }
];

const titles = books.map(book => book.title);

console.log(titles);

/*
[
    "The Hobbit",
    "Harry Potter",
    "Clean Code"
]
*/


// =============================================================
// map() MUST Return Something
// =============================================================

const result = nums.map((num) => {
    return num + 10;
});

console.log(result);


/*
If you forget return:
*/

const wrong = nums.map((num) => {
    num + 10;
});

console.log(wrong);

/*
Output:

[undefined, undefined, undefined, undefined, undefined]
*/


// =============================================================
// Difference Between map() and filter()
// =============================================================

/*
filter()
-> decides whether to keep an element

map()
-> changes an element
*/


const numbers = [1, 2, 3, 4, 5];

const filtered = numbers.filter(num => num > 3);

console.log(filtered);

/*
[4, 5]
*/


const mapped = numbers.map(num => num + 10);

console.log(mapped);

/*
[11, 12, 13, 14, 15]
*/


// =============================================================
// Chaining
// =============================================================

/*
Method Chaining:

Output of one method becomes
input of the next method.
*/


// =============================================================
// Example 1
// =============================================================

const chain1 = numbers
    .map(num => num * 10)
    .map(num => num + 1);

console.log(chain1);

/*
[11, 21, 31, 41, 51]
*/


/*
Dry Run:

[1,2,3,4,5]

map(num => num * 10)

[10,20,30,40,50]

map(num => num + 1)

[11,21,31,41,51]
*/


// =============================================================
// Example 2: map() + filter()
// =============================================================

const chain2 = numbers
    .map(num => num * 10)
    .filter(num => num >= 30);

console.log(chain2);

/*
[30,40,50]
*/


/*
Dry Run:

[1,2,3,4,5]

map()

[10,20,30,40,50]

filter()

[30,40,50]
*/


// =============================================================
// Example 3: filter() + map()
// =============================================================

const chain3 = numbers
    .filter(num => num > 2)
    .map(num => num * 10);

console.log(chain3);

/*
[30,40,50]
*/


/*
Dry Run:

[1,2,3,4,5]

filter()

[3,4,5]

map()

[30,40,50]
*/


// =============================================================
// Real World Example
// =============================================================

const booksData = [
    { title: "The Hobbit", genre: "Fantasy" },
    { title: "Harry Potter", genre: "Fantasy" },
    { title: "Clean Code", genre: "Programming" },
    { title: "Atomic Habits", genre: "Self Help" }
];

const fantasyTitles = booksData
    .filter(book => book.genre === "Fantasy")
    .map(book => book.title);

console.log(fantasyTitles);

/*
Output:

[
    "The Hobbit",
    "Harry Potter"
]
*/


// =============================================================
// Quick Revision
// =============================================================

/*
forEach()
-> Iterate

filter()
-> Select

map()
-> Transform

reduce()
-> Combine


map() returns:
-> A NEW array

filter() returns:
-> A FILTERED array

reduce() returns:
-> ONE final value


Most Common Pattern:

array
    .filter(...)
    .map(...)


Example:

books
    .filter(book => book.genre === "Fantasy")
    .map(book => book.title);
*/