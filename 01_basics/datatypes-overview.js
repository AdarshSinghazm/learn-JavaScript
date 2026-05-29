
/*
 PRIMITIVE DATATYPES (Call by value)
 number
 string
 boolean
 null
 undefined
 symbol
 bigint
*/


const num = 2;
const str = "Adarsh";
const bool = true;
let x; 
// const x; -> error
// because const must be initialized

const BigInteger = 99n;
// add "n" at end for bigint


/*
 SYMBOL:

 used to create unique values
 even if values inside are same,
 symbols are always unique
*/

const symbol1 = Symbol("1234");
const symbol2 = Symbol("1234");
console.log(symbol1 === symbol2); // false


/*
 typeof results
*/

console.log(typeof BigInteger); // bigint
console.log(typeof null); // object (known JS bug)
console.log(typeof undefined); // undefined
console.log(typeof symbol1); // symbol


/*
 NON-PRIMITIVE DATATYPES(Call by refrence)
 mostly their type is "object"
 Array
 Object
 Function
*/

// ARRAY
let arr = ["adarsh", "rishu", "daddy"];

// FUNCTION
const myFun = function () {
    console.log("hello world")
}

// OBJECT
let myobj = {
    "name": "adarsh",
    "class": 12,
    "Gender": "Male"
};


 // typeof results

console.table([
    typeof arr,     // object
    typeof myFun,   // function
    typeof myobj    // object
]);
