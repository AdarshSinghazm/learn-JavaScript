
// normal way
const name1 = "Adarsh"
const name2 = " Singh"
const rollno = 2415000075

console.log(name1 + name2) 
// old style concatenation
// works fine but not preferred


// ======================================
// TEMPLATE LITERALS (MOSTLY USED)
// ======================================

console.log(`hi my name is ${name1}${name2} and my roll no is ${rollno}`)

// use backticks ``
// ${} is used to inject variables
// modern and cleaner than +
// heavily used in frontend


// ======================================
// STRING DECLARATION
// ======================================

// primitive string
const game1 = "LastHope"

// string object
const game2 = new String("LastHope")

// ======================================
// AUTO BOXING IN JAVASCRIPT
// ======================================

// primitive string
const game1 = "LastHope"

console.log(typeof game1)
// string


// even though game1 is primitive,
// methods still work

console.log(game1.toUpperCase())


// WHY?

// JS temporarily converts primitive
// into String object behind the scenes

// internally JS does something like:

new String(game1).toUpperCase()


// this temporary conversion is called:

// AUTO BOXING


// after method execution,
// temporary object gets destroyed


// ======================================
// IMPORTANT
// ======================================

// primitive string != String object

const a = "hello"
const b = new String("hello")

console.log(typeof a)
// string

console.log(typeof b)
// object


// comparison difference

console.log(a == b)
// true

console.log(a === b)
// false


// ======================================
// REAL WORLD RULE
// ======================================

// always use primitive strings

const name = "Adarsh"

// avoid:

const name2 = new String("Adarsh")


// same rule for:
// new Number()
// new Boolean()


console.log(game2.length)

// gives prototype and methods
console.log(game2.__proto__)


// ======================================
// IMPORTANT STRING METHODS
// ======================================

const str = "Adarsh-Singh"


// --------------------------------------
// substring(start,end)
// negative value not allowed
// if start > end => JS swaps them
// end excluded
// --------------------------------------

console.log(str.substring(0,4))
// Adar


// --------------------------------------
// slice(start,end)
// accepts negative values
// negative means counting from end
// if start > end => returns ""
// end excluded
// --------------------------------------

console.log(str.slice(-4,-1))
// ing


// ======================================
// trim()
// removes extra spaces from start/end
// important in forms and user input
// ======================================

console.log("   adarsh   ".trim())


// ======================================
// replace()
// replaces ONLY FIRST occurrence
// ======================================

const url = "https//Adarsh%20Singh%20.com"

console.log(url.replace("%20","-"))
// replaces first %20 only


// ======================================
// replaceAll()
// replaces all occurrences
// ======================================

console.log(url.replaceAll("%20","-"))


// ======================================
// includes()
// checks if value exists
// returns true/false
// ======================================

console.log(url.includes("Adarsh"))


// ======================================
// split()
// converts string -> array
// very important in web dev
// ======================================

const x = "Adarsh-Singh-18-er"

const ar = x.split('-')

console.log(ar)
console.log(ar[1])


// ======================================
// at()
// modern way to access chars
// supports negative indexing
// ======================================

console.log(url.at(-1))

// url[-1] => undefined
// but at(-1) works


// ======================================
// split + join combo
// heavily used in frontend
// ======================================

const p = "Adarsh Singh"

const q = p.split(' ')

console.log(q)

const s = q.join('-')

console.log(s)


// ======================================
// startsWith() and endsWith()
// useful in validation
// ======================================

let file = "photo.png"

console.log(file.endsWith(".png"))
console.log(file.startsWith("photo"))


// ======================================
// charCodeAt()
// gives ASCII/Unicode value
// useful later in DSA
// ======================================

console.log(file.charCodeAt(0))


// ======================================
// IMPORTANT JS STRING FACTS
// ======================================

// strings are immutable
// original string never changes

let a = "hello"

a.toUpperCase()

console.log(a)
// still hello


// ======================================
// ESCAPE CHARACTERS
// ======================================

console.log("hello\nworld")

console.log("hello\tworld")

console.log("He said \"Hello\"")


// ======================================
// STRING + NUMBER WEIRD JS BEHAVIOR
// ======================================

console.log("1" + 2);
// 12

console.log("1" - 2);
// -1

// JS auto type conversion happens


// ======================================
// MOST USED METHODS IN WEB DEV
// ======================================

// slice()
// split()
// join()
// replace()
// includes()
// trim()
// startsWith()
// endsWith()
// at()
