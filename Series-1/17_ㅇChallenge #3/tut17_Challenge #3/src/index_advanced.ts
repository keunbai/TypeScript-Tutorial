//* =================================
//! Challenge #3
//*   - Event Processor 클래스 생성 및 적용 
//*
//*   ＃ 적용 문법 
//*    1) keyof, extends keyof, in keyof, extends
//*    2) Generic for function call signature 
//*    3) Utility type 中 Intrinsic string manupulation type w/ Templete literal type
//*    4) Mapped type 
//*
//!   ※ 'noImplicityAny = false' in tsconfig.json 필수
//* =================================


//* ---------------------------------
//! Preliminary #1 - keyof, extends keyof  cf) entends, in keyof
//* ---------------------------------
/*
interface IPerson {
  name: string,
  age: number
}
  
type Prop = keyof IPerson;    // == 'name' | 'age'

//
const prop1: Prop = 'name';
const prop2: Prop = 'age';

// function setProperty<T>(obj: T, key: keyof T, value: T[keyof T]): void {
//   obj[key]=value;
// }
function setProperty<T, KT extends keyof T>(obj: T, key: KT, value: T[KT]): void {
  obj[key]=value;
}

function getProperty<T, KT extends keyof T>(obj: T, key: KT): T[KT] {
  return obj[key];
}

const person: IPerson = {} as IPerson;
console.log(person);
setProperty(person, 'name', 'Anna');
console.log(person);
console.log(getProperty(person, 'name'));
*/


//* ---------------------------------
//! Preliminary #2 - generic for function
//*   - type 정의 내 제네릭 변수 위치 차이 확인
//* ---------------------------------

//! Case 1
/*
type PrintVar = <T>(arg: T) => void;
type ArrayLength = <T>(arr: T[]) => number;

//
const handleVar: PrintVar = (arg) => console.log(arg);
const handleArrayOnly: ArrayLength = (arr) => arr.length;

handleVar('kb');
handleVar(['foo', 'bar']);
console.log(handleArrayOnly([1, 2, 3]));
console.log(handleArrayOnly(['kb', 'jm']));
*/

//! Case 2
/*
type PrintVar<T> = (arg: T) => void;
type ArrayLength<T> = (arr: T[]) => number;

//
//const handleVar: PrintVar = (arg) => console.log(arg);    //? Error
const handleVar: PrintVar<string[]> = (arg) => console.log(arg);
const handleArrayOnly: ArrayLength<string> = (arr) => arr.length;

//handleVar('kb');                           //? Error       
handleVar(['foo', 'bar']);
//console.log(handleArrayOnly([1, 2, 3]));   //? Error
console.log(handleArrayOnly(['kb', 'jm']));
*/


//* ---------------------------------
//! Preliminary #3 
//!   1) utility type 中 Intrinsic String Manipulation Types
//*       - 특정 string 으로 type 지정 가능
//*       - Captialize<ST>, Uppercase<ST>   ※ ST: string type
//!   2) Template Literal Types
//*
//*   Ref) https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype
//* ---------------------------------
/*
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
*/


//* ---------------------------------
//! Preliminary #4 - Mapped types
//* ---------------------------------
/*
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
*/

//* ---------------------------------
//! Event Processor - Advanced
//* ---------------------------------

/*
handlers = [
  {
    filterLogin: ({ user }) => Boolean(user),
    mapLogin: (data) => ({
      ...data,
      hasSession: Boolean(data.user && data.name)
    }),
    filterLogout: ({ user }) => Boolean(user)   
  },
  {
    ...
  },
]

processed = [    // data 객체 내 user 속성 없을 시 미처리 (예제 기준)
  {
    eventName: 'login',
    data: {
      user: 'foo',
      name: 'bar',
      hasSession: 'true'
    }
  },
  {
    eventName: 'login',
    data: {
      name: 'cuz',
      hasSession: 'false'
    }
  },
  {
    eventName: 'logout',
    data: {
      user: 'foo',
      name: 'bar',      
    }
  },
  {
    eventName: 'logout',
    data: {
      user: 'cuz'
    }
  }
]
*/


//! Case 1. keyof

// Mapped type
type FilterFunc<T> = (data: T) => boolean;    // call signature type2
type MapFunc<T> = (data: T) => T;

type Handler<T> = {
  [KT in keyof T as `filter${Capitalize<KT & string>}`]?: FilterFunc<T[KT]>
} & {
  [KT in keyof T as `map${Capitalize<KT & string>}`]?: MapFunc<T[KT]> 
}

// Type
interface IEventMap {
  login: {
    user?: string,
    name?: string,
    hasSession?: boolean
  },
  logout: {
    user?: string,
    name?: string
  }
}

// Type
interface IEventMap {
  login: {
    user?: string,
    name?: string,
    hasSession?: boolean
  },
  logout: {
    user?: string,
    name?: string
  }
}

//type EventMapHandler = {
//  filterLogin?: (data: IEventMap['login']) => boolean,
//  mapLogin?: (data: IEventMap['login']) => IEventMap['login'],
//  filterLogout?: (data: IEventMap['logout']) => boolean,
//  mapLogout?: (data: IEventMap['logout']) => IEventMap['logout']
//}
type EventMapHandler = Handler<IEventMap>;

type EventProcessed<T> = {
  eventName: keyof T,
  data: T[keyof T]
}

//
class EventProcessor<T extends {}> {
  //private handlers = [] as Handler<T>[] ;
  private handlers: Handler<T>[] = [] ;
  private processed: EventProcessed<T>[] = [];

  addHandler(handler: Handler<T>) {
    this.handlers.push(handler);
  }

  handleEvent(eventName: keyof T & string, data: T[keyof T]) {  
  //handleEvent<KT extends keyof T>(eventName: KT, data: T[KT]) {  
    let allowEvent = true;
    
    const capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filterFunc = handler[`filter${capitalize(eventName as string)}`];  //! noImplicityAny = false in tsconfig.json
      //const filterFunc = handler[`filter${capitalize(eventName)}` as keyof Handler<T>] as ((value: T[KT]) => boolean);  //? 도대체 이게 뭔..
      
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = {...data};
      for (const handler of this.handlers) {
        const mapFunc = handler[`map${capitalize(eventName as string)}`];  //! noImplicityAny = false in tsconfig.json
        //const mapFunc = handler[`map${capitalize(eventName)}` as keyof Handler<T>] as ((value: T[KT]) => T[KT]);       //? 도대체 이게 뭔..

        if (mapFunc) {
          mappedData = mapFunc(mappedData);
        }
      }

      this.processed.push({
        eventName,
        data: mappedData        
      });
    }
  }

  getProcessedEvents() {
    return this.processed;
  }
}

class UserEventProcessor<T extends {}> extends EventProcessor<T> {}    //! ver. 1
const uep = new UserEventProcessor<IEventMap>();

//class UserEventProcessor extends EventProcessor<IEventMap> {}        //! ver. 2
//const uep = new UserEventProcessor();

//
//const handler: Handler<IEventMap> = {
  const handler: EventMapHandler = {
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name)
  }),
  filterLogout: ({ user }) => Boolean(user)
};

uep.addHandler(handler);

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 X
  name: 'jack'
});

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 + map 의한 데이터 객체 속성 추가 
  user: 'tom',
  name: 'tomas'
});
uep.handleEvent('logout', {   //! 'logout' 이벤트 filtr 통과 + map 없음    
  user: 'tom'
});

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 + map 의한 데이터 객체 속성 추가 X
  user: 'foo'
});
uep.handleEvent('logout', {   //! 'logout' 이벤트 filter 통과 X
  name: 'foobear'
});

console.log(uep.getProcessedEvents());


//! Case 2. extends keyof
/*
// Mapped type
type FilterFunc<T> = (data: T) => boolean;    // call signature type2
type MapFunc<T> = (data: T) => T;

type Handler<T> = {
  [KT in keyof T as `filter${Capitalize<KT & string>}`]?: FilterFunc<T[KT]>
} & {
  [KT in keyof T as `map${Capitalize<KT & string>}`]?: MapFunc<T[KT]> 
}

// Type
interface IEventMap {
  login: {
    user?: string,
    name?: string,
    hasSession?: boolean
  },
  logout: {
    user?: string,
    name?: string
  }
}

//type EventMapHandler = {
//  filterLogin?: (data: IEventMap['login']) => boolean,
//  mapLogin?: (data: IEventMap['login']) => IEventMap['login'],
//  filterLogout?: (data: IEventMap['logout']) => boolean,
//  mapLogout?: (data: IEventMap['logout']) => IEventMap['logout']
//}
type EventMapHandler = Handler<IEventMap>;

type EventProcessed<T, KT extends keyof T> = {
  eventName: KT,
  data: T[KT]
}


//
class EventProcessor<T extends {}, KT extends keyof T> {
  //private handlers = [] as Handler<T>[] ;
  private handlers: Handler<T>[] = [] ;
  private processed: EventProcessed<T, KT>[] = [];

  addHandler(handler: Handler<T>) {
    this.handlers.push(handler);
  }

  handleEvent(eventName: KT, data: T[KT]) {  
    let allowEvent = true;
    
    const capitalize = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filterFunc = handler[`filter${capitalize(eventName as string)}`];   //! noImplicityAny = false in tsconfig.json
      //const filterFunc = handler[`filter${capitalize(eventName)}` as keyof Handler<T>] as ((value: T[KT]) => boolean);  //? 도대체 이게 뭔..
      
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = {...data};
      for (const handler of this.handlers) {
        const mapFunc = handler[`map${capitalize(eventName as string)}`];  //! noImplicityAny = false in tsconfig.json
        //const mapFunc = handler[`map${capitalize(eventName)}` as keyof Handler<T>] as ((value: T[KT]) => T[KT]);       //? 도대체 이게 뭔..

        if (mapFunc) {
          mappedData = mapFunc(mappedData);
        }
      }

      this.processed.push({
        eventName,
        data: mappedData        
      });
    }
  }

  getProcessedEvents() {
    return this.processed;
  }
}

class UserEventProcessor<T extends {}, KT extends keyof T> extends EventProcessor<T, KT> {}    //! ver. 1
const uep = new UserEventProcessor<IEventMap, keyof IEventMap>();

//class UserEventProcessor extends EventProcessor<IEventMap, keyof IEventMap> {}        //! ver. 2
//const uep = new UserEventProcessor();

//
//const handler: Handler<IEventMap> = {
const handler: EventMapHandler = {
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name)
  }),
  filterLogout: ({ user }) => Boolean(user)
};

uep.addHandler(handler);

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 X
  name: 'jack'
});

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 + map 의한 데이터 객체 속성 추가 
  user: 'tom',
  name: 'tomas'
});
uep.handleEvent('logout', {   //! 'logout' 이벤트 filtr 통과 + map 없음    
  user: 'tom'
});

uep.handleEvent('login', {    //! 'login' 이벤트 filter 통과 + map 의한 데이터 객체 속성 추가 X
  user: 'foo'
});
uep.handleEvent('logout', {   //! 'logout' 이벤트 filter 통과 X
  name: 'foobear'
});

console.log(uep.getProcessedEvents());
*/


/*
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } },
  { eventName: 'login', data: { user: 'foo', hasSession: false } }
]
*/