// ============================================================
//         JavaScript Conditionals - if/else & switch
// ============================================================


// ─────────────────────────────────────────
// 1. if Statement
// ─────────────────────────────────────────
// Runs a block of code only if the condition is true.

let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
}


// ─────────────────────────────────────────
// 2. if / else Statement
// ─────────────────────────────────────────
// else runs when the if condition is false.

let isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in.");
}


// ─────────────────────────────────────────
// 3. if / else if / else Statement
// ─────────────────────────────────────────
// Check multiple conditions one by one.

let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 75) {
  console.log("Grade: B");   // ← this runs
} else if (score >= 60) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}


// ─────────────────────────────────────────
// 4. Ternary Operator (shorthand if/else)
// ─────────────────────────────────────────
// Syntax: condition ? valueIfTrue : valueIfFalse

let marks = 45;
let result = marks >= 33 ? "Pass" : "Fail";
console.log(result);  // "Pass"

// Nested ternary (use sparingly - can reduce readability)
let num = 0;
let type = num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero";
console.log(type);  // "Zero"


// ─────────────────────────────────────────
// 5. Logical Operators in Conditions
// ─────────────────────────────────────────
// && = AND  (both must be true)
// || = OR   (at least one must be true)
// !  = NOT  (reverses true/false)

let hasTicket = true;
let isVIP = false;

if (hasTicket && isVIP) {
  console.log("VIP Entry");
} else if (hasTicket || isVIP) {
  console.log("General Entry");  // ← this runs
} else {
  console.log("No Entry");
}

if (!isLoggedIn) {
  console.log("User is NOT logged in.");  // ← this runs
}




// ─────────────────────────────────────────
// 6. switch Statement
// ─────────────────────────────────────────
// Matches one expression against many fixed values.
// Uses strict equality (===) for matching.
// Always add break; to stop fall-through.

let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week");  // ← this runs
    break;
  case "Friday":
    console.log("End of the work week");
    break;
  case "Saturday":
  case "Sunday":                            // multiple cases, same block
    console.log("It's the weekend!");
    break;
  default:                                  // runs if no case matches
    console.log("Midweek day");
}


// ─────────────────────────────────────────
// 7. switch — Fall-Through (No break)
// ─────────────────────────────────────────
// Without break, execution continues into the next case.
// This is usually a bug — always add break unless intentional.

let x = 1;

switch (x) {
  case 1:
    console.log("One");   // ← runs
    // no break here — falls through!
  case 2:
    console.log("Two");   // ← also runs (fall-through)
    break;
  case 3:
    console.log("Three"); // ✗ does not run
    break;
}


// ─────────────────────────────────────────
// 8. switch with return inside a function
// ─────────────────────────────────────────
// Inside a function, you can use return instead of break.

function getDayType(day) {
  switch (day) {
    case "Saturday":
    case "Sunday":
      return "Weekend";
    default:
      return "Weekday";
  }
}

console.log(getDayType("Sunday"));   // "Weekend"
console.log(getDayType("Monday"));   // "Weekday"


// ─────────────────────────────────────────
// 9. if vs switch — When to Use Which
// ─────────────────────────────────────────

// ✅ Use if/else for ranges or complex conditions
let temp = 35;
if (temp > 30) {
  console.log("Hot");
} else if (temp > 20) {
  console.log("Warm");
} else {
  console.log("Cold");
}

// ✅ Use switch for one variable with many fixed values
let color = "red";
switch (color) {
  case "red":   console.log("Stop");  break;
  case "green": console.log("Go");    break;
  case "amber": console.log("Slow");  break;
  default:      console.log("Unknown signal");
}

// ✅ Use ternary for simple one-liner true/false
let userAge = 16;
let access = userAge >= 18 ? "Allowed" : "Denied";
console.log(access);  // "Denied"


// ============================================================
// SUMMARY
// ─────────────────────────────────────────────────────────────
// if/else      → ranges, complex conditions, multiple variables
// switch       → one variable, many exact fixed values
// ternary      → simple true/false in a single line
// break        → always use in switch to prevent fall-through
// ===          → switch uses strict equality (type + value)
// ============================================================