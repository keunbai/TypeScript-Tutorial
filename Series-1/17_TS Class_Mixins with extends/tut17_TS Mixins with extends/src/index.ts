//* =================================
//! Mixin 
//*   - 간단한 부분 클래스들로 클래스를 구성/조립하는 방법
//*   - Mixin 함수가 클래스를 입력 받아 기능 추가된 새 클래스 반환
//*      1) 생성자 받음
//*      2) 생성자 확장하여 새 기능 추가된 클래스 생성
//*      3) 새 클래스 반환
//* 
//*   Ref) https://www.typescriptlang.org/docs/handbook/mixins.html#handbook-content
//* =================================

//* ---------------------------------
//! Preliminary #1
//*   - 'extends' keyword in generic
//*   Ref) https://velog.io/@holicholicpop/Typescript-11.-Generic%EC%A0%9C%EC%95%BD%EC%A1%B0%EA%B1%B4-%EC%9E%91%EC%97%85T-extends-something-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%A0%9C%EB%84%A4%EB%A6%AD
//* ---------------------------------
/*
//! Case 1 
type MergeData = <T extends object, U extends object>(a: T, b: U) => object;

//
const mergeData: MergeData = function (a, b) {
  return Object.assign(a, b);
}
const user = mergeData({ name: "Jenny", hobbies: ["sing a song", "play game"] }, {age: 27});
console.log(user, '\n');


//! Case 2
interface ILength {
  length: number
}

type CountAndPrint = <T extends ILength>(element: T) => [T, string];

//
const countAndPrint: CountAndPrint = function (element) {
  let desc: string = '';

  if (element.length === 1) {
    desc = "one length";
  } else if (element.length > 1) {
    desc = "several length";
  }

  return [element, desc];
}

const family = ['kb', 'jm', 'jb']
//const info_family = countAndPrint<Array<string>>(family);
const info_family = countAndPrint<string[]>(family);
//const info_family = countAndPrint(family);
console.log(info_family, '\n');


//! Case 3
//*  - Class storage
interface IUser {
  name: string,
  age?: number
}

interface IGuest {
  name: string,
  occupation: string,
  age?: number
}

//
class StorageStringItems {
  //private data: Array<string> = [];
  private data: string[] = [];

  addItem(item: string) {
    this.data.push(item);
  }
  removeItem(item: string) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems(): string[] {
    return [...this.data];
  }
}

class StorageItems<T extends number|string|IUser>  {
  //private data: Array<T> = [];
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems(): T[] {
    return [...this.data];
  }
}

const storageText = new StorageItems<string>();
//const storageText = new StorageItems();     //! OK
storageText.addItem('Hello');
storageText.addItem('foo');
const dataText = storageText.getItems();
console.log(dataText, '\n');

const storageUser = new StorageItems<IUser>();
//const storageUser = new StorageItems();     //! OK
storageUser.addItem({name: 'foo'});
storageUser.addItem({name: 'bar', age: 24});
const dataUser = storageUser.getItems();
console.log(dataUser, '\n');

const storageGuest = new StorageItems<IGuest>();
//const storageGuest = new StorageItems();    //? Error
storageGuest.addItem({name: 'foo', occupation: 'engineer'});
storageGuest.addItem({name: 'bar', occupation: 'teacher', age: 32});
const dataGuest = storageGuest.getItems();
console.log(dataGuest, '\n');
*/


//* ---------------------------------
//! Preliminary #2
//*   - type Constructor<T> = new (...args: any[]) => T;
//*   - 클래스 생성 함수의 제네릭 call signature
//?      => 구현이 안된다.. 
//* ---------------------------------
/*
type Constructor<T={}> = new (...args: any[]) => T;

//
class User {
  name = 'foo'
  hobby = 'coding'

  getName() {
    return this.name;
  }
}

const constructor: Constructor<User> = (name, hobby) => {
  return class {
    name = name
    hobby = hobby

    getName() {
      return this.name
    }
  }
}
*/


