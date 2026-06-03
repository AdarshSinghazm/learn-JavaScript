// ============================================================
//         JavaScript - for...of  &  for...in  Loops
// ============================================================


// ─────────────────────────────────────────
// 1. for...of Loop
// ─────────────────────────────────────────
// Iterates over VALUES of any iterable (array, string, map, set).

// ✅ On Array
const nums = [1, 2, 3, 4, 5];
for (const num of nums) {
  console.log(num);  // 1, 2, 3, 4, 5
}

// ✅ On String — loops over each character
const greetings = "Hello World!";
for (const greet of greetings) {
  console.log(greet);                    // H, e, l, l, o ...
  // process.stdout.write(greet + " ");  // prints without newline
}

// ✅ On Map — use destructuring [key, value]
const map = new Map();
map.set('IN', 'India');
map.set('US', 'America');
map.set('FR', 'France');
console.log(map);

// ❌ Without destructuring — prints full [key, value] pair as array
for (const keys of map) {
  console.log(keys);  // ['IN', 'India'], ['US', 'America'] ...
}

// ✅ With destructuring — clean key → value output
for (const [key, value] of map) {
  console.log(`${key} -> ${value}`);  // IN -> India, US -> America ...
}


// ─────────────────────────────────────────
// 2. for...in Loop
// ─────────────────────────────────────────
// Iterates over KEYS (property names / indexes).
// Best used on objects. Works on arrays too (gives indexes).

// ✅ On Object — gives keys
const myobj = {
  game1: 'GTA',
  game2: 'NFS'
};

for (const key in myobj) {
  console.log(`Key -> ${key}, Value -> ${myobj[key]}`);
  // Key -> game1, Value -> GTA
  // Key -> game2, Value -> NFS
}

// Alternative: Object.keys() and Object.values() with for...of
// for (const key of Object.keys(myobj))   { console.log(key); }
// for (const val of Object.values(myobj)) { console.log(val); }

// ✅ On Array — gives indexes (not values directly)
const ar = [1, 2, 3, 4, 5];
for (const i in ar) {
  console.log(ar[i], i);  // value, index → 1 '0', 2 '1', 3 '2' ...
}
// Note: index is a string ("0","1",...), not a number

// ❌ for...in on Map — does NOT work (Map is not a plain object)
const map2 = new Map();
map2.set('IN', 'India');
map2.set('US', 'America');

for (const key in map2) {
  console.log(map2[key]);  // prints nothing — for...in can't iterate Map
}
// Use for...of with destructuring on Map instead (see section 1 above)


// ─────────────────────────────────────────
// 3. for...of vs for...in — Quick Difference
// ─────────────────────────────────────────

// for...of → iterates over VALUES  → use on arrays, strings, maps, sets
// for...in → iterates over KEYS    → use on objects (avoid on arrays/maps)


// ============================================================
// SUMMARY
// ─────────────────────────────────────────────────────────────
// for...of  →  values directly   →  array, string, map, set
// for...in  →  keys / indexes    →  objects (not maps)
//
// Map → always use for...of with [key, value] destructuring
// Object → use for...in  OR  for...of with Object.keys/values()
// Array → prefer for...of for values, for...in gives string indexes
// ============================================================