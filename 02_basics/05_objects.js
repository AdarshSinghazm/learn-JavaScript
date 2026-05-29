
// ======================
// OBJECT DESTRUCTURING
// ======================

// Destructuring is used to extract values
// from objects easily

// Very commonly used in:
// React
// APIs
// Backend responses

const game = {
    inGameName: "LastHope",
    realName: "Adarsh Singh",
    gameName: "BGMI"
};


// Normal way to access object property
console.log(game.inGameName);


// ======================
// OBJECT DESTRUCTURING
// ======================

// Syntax:
// const {propertyName} = objectName

const { inGameName } = game;

console.log(inGameName);


// ======================
// RENAMING DURING DESTRUCTURING
// ======================

// We can also rename extracted property

const { inGameName: IGN } = game;

// IGN now refers to inGameName

console.log(IGN);


// ======================
// APIs AND JSON
// ======================

// Data coming from APIs is usually
// in JSON format

/*
JSON = JavaScript Object Notation

JSON looks similar to JS objects
but keys are generally written in strings
*/


// Example JSON

/*
{
    "name": "Adarsh",
    "course": "Btech",
    "company": "FAANG"
}
*/


// ======================
// REAL API DATA
// ======================

// Most APIs return:
// Array of objects

/*
[
    {
        "id": 1,
        "name": "Adarsh"
    },

    {
        "id": 2,
        "name": "Rishu"
    }
]
*/


// Accessing API data

/*
data[0].name
data[1].name
*/


// Important:
//
// JSON is used for data transfer
// between frontend and backend
// we will learn about API later in more detail
