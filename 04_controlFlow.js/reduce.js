/*
What is reduce()?

reduce() combines multiple values into a SINGLE result.

Think:

map()    -> many values -> many values
filter() -> many values -> fewer values
reduce() -> many values -> ONE value
*/


// =============================================================
// Syntax
// =============================================================

/*
array.reduce((accumulator, currentValue) => {
    return updatedAccumulator;
}, initialValue);
*/


// =============================================================
// Parameters
// =============================================================

/*
accumulator (acc)
    -> stores the running result

currentValue (curr)
    -> current element being processed

initialValue
    -> starting value of accumulator
*/


// =============================================================
// Example 1: Sum of Array
// =============================================================

const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => {
    return acc + curr;
}, 0);

console.log(sum); // 10


/*
Dry Run:

acc = 0, curr = 1  -> return 1
acc = 1, curr = 2  -> return 3
acc = 3, curr = 3  -> return 6
acc = 6, curr = 4  -> return 10

Final Answer = 10
*/


// =============================================================
// Important Concept
// =============================================================

/*
Whatever you return becomes the next accumulator.

Example:

return acc + curr;

The returned value is stored in acc
for the next iteration.
*/


// =============================================================
// Short Form
// =============================================================

const total = nums.reduce(
    (acc, curr) => acc + curr,
    0
);

console.log(total);


// =============================================================
// Example 2: Find Maximum Element
// =============================================================

const arr = [10, 5, 20, 8, 30];

const max = arr.reduce((acc, curr) => {
    return Math.max(acc, curr);
});

console.log(max); // 30


// =============================================================
// Example 3: Find Minimum Element
// =============================================================

const min = arr.reduce((acc, curr) => {
    return Math.min(acc, curr);
});

console.log(min); // 5


// =============================================================
// Real World Example: Shopping Cart
// =============================================================

const cart = [
    { item: "Mouse", price: 500 },
    { item: "Keyboard", price: 1000 },
    { item: "Monitor", price: 5000 }
];

const cartTotal = cart.reduce((acc, item) => {
    return acc + item.price;
}, 0);

console.log(cartTotal); // 6500


/*
Dry Run:

acc = 0      + 500  = 500
acc = 500    +1000  = 1500
acc = 1500   +5000  = 6500
*/


// =============================================================
// Example 4: Count Occurrences
// =============================================================

const fruits = [
    "apple",
    "banana",
    "apple",
    "apple",
    "banana"
];

const frequency = fruits.reduce((acc, fruit) => {

    acc[fruit] = (acc[fruit] || 0) + 1;

    return acc;

}, {});

console.log(frequency);

/*
Output:

{
    apple: 3,
    banana: 2
}
*/


// =============================================================
// Example 5: Build a String
// =============================================================

const words = ["I", "love", "JavaScript"];

const sentence = words.reduce((acc, curr) => {
    return acc + " " + curr;
});

console.log(sentence);

// "I love JavaScript"


// =============================================================
// Common Mistake
// =============================================================

const wrong = nums.reduce((acc, curr) => {
    acc + curr;
}, 0);

console.log(wrong);

/*
Output:

undefined

Reason:
You forgot to return.

Always return the updated accumulator.
*/


// =============================================================
// Quick Revision
// =============================================================

/*
forEach()
-> Perform an action

filter()
-> Select elements

map()
-> Transform elements

reduce()
-> Combine elements into one result


Most Common Uses of reduce():

1. Sum
2. Product
3. Maximum
4. Minimum
5. Count Frequencies
6. Shopping Cart Total
7. Build Objects
8. Build Strings


Mental Model:

reduce() says:

"Give me an accumulator.
I will visit every element.
You tell me how to update it.
I'll return the final result."
*/