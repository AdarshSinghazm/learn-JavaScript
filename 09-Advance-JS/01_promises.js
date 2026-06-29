// const promiseOne = new Promise(function(resolve,reject){
//     //DB call cryptography netwrk etc
//     setTimeout(function(){
//         console.log("Async task done");
//         resolve()
//     },1000)
// })

// promiseOne.then(function(){  // then is connected to resolve
//     console.log("Promise consumed");  
// })

// // can do without storing it in a variable
// new Promise(function(resolve,reject){
//     setTimeout(function(){
//         console.log("Async 2 done");
//         resolve()
//     },1000)
// }).then(function(){
//     console.log("Async 2 resolved");
// })

// // real world things
// const promiseThree = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve({username:"Adarsh",email:"adarsh@gmail.com"})  // most of the time u will get object
//     },1000)
// })

// promiseThree.then(function(user){
//     console.log(user);
// })

// const promiseFour = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let error = true
//         if(!error){
//             resolve({name:"Adarsh",password:"5066"})
//         }
//         else{
//             reject('Not able to fetch data')
//         } 
//     },1000)
// })

// promiseFour.then(function(user){
//     console.log(user);
//     return user.name
// }).then(function(name){
//     console.log(name);
// }).catch(function(err){
//     console.log(err);
// }).finally(function(){
//     console.log("Promise is either resolved or rejected");
// })

// const promiseFive = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let error =true
//         if(!error){
//             resolve({name:"Rishu",age:21})
//         }
//         else reject("Error: Something went wrong")
//     },1000)
// })

// async function consumePromiseFive() {
//     try {
//         const reponse = await promiseFive
//         console.log(reponse);
//     } catch (error) {
//         console.log(error); 
//     }
// }
// consumePromiseFive()


// lets see a real exp
// const newPromise = fetch('https://jsonplaceholder.typicode.com/users')
// newPromise.then(function(user){
//     return user.json()
// }).then(function(user){
//     console.log(user[0]);
// }).catch(function(err){
//     console.log(`Error : ${err}`);
// }).finally(function(){
//     console.log("Promise is either resolve or rejected");
// })

// now with async await


async function getUserDetail() {
    try {
        const reponse = await fetch('https://jsonplaceholder.typicode.com/users')
        const data =  await reponse.json()
        console.log(data);
    } catch (error) {
        console.log((`Err:${error}`));     
    }
}
getUserDetail()