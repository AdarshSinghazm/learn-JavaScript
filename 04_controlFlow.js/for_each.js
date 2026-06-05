// ============================================================
//                    forEach() - NOTES
// ============================================================

// forEach() is an array method that runs a function for each
// element in the array. It does NOT return anything (returns undefined).

// ─────────────────────────────────────────────────────────────
// 1. BASIC SYNTAX
// ─────────────────────────────────────────────────────────────

const ar = ["batman", "superman", "aquaman", "spiderman"];

// (a) Regular function (anonymous)
ar.forEach(function (hero) {
    console.log(hero);
    // no need to write a function name here
});

// (b) Arrow function (cleaner, preferred)
ar.forEach((hero) => {
    console.log(hero);
});

// (c) Single-line arrow (even shorter when body is one line)
ar.forEach((hero) => console.log(hero));

// ─────────────────────────────────────────────────────────────
// 2. PASSING A FUNCTION REFERENCE
// ─────────────────────────────────────────────────────────────

function printme(hero) {
    console.log(hero);
}

ar.forEach(printme); // pass reference — do NOT call it with ()
// ar.forEach(printme()) ❌ — this executes immediately and passes the return value

// ─────────────────────────────────────────────────────────────
// 3. CALLBACK PARAMETERS  →  (element, index, array)
// ─────────────────────────────────────────────────────────────

ar.forEach((hero, index, ar) => {
    console.log(hero, index, ar);
    // "batman"    0   ["batman", "superman", ...]
    // "superman"  1   ["batman", "superman", ...]
    // ...
});

// You can use just (element), or (element, index), or all three
// — JavaScript ignores extra unused params automatically.

// ─────────────────────────────────────────────────────────────
// 4. REAL WORLD — ARRAY OF OBJECTS  [{}, {}, {}]
// ─────────────────────────────────────────────────────────────
// APIs and databases almost always return data in this shape.

const myData = [
    { language: "Java",       filename: "java" },
    { language: "Python",     filename: "py"   },
    { language: "JavaScript", filename: "js"   },
    { language: "C++",        filename: "cpp"  },
];

myData.forEach((item) => {
    console.log(item.filename);     // access any key with dot notation
    console.log(item.language);
});

// With index — useful for numbering output
myData.forEach((item, index) => {
    console.log(`${index + 1}. ${item.language} → .${item.filename}`);
    // 1. Java → .java
    // 2. Python → .py  ...
});

// ─────────────────────────────────────────────────────────────
// 5. DESTRUCTURING INSIDE forEach  (cleaner syntax)
// ─────────────────────────────────────────────────────────────

myData.forEach(({ language, filename }) => {
    console.log(`${language} files end with .${filename}`);
    // Instead of item.language / item.filename every time
});

// ─────────────────────────────────────────────────────────────
// 6. IMPORTANT LIMITATIONS
// ─────────────────────────────────────────────────────────────

// ❌ forEach does NOT return a new array  →  use map() for that
// ❌ forEach cannot be stopped mid-way    →  use for...of or some() for that
// ❌ forEach skips empty slots in sparse arrays
// ✅ Only use forEach when you want a side-effect (log, update DOM, push to another array)

// Example of a common side-effect pattern:
const filenames = [];
myData.forEach((item) => {
    filenames.push(item.filename);  // collecting into another array manually
});
console.log(filenames); // ["java", "py", "js", "cpp"]
// (map() does this in one line — but knowing why forEach is used here matters)

// ─────────────────────────────────────────────────────────────
// 7. forEach vs for...of  (quick comparison)
// ─────────────────────────────────────────────────────────────

// for...of → use when you need break / continue
for (const hero of ar) {
    if (hero === "aquaman") break;  // stops the loop
    console.log(hero);
}

// forEach → use when you just want to run something for every element
ar.forEach((hero) => console.log(hero));  // always runs for all

// ─────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────
// array.forEach(callback)
//   → callback receives: (element, index, originalArray)
//   → returns: undefined  (no chaining like .map or .filter)
//   → use for: logging, DOM updates, pushing to external arrays
//   → avoid for: transforming data (use map), finding items (use find/filter)
// ============================================================