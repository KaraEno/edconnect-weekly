const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
       this.id = id;
       this.firstname = firstname;
       this.lastname = lastname;
       this.email = email;
       this.password = password;
       this.matricNumber = matricNumber;
       this.program = program;
       this.graduationYear = graduationYear;
    }

    getFullName() {
      return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
     let authen = this.data.find((key) => key.email == email && key.password == password) 
          return authen? true : false
    }

    getByEmail(email) {
        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            if (email === element.email) {
                return element;  
              }
        }
        return null;
    }

    getByMatricNumber(matricNumber) {
       for (let i = 0; i < this.data.length; i++) {
           const element = this.data[i];
           if (matricNumber === element.matricNumber) {
            return element;
        }
       }
       return null;
    }

    validate(obj) {
      this.errors = []
      let errormsg;
      let  emptytest,emailtest,mntest,pwtest = false

       //test for empty propery
       Object.keys(obj).forEach(key => {
        if (obj[key] == '') {
          emptytest = true;
            errormsg = `${key} cannot be empty`
            this.errors.push(errormsg)
        }
    })  
     //test for same email
    this.data.forEach(key => {
      if (obj.email == key.email) {
        emailtest = true;
        errormsg = `A user with ${obj.email} already exist`;
        this.errors.push(errormsg)
      }
    })
     //test for matricNumber
     this.data.forEach(key => {
       if (obj.matricNumber == key.matricNumber) {
         mntest = true;
         errormsg = `A user with ${obj.matricNumber} already exist`;
         this.errors.push(errormsg)
       }
     })

     // test for password
     if (obj.password.length < 7) {
       pwtest = true;
       errormsg = `Password should have at least 7 characters`;
       this.errors.push(errormsg)
     }
     
     if (emptytest || emailtest || mntest || pwtest ) {
       return false;
     }
     return true;
    }
    
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};