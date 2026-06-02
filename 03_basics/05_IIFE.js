// ============================================================
//         IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// ============================================================

// WHY USE IIFE?
// 1. Immediate Execution  → Run code right when the app starts
//                           (e.g., connecting to a database on startup)
// 2. Avoid Global Pollution → Variables inside IIFE don't leak into
//                             the global scope, keeping your code safe & clean


// ─────────────────────────────────────────────────────────────
// SYNTAX
// ─────────────────────────────────────────────────────────────
// Two pairs of parentheses:
//   ( function )  →  wraps the function (makes it an expression)
//   ( )           →  immediately calls/executes it
//
//   ( fn )()   ←  standard IIFE pattern


// ─────────────────────────────────────────────────────────────
// 1. NAMED IIFE
// ─────────────────────────────────────────────────────────────
(function databaseConnection() {
    console.log("DB connected");
})();
// NOTE: The semicolon at the end is important!
// Without it, if another IIFE follows immediately, JS tries to
// call the return value of the first one as a function → TypeError.
// Example of the problem (without semicolons):
//   (function A(){})()   ← no semicolon
//   (function B(){})()   ← JS reads this as: A()(function B(){})()  → ERROR
// So always end IIFEs with a semicolon to be safe.


// ─────────────────────────────────────────────────────────────
// 2. ARROW FUNCTION IIFE (Anonymous)
// ─────────────────────────────────────────────────────────────
(() => {
    console.log("DB Connected 2");
})();
// Arrow function IIFEs are shorter and more modern.
// They don't have their own `this`, so avoid them when you need
// `this` to refer to the object context.


// ─────────────────────────────────────────────────────────────
// 3. IIFE WITH ARGUMENTS
// ─────────────────────────────────────────────────────────────
((dbName) => {
    console.log(`DB name : ${dbName}`);
})('CloudDatabase');
// You can pass values directly into the second () like a normal function call.
// The argument 'CloudDatabase' maps to the parameter `dbName`.
// Useful when you want to inject config/values without exposing them globally.


// ─────────────────────────────────────────────────────────────
// 4. IIFE WITH MULTIPLE ARGUMENTS
// ─────────────────────────────────────────────────────────────
((dbName, port) => {
    console.log(`Connecting to ${dbName} on port ${port}...`);
})('CloudDatabase', 5432);


// ─────────────────────────────────────────────────────────────
// 5. IIFE RETURNING A VALUE
// ─────────────────────────────────────────────────────────────
const dbStatus = (function () {
    const status = "connected"; // private variable — not accessible outside
    return status;              // only the return value escapes the IIFE
})();

console.log(dbStatus); // "connected"
// This is a classic pattern to create private variables.
// `status` is completely hidden from the outside world.


// ─────────────────────────────────────────────────────────────
// QUICK COMPARISON: Regular Function vs IIFE
// ─────────────────────────────────────────────────────────────

// Regular function — you define it, then call it manually later
function connect() {
    console.log("manual call needed");
}
connect(); // ← you have to remember to call this

// IIFE — defines AND calls itself immediately, no separate call needed
(function () {
    console.log("runs automatically");
})();


// ─────────────────────────────────────────────────────────────
// REAL-WORLD USE CASE
// ─────────────────────────────────────────────────────────────
// When your app starts, connect to DB immediately:

const db = (function (config) {
    console.log(`Connecting to ${config.name} at ${config.host}:${config.port}`);
    // setup logic here...
    return { status: "connected", dbName: config.name };
})({ name: "CloudDatabase", host: "localhost", port: 5432 });

console.log(db.status); // "connected"
// The config object stays private inside the IIFE.
// Only the returned `db` object is accessible outside.