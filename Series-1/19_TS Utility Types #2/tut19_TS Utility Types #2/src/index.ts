//* =================================
//! Utility Type #2
//*   - 기존 타입으로부터 제네릭 활용 새로운 타입 생성  
//*   - Parameters<T>, ConstructorParameters<T>, ReturnType<T>, InstanceType<T>
//*   Ref) https://www.typescriptlang.org/ko/docs/handbook/utility-types.html
//*
//! ※ 객체의 속성 타입
//*   1) if == 속성 이름 -> 속성 정해진 일반적인 객체 생성
//*   2) if == 기본 데이터 타입 -> indexable type, 속성 타입만 정해진 객체 생성
//* =================================

type Name = {
  first: string,
  last: string
}

//* ---------------------------------
//! Parameters<T>, ReturnType<T>
//* ---------------------------------
function addFullName(name: Name): Name & {
  fullName: string
} {
  //return {
  //  first: name.first,
  //  last: name.last,
  //  fullName: `${name.first} ${name.last}` 
  //}
  return {
    ...name,
    fullName: `${name.first} ${name.last}` 
  }
}

function getFullNameObjects<T extends (...arg: any[]) => any>(
  iterFunc: T, 
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  //return data.map((item: Parameters<T>[0]): ReturnType<T> => iterFunc(item));
  //return data.map((item) => iterFunc(item));
  return data.map(iterFunc);   
}

//const getFullNameObjects = <T extends (...arg: any[]) => any>(
//  iterFunc: T, 
//  data: Parameters<T>[0][]
//): ReturnType<T>[] {
//  return data.map((item) => iterFunc(item));
//}

//const getFullNameObjects = <T extends (...arg: any[]) => any>(
//  iterFunc: T, 
//  data: Parameters<T>[0][]
//) => data.map((item) => iterFunc(item));

const records = getFullNameObjects(addFullName, [
  {first: 'kb', last: 'lee'}, 
  {first: 'jm', last: 'hong'}
]);
console.log(records);
console.log(records.map((item) => item.fullName));
console.log('\n');


//* ---------------------------------
//! ConstructorParameters<T>, InstanceType<T>
//* ---------------------------------
class PersonWithFullName {
  constructor(
    public name: Name
  ) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`; 
  }
}

function getFullNameObjects2<T extends new (...args: any[]) => any>(
  iterClass: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  //return data.map((item: ConstructorParameters<T>[0]): InstanceType<T> => new iterClass(item));
  return data.map((item) => new iterClass(item));
}

const records2 = getFullNameObjects2(PersonWithFullName, [
  {first: 'kb', last: 'lee'}, 
  {first: 'jm', last: 'hong'}
]);
console.log(records2);
console.log(records2.map((item) => item.fullName));









