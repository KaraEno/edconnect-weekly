class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
      for (let i = 0; i < this.data.length; i++) {
          const element = this.data[i];
          if (id === element.id) {
            return element;
        }
        return null
      }
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
       for (let i = 0; i < this.data.length; i++) {
           const element = this.data[i];
           if (id === element.id) {
            for(const key in object){
                if (Object.hasOwnProperty.call(obj, key)) {
                   const element = obj[key];
                   this.data[index][key] = item; 
                }
            }
            return true;
        }
        return null;    
       }
    }

    delete(id) {
      for (let i = 0; i < this.data.length; i++) {
          const element = this.data[i];
          if (element.id === id) {
              this.data.splice(i, 1);
              return true;
          }
          return false;
      }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;