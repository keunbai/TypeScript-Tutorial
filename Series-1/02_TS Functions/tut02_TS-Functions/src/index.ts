//* =================================
//!          2. Functions
//* =================================


//* ---------------------------------
//! Defining functions 
//* ---------------------------------

//* basic
function addNumbers1(a: number, b: number): number {
  return a + b;
}
function addNumbers2(a: number, b: number) {    // 리턴값 타입은 생략도 많이 하는 듯
  return a + b;
}

const addNumbers3 = function(a: number, b: number): number {
  return a + b;
}

const addNumbers4 = (a: number, b: number): number => a + b;

//* call signature
type AddNumbers = (a: number, b:number) => number;

//

//function addNumbers5(a, b): AddNumbers {   //? Error
//  return a + b;
//}

const addNumbers6: AddNumbers = function(a, b) {
  return a + b;
};

const addNumbers7: AddNumbers = (a, b) => a + b;


//* ---------------------------------
//! Default parameters 
//* ---------------------------------

//* basic
const addStrings1 = (str1: string, str2: string = 'hahaha~') => `${str1}, ${str2}`;

console.log(addStrings1('keunbai', 'jungmini'));
console.log(addStrings1('keunbai'));

//* call signature
type AddStrings = (str1: string, str2?: string) => string;

//
const addStrings2: AddStrings = (str1, str2='hehehe~') => `${str1} ${str2}`;

console.log(addStrings2('jeongbeomi', 'jisu'));
console.log(addStrings2('jeongbeomi'), '\n');


//* ---------------------------------
//! Union types 
//* ---------------------------------
const format = (title: string, param: string | number): string => `${title} ${param}`;


//* ---------------------------------
//! Promise functions 
//* ---------------------------------
const fetchData1 = (url: string): Promise<string> => Promise.resolve(`Data from ${url}`);
const fetchData2 = (url: string) => Promise.resolve(`Data from ${url}`);

type FetchData = (url: string) => Promise<string>;
const fetchData3: FetchData = (url) => Promise.resolve(`Data from ${url}`);


//* ---------------------------------
//! Rest parameters 
//* ---------------------------------
const introduce = (salutation: string, ...names: string[]) => `${salutation} ${names.join('')}`;
console.log(introduce('Jungmini', 'my sweetheart', '!!'), '\n');


//* ---------------------------------
//! Misconception #1
//!  - Types are enforced by TS sat compile time, not at run time
//*  ※ tut02_TS-Functions2 폴더에서 확인
//* ---------------------------------
interface IUser {
  first: string,
  last: string
};

type GetName = (user: IUser) => string;

//
const getName: GetName = function(user) {
  return `${user.first} ${user.last}`;
};

console.log(getName({first: 'keunbai', last: 'lee'}), '\n');