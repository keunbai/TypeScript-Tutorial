//* =================================
//! Readonly & Static in TypeScript Classes 
//* =================================


//* ---------------------------------
//! Readonly in TS class
//* ---------------------------------
/*
class Doggy {
  // 초기화 1
  //readonly name: string = '';
  //age: number;
  
  //constructor(name: string, age: number) {
  // this.name = name;
  // this.age = age;
  //}

  // 초기화 2
  constructor(
    public readonly name: string = '',
    public age: number 
  ) {}
}

const lg = new Doggy('LG', 13);
//lg.name = 'LGG'    //? 不可
*/


//* ---------------------------------
//! Static member & method in TS class
//* ---------------------------------

//! Preliminary
/*
class Doggy {
  constructor(
    public readonly name: string = '',
    public age: number 
  ) {}
}

class DogList {
  //private doggies: Doggy[] = [];

  constructor (
    private doggies: Doggy[] = []      //! '클래스' 배열을 멤버로
  ) {}

  addDog(dog: Doggy) {
    this.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

//
const lg = new Doggy('LG', 13);
const puddle = new Doggy('PUDDLE', 8);
console.log(lg);

const dl = new DogList();
dl.addDog(lg);
dl.addDog(puddle);
dl.addDog(new Doggy('DOBERMAN', 3));
//dl.doggies.push(new Doggy('CHIHUAHUA', 5));    //? private member -> 不可
console.log(dl.getDogs());
*/


//! static member in class 
/*
class Doggy {
  constructor(
    public readonly name: string = '',
    public age: number 
  ) {}
}

class DogList {
  //private doggies: Doggy[] = [];  
  //private constructor () {}

  private constructor (
    private doggies: Doggy[] = []
  ) {}

  static instance: DogList = new DogList()   //! static member

  addDog(dog: Doggy) {                  
    this.doggies.push(dog);    
  }

  getDogs() {
    return this.doggies;
  }
}

//
const lg = new Doggy('LG', 13);
const puddle = new Doggy('PUDDLE', 8);
console.log(lg);

//const dl = new DogList();     //? private constructor -> 不可

DogList.instance.addDog(lg);
DogList.instance.addDog(puddle);
DogList.instance.addDog(new Doggy('DOBERMAN', 3));
console.log(DogList.instance.getDogs());
*/


//! static member/method in class 

class Doggy {
  constructor(
    public readonly name: string = '',
    public age: number 
  ) {}
}

class DogList {
  //private doggies: Doggy[] = [];  
  //private constructor () {}

  private constructor (
    private doggies: Doggy[] = []
  ) {}

  static instance: DogList = new DogList()   //! static member

  static addDog(dog: Doggy) {                  //! static method
    DogList.instance.doggies.push(dog);    
  }

  getDogs() {
    return this.doggies;
  }
}

//
const lg = new Doggy('LG', 13);
const puddle = new Doggy('PUDDLE', 8);
console.log(lg);

//const dl = new DogList();     //? private constructor -> 不可

DogList.addDog(lg);
DogList.addDog(puddle);
DogList.addDog(new Doggy('DOBERMAN', 3));
console.log(DogList.instance.getDogs());
