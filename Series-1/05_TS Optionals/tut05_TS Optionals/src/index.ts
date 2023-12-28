//* =================================
//!        5. Optionals
//* =================================


//* ---------------------------------
//! Optional parameter
//*   - optional 파라미터 뒤로 required 파라미터 위치 불가
//* ---------------------------------
/*
//* basic 
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? `${extra}` : ''}`);
}

printIngredient('1C', 'Flour');
printIngredient('1C', 'Sugar', 'something more');

//* call signature
type PrintIngredient = (quantity: string, ingredient: string, extra?: string) => void;

//
const printIngredient2: PrintIngredient = function(quantity, ingredient, extra?) {
  console.log(`${quantity} ${ingredient} ${extra ? `${extra}` : ''}`);
}

printIngredient('1C', 'Flour');
printIngredient('1C', 'Sugar', 'something more');
*/


//* ---------------------------------
//! Optional property in interface
//*   - 
//* ---------------------------------
/*
//* Nullish coalescing operator (??)
//*   - 왼쪽이 null/undefined 이면 오른쪽, 아니면 왼쪽 반환
//* Ref) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
const foo = null ?? 'default string';
console.log(foo);   // "default string"

const baz = 0 ?? 42;
console.log(baz);   // 0


//* basic
interface User {
  id: string;
  info?: {
    email?: string;
  };
}

//
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }
  return "No info.";
}

function getEmailEasy(user: User): string {
  return user.info?.email ?? "No info.";
}

const user1: User = {
  id: 'kb',
  info: {
    email: 'keunbai@hotmail.com'
  }
};
console.log(getEmail(user1));
console.log(getEmailEasy(user1));

const user2: User = {
  id: 'kb',
  info: {}
};
console.log(getEmail(user2));
console.log(getEmailEasy(user2));

const user3: User = {
  id: 'kb',
};
console.log(getEmail(user3));
console.log(getEmailEasy(user3));


//* call signature
// skip~
*/


//* ---------------------------------
//! Optional callback
//* ---------------------------------

//* basic
function addWithCallback(x: number, y: number, callback?: (name: string) => void) {
  console.log({x, y});    // object
  console.log([x, y]);    // tuple

  if (callback) {
    callback('kb');
  }

  callback?.('jm');    //!
}

function greeting(name: string) {
  console.log(`Hello! ${name}`);
}

addWithCallback(2, 3, greeting);


//* call signature
type Callback = (name: string) => void;
type AddWithCallback = (x:number, y: number, callback?: Callback) => void;

//
const addWithCallback2: AddWithCallback = (x, y, callback?) => {
  console.log({x, y});    // object
  console.log([x, y]);    // tuple

  if (callback) {
    callback('kb');
  }

  callback?.('jm');    //!
}

function greeting2(name: string) {
  console.log(`Hello! ${name}`);
}

addWithCallback(2, 3, greeting2);