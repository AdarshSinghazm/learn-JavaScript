
// There are two ways to create objects:

// 1. Constructor method
// Object.create()
// (we will learn later)

// 2. Object literal (most common)

const mySym = Symbol("key1");

const JSuser = {
    name: "Adarsh", // internally JS stores it as "name"

    "full name": "Adarsh Singh",

    // To use Symbol as a key,
    // we must wrap it inside []
    [mySym]: "SymbolKey",

    email: "adarsh@google.com",
    age: 18,
    location: "Varanasi"
};


// ======================
// ACCESSING OBJECT VALUES
// ======================

// Dot notation
console.log(JSuser.email);

// Bracket notation
console.log(JSuser["email"]);


// Edge case:
// Keys with spaces cannot be accessed using dot notation

// console.log(JSuser.full name);  Invalid syntax

console.log(JSuser["full name"]); //  Correct


// ======================
// SYMBOLS AS OBJECT KEYS
// ======================

// Access symbol value
console.log(JSuser[mySym]);

// Type of stored value
console.log(typeof JSuser[mySym]); // string

// Note:
// mySym itself is a Symbol
// but the stored value is still a string


// ======================
// MODIFYING OBJECT VALUES
// ======================

JSuser.email = "adarsh@grok.com";


// Object.freeze() prevents further changes

// Object.freeze(JSuser);

JSuser.email = "adarsh@gpt.com";

console.log(JSuser.email);
console.log(JSuser);


// ======================
// FUNCTIONS IN JAVASCRIPT
// ======================

// Functions can also be stored inside variables

const fn = function () {
    console.log("Hi, I am a function");
};


// fn(); -> only executes function

console.log(fn());

/*
Output:
Hi, I am a function
undefined

Reason:
The function prints a line using console.log()
but returns nothing.

So JS automatically returns:
undefined
*/


// ======================
// OBJECT METHODS
// ======================

// Functions inside objects are called methods


JSuser.greetings = function () {
    console.log("Hello JS user");
};


JSuser.greetings2 = function () {
    console.log(`Hello JS user, ${this.name}`);
};

/*
this -> current object

this.name means:
JSuser.name
*/


// Prints function reference, does not execute it
console.log(JSuser.greetings);

// Executing function
console.log(JSuser.greetings());

console.log(JSuser.greetings2());


//+++++++++++++++++++Practice++++++++++++++++++=
const user ={
    name:"Rishu",
    greet:function(){
        console.log(`Hi user,${this.name}`);
    }
}
console.log(user.name);
console.log(user.greet); //[Function: greet]
console.log(user.greet());



