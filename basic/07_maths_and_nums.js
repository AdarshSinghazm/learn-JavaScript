// primitive number
const num = 10.985

// Number object
const num2 = new Number(100)

console.log(num)
console.log(num2)

console.log(typeof num) // number

console.log(typeof num2) // object

console.log(num.toString()) // converts num -> string

console.log(num.toString().length) // now string methods can be used

console.log(num.toFixed(2)) // fixes digits after decimal

console.log(num.toPrecision(3)) // focuses on total digits

const x = 1000000

console.log(x.toLocaleString()) // US format

console.log(x.toLocaleString('en-IN')) // Indian number system



// ================== MATH ==================

console.log(Math)

console.log(Math.PI) // important property

console.log(Math.abs(-4)) // converts negative -> positive

console.log(Math.round(4.32)) // normal rounding

console.log(Math.ceil(4.1)) // upper value

console.log(Math.floor(4.9)) // lower value

console.log(Math.trunc(4.9)) // removes decimal part only

console.log(Math.pow(2,3)) // 2^3

console.log(Math.sqrt(25)) // square root

console.log(Math.max(1,4,3,2,5,6)) // maximum value

console.log(Math.min(1,4,3,2,5,6)) // minimum value



// ================== RANDOM ==================

// Math.random() gives value between 0 and 1

console.log(Math.random())

console.log(Math.floor(Math.random() * 10)) // random num between 0-9

console.log(Math.floor(Math.random() * 6) + 1) // dice game



// random number between min and max

const min = 10
const max = 20

console.log(
    Math.floor(Math.random() * (max - min + 1)) + min
)


// formula explanation:
// max-min+1 => total range
// floor => removes decimal
// +min => shifts range starting point



// ================== NUMBER CHECKS ==================

console.log(Number.isInteger(10)) // true

console.log(Number.isInteger(10.5)) // false

console.log(Number.isNaN("adarsh")) // false

console.log(Number.isNaN(NaN)) // true



// ================== IMPORTANT JS WEIRDNESS ==================

console.log(0.1 + 0.2) // 0.30000000000000004

// floating point precision issue in JS



// ================== REAL WORLD USAGE ==================

// dice game
// OTP generation
// random password
// quiz app
// random color generator
// e-commerce prices
// charts and analytics
// payment calculations



// ================== MOST USED IN WEB DEV ==================

// toFixed()
// toLocaleString()
// Math.random()
// Math.floor()
// Math.ceil()
// Math.round()
// Number.isInteger()

