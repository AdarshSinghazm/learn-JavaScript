// Rest operator
// so basically in real world when u are working on a project... lets say u are making a ecommerce website.. and u have to calculate cart price.. u dont know how many item customer will add in cart .. so to hadle this--> Rest Operator
 
function calculateCartPrice(...nums){
        return nums; // this will return a array
}
console.log(calculateCartPrice(200,300,400,500))
 
function calculateCartPrice2(val1,val2,...nums){
        return `val1 : ${val1}, val2 : ${val2}, nums : ${nums}`; // rest will go in nums
}
console.log(calculateCartPrice2(200,300,400,500))


// way to handle object in JS
 user ={
    name:"Adarsh",
    price:"2000"
 }
 // TYpe safety is necesssary so.. in functionn u always check for type safety that object u are calling is of object or not.. properies u want to access is prest in that object or not.. all that thing.. in Type script these things are inbuilt..we will handle all this when we leanr conditonals and loops..

 function objectHandle(anyObject){
     console.log(`Name is ${anyObject.name} and Price is ${anyObject.price}`);
 }
 objectHandle(user)

 // array passed in functions
const ar = [1,2,3,4,5]
 function findSecondElement(getArray){
    console.log(getArray[1]);
 }
 findSecondElement(ar) 

 // u can directly pass array and object without storing them in a variable