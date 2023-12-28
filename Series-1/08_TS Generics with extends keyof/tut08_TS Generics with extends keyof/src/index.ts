//* =================================
//! 8. Generic w/ extends keyof
//*   - <KT extends keyof T> 
//*       : 객체인 제네릭 T 의 key(==prop)값만 keyof 통해 유니온 타입으로 제네릭 KT 설정  
//*   Cf) 'extends keyof' vs 'keyof'
//* =================================


//* ---------------------------------
//! Preliminary
//* ---------------------------------

//* basic
interface IUser {
  name: string,
  age: number
}

//
//function getProperty<T, KT extends keyof T>(obj: T, key: KT): T[KT] {
//  return obj[key];
//}
//function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
//  return obj[key];
//}

const getProperty = <T, KT extends keyof T>(obj: T, key: KT): T[KT] => {
  return obj[key];
}
//const getProperty = <T>(obj: T, key: keyof T): T[keyof T] => {
//  return obj[key];
//}

const user: IUser = {
  name: 'foo',
  age: 37
};
console.log(getProperty(user, 'name'));

const fruit = {
  name: 'apple',
  color: 'red',
  sugar_content: 8
};
console.log(getProperty(fruit, 'sugar_content'));

//* call signature 
interface IUser {
  name: string,
  age: number
}

type GetProperty = <T, KT extends keyof T>(obj:T, key: KT) => T[KT];
//type GetProperty = <T>(obj:T, key: keyof T) => T[keyof T];

//
const getProperty2: GetProperty = function (obj, key) {
  return obj[key];
}

const user2: IUser = {
  name: 'foo',
  age: 37
};
console.log(getProperty2(user2, 'name'));

const fruit2 = {
  name: 'apple',
  color: 'red',
  sugar_content: 8
};
console.log(getProperty2(fruit2, 'sugar_content'), '\n');


//* ---------------------------------
//! Example #1
//* ---------------------------------

//* basic
interface IDog {
  name: string,
  age: number
}

//
function plunk<T, KT extends keyof T>(items: T[], key: KT): T[KT][] {
  return items.map(item => item[key]);
}
//function plunk<T>(items: T[], key: keyof T): T[keyof T][] {
//  return items.map(item => item[key]);
//}

const dogs: IDog[] = [
  {name: 'Mimi', age: 12},
  {name: 'LG', age: 7}
];
const names = plunk(dogs, 'name');
const ages = plunk(dogs, 'age');
console.log(names);
console.log(ages, '\n');


//* ---------------------------------
//! Example #2
//*   - Event map
//* ---------------------------------

//* basic
interface IBaseInfo {
  time: number,
  user: string
}

interface IBuyingInfo {
  productID: string,
  quantity: number
}

interface IEventMap {
  addToCart: IBaseInfo & IBuyingInfo    // intersection type
  checkout: IBaseInfo
}

//
function sendEvent<KT extends keyof IEventMap>(event: KT, data: IEventMap[KT]) {
  console.log([event, data]);
}

sendEvent('addToCart', {
  productID: 'foo',
  user: 'baz',
  quantity: 1,
  time: 10,
});
sendEvent('checkout', {time: 20, user: 'bob'});


//* call signature
interface IBaseInfo2 {
  time: number,
  user: string
}

interface IBuyingInfo2 {
  productID: string,
  quantity: number
}

interface IEventMap2 {
  addToCart: IBaseInfo2 & IBuyingInfo2    
  checkout: IBaseInfo2
}

type SendEvent = <KT extends keyof IEventMap>(event: KT, data: IEventMap[KT]) => void;

//
const sendEvent2: SendEvent = (event, data) => console.log([event, data]);

sendEvent2('addToCart', {
  productID: 'foo',
  user: 'baz',
  quantity: 1,
  time: 10,
});
sendEvent2('checkout', {time: 20, user: 'bob'});
