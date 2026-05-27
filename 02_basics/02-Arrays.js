// =========================
// ARRAY MERGING / FLATTENING / CONVERSION
// =========================


// =========================
// 1. push (IMPORTANT UNDERSTANDING)
// =========================

const anime = ["JJK", "OnePiece", "OnePunchMan"]
const characters = ["GOJO", "NARUTO", "SUKUNA"]

anime.push(characters)
// push adds entire array as a single element (nested array)

console.log(anime)
// ["JJK","OnePiece","OnePunchMan", ["GOJO","NARUTO","SUKUNA"]]

console.log(anime[3])
// ["GOJO","NARUTO","SUKUNA"]


// =========================
// 2. concat (OLD METHOD)
// =========================

const animeWorld = anime.concat(characters)
// merges arrays into a new array (shallow merge-both get same refrence)

console.log(animeWorld)


// =========================
// 3. SPREAD OPERATOR (MODERN METHOD)
// =========================

const movie = ["Dune", "Eleven", "Transformer"]

const newWorld = [...anime, ...characters, ...movie]
// merges multiple arrays into one flat array

console.log(newWorld)


// =========================
// 4. flat (MULTI-DIMENSION ARRAYS)
// =========================

const multi_dimension_arr = [1, 2, 3, [2, 3, 4], [4, [5, 6]]]

const oneD_arr = multi_dimension_arr.flat(Infinity)
// removes all nested levels and makes a single array

console.log(oneD_arr)


// =========================
// 5. ARRAY CHECK AND CONVERSION
// =========================

console.log(Array.isArray("Adarsh"))
// false

console.log(Array.isArray([1,2,3]))
// true


// string to array
console.log(Array.from("Adarsh"))
// ["A","d","a","r","s","h"]


// IMPORTANT CASE
console.log(Array.from({ name: "Adarsh" }))

// []
// object needs keys or values explicitly

// example idea:
// Array.from(Object.keys(obj))
// Array.from(Object.values(obj))
obj = {
    'name': "Adarsh",
    "course":"BTECH"
}

console.log(Array.from(Object.keys(obj)))


// =========================
// 6. Array.of (IMPORTANT DIFFERENCE)
// =========================

let a = 10
let b = 20
let c = 30

console.log(Array.of(a, b, c))
// [10, 20, 30]

// difference note:
// Array.of(5) -> [5]
// Array(5) -> empty array with length 5