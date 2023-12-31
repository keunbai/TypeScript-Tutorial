//! ||= 
//*   - Logical OR assignment operator
//*   - Only evaluates the right operand and assigns to the left if the left operand is falsy
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);    // 50

a.title ||= 'title is empty.';
console.log(a.title);       // 'title is empty.""


//! JS version

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

processed = [    // data 객체 내 user 속성 없을 시 미처리  (예재 기준)
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

class EventProcessor {
  filters = {};
  maps = {};
  processed = [];

  addFilter(eventName, filter) {
    this.filters[eventName] ||= [];
    this.filters[eventName].push(filter);
  }

  addMap(eventName, map) {
    this.maps[eventName] ||= [];
    this.maps[eventName].push(map);
  }

  handleEvent(eventName, data) {
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

class UserEventProcessor extends EventProcessor {}


//
const uep = new UserEventProcessor();

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