//* ---------------------------------
//! Preliminary #3
//*   - by JHerrington
//* ---------------------------------
/*
//! Functions creating functions
function createLoggerFunction() {
  return (msg: string) => {
    console.log(msg, '\n');
  };
}

const myLogger = createLoggerFunction();
myLogger('your message');

//! Functions creating a class #1
function createLoggerClass() {
  return class MyLogger {
    private completeLog: string = '';

    log(msg: string) {
      this.completeLog += `${msg}\n`;
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const Logger = createLoggerClass();
const myLogger1 = new Logger();
myLogger1.log('your message again');
myLogger1.log('not your message');
console.log(myLogger1.dumpLog());

//! Functions creating a class #2
function createLoggerClass2() {
  return new class MyLogger {
    private completeLog: string = '';

    log(msg: string) {
      this.completeLog += `${msg}\n`;
    }
    dumpLog() {
      return this.completeLog;
    }
  } ();
}

const myLogger2 = createLoggerClass2();
myLogger2.log('his message');
myLogger2.log('not his message');
console.log(myLogger2.dumpLog());

//! Functions creating a generic class
function createSimpleMemoryDB<T>() {
//const createSimpleMemoryDB = <T>() => {  
  return class SimpleMemoryDB {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getDB(): Record<string, T> {
      return this.db;
    }
  };
}

const StringDB = createSimpleMemoryDB<string>();
//const StringDB = createSimpleMemoryDB();   //! ok

const myStringDB = new StringDB();
myStringDB.set('name', 'foo');
myStringDB.set('hobby', 'coding');
console.log(myStringDB.get('name'));
console.log(myStringDB.getDB(), '\n');
*/


//* ---------------------------------
//! Mixins #1
//*   - by JHerrington
//* ---------------------------------

//! Functions creating a inherited class from base class ==> Mixin
type Constructor<T={
  getDB(): object;
}> = new (...args: any[]) => T;    //! 모든 mixin 에 필요

//
function createSimpleMemoryDB<T>() {
  return class SimpleMemoryDB {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getDB(): Record<string, T> {
      return this.db;
    }
  };
}

function getClassDumpable<T extends Constructor>(Base: T) {    //! Mixin
  return class extends Base {
    dump() {
      console.log(this.getDB());
    }
  }
}

const StringDB = createSimpleMemoryDB<string>();
const StringDBDumpable = getClassDumpable(StringDB);

const myStringDBDumpable = new StringDBDumpable();
myStringDBDumpable.set('name', 'bar');
myStringDBDumpable.set('hobby', 'sleeping');
console.log(myStringDBDumpable.get('name'));
console.log(myStringDBDumpable.getDB());
myStringDBDumpable.dump();


//* ---------------------------------
//! Mixins #2
//*   Ref) https://radlohead.gitbook.io/typescript-deep-dive/type-system/mixins
//* ---------------------------------
/*
type Constructor<T = {}> = new (...args: any[]) => T;    //! 모든 mixin 에 필요
//type Constructor<T> = new (...args: any[]) => T;       //? Error

//
function getClassTimestamped<T extends Constructor>(Base: T) {  //! 속성 추가 mixin
  return class extends Base {
    timestamp = Date.now();    
  }
}

function getClassActivatable<T extends Constructor>(Base: T) {  //! 속성/메서드 추가 mixin
  return class extends Base {
    private isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  }
}

class User {
  constructor (
    public user: string = '',
    private age: number
  ) {}
}
const user = new User('foo', 43);
console.log(user);

const UserTimestamped = getClassTimestamped(User);
const userTS = new UserTimestamped('bar', 56);
console.log(userTS);

const UserActivatable = getClassActivatable(User);
const userAct = new UserActivatable('cuz', 14);
userAct.activate();
//userAct.isActivated = false;   //? 不可
console.log(userAct);

const UserTimestampedActivatable = getClassActivatable(getClassTimestamped(User));
const userTsAct = new UserTimestampedActivatable('kebin', 35);
console.log(userTsAct);
*/
