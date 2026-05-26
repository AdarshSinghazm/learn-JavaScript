
/*
 converting any datatype to Number;
 1. "33"       -> 33
 2. ""         -> 0
 3. "Adarsh"   -> NaN
 4. null       -> 0
 5. undefined  -> NaN
 6. true       -> 1
    false      -> 0
 NOTE:
 after conversion datatype becomes "number"
 even NaN type is also "number"
*/

let score = undefined;
let score_num = Number(score);
console.log(typeof score_num);
console.log(score_num);


/*
 converting any datatype to Boolean;

 1. 1 or any non-zero value -> true
 2. 0                       -> false
 3. ""                      -> false
 4. "Adarsh"                -> true
 5. null                    -> false
 6. undefined               -> false
 7. NaN                     -> false

 NOTE:
 almost everything is true except:
 false, 0, "", null, undefined, NaN
*/

let score2 = undefined;
let bool_score = Boolean(score2);
console.log(typeof bool_score);
console.log(bool_score);


/*
 converting any datatype to String;

 1. 33         -> "33"
 2. null       -> "null"
 3. undefined  -> "undefined"
 4. true       -> "true"
 5. false      -> "false"

 NOTE:
 after conversion datatype becomes "string"
*/

let score3 = true;
let str_score = String(score3);
console.log(typeof str_score);
console.log(str_score);


/*
 IMPORTANT:
 JS also does implicit conversion automatically
*/

console.log("1" + 2);    // "12"
console.log("1" - 2);    // -1  (-, *, / -->JavaScript tries numeric conversion.)
console.log("1"+2+2);    // 122
console.log(1+2+"2");    //32
console.log(+true);      //1
console.log(+"");        //0
console.log(true + 1);   // 2
console.log(null + 1);   // 1


// ****************************PREFIX/POSTFIX*************************************
let p=3;
const q=p++;
console.log(`p:${p},q:${q}`);  // here p->3,q->4

let p=3;
const q=++p;
console.log(`p:${p},q:${q}`); // here p->4,q->4


