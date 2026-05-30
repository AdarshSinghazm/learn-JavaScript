
// ======================
// SCOPES IN JAVASCRIPT
// ======================

// Scope determines where a variable
// can be accessed in a program.


// ======================
// GLOBAL SCOPE
// ======================

// Variables declared outside any block
// or function belong to global scope.

const username = "Adarsh";

function greet() {
    console.log(username);
}

greet(); // Adarsh


// Global variables can be accessed
// from anywhere in the program.


// ======================
// FUNCTION (LOCAL) SCOPE
// ======================

// Variables declared inside a function
// can only be accessed inside that function.

function test() {
    const age = 20;
    console.log(age);
}

test();

// console.log(age); ❌ Error
// age exists only inside function.


// ======================
// BLOCK SCOPE
// ======================

// A block is anything inside {}

{
    let a = 10;
    const b = 20;
}
console.log(a);
console.log(b);

// console.log(a); ❌ Error
// console.log(b); ❌ Error

// let and const are block scoped.


// ======================
// VAR AND BLOCK SCOPE
// ======================

// var ignores block scope.

{
    var x = 100;
}

console.log(x); // 100


// This is one reason why modern JS
// prefers let and const over var.


// ======================
// NESTED SCOPE
// ======================

// Inner scope can access variables
// from outer scope.

function one() {

    const username = "Adarsh";

    function two() {

        const website = "Portfolio";

        console.log(username);
    }

    two();

    // console.log(website); ❌ Error
}

one();  // Adarsh


// Parent cannot access child variables.
// Child can access parent variables.


// ======================
// SCOPE CHAIN
// ======================

// JS searches variables from:
// Current Scope
// -> Parent Scope
// -> Global Scope

const country = "India";

function outer() {

    const state = "UP";

    function inner() {

        const city = "Mathura";

        console.log(city);
        console.log(state);
        console.log(country);
    }

    inner();
}

outer();


// This lookup process is called
// Scope Chain.

// ======================
// VARIABLE SHADOWING
// ======================

// Inner variable can hide outer variable.

const name = "Adarsh";

function demo() {

    const name = "Rishu";
    // const cannot be re-declared in the same scope, but can be declared with the same name in a different scope (shadowing). 
    console.log(name);
}

demo();  // Rishu


// Inner variable shadows outer variable.


// ======================
// BLOCK SCOPE WITH IF
// ======================

if (true) {

    const message = "Hello";

    console.log(message);
}

// console.log(message); ❌ Error


// Variables declared using
// let and const stay inside block.


// ======================
// INTERVIEW FAVOURITE
// ======================

var c = 100;

if (true) {

    let a = 10;
    const b = 20;
    var c = 30;
}

console.log(c);


// Output:
// 30


// Because var is NOT block scoped.


// ======================
// IMPORTANT NOTES
// ======================

// Global Scope
// -> Accessible everywhere

// Function Scope
// -> Accessible only inside function

// Block Scope
// -> Accessible only inside {}

// let and const are block scoped

// var is function scoped

// Child scope can access parent scope
// Parent scope cannot access child scope

// JS follows Scope Chain while
// searching for variables.
