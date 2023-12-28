//* =================================
//! Abstract class in TypeScript Classes 
//*   - abstract 클래스의 상속 클래스들 공통 메서드는 abstract 클래스 내에서 선언
//*   - abstract 클래스의 상속 클래스 고유 메서드는 abstract 메서드의 call signature만 명기 (blueprint 클래스)
//*     상속 클래스에서 구현
//*   - abstract 클래스의 private 속성은 상속 클래스에서도 접근 불가 => protected 사용
//* =================================


//* ---------------------------------
//! Abstract class #1
//*   - from book
//* ---------------------------------
/*
abstract class User4 {    
  constructor(     
    protected fName: string,
    protected lName: string,
    public nickname: string
  ) {}     

  intro() {
    console.log(`${this.getFullName()}'s instance of inherited class from User4 abstract class`);
  }

  abstract getFullName(): string;            //! call signature
  abstract sayHi(name: string): string; 
}

class Player4 extends User4 {
  getFullName() {
    return `${this.fName} ${this.lName}`;    //! ok
  }  

  sayHi(name: string) {     // 'noImplicitAny' = true in tsconfig.json
    return `${name}, ${this.nickname}, Hello!!`;
  }
}

const js = new Player4('jisu', 'lee', '딸래미');
js.intro();
console.log(js.getFullName());
console.log(js.sayHi(js.getFullName()), '\n');

//js.fName = 'jeesu';        //? Error!
js.nickname = 'fire fox';    //! ok
*/


//* ---------------------------------
//! Abstract class #2-1
//* ---------------------------------
/*
abstract class StreetFighter {
  constructor(
    public name: string
  ) {};    

  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract getName(): string;     
  abstract getSpecialAttack(): string;
}

class Ryu extends StreetFighter {
  getName(): string {
    return this.name;
  }

  getSpecialAttack(): string {
    return "Hadoken";    
  }
}

class ChunLi extends StreetFighter {
  getName(): string {
    return this.name;
  }

  getSpecialAttack(): string {
    return "Lighting Kick";
  }
}

const ryu = new Ryu('Ryu');
const chunLi = new ChunLi('ChunLi');

ryu.fight();
chunLi.fight();
*/


//* ---------------------------------
//! Abstract class #2-2
//*  - accessor property (getter, setter) 
//*    ref) https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-getter-setter-%EB%9E%80
//* ---------------------------------

abstract class StreetFighter {
  constructor() {};    //! 클래스 맴버 X

  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract get name(): string;     //! accessor property - getter
  abstract getSpecialAttack(): string;
}

class Ryu extends StreetFighter {
  get name(): string {
    return "Ryu"
  }

  getSpecialAttack(): string {
    return "Hadoken";
  }
}

class ChunLi extends StreetFighter {
  get name(): string {
    return "Chun-Li";
  }

  getSpecialAttack(): string {
    return "Lighting Kick";
  }
}

const ryu = new Ryu();
const chunLi = new ChunLi();

ryu.fight();
chunLi.fight();
