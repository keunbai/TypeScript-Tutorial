//* =================================
//! Challenge #3
//*   - Event Processor 클래스 생성 및 적용 
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
//! Event Processor - Basic
//* ---------------------------------

/*
filters = {
  'login': [cbFunc1, cbFunc2, ...],
  'logout': [cbFunc1, cbFunc2, ...],
  ...
}

maps = {
  'login': [cbFunc1, cbFunc2, ...],
  'logout': [cbFunc1, cbFunc2, ...]
}

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
/*
//
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

type FilterFunc<T> = (data: T[keyof T]) => boolean;   // function
type Filters<T> = Record<keyof T, FilterFunc<T>[]>    // object
type MapFunc<T> = (data: T[keyof T]) => T[keyof T];   // function
type Maps<T> = Record<keyof T, MapFunc<T>[]>;         // object
type EventProcessed<T> = {
  eventName: keyof T,
  data: T[keyof T]
}

//
class EventProcessor<T extends {}> {
  //private filters: Filters<T> = <Filters<T>>{};    //! ok
  private filters = {} as Filters<T>;
  private maps = {} as Maps<T>;
  private processed = [] as EventProcessed<T>[];
  //private processed = [];   //! ok

  //addFilter<KT extends keyof T>(eventName: KT, filter: FilterFunc<T>): void {
  addFilter(eventName: keyof T, filter: FilterFunc<T>): void {
    this.filters[eventName] ||= [];
    this.filters[eventName].push(filter);
  }

  //addMap<KT extends keyof T>(eventName: KT, map: (data: T[KT]) => T[KT]): void {
  //addMap<KT extends keyof T>(eventName: KT, map: MapFunc<T>): void {
  //addMap(eventName: keyof T, map: (data: T[keyof T]) => T[keyof T]) {
  addMap(eventName: keyof T, map: MapFunc<T>) {
    this.maps[eventName] ||= [];
    this.maps[eventName].push(map);
  }

  handleEvent(eventName: keyof T, data: T[keyof T]) {
    let allowEvent = true;
    
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;              //! 모든 filter들 모두 통과 필수
        break;
      }
    }

    if (allowEvent) {
      let mappedData = {...data};
      for (const map of this.maps[eventName] ?? []) {
        mappedData = map(mappedData);    //! 각 map 통과 시 data 객체 속성 추가됨
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
uep.addFilter('login', ({ user }) => Boolean(user));
uep.addMap('login', (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name)
}));
uep.addFilter('logout', ({ user }) => Boolean(user));

//console.log(`${uep.filters.login}`);
//console.log(`${uep.maps.login}`);

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


//! Case 2. extends keyof

//
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

type FilterFunc<T, KT extends keyof T> = (data: T[KT]) => boolean;       // function
type Filters<T, KT extends keyof T> = Record<KT, FilterFunc<T, KT>[]>    // object
type MapFunc<T, KT extends keyof T> = (data: T[KT]) => T[KT];            // function
type Maps<T, KT extends keyof T> = Record<KT, MapFunc<T, KT>[]>          // object
type EventProcessed<T, KT extends keyof T> = {
  eventName: KT,
  data: T[KT]
}

//
class EventProcessor<T extends {}, KT extends keyof T> {
  //private filters: Filters<T> = <Filters<T>>{};    //! ok
  private filters = {} as Filters<T, KT>;
  private maps = {} as Maps<T, KT>;
  private processed = [] as EventProcessed<T, KT>[];
  //private processed = [];   //! ok

  addFilter(eventName: KT, filter: FilterFunc<T, KT>): void {
    this.filters[eventName] ||= [];
    this.filters[eventName].push(filter);
  }

  //addMap(eventName: KT, map: (data: T[KT]) => T[KT]) {
  addMap(eventName: KT, map: MapFunc<T, KT>) {
    this.maps[eventName] ||= [];
    this.maps[eventName].push(map);
  }

  handleEvent(eventName: KT, data: T[KT]) {
    let allowEvent = true;
    
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;              //! 모든 filter들 모두 통과 필수
        break;
      }
    }

    if (allowEvent) {
      let mappedData = {...data};
      for (const map of this.maps[eventName] ?? []) {
        mappedData = map(mappedData);    //! 각 map 통과 시 data 객체 속성 추가됨
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


//class UserEventProcessor<T extends {}, KT extends keyof T> extends EventProcessor<T, KT> {}    //! ver. 1
//const uep = new UserEventProcessor<IEventMap, keyof IEventMap>();

class UserEventProcessor extends EventProcessor<IEventMap, keyof IEventMap> {}        //! ver. 2
const uep = new UserEventProcessor();

//
uep.addFilter('login', ({ user }) => Boolean(user));
uep.addMap('login', (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name)
}));
uep.addFilter('logout', ({ user }) => Boolean(user));

//console.log(`${uep.filters.login}`);
//console.log(`${uep.maps.login}`);

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