class User {
    constructor(username,email,pass){
        this.username=username
        this.email=email
        this.pass=pass
    }
     encryptPass(){
         return (`${this.pass}abc`);
     }
     changeUsername(){
        return `${this.username.toUpperCase()}`
     }
}

const user1 =  new User("Adarsh","adarsh@fb.com",5066)
console.log(user1);
console.log(user1.encryptPass());
console.log(user1.changeUsername());
console.log(Object.getOwnPropertyNames(User.prototype));



//behind the scene

// function User(username,email,pass){
//     this.username=username
//     this.email=email
//     this.pass=pass
// }
// User.prototype.encrytPass=function(){
//     return (`${this.pass}abc`);
// }
// User.prototype.changeUsername=function(){
//     return `${this.username.toUpperCase()}`
// }

// const user = new User("rishu","rishu@fb.com",5066)
// console.log(user);
// console.log(user.changeUsername());
// console.log(user.encrytPass());


