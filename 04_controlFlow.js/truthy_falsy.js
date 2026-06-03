// ============================================================
//     JavaScript - Truthy, Falsy & Related Concepts
// ============================================================


// ─────────────────────────────────────────
// 1. Falsy Values
// ─────────────────────────────────────────
// These 6 values are ALWAYS false in a boolean context (if, &&, ||, ternary)

console.log("--- Falsy Values ---");
if (false)      { } else { console.log("false     → falsy") }
if (0)          { } else { console.log("0         → falsy") }
if (-0)         { } else { console.log("-0        → falsy") }
if (0n)         { } else { console.log("0n        → falsy (BigInt zero)") }
if ("")         { } else { console.log("''        → falsy (empty string)") }
if (null)       { } else { console.log("null      → falsy") }
if (undefined)  { } else { console.log("undefined → falsy") }
if (NaN)        { } else { console.log("NaN       → falsy") }


// ─────────────────────────────────────────
// 2. Truthy Values
// ─────────────────────────────────────────
// Everything that is NOT falsy is truthy.

console.log("\n--- Truthy Values ---");
if (true)        { console.log("true        → truthy") }
if (1)           { console.log("1           → truthy") }
if (-1)          { console.log("-1          → truthy") }
if ("hello")     { console.log("'hello'     → truthy") }
if (" ")         { console.log("' '         → truthy (space string!)") }
if ([])          { console.log("[]          → truthy (empty array!)") }
if ({})          { console.log("{}          → truthy (empty object!)") }
if (function(){}) { console.log("function   → truthy") }
if (Infinity)    { console.log("Infinity    → truthy") }

// ⚠ Common Mistake: empty array [] and empty object {} are TRUTHY!
// To check if they are empty, use .length or Object.keys()


// ─────────────────────────────────────────
// 3. How to Check if an Array is Empty
// ─────────────────────────────────────────
// ❌ Wrong way — [] is truthy, so this never works
const arr = [];
if (arr) {
  console.log("\n[] is truthy — this always runs, even when empty!");
}

// ✅ Correct way — check the length
if (arr.length === 0) {
  console.log("Array is empty");
}

if (arr.length > 0) {
  console.log("Array has items");
} else {
  console.log("Array is empty");  // ← this runs
}

// Example with items
const fruits = ["apple", "banana"];
if (fruits.length === 0) {
  console.log("No fruits");
} else {
  console.log("Fruits available:", fruits.length);  // ← this runs
}


// ─────────────────────────────────────────
// 4. How to Check if an Object is Empty
// ─────────────────────────────────────────
// ❌ Wrong way — {} is truthy, so this always passes
const obj = {};
if (obj) {
  console.log("\n{} is truthy — this always runs, even when empty!");
}

// ✅ Correct way — use Object.keys() to get array of keys
console.log(Object.keys(obj));           // [] — empty array
console.log(Object.keys(obj).length);    // 0

if (Object.keys(obj).length === 0) {
  console.log("Object is empty");  // ← this runs
}

// Example with a non-empty object
const user = { name: "Ravi", age: 21 };
console.log(Object.keys(user));          // ["name", "age"]
console.log(Object.keys(user).length);   // 2

if (Object.keys(user).length === 0) {
  console.log("User object is empty");
} else {
  console.log("User object has data");   // ← this runs
}

// Other Object methods for reference:
// Object.values(obj)  → returns array of values
// Object.entries(obj) → returns array of [key, value] pairs


// ─────────────────────────────────────────
// 5. Nullish Coalescing Operator (??)
// ─────────────────────────────────────────
// Returns the RIGHT side only if the LEFT side is null or undefined.
// It does NOT treat 0, false, or "" as null — unlike || (OR operator).
// Syntax: leftValue ?? fallbackValue

console.log("\n--- Nullish Coalescing (??) ---");

let a = 5 ?? 10;
console.log(a);          // 5  → 5 is not null/undefined, so use 5

a = null ?? 10;
console.log(a);          // 10 → null on left, so use right side

a = undefined ?? 10;
console.log(a);          // 10 → undefined on left, so use right side

a = undefined ?? null;
console.log(a);          // null → undefined on left, right side is null, so returns null

a = 0 ?? 99;
console.log(a);          // 0  → 0 is NOT null/undefined, so use 0

a = "" ?? "default";
console.log(a);          // "" → empty string is NOT null/undefined, so use ""

a = false ?? true;
console.log(a);          // false → false is NOT null/undefined, so use false


// ─────────────────────────────────────────
// 6. ?? vs || (OR Operator)
// ─────────────────────────────────────────
// || returns right side if left is ANY falsy value (0, "", false, null, undefined, NaN)
// ?? returns right side ONLY if left is null or undefined

console.log("\n--- ?? vs || ---");

let score = 0;

console.log(score || 100);   // 100 ← 0 is falsy, so || skips it (WRONG for scores!)
console.log(score ?? 100);   // 0   ← 0 is NOT null/undefined, so ?? keeps it (CORRECT!)

let username = "";

console.log(username || "Guest");  // "Guest" ← empty string is falsy
console.log(username ?? "Guest");  // ""      ← empty string is not null/undefined

// Rule of thumb:
// Use ?? when 0, false, "" are VALID values you want to keep
// Use || when ANY falsy value should trigger the fallback


// ─────────────────────────────────────────
// 7. Optional Chaining with ?? (Bonus)
// ─────────────────────────────────────────
// Safely access nested properties without crashing

const person = null;

// ❌ This would throw: Cannot read properties of null
// console.log(person.name);

// ✅ Use optional chaining ?. with ??
console.log("\n--- Optional Chaining + ?? ---");
console.log(person?.name ?? "No name");     // "No name"
console.log(person?.age  ?? 0);             // 0

const student = { name: "Anjali", address: { city: "Jaipur" } };
console.log(student?.address?.city ?? "City not found");   // "Jaipur"
console.log(student?.address?.pin  ?? "PIN not found");    // "PIN not found"


// ─────────────────────────────────────────
// 8. Practical Examples
// ─────────────────────────────────────────

console.log("\n--- Practical Examples ---");

// Safe default values
function greetUser(name) {
  let displayName = name ?? "Guest";
  console.log("Hello,", displayName);
}
greetUser("Rahul");      // Hello, Rahul
greetUser(null);         // Hello, Guest
greetUser(undefined);    // Hello, Guest

// Processing only if array has data
const items = [];
if (items.length === 0) {
  console.log("Cart is empty, nothing to process.");
}

// Safe API response handling
const apiResponse = null;
const data = apiResponse ?? { users: [], total: 0 };
console.log(data);  // { users: [], total: 0 }


// ============================================================
// SUMMARY
// ─────────────────────────────────────────────────────────────
// Falsy values (8):  false, 0, -0, 0n, "", null, undefined, NaN
// Truthy values:     everything else (including [], {}, " ")
//
// Check empty array:  arr.length === 0
// Check empty object: Object.keys(obj).length === 0
//
// ?? (Nullish):  returns right side only if left is null/undefined
// || (OR):       returns right side if left is ANY falsy value
//
// Use ?? to safely protect against null/undefined only
// Use || when any falsy value should trigger the fallback
// ============================================================