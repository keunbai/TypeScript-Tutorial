//* =================================
//!    3. Functions with Functions
//* =================================


//* ---------------------------------
//! Callback function`
//* ---------------------------------

//* basic #1
function printToFile(txt: string, callback: () => void) {
    console.log(txt);
    callback();
}

const cb = () => console.log('keunbai');
printToFile('hello', cb);

//* call signature #1
type PrintToFile = (arg1: string, arg2: () => void) => void;

//
const printToFile2: PrintToFile = function(txt, callback) {
  console.log(txt);
  callback();
};

const cb2 = () => console.log('jungmini');
printToFile2('Hi', cb2);


//* basic #2
function arrayMutate(nbs: number[], mutate: (arg: number) => number): number[] {
  return nbs.map(mutate);
}

console.log(arrayMutate([2, 4, 6], (v: number) => v*v));
console.log(arrayMutate([2, 4, 6], (v) => v*10));
const change = (v: number) => v+v;
console.log(arrayMutate([2, 4, 6], change));

//* call signature #2
type Mutate = (arg: number) => number;
type ArrayMutate = (arg1: number[], arg2: Mutate) => number[];

// 
const arrayMutate2: ArrayMutate = (nbs, mutate) => nbs.map(mutate);

console.log(arrayMutate2([2, 4, 6], (v: number) => v*v));
console.log(arrayMutate2([2, 4, 6], (v) => v*10));
const change2 = (v: number) => v+v;
console.log(arrayMutate2([2, 4, 6], change2), '\n');


//* ---------------------------------
//! Closure
//* ---------------------------------

//* basic
//function createAdder(num: number): (arg: number) => number {
//  return (val: number) => num + val;
//}
function createAdder(num: number) {
  return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(1027));
const addTwo = createAdder(2);
console.log(addTwo(1027));


//* call signature
type Sum = (arg: number) => number;
type CreateAdder = (arg: number) => Sum;

//
const createAdder2: CreateAdder = (num) => (val) => num + val;

const addOne2 = createAdder2(1);
console.log(addOne2(418));
const addTwo2 = createAdder2(2);
console.log(addTwo2(418));