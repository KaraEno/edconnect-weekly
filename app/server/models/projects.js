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
      this.error = []
      let errormsg;
       
      //test for authors
      if (Array.isArray(obj.authors) == false) {
          errormsg = "Authors should be an array";
          this.error.push(errormsg)
      }

      //test for tags
      if (Array.isArray(obj.tags) == false) {
          errormsg = "Tags should be an array"
          this.error.push(errormsg)
      }

      //test for empty property
      Object.keys(obj).forEach(key => {
          if (obj[key] == '') {
              errormsg = `(${key} cannot be empty)`
              this.errors.push(errormsg)
          }
      });

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