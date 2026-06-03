// ============================================================
//         JavaScript Loops - for, while, do...while
// ============================================================
 
 
// ─────────────────────────────────────────
// 1. for Loop
// ─────────────────────────────────────────
// Use when you know how many times to loop.
// Syntax: for (initialization; condition; increment)
 
for (let i = 1; i <= 5; i++) {
  console.log(i);  // 1, 2, 3, 4, 5
}
 
// Loop over an array
const fruits = ["apple", "banana", "mango"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
 
 
// ─────────────────────────────────────────
// 2. while Loop
// ─────────────────────────────────────────
// Use when you DON'T know how many times to loop.
// Checks condition BEFORE running the block.
 
let i = 1;
while (i <= 5) {
  console.log(i);  // 1, 2, 3, 4, 5
  i++;
}
 
// ⚠ If condition is never false → infinite loop (crash!)
// Always make sure the condition eventually becomes false.
 
 
// ─────────────────────────────────────────
// 3. do...while Loop
// ─────────────────────────────────────────
// Same as while, BUT runs the block FIRST, checks condition AFTER.
// Guaranteed to run at least once — even if condition is false.
 
let j = 1;
do {
  console.log(j);  // 1, 2, 3, 4, 5
  j++;
} while (j <= 5);
 
// Runs at least once even if condition is false from the start:
let x = 10;
do {
  console.log("runs once:", x);  // ← prints even though 10 > 5
} while (x < 5);
 
 
// ─────────────────────────────────────────
// 4. break & continue
// ─────────────────────────────────────────
// break    → exits the loop immediately
// continue → skips current iteration, moves to next
 
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;   // skips 3
  if (i === 5) break;      // stops at 5
  console.log(i);          // prints 1, 2, 4
}
 
 
// ============================================================
// SUMMARY
// ─────────────────────────────────────────────────────────────
// for        → know exact number of iterations
// while      → condition checked before — may run 0 times
// do...while → condition checked after  — runs at least once
// break      → stop loop early
// continue   → skip current step
// ============================================================
 