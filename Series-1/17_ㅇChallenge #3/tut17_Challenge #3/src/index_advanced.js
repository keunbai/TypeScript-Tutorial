//! JS version

/*
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
  handlers = [];
  processed = [];

  addHandler(handler) {
    this.handlers.push(handler);
  }

  handleEvent(eventName, data) {
    let allowEvent = true;
    
    const capitalize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filterFunc = handler[`filter${capitalize(eventName)}`];
      
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = {...data};
      for (const handler of this.handlers) {
        const mapFunc = handler[`map${capitalize(eventName)}`];

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

class UserEventProcessor extends EventProcessor {}

//
const handler = {
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name)
  }),
  filterLogout: ({ user }) => Boolean(user)
};

const uep = new UserEventProcessor();

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