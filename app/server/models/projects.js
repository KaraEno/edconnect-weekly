const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
     this.id = id;
     this.name = name;
     this.abstract = abstract;
     this.authors = authors;
     this.tags = tags;
     this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
      this.errors = []
      let errormsg;
       
      //test for authors
     for (let key in obj){
         if (key == 'authors' && !Array.isArray(obj[key])) {
            errormsg = key + " should be an array";
            this.errors.push(errormsg);
         }
         //test for tags
         else if (key == 'tags' && !Array.isArray(obj[key])){
            errormsg = key + " should be an array";
            this.errors.push(errormsg);
         }
         //test for empty property
         else if (obj[key] == '' || obj[key] == [] || obj[key] == null){
             if (key !== 'authors' && key !== 'tags') {
                errormsg = key + " should be empty";
                this.errors.push(errormsg);  
             }
         }
     }

    //test if all the methods passed
    if(this.errors.length == 0) {
        return true;
    } else{
    return false
    }
    }

}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};