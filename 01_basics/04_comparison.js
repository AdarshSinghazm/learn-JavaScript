
/*
 basic comparison operators

 ==   -> check only value
 ===  -> check value + datatype
 >    -> greater than
 <    -> smaller than
 >=   -> greater than equal to
 <=   -> smaller than equal to
*/
console.log(2 == 2);   // true
console.log(1 < 2);    // true
console.log(1 > 2);    // false
console.log(1 <= 2);   // true
console.log(1 >= 2);   // false


/*
 JS automatically converts string to number
 in comparison operators
*/
console.log("2" > 1);    // true
console.log("02" > 1);   // true
/*
 internally:

 "2"  -> 2
 "02" -> 2
*/


/*
 confusing cases with null in comparison operators:null behaves like 0
 but in == comparison : null only equals undefined
 reason:null >= 0 ,becomes: 0 >= 0
*/
console.log(null == 0);   // false
console.log(null > 0);    // false
console.log(null < 0);    // false
console.log(null >= 0);   // true



/*
 undefined gives false in almost all comparisons
 because it converts into NaN
 reason:undefined >= 0 ,becomes: NaN >= 0
*/
console.log(undefined < 0);   // false
console.log(undefined>0);   // false
console.log(undefined >= 0);   // false
console.log(undefined == 0);  // false


/*
 difference between == and ===

 ==  -> checks only value
 === -> checks value + datatype
*/
console.log(2 == "2");    // true
console.log(2 === "2");   // false


/*
 == and comparison operators both mostly do conversion first

 but == behaves differently for null and undefined
 
 null == undefined -> true
 null == 0 -> false
*/