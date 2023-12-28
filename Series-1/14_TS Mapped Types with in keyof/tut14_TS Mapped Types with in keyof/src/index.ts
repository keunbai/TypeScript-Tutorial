//* =================================
//! Mapped Types
//*   - '객체'의 속성들을 순회해서 속성값의 타입을 다른 타입으로 변경
//*   - 함수 형태로 객체의 타입 생성
//*   - 객체 속성 순회 이용 모든 객체 속성을 optional 또는 readonly 로 변경
//*
//?   ※ interface 는 mapped type 생성 不可
//* =================================


//* ---------------------------------
//! Preliminary #1 - indexable type
//* ---------------------------------
/*
interface IUser {
  name: string,
  [grade: number]: number
}

//
const foo: IUser = {
  name: 'foo',
  1: 75,
  2: 80,
  5: 95
};
*/


//* ---------------------------------
//! Basic
//*   Ref) https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Mapped-types-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
//* ---------------------------------

//! 객체의 속성값 타입 변환 
/*
// Mapped type
type Change2Number<T> = {
  [P in keyof T]: number;
}

//interface IChange2Number<T> {    //? 不可
//  [P in keyof T]: number
//}

// Type
interface IExObjStr {
  prop1: string,
  prop2: string
}

type ExObjNum = Change2Number<IExObjStr>;

//
const objStr: IExObjStr = {
  prop1: 'foo',
  prop2: 'bar'
};

const objNum: ExObjNum = {
  prop1: 24,
  prop2: 15
}; 

const objNum2: Change2Number<IExObjStr> = {
  prop1: 24,
  prop2: 15
}; 
*/


//! 함수 형태로 객체 타입 생성
/*
// Mapped type
type Prop = 'prop1' | 'prop2';

type MappedType<T> = {
  [P in Prop]: T
};

// Type
type TypeBoolean = MappedType<boolean>;
type TypeNumber = MappedType<number>;
type TypeString = MappedType<string>;

//
const objBoolean: TypeBoolean = {
  prop1: true,
  prop2: false
};

const objNumber: MappedType<number> = {
  prop1: 256,
  prop2: 113
};

const objStr: TypeString = {
  prop1: 'foo',
  prop2: 'bar'
};
*/


//! 객체의 속성을 optional/readonly 로 지정
/*
// Mapped type
type Optional<T> = {
  [P in keyof T]?: T[P]     //! T[P] - 제네릭으로 받은 속성의 타입 유지  
}

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]     
}

// Type
interface IPerson {
  name: string,
  age: number
}

type PartialPerson = Optional<IPerson>;
type ReadonlyPerson = ReadOnly<IPerson>;

//
const person: IPerson = {
  name: 'foo',
  age: 32
};
person.age = 33;

const person2: PartialPerson = {
  name: 'bar'
};

const person3: Optional<IPerson> = {
  name: 'cuz'
};

const person4: ReadonlyPerson = {
  name: 'duo',
  age: 53
};
//person4.age = 54;     //? 不可

const person5: ReadOnly<IPerson> = {
  name: 'zen',
  age: 48
};
//person5.age = 54;     //? 不可
*/


//! 객체의 속성에서 optional/readonly 제거
/*
// Mapped type
type ExcludeOptional<T> = {
  [P in keyof T]-?: T[P]     //! T[P] - 제네릭으로 받은 속성의 타입 유지  
}

type ExcludeReadOnly<T> = {
  -readonly [P in keyof T]: T[P]     
}

// Type
interface IPerson {
  readonly name?: string,
  readonly age?: number
}

//
const person: IPerson = {
  name: 'foo',
  age: 32
};
//person.name = 'zen';     //? 不可

const person2: ExcludeOptional<IPerson> = {
  name: 'bar',
  age: 23                 //? 생략 不可       
};
//person2.name = 'kry'    //? 不可

const person3: ExcludeReadOnly<IPerson> = {
  name: 'cuz'
};
person3.name = 'duo'      //! ok
*/


//! 중첩 객체 속성 만들기
/*
// Mapped type
//type PseudoRecord<P, T> = {    //? 不可 (사유 확인)
//  [prop in P]: T
//};

type PseudoRecord<P extends string, T> = {
  [prop in P]: T
};


// Type
type PropUser = 'u1' | 'u2';

interface IPerson {
  name: string,
  age: number,
  hobby?: string
}

type UsersInfo = PseudoRecord<PropUser, IPerson>;

//
const users: UsersInfo = {
  u1: {
    name: 'foo',
    age: 45,
    hobby: 'coding'
  },
  u2: {
    name: 'bar',
    age: 53,
  }
}
*/


