
// ======================
// FUNCTIONS IN JAVASCRIPT
// ======================

// Function = reusable block of code

// Instead of writing same code again and again,
// we can store it inside a function


// ======================
// BASIC FUNCTION
// ======================

function greet() {
    console.log("Hello");
}

// Calling / invoking function
greet();


// ======================
// PARAMETERS & ARGUMENTS
// ======================

// Parameters:
// variables written while creating function

function addTwoNum(num1, num2) {
    return num1 + num2;
}


// Arguments:
// actual values passed while calling function

console.log(addTwoNum(2, 3));


// ======================
// RETURN KEYWORD
// ======================

// return sends value back from function

function multiply(a, b) {
    return a * b;
}

const ans = multiply(2, 5);

console.log(ans);


// ======================
// console.log vs return
// ======================

function test1() {
    console.log("Hello");
}
function test2() {
    return "Hello";
}

console.log(test1()); // undefined
console.log(test2()); // Hello

// ======================
// FUNCTION EXPRESSION
// ======================

// Function stored inside variable

const fn = function () {
    console.log("Hi, I am function");
};

fn();

// ======================
// IMPORTANT FUNCTION CONCEPTS
// ======================


// Function with parameter

function loggedInUser(username) {

    // !username means:
    // username is undefined, null, empty string, etc.

    if (!username) {
        console.log("Please enter a valid name");
        return;
    }

    return `${username} just logged in`;
}


// If no argument is passed,
// username becomes undefined

console.log(loggedInUser());


// Passing argument

console.log(loggedInUser("Adarsh"));


// ======================
// DEFAULT PARAMETERS
// ======================

// Default value is used
// when no argument is passed

function loggedInUser2(username = "sam") {
    return `${username} just logged in`;
}


// No argument passed
// so default value will be used

console.log(loggedInUser2());


// Passed value overwrites default value

console.log(loggedInUser2("Adarsh"));


// ======================
// IMPORTANT NOTES
// ======================

// !username is similar to:
// username === undefined

// but it also checks for:
// null
// ""
// false
// 0
// NaN

// return stops function execution


