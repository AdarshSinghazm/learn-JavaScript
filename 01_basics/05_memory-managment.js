/* There are two types of memory in JS
1. Stack -> Primitive datatypes
2. Heap -> Non-primitive datatypes
*/


/* In primitive datatypes u get copy of value */

let name1 = "Adarsh";
let name2 = name1;
name2 = "Rishu";
console.table([name1, name2]);

// name1 will not change because name2 gets copy of name1




/* In non-primitive datatypes u get reference of original object */

let userOne = {
    "name": "Adarsh",
    "gmail": "adarsh@gmail.com"
};

let userTwo = userOne;
userTwo.gmail = "rishu@gmail.com";
console.table([userOne.gmail, userTwo.gmail]);

// both values changed because both variables point to same object in heap memory