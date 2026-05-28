
// There are two ways to create objects:

// 1. Constructor method
// const user = new Object() --> singleton object

// 2. Object literal (most commonly used)
const user = {}; // non-singleton object (object literal)


// Adding properties into object
user.name = "Adarsh";
user.email = "adarsh@gmail.com";
user.isLoggedIn = false;

console.log(user);


// ======================
// NESTED OBJECTS
// ======================

// Objects can also contain other objects

const newUser = {
    username: {
        fullname: {
            firstname: "Adarsh",
            lastname: "Singh"
        }
    },

    email: "rishu@gmail.com",
    isLoggedIn: false
};

console.log(newUser);

// Accessing nested object properties
console.log(newUser.username.fullname);


// ======================
// COMBINING OBJECTS
// ======================

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };


// This creates nested objects
// const newobj = { obj1, obj2 };

/*
Output:
{
   obj1: { a: 1, b: 2 },
   obj2: { c: 3, d: 4 }
}
*/


// Object.assign()

// First parameter -> target object
// Remaining -> source objects

// const newobj = Object.assign({}, obj1, obj2, obj3);


// Modern syntax (used most of the time)
const newobj = { ...obj1, ...obj2, ...obj3 };

console.log(newobj);


// ======================
// ARRAY OF OBJECTS
// ======================

// Data from databases/APIs usually comes
// in form of array of objects

const ar = [
    {
        id: 1,
        email: "a@gmail.com"
    },

    {
        id: 2,
        email: "b@gmail.com"
    },

    {
        id: 3,
        email: "c@gmail.com"
    }
];


// Accessing object inside array
console.log(ar[0].email);


// ======================
// IMPORTANT OBJECT METHODS
// ======================

// Object.keys() -> returns array of keys
const x = Object.keys(newUser);


// Object.values() -> returns array of values
const y = Object.values(newUser);

console.log(x);
console.log(y);


// Object.entries()

/*
Converts object into array format

Example:
{
   name: "Adarsh"
}

becomes:

[
   ["name", "Adarsh"]
]
*/

const z = Object.entries(newUser);

console.log(z);


// ======================
// hasOwnProperty()
// ======================

// Checks whether property exists inside object

console.log(newUser.hasOwnProperty("email"));


// Important Note:
//
// Accessing missing property does NOT crash.
// It returns undefined.

console.log(newUser.age); // undefined


// Crash happens when we try to access
// property of undefined/null

// console.log(newUser.age.value); ❌


// Optional chaining prevents crash

console.log(newUser?.age?.value);