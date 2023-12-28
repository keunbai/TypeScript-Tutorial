//* =================================
//! Utility Type #1
//*   - 기존 타입으로부터 제네릭 활용 새로운 타입 생성  
//*
//! ※ 객체의 속성 타입
//*   1) if == 속성 이름 -> 속성 정해진 일반적인 객체 생성
//*   2) if == 기본 데이터 타입 -> indexable type, 속성 타입만 정해진 객체 생성
//* =================================


//* ---------------------------------
//! Preliminary 
//*   Ref) https://www.typescriptlang.org/ko/docs/handbook/utility-types.html
//* ---------------------------------

//! Partial<T>
//*  - 제네릭 T 내 모든 속성 중 선택적으로 하위 타입 생성
interface ITodo {
  title: string,
  desc: string
}

type UpdateTodo = (todo: ITodo, propToUpdate: Partial<ITodo>) => ITodo;

//
const updateTodo: UpdateTodo = (todo, propToUpdate) => ({...todo, ...propToUpdate});

const todoToday = {
  title: 'organize desk',
  desc: 'clear clutters'
};

const todoTodayNew = updateTodo(todoToday, {
  desc: 'throw out trash'
});
console.log(todoTodayNew);


//! Required<T>
//*  - 제네릭 T 내 모든 속성을 필수로 타입 생성 
interface IProps {
  a?: number;
  b?: string;
}

//
const obj: IProps = {a: 5};
const obj2: Required<IProps> = {a: 5, b: 'foo'};    
//const obj3: Required<IProps> = {a: 5};    //? Error


//! Readonly<T>
//*  - 제네릭 T 내 모든 속성 읽기전용으로 설정한 타입 생성
interface IFruit {
  title: string
}

//
const fruit: Readonly<IFruit> = {
  title: 'apple'
};

//fruit.title = 'banana'    //? Error


//! Pick<T, KT>
//*  - 제네릭 T 중 제네릭 KT key 타입만 선택 후 타입 생성 
interface ITodo2 {
  title: string;
  description: string;
  completed: boolean;
}

//
const todo2: Pick<ITodo2, 'title' | 'completed'> = {
  title: 'Clean room',
  completed: false,
};


//! Omit<T, KT>
//*  - 제네릭 T 중 제네릭 KT key 타입만 제외한 타입 생성 
interface ITodo3 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview3 = Omit<ITodo3, 'description'>;

//
const todo3: TodoPreview3 = {
  title: 'Clean room',
  completed: false,
};


//! Record<KT, T> 
//*  - (첫번째 제네릭 KT는 key 의 타입, 두번째 제네릭 T 는 key 값의 타입) 의 타입 생성 
//*  Ref) https://velog.io/@ggong/Typescript%EC%9D%98-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85-1-Record-Extract-Pick

//* Case 1
type Page = 'home' | 'about' | 'contact';

interface IPageInfo {
  title: string;
}

//
const nav: Record<Page, IPageInfo> = {
  home: {title: "home"},       //? key 누락시 에러
  about: {title: "about"},
  contact: {title: "contact"},
};

console.log(nav.about);

//* Case 2
type FormName = 'event' | 'point';
interface IFieldValue {
  name: string,
  value: number
};
type GameHistory = Record<FormName, IFieldValue>;

type GetInfo = (X: GameHistory) => IFieldValue[];

// 
const getInfo: GetInfo = function(X) {
  return [X.event, X.point]
} 

const accident: GameHistory = {
  event: {
    name: 'foo',
    value: 10
  },
  point: {
    name: 'bar',
    value: 20
  }
};

console.log(getInfo(accident));


//* Case 3
type FlexibleDogInfo = {
  name: string
} & Record<string, string | number>;

interface IFlexibleDogInfo {
  name: string,
  [prop: string]: string | number
}

//
const myDog: FlexibleDogInfo = {
  name: 'LG',
  breed: 'Mutt',
  age: 2
};

const yourDog: IFlexibleDogInfo = {
  name: 'Kerry',
  breed: 'Mixed',
  age: 4,
  sex: 'F'
}


//* Case 4
interface IIDGenerator {
  id: string
}
interface IArticle {
  title: string,
  desc: string
}
type ArticleWithId = Record<IIDGenerator['id'], IArticle>   //! KT type frome Fields

//
const getArticleWithId = (idGen: IIDGenerator, article: IArticle): ArticleWithId => ({
  [idGen.id]: article
});

const idGen1 = {id: 'bigRock'};
const article1 = {
  title: 'TypeScript',
  desc: 'TypeScript is ...'
};

const articleWithId = getArticleWithId(idGen1, article1);
console.log(articleWithId, '\n');


//* ---------------------------------
//! Partial<T> 
//* ---------------------------------
interface IMyUser {
  name: string,
  id: number,
  email?: string,
  phone?: string
}

type MyUserOptionals = Partial<IMyUser>;

//
const merge = (user: IMyUser, overrides: MyUserOptionals): IMyUser => ({
  ...user, ...overrides
});

const myUser = {
  name: "Jack",
  id: 2,
  email: "dontemail@dontemail.com",
};

const emailUpdated = {
  email: "dontemailbaz@dontemail.com"
}

console.log(merge(myUser, emailUpdated), '\n');


//* ---------------------------------
//! Required<T> 
//! Pick<T, KT> 
//! Omit<T, KT> 
//* ---------------------------------
interface IMyUser2 {
  name: string,
  id: number,
  email?: string,
  phone?: string
}

type RequiredMyUser = Required<IMyUser2>;                   //! optional 속성 포함 모든 속성 필수 
type JustEmailAndName = Pick<IMyUser2, 'name' | 'email'>;
type UserWithoutID = Omit<IMyUser2, 'id'>;


//* ---------------------------------
//! Record<KT, T>
//* ---------------------------------
interface IMyUser3 {
  name: string,
  id: number,
  email?: string,
  phone?: string
}

type UserWithoutID3 = Omit<IMyUser3, 'id'>;

//
//const mapById = (users: IMyUser3[]): Record<IMyUser3['id'], UserWithoutID3> => {   //! KT type from Fields
const mapById = (users: IMyUser3[]): Record<string, UserWithoutID3> => {   //! KT type from Fields
  return users.reduce((a, v) => {
    const { id, ...theRest } = v;
    return {
      ...a,
      [id]: theRest,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 213,
      name: "Mr. Foo",
      email: 'foo@pinetree.com'
    },
    {
      id: 315,
      name: "Mrs. Baz",
    },
  ]), 
  '\n'
);


// snippet #1
const user: IMyUser3 = {
  id: 18,
  name: 'cuz',
  email: 'cuz@pinetree.com'
}

const { id, ...rest } = user;
console.log({id});
console.log(id);
console.log(rest, '\n');


// snippet #2 
//   - Indexable Type = Index Signature
type HumanInfo = {     
  [name: string]: number,    
};

type Fruit = {
  [prop: string]: string | number
}

//
const human: HumanInfo = {
  'foo': 20,
  'baz': 30,
  'cur': 40,
};
console.log(human.foo);

const fruit_KR: Fruit = {
  'name': 'apple',
  'color': 'red',
  'yr': 2
}

const fruit_VN: Fruit = {
  name: 'banana',
  color: 'yellow'
}

console.log(fruit_KR);
console.log(fruit_VN);

//console.log(fruit_KR.'color');   //? Error
console.log(fruit_KR['color']);
console.log(fruit_KR.color);
console.log(fruit_VN['color']);
console.log(fruit_VN.color, '\n');


//* ---------------------------------
//! utility type 中 Intrinsic String Manipulation Types
//*   - 특정 string 으로 type 지정 가능
//*   - Captialize<ST>, Uppercase<ST>   ※ ST: string type
//! Template Literal Types
//*
//* Ref) https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype
//* ---------------------------------
//! Case 1
type GreetingLC = 'hello world';    //! 특정 string 으로 type 지정
type GreetingCap = Capitalize<GreetingLC>;   
//type GreegintCap = 'Hello world';

const greeting: GreetingCap = 'Hello world';

//! Case 2
type NameCap<ST extends string> = Capitalize<ST>;
//type NameCap<ST> = Capitalize<ST & string>;

type MyName = 'keunbai';
type MyNameCap = NameCap<MyName>;
//type MyNameCap = 'Keunbai';

type WifeNameCap = NameCap<'jungmini'>;
//type WifeNameCap = 'Jungmini';

//
const myName:MyNameCap = 'Keunbai';
const wifeName:WifeNameCap = 'Jungmini';

//! Case 3
type ASCIICacheKey<ST extends string> = `ID-${Uppercase<ST>}`;   //! Template Literal Types
//type ASCIICacheKey<ST> = `ID-${Uppercase<ST & string>}`;       //! Template Literal Types

type CacheKey = 'my_app';
type MyID = ASCIICacheKey<CacheKey>;
//type MyID = 'ID-MY_APP';

type YourID = ASCIICacheKey<'your_app'>
//type YourID = 'ID-YOUR_APP';

//
const myid: MyID = 'ID-MY_APP';
const yourid: YourID = 'ID-YOUR_APP';

