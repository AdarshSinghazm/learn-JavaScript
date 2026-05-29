
let myDate = new Date()
console.log(myDate);
// current date + time (full Date object)



// DATE METHODS (DISPLAY)

console.log(myDate.toString());
// full readable date + time + timezone

console.log(myDate.toDateString());
// only date part (no time)

console.log(myDate.toLocaleDateString());
// date in local format (country-based)

console.log(myDate.toLocaleString());
// date + time in local format


//  TYPE OF DATE
console.log(typeof myDate);
// object (Date is an object in JS)

// =========================
//  CUSTOM DATE CREATION
// =========================

// month starts from 0 (0 = Jan, 4 = May)
let myCreatedDate1 = new Date(2026, 4, 27)
console.log(myCreatedDate1.toDateString());

// string format (recommended for fixed dates)
let myCreatedDate2 = new Date("2023-01-14")
console.log(myCreatedDate2.toLocaleDateString());

// =========================
//  TIMESTAMP (VERY IMPORTANT)
// =========================

let myTimeStamp = Date.now()
console.log(myTimeStamp);
// milliseconds since 1 Jan 1970 (Unix epoch)

// convert to seconds
console.log(Math.floor(myTimeStamp / 1000));

// =========================
// DATE COMPARISON
// =========================

// convert date → milliseconds
console.log(myCreatedDate1.getTime());
// used to compare dates easily with timestamps

// =========================
// CUSTOM FORMATTING (Intl API)
// =========================

let newDate = new Date();

console.log(newDate.toLocaleString());
// default local format

console.log(
  newDate.toLocaleString('default', {
    weekday: "long"
  })
);
// returns weekday name (e.g., Wednesday)


// REAL WORLD USE CASES
// =========================

//  timers / countdown (quizzes, exams)
// e-commerce (order time, delivery ETA, expiry coupons)
// chat apps (message time, seen status)
// analytics (login time, session tracking)
// security (OTP expiry, session timeout)


// Date = object for display
// Timestamp = logic (comparison, calculation)
// Everything is based on milliseconds since 1 Jan 1970