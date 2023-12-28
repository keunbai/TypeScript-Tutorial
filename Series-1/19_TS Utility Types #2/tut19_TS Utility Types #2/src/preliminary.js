//! function
function addFullName(name) {
  return {
    ...name,
    fullName: `${name.first} ${name.last}` 
  }
}

function getFullNameObjects(iterFunc, data) {
  // return data.map(iterFunc);   //! ok
  return data.map((item) => iterFunc(item));
}

const records = getFullNameObjects(addFullName, [            
  {first: 'kb', last: 'lee'}, 
  {first: 'jm', last: 'hong'}
]);
console.log(records);
console.log(records.map((item) => item.fullName));
console.log('\n');

//! class
class PersonWithFullName {
  constructor(name) {
    this.name = name;
  } 

  get fullName() {    // Accessor property - getter
    return `${this.name.first} ${this.name.last}`; 
  }
}

function getFullNameObjects2(iterClass, data) {
  return data.map((item) => new iterClass(item));
}

const records2 = getFullNameObjects2(PersonWithFullName, [
  {first: 'kb', last: 'lee'}, 
  {first: 'jm', last: 'hong'}  
]);

console.log(records2);
console.log(records2.map((item) => item.fullName));