//! Mapped type 에 새로운 속성/속성값 타입 추가
/*
// Mapped type + new prop/value type
type PartialPersonWithNewProp<T> = {
  [P in keyof T]?: T[P]
} & {newMember: boolean};

// type
interface IPerson {
  name: string,
  age: number
}

type UpdatedPersonInfo = PartialPersonWithNewProp<IPerson>;

//
const person: UpdatedPersonInfo = {
  name: 'foo',
  newMember: true
};
*/


//* ---------------------------------
//! Case 1
//*   - Mapped type 으로 객체 속성 제거
//* ---------------------------------

//! w/o Mapped type
/*
interface IUserProfile {
  name: string,
  email: string,
  profilePhotoUrl: string
};

interface IUserProfileOptional {
  name?: string,
  email?: string,
  profilePhotoUrl?: string
};

//
function fetchUserProfile(): IUserProfile {
  return {
    name: 'foo',
    email: 'foo@wow.com',
    profilePhotoUrl: 'image',
  };
}

//function updateUserProfile(member: IUserProfile) {     //? 不可 <- 속성 삭제 시 type 요건 불만족 
function updateUserProfile(member: IUserProfileOptional) {
  delete member.profilePhotoUrl;
}

const user: IUserProfile = fetchUserProfile();             //! ok
//const user: IUserProfileOptional = fetchUserProfile();   //! ok
console.log(user);

updateUserProfile(user);
console.log(user);
*/


//! w/  Mapped type #1
/*
interface IUserProfile {
  name: string,
  email: string,
  profilePhotoUrl: string
};

//type Prop2 = 'name' | 'email' | 'profilePhotoUrl';      //! Mapped type #1
//type UserProfileOptional = {
//  [P in Prop2]?: IUserProfile[P]
//}

type UserProfileOptional = {                              //! Mapped type #2
  [P in keyof IUserProfile]?: IUserProfile[P]
}

//
function fetchUserProfile(): IUserProfile {
  return {
    name: 'foo',
    email: 'foo@wow.com',
    profilePhotoUrl: 'image',
  };
}

//function updateUserProfile(member: IUserProfile) {      //? 不可
function updateUserProfile(member: UserProfileOptional) {
  delete member.profilePhotoUrl;
}

const user: IUserProfile = fetchUserProfile();            //! ok
//const user: UserProfileOptional = fetchUserProfile();   //! ok
console.log(user);

updateUserProfile(user);
console.log(user);
*/


//! w/  Mapped type #2
/*
// Mapped type
type Optional<T> = {
  [P in keyof T]?: T[P]     //! T[P] - 제네릭으로 받은 속성의 타입 유지  
}

// Type
interface IUserProfile {
  name: string,
  email: string,
  profilePhotoUrl: string
};

type UserProfileOptional = Optional<IUserProfile>;

//
function fetchUserProfile(): IUserProfile {
  return {
    name: 'foo',
    email: 'foo@wow.com',
    profilePhotoUrl: 'image',
  };
}

//function updateUserProfile(member: IUserProfile) {      //? 不可
function updateUserProfile(member: UserProfileOptional) {
  delete member.profilePhotoUrl;
}

const user: IUserProfile = fetchUserProfile();            //! ok
//const user: UserProfileOptional = fetchUserProfile();   //! ok
console.log(user);

updateUserProfile(user);
console.log(user);
*/


//* ---------------------------------
//! Case 2
//*   -
//*
//* ※ Intrinsic String Manipulation Types: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype
//* ---------------------------------

// Mapped type
type Listeners<T> = {
  [KT in keyof T as `on${Capitalize<string & KT>}Change`]?: (newValue: T[KT]) => void   
} & {
  [KT in keyof T as `on${Capitalize<string & KT>}Delete`]?: (newValue: T[KT]) => void
}

// Type
interface IDogInfo {
  name: string;
  age: number;
}

type DogInfoListeners = Listeners<IDogInfo>;

//type DogInfoListeners = {
//  onNameChange?: (newValue: string) => void,
//  onAgeChange?: (newValue: number) => void,
//} & {
//  onNameDelete?: (newValue: string) => void,
//  onAgeDelete?: (newValue: number) => void
//}


//
function listenToObject<T>(obj: T, listeners: Listeners<T>) {
  throw 'Needs to be implemented';
}

const lg: IDogInfo = {
  name: "LG",
  age: 13
}

//const lgInfoListeners: DogInfoListeners = {
const lgInfoListeners: Listeners<IDogInfo> = {
  onNameChange: (newName: string) => {},
  onNameDelete: () => {},
  onAgeChange: (newAge: number) => {}
}

listenToObject(lg, lgInfoListeners);     // 'Needs to be implemented'

