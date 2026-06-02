
// ======================
// THIS KEYWORD
// ======================

const user = {
    name: "Adarsh",
    payment: 999,

    greet() {
        // this refers to current object
        console.log(`Hey ${this.name}! Welcome to our website`);
        console.log(this);
    }
};


// user.greet();


// Updating object value

// user.name = "Rishu"; 
// user.greet();


// In browser:
//
// console.log(this)
//
// refers to Window object.
//
// In Node.js:
//
// console.log(this)
//
// returns {} (empty object).


// ======================
// THIS INSIDE FUNCTIONS
// ======================

function hero() {

    let name = "Adarsh";

    console.log(this.name);
}

// hero();


// Output:
// undefined


// this does NOT refer to local variables.
//
// It refers to execution context.
//
// Therefore:
// this.name !== local variable name

// Same result with function expression

const hero2 = function () {

    let name = "Adarsh";

    console.log(this.name);
};

// hero2();


// ======================
// ARROW FUNCTIONS
// ======================

// Arrow functions have a different
// behaviour for 'this'.
// They do not create their own this.

const hero3 = () => {

    let name = "Rishu";

    console.log(this.name);
};

hero3();


// Output:
// undefined


// ======================
// BASIC ARROW FUNCTION
// ======================

const addTwo = (num1, num2) => {

    return num1 + num2;
};

console.log(addTwo(3, 4));


// ======================
// IMPLICIT RETURN
// ======================

// If function has only one expression,
// return keyword can be omitted.

const absDifference = (num1, num2) =>
    Math.abs(num1 - num2);

// OR

// const absDifference = (num1, num2) =>
//     (Math.abs(num1 - num2));

console.log(absDifference(1, 4));


// ======================
// RETURNING OBJECTS
// ======================

// Returning object directly
// requires wrapping object inside ()

const returnObj = () => ({
    name: "Adarsh"
});

console.log(returnObj());


// Without ()


// const returnObj = () => {
//     name: "Adarsh"
// }


// Output:
// undefined


// Reason:
//
// JS treats {} as function body,
// not object literal.


// ======================
// IMPORTANT NOTES
// ======================

// this -> current object

// In browser global scope:
// this -> Window object

// In Node.js global scope:
// this -> {}

// Normal functions and arrow functions
// handle 'this' differently

// Explicit Return:
// return value

// Implicit Return:
// value (without return keyword)

// Returning object from arrow function:
// wrap object inside ()
