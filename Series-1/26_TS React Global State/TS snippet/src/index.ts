//* ==================================================
//! 4.5 함수 선언문 II 
//*   - 함수의 call signature는 'const 함수명 = ' 형식에서만 이용 가능,
//*     'function 함수명() {}' 형식은 이용 불가
//*   - 함수의 call signature + generic
//*      1) 'type FuncType = <T>(param: T) => T'
//*           : 함수 선언 시 T type 명기 X -> 범용
//*      2) 'type FuncType<T> = (param: T) => T'
//*           : 함수 선언 시 반드시 T type 명기 O -> 제한적
//*           ※ 콜백 인자 포함 함수는 이걸로만   
//* ==================================================


//* --------------------------------------------------
//! Polymorphism #2 - generic (for function)
//*  - placeholder 이용
//*  - '원시 타입 변수' 대상 적용
//* --------------------------------------------------

//! 단일 placeholder #1
/*
//* basic
//function handleVar<T>(arg: T) {
//  console.log(arg);
//}
//function handleArrayOnly<T>(arr: T[]): number {
//  return arr.length;
//} 

//const handleVar = function<T>(arg: T) {
//  console.log(arg);
//}
//const handleArrayOnly = function<T>(arr: T[]): number {
//  return arr.length;
//}

const handleVar = <T>(arg: T) => console.log(arg);
const handleArrayOnly = <T>(arr: T[]): number => arr.length;

handleVar('kb');
handleVar(['foo', 'bar']);
console.log(handleArrayOnly([1, 2, 3]));
console.log(handleArrayOnly(['kb', 'jm']));
//console.log(handleArrayOnly('kb'));  //? Error

handleVar<string>('kb');
handleVar<string[]>(['foo', 'bar']);
console.log(handleArrayOnly<number>([1, 2, 3]));
console.log(handleArrayOnly<string>(['kb', 'jm']));


//* call signature
type printVar = <T>(arg: T) => void;
type ArrayLength = <T>(arr: T[]) => number;

//
const handleVar2: printVar = (arg) => console.log(arg);
const handleArrayOnly2: ArrayLength = (arr) => arr.length;

handleVar2('kb');
handleVar2(['foo', 'bar']);
console.log(handleArrayOnly2([1, 2, 3]));
console.log(handleArrayOnly2(['kb', 'jm']));
//console.log(handleArrayOnly2('kb'));  //? Error

handleVar2<string>('kb');
handleVar2<string[]>(['foo', 'bar']);
console.log(handleArrayOnly2<number>([1, 2, 3]));
console.log(handleArrayOnly2<string>(['kb', 'jm']));
*/


//! 단일 placeholder #4-2 - generic function w/ callback (from tut07)

//* basic
//function simplaState<T>(stateInit: T): [() => T, (stateNew: T) => void] {   //! tuple
//const simpleState = function<T>(stateInit: T): [() => T, (stateNew: T) => void] {     
const simpleState = <T>(stateInit: T): [() => T, (stateNew: T) => void] => {     
  let state = stateInit;

  return [       
    () => state,            //! closure 
    (stateNew: T) => {      //! closure
      state = stateNew;
    }      
  ]
};

const [getState, setState] = simpleState([1, 2, 3]);
console.log(getState());
setState([11, 12, 13]);
console.log(getState(), '\n');

//const [getState2, setState2] = simpleState(null);                //? Error
const [getState2, setState2] = simpleState<string | null>(null);   //! overriding inferred generic types
console.log(getState2());
setState2('hello~');
console.log(getState2(), '\n');


//* hybrid
type SimpleState3 = <T>(stateInit: T) => [() => T, (stateNew: T) => void];

//
const simpleState3: SimpleState3 = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

//const [getState3, setState3] = simpleState3(null);                //? Error
const [getState3, setState3] = simpleState3<string | null>(null);   //! overriding inferred generic types
console.log(getState3());
setState3('hello~');
console.log(getState3(), '\n');


//* call signature #1  
type GetState4<T> = () => T;  
type SetState4<T> = (stateNew: T) => void;

type SimpleState4 = <T>(stateInit: T) => [GetState4<T>, SetState4<T>];

//
const simpleState4: SimpleState4 = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

//const [getState4, setState4] = simpleState4(null);                //? Error
const [getState4, setState4] = simpleState4<string | null>(null);   //! overriding inferred generic types
console.log(getState4());
setState4('hello~');
console.log(getState4(), '\n');



//* call signature #2  
type GetState5<T> = () => T;  
type SetState5<T> = (stateNew: T) => void;

type SimpleState5<T> = (stateInit: T) => [GetState5<T>, SetState5<T>];

//
const simpleState5: SimpleState5<number[]> = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

//const [getState5, setState5] = simpleState5(null);                //? Error
//const [getState5, setState5] = simpleState5<string | null>(null); //? Error
const [getState5, setState5] = simpleState5([11, 22, 33]); 
console.log(getState5());
//setState5('hello~');   //? Error
setState5([111, 222, 333]);           
console.log(getState5(), '\n');


//* =================================
//! 3.6 Utility Type
//*   - 기존 타입으로부터 제네릭 활용 새로운 타입 생성  
//* =================================

//* ---------------------------------
//! Parameters<T>, ReturnType<T>
//* ---------------------------------
//
type Name = {
  first: string,
  last: string
}

//
function addFullName(name: Name): Name & {
  fullName: string
} {
  return {
    ...name,
    fullName: `${name.first} ${name.last}` 
  }
}

function getFullNameObjects<T extends (...arg: any[]) => any>(
  iterFunc: T, 
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map((item: Parameters<T>[0]): ReturnType<T> => iterFunc(item));
}

//const getFullNameObjects = <T extends (...arg: any[]) => any>(
//  iterFunc: T, 
//  data: Parameters<T>[0][]
//): ReturnType<T>[] {
//  return data.map((item) => iterFunc(item));
//}

//
const records = getFullNameObjects<typeof addFullName>(addFullName, [
  {first: 'kb', last: 'lee'}, 
  {first: 'jm', last: 'hong'}
]);

// const records = getFullNameObjects(addFullName, [
//   {first: 'kb', last: 'lee'}, 
//   {first: 'jm', last: 'hong'}
// ]);

console.log(records);
console.log(records.map((item) => item.fullName));
console.log('\n');
