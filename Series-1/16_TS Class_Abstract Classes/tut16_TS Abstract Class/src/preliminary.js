//* ---------------------------------
//! Accessor property (getter, setter) 
//*   ref) https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-getter-setter-%EB%9E%80
//* ---------------------------------

//! Case1 
let person = {
  // Data property
  firstName: "John",
  lastName: "Doe",
  
  // Accessor property
  get fullName() {
    return this.firstName + " " + this.lastName;
  },

  set fullName(name) {
    let names = name.split(" ");
    this.firstName = names[0];
    this.lastName = names[1];
  }
};

console.log(person.firstName); // "John" 
console.log(person.lastName);  // "Doe" 

console.log(person.fullName);  // "John Doe" 
person.fullName = "Jane Doe";  // Setter 호출
console.log(person.fullName);  // "Jann Doe" 


//! Case2 
let person2 = {
  // Data property
  
  // Accessor property
  get fullName() {
    return 'Keunbai' + " " + 'Lee';
  }
};

console.log(person2.fullName);  // "Keunbai Lee" 
