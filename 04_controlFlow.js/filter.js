/*
Why use filter()?

- forEach() does not return a new array.
- filter() returns a new array containing only elements
  that satisfy a condition.
*/


// =============================================================
// Using forEach()
// =============================================================

const ar = [1, 2, 3, 4, 5];

const newNums = [];

ar.forEach((num) => {
    if (num > 3) {
        newNums.push(num);
    }
});

console.log(newNums); // [4, 5]

/*
Observation:
- We manually create an array.
- We manually push values.
- More code is required.
*/


// =============================================================
// Using filter()
// =============================================================

const greaterThanThree = ar.filter((num) => num > 3);

console.log(greaterThanThree); // [4, 5]

/*
Observation:
- No extra array needed.
- Cleaner and shorter.
- Returns a new filtered array automatically.
*/


// =============================================================
// Syntax
// =============================================================

/*
array.filter((element) => {
    return condition;
});

If condition is true  -> element is kept
If condition is false -> element is removed
*/


// =============================================================
// Real World Example
// =============================================================

const books = [
    { title: "The Hobbit", genre: "Fantasy", publish: 1937, edition: 2020 },
    { title: "Harry Potter", genre: "Fantasy", publish: 1997, edition: 2018 },
    { title: "Clean Code", genre: "Programming", publish: 2008, edition: 2021 },
    { title: "JavaScript: The Good Parts", genre: "Programming", publish: 2008, edition: 2015 },
    { title: "The Alchemist", genre: "Fiction", publish: 1988, edition: 2017 },
    { title: "Atomic Habits", genre: "Self Help", publish: 2018, edition: 2022 },
    { title: "Think and Grow Rich", genre: "Self Help", publish: 1937, edition: 2019 },
    { title: "Dune", genre: "Sci-Fi", publish: 1965, edition: 2021 },
    { title: "1984", genre: "Dystopian", publish: 1949, edition: 2020 },
    { title: "The Pragmatic Programmer", genre: "Programming", publish: 1999, edition: 2019 }
];


// =============================================================
// Example 1: Programming Books
// =============================================================

const programmingBooks = books.filter(
    (book) => book.genre === "Programming"
);

console.log(programmingBooks);


// =============================================================
// Example 2: Books Published After 2000
// =============================================================

const booksAfter2000 = books.filter(
    (book) => book.publish >= 2000
);

console.log(booksAfter2000);


// =============================================================
// Example 3: Fantasy Books Published After 1950
// =============================================================

const fantasyAfter1950 = books.filter(
    (book) => book.genre === "Fantasy" &&
              book.publish > 1950
);

console.log(fantasyAfter1950);


// =============================================================
// Example 4: publish < 2000 AND edition >= 2020
// =============================================================

const allBooks = books.filter(
    (book) => book.publish < 2000 &&
              book.edition >= 2020
);


console.log(allBooks);


/*
Output:
[
  { title: "The Hobbit", ... },
  { title: "Dune", ... },
  { title: "1984", ... }
]
*/


// =============================================================
// Important Interview Points
// =============================================================

/*
1. filter() returns matching elements.

Example:
*/

const fantasyBooks = books.filter(
    (book) => book.genre === "Fantasy"
);

/*
Returns full objects.

[
  { title: "The Hobbit", ... },
  { title: "Harry Potter", ... }
]
*/


/*
2. filter() DOES NOT transform data.

Wrong thinking:
*/

books.filter((book) => book.title);

/*
This keeps all books because every title is a
non-empty string (truthy).

Use map() for transformation.
*/


// =============================================================
// filter() + map()
// =============================================================

const titles = books
    .filter(book => book.publish < 2000)
    .map(book => book.title);

console.log(titles);

/*
Output:

[
  "The Hobbit",
  "Harry Potter",
  "The Alchemist",
  "Think and Grow Rich",
  "Dune",
  "1984",
  "The Pragmatic Programmer"
]
*/


// =============================================================
// Quick Revision
// =============================================================

/*
forEach()  -> iterate only

filter()   -> select elements

map()      -> transform elements

filter() returns a NEW array

true  -> keep element

false -> remove element

Most common pattern:

array
    .filter(...)
    .map(...)
*/