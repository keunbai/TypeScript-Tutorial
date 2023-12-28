//* =================================
//! Challenge #2
//*   - Generic function w/ callback 사례 
//!   - 배열의 reduce() 함수 활용 forEach(), filter(), map() 구현
//* =================================


//* ---------------------------------
//! Preliminary - reduce()
//*   - arr.reduce(callback[, initialValue]) 
//!   - initialValue 항상 설정 추천!
//*   Ref) https://tocomo.tistory.com/26
//* ---------------------------------
/*
//* Case #1 
//!  - 배열, initialValue X
//
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum1 = numArr.reduce((accum, cur) => accum + cur);
console.log('sum1 =', sum1);

//
function cbSum(accum: number, cur: number) {
  return accum + cur;}

const sum2 = numArr.reduce(cbSum);
console.log('sum2 =', sum2);


//* Case #2 
//!  - 객체 배열에서 특정 속성값만 처리, initialValue ㅇ
interface IFriend {
  name: string,
  age: number,
  job: string,
  married: boolean
}

//
const cbAgeSum = (accum: number, cur: IFriend): number => accum + cur.age;

const friends: IFriend[] = [
  {
    name: 'foo',
    age: 32,
    job: 'engineer',
    married: false,
  },
  {
    name: 'bar',
    age: 24,
    job: 'student',
    married: false,
  },
  {
    name: 'cuz',
    age: 42,
    job: 'lawer',
    married: true,
  }
];

// 나이 계산
const ageSum1 = friends.reduce((accum, cur) => accum + cur.age, 0);
console.log('ageSum1 =', ageSum1);

const ageSum2 = friends.reduce(cbAgeSum, 0);
console.log('ageSum2 =', ageSum2);
*/


//* ---------------------------------
//! myForEach()
//* ---------------------------------

//* basic
function myForEach<T>(arr: T[], forEachFunc: (v: T) => void): void {
  arr.reduce((_, v) => {
    forEachFunc(v);

    return undefined;
  }, undefined)
}

//const myForEach = <T>(arr: T[], forEachFunc: (v: T) => void): void => {
//  arr.reduce((_, v) => {
//    forEachFunc(v);

//    return undefined;
//  }, undefined)
//}

myForEach(["a", "b", "c"], (v) => console.log(`forEach ${v}`));


//* hybrid
type MyForEach = <T>(arr: T[], forEachFunc: (v: T) => void) => void;

//
const myForEach2: MyForEach = function(arr, forEachFunc) {
  arr.reduce((_, v) => {
    forEachFunc(v);

    return undefined;
  }, undefined)  
}

myForEach2(["a", "b", "c"], (v) => console.log(`forEach ${v}`));



//* ---------------------------------
//! myFilter()
//* ---------------------------------

//* basic
function myFilter<T>(arr: T[], filterFunc: (val: T) => boolean): T[] {
  const arrFiltered = arr.reduce((a, v) => filterFunc(v) ? [...a, v] : a, [] as T[])
  return arrFiltered;
}

console.log(myFilter([1, 2, 3, 4, 5, 6], (val) => val%3 === 0));


//* hybrid
//?  함수 내 generic type 선언으로 적용 불가 ([] as T[])


//* ---------------------------------
//! myMap()
//* ---------------------------------

//* basic
function myMap<T, M>(arr: T[], mapFunc: (val: T) => M): M[] {
  const arrMapped = arr.reduce((a, v) => [...a, mapFunc(v)], [] as M[]);
  return arrMapped;
}

console.log(myMap([1, 3, 5], (val) => (val*2).toString()));

