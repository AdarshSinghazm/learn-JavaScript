
// ======================
// REST OPERATOR (...)
// ======================

// Real world use case:
//
// Suppose you are building an e-commerce website.
// You need to calculate cart total price.
//
// Problem:
// You don't know how many items
// the customer will add to cart.
//
// To handle variable number of arguments,
// we use Rest Operator (...)


function calculateCartPrice(...nums) {

    // Rest operator collects all values
    // into an array

    return nums;
}

console.log(calculateCartPrice(200, 300, 400, 500));


// Output:
// [200, 300, 400, 500]


// ======================
// REST WITH NORMAL PARAMETERS
// ======================

function calculateCartPrice2(val1, val2, ...nums) {

    // First two values go into:
    // val1 and val2

    // Remaining values go into nums

    return `val1 : ${val1}, val2 : ${val2}, nums : ${nums}`;
}

console.log(calculateCartPrice2(200, 300, 400, 500));


// Output:
// val1 : 200
// val2 : 300
// nums : 400,500


// ======================
// PASSING OBJECTS TO FUNCTIONS
// ======================

// In real projects,
// functions often receive objects.

const user = {
    name: "Adarsh",
    price: 2000
};


// Type safety is important.
//
// Before accessing object properties,
// make sure:
// - argument is actually an object
// - required properties exist
//
// TypeScript helps with this automatically.

function objectHandle(anyObject) {

    console.log(
        `Name is ${anyObject.name} and Price is ${anyObject.price}`
    );
}

objectHandle(user);


// We can also directly pass object

objectHandle({
    name: "Rishu",
    price: 5000
});


// ======================
// PASSING ARRAYS TO FUNCTIONS
// ======================

const ar = [1, 2, 3, 4, 5];

function findSecondElement(getArray) {

    console.log(getArray[1]);
}

findSecondElement(ar);


// Directly passing array

findSecondElement([10, 20, 30, 40]);


// ======================
// IMPORTANT NOTES
// ======================

// ...nums
// -> Rest Operator
// -> Collects multiple values into array
