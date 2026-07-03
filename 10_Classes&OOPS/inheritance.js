class User {
    constructor(username){
        this.username=username
    }

    displayUserName(){
        console.log(this.username);     
    }
}

class Teacher extends User{
    constructor(username,teacherName,email,pass){
        super(username)
        this.teacherName=teacherName
        this.email=email
        this.pass=pass
    }
     newCourse(){
        console.log(`New course is added by ${this.teacherName}`);
     }
}

const user1 = new User("Adarsh")
user1.displayUserName();

const teacher1=new Teacher("Adarsh","Jai Singh","jai@google.com","1234")
teacher1.newCourse();
teacher1.displayUserName();

console.log(teacher1 instanceof User);


/*
NOTES TO REVISE:

1. extends -> Teacher.prototype is linked to User.prototype (prototype chain).
   Teacher gets everything User has, plus its own methods/fields.

2. super(args) -> calls the PARENT (User) constructor.
   Must be called BEFORE using 'this' anywhere in the child constructor.
   super(username) runs: this.username = username  (on the new Teacher object)

3. teacher1.newCourse() -> found directly on Teacher.prototype.

4. teacher1.displayUserName() -> NOT on Teacher itself.
   JS looks up the prototype chain: teacher1 -> Teacher.prototype -> User.prototype
   Finds it on User.prototype, runs it with 'this' = teacher1,
   so it correctly prints teacher1.username.

5. displayUserName() only console.logs, it doesn't return anything.
   So console.log(user1.displayUserName()) prints TWO lines:
     "Adarsh"      <- from inside displayUserName()
     undefined     <- return value of displayUserName(), logged by the outer console.log
   Fix: just call user1.displayUserName() directly without wrapping in console.log,
   or make the method return the value instead of logging inside it.
*/


/*
// --- User "class" the old way ---
function User(username) {
    this.username = username
}

User.prototype.displayUserName = function () {
    console.log(this.username);
}


// --- Teacher "extends" User the old way ---
function Teacher(username, teacherName, email, pass) {
    // super(username) becomes: manually call User's constructor
    // using .call() so 'this' inside User() points to the new Teacher object
    User.call(this, username)

    this.teacherName = teacherName
    this.email = email
    this.pass = pass
}

// extends -> manually link Teacher.prototype to a User instance
// so Teacher.prototype can access User's methods via the prototype chain
Teacher.prototype = Object.create(User.prototype)

// fix the constructor reference (Object.create wipes it out otherwise)
Teacher.prototype.constructor = Teacher

Teacher.prototype.newCourse = function () {
    console.log(`New course is added by ${this.teacherName}`);
}


// --- usage (identical to class version) ---
const user1 = new User("Adarsh")
console.log(user1.displayUserName());

const teacher1 = new Teacher("Adarsh", "Jai Singh", "jai@google.com", "1234")
console.log(teacher1.newCourse());
console.log(teacher1.displayUserName());
*/