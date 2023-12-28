//* =================================
//! Generics in TypeScript Classes
//*   - 
//* =================================

//* ---------------------------------
//! Preliminary 
//*   - LocalStorage API 미니 버전 구현
//* ---------------------------------

//! class 
/*
interface IStorage {     //! 클래스와 결합 아닌 객체의 타입 지정 목적
  [key: string]: string
};             

//
class LocalStorage {
  //public storage: IStorage = {};
  private storage: IStorage = {};

  setItem(key:string, value: string):void {
    this.storage[key] = value;
  }

  getItem(key:string):string {
    return this.storage[key];
  }

  clearItem(key:string):void {
    delete this.storage[key];
  }

  clearAll():void {
    this.storage = {};
  }

  showAll():void {
    Object.keys(this.storage).forEach(key => console.log(`${key} : ${this.storage[key]}`));
  }
}

const gerage = new LocalStorage();
//gerage.storage['TypeScrit'] = 'Awesome!!';    //! for public
gerage.setItem('JavaScript', 'Basic for web programming');
gerage.setItem('JM', 'My lovely wife');
gerage.setItem('JB', 'My faithful son');
gerage.showAll();
console.log(gerage.getItem('JB'));
gerage.clearItem('JavaScript');
gerage.showAll();
gerage.clearAll();
*/


//! class + generic
/*
interface IStorage<S> {   //! 클래스와 결합 아닌 객체의 타입 지정 목적 
  [key: string]: S
};             

//
class LocalStorage<T> {
  private storage: IStorage<T> = {};

  setItem(key:string, value: T):void {
    this.storage[key] = value;
  }

  getItem(key:string):T {
    return this.storage[key];
  }

  clearItem(key:string):void {
    delete this.storage[key];
  }

  clearAll():void {
    this.storage = {};
  }

  showAll():void {
    Object.keys(this.storage).forEach(key => console.log(`${key} : ${this.storage[key]}`));
  }
}

const stringGerage = new LocalStorage<string>();
//gerage.storage['TypeScrit'] = 'Awesome!!';    //! for public
stringGerage.setItem('JavaScript', 'Basic for web programming');
stringGerage.setItem('JB', 'My faithful son');
stringGerage.setItem('JM', 'My lovely wife');
stringGerage.showAll();
console.log(stringGerage.getItem('JM'));
stringGerage.clearItem('JavaScript');
stringGerage.showAll();
stringGerage.clearAll();
stringGerage.showAll();
console.log('');

const booleanGerage = new LocalStorage<boolean>();
booleanGerage.setItem('KB', false);
booleanGerage.setItem('JM', true);
booleanGerage.showAll();
console.log(booleanGerage.getItem('JM'));
booleanGerage.clearItem('KB');
booleanGerage.showAll();
booleanGerage.clearAll();
booleanGerage.showAll();
*/


//* ---------------------------------
//! class + member visibility + interface + inheritance
//* ---------------------------------
/*
type DB = Record<string, string>;

interface IDatabase {
  get(id: string): string,
  set(id: string, value: string): void
}

interface IPersistable {
  saveToString(): string;
  restoreFromString(strState: string): void;
}

//
class DBinMemory implements IDatabase {
  //protected db: DB = {};     //! Member visibility

  protected db: DB;
  constructor() {     // 클래스 인스탄스 생성 시 db 객체 속성 구체적인 초기화 배제
    this.db = {};
  }

  //
  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentDBinMemory extends DBinMemory implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(strState: string): void {
    this.db = JSON.parse(strState);
  }
}

//
const myDB = new PersistentDBinMemory();
myDB.set('123A45', 'foo');
//myDB.db['123A45'] = 'bar';            //? protected
console.log(myDB.get('123A45'));

const savedStr = myDB.saveToString();   // 초기 db 저장
console.log(savedStr);

myDB.set('123A45', 'cuz');              // db 변경
console.log(myDB.get('123A45'));

const myDB2 = new PersistentDBinMemory();
myDB2.restoreFromString(savedStr);
console.log(myDB2.get('123A45'));       // 초기 db 확인
*/


//* ---------------------------------
//! Class + Generics #1 - value
//*   (from tut12)
//* ---------------------------------
/*
//type DB = Record<string, string>;   //? 이용 불가

interface IDatabase<T> {
  get(id: string): T,
  set(id: string, value: T): void
}

interface IPersistable {
  saveToString(): string;
  restoreFromString(strState: string): void;
}



//
class DBinMemory<T> implements IDatabase<T> {
  //protected db: DB = {};     //! Member visibility

  protected db: Record<string, T>;
  constructor() {     // 클래스 인스탄스 생성 시 db 객체 속성 구체적인 초기화 배제
    this.db = {};
  }

  //
  get(id: string): T {
    return this.db[id];
  }

  set(id: string, value: T): void {
    this.db[id] = value;
  }
}

class PersistentDBinMemory<T> extends DBinMemory<T> implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(strState: string): void {
    this.db = JSON.parse(strState);
  }
}

//
const myDB = new PersistentDBinMemory<string>();
myDB.set('123A45', 'foo');
//myDB.db['123A45'] = 'bar';            //? protected
console.log(myDB.get('123A45'));

const savedStr = myDB.saveToString();   // 초기 db 저장
console.log(savedStr);

myDB.set('123A45', 'cuz');              // db 변경
console.log(myDB.get('123A45'));

const myDB2 = new PersistentDBinMemory();
myDB2.restoreFromString(savedStr);
console.log(myDB2.get('123A45'));       // 초기 db 확인
*/


//* ---------------------------------
//! Class + Generics #2 - key, value
//*   (from tut12)
//* ---------------------------------
//type DB = Record<string, string>;   //? 이용 불가

interface IDatabase<KT, T> {
  get(id: KT): T,
  set(id: KT, value: T): void
}

interface IPersistable {
  saveToString(): string;
  restoreFromString(strState: string): void;
}

type DBKey = string | number | symbol;

//
class DBinMemory<KT extends DBKey, T> implements IDatabase<KT, T> {
  //protected db: DB = {};     //! Member visibility

  protected db: Record<KT, T>;
  constructor() {     // 클래스 인스탄스 생성 시 db 객체 속성 구체적인 초기화 배제
    //this.db = {};   //? Error
    this.db = {} as Record<KT, T>;
  }

  //
  get(id: KT): T {
    return this.db[id];
  }

  set(id: KT, value: T): void {
    this.db[id] = value;
  }
}

class PersistentDBinMemory<KT extends DBKey, T> extends DBinMemory<KT, T> implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(strState: string): void {
    this.db = JSON.parse(strState);
  }
}

//
const myDB = new PersistentDBinMemory<string, string>();
myDB.set('123A45', 'foo');
//myDB.db['123A45'] = 'bar';            //? protected
console.log(myDB.get('123A45'));

const savedStr = myDB.saveToString();   // 초기 db 저장
console.log(savedStr);

myDB.set('123A45', 'cuz');              // db 변경
console.log(myDB.get('123A45'));

const myDB2 = new PersistentDBinMemory();
myDB2.restoreFromString(savedStr);
console.log(myDB2.get('123A45'));       // 초기 db 확인



