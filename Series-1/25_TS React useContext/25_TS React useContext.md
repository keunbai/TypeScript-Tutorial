# <p><span style="color:cyan">25. TS React useContext()</span></p>

Ref) &nbsp;
<br />

### <span style="color:cyan"><b>useContext() w/ useReducer()</b></span>  

<br />

> <span style="color:orange"><b>React + TypeScript 코딩 원칙</b></span>
>
> 1. `void` 타입 인자(파라미터)의 리액트 함수 컴포넌트 선언은 심플하게!  
> 2. 리액트 함수 컴포넌트 내부에서는 심플하게 내용 채우기!  
> 3. 리액트 함수 컴포넌트 호출은 심플하게!  
>
> &nbsp; &nbsp; &nbsp; ※ &nbsp;리액트 함수 컴포넌트 파일 확장자는 `.tsx` 사용 필수!

<br />

(from tut21, tut23)  
통합본(`App_tot`) 은 tut21 에서, 커스텀 훅 버전(`App_useTodos`) 은 tut23 에서 수정

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>

<br />

&nbsp;1. &nbsp;<span style="color:orange"><b>통합본</b></span> (from tut21)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```tsx
// src/App.tsx

//* =======================================
//! (from tut21 React version)
//* =======================================

import { 
  useEffect, useReducer, useRef, useCallback, createContext, useContext 
} from 'react';
import './App.css';


//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: number,
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;


//! App Comp.
const todoContext = createContext<UseReducerManager>({
  todos: [],
  dispatch: () => {}
});
//const todoContext = createContext<UseReducerManager>(null);
//const todoContext = createContext(null);

const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: state.length ? state[state.length-1].id + 1 : 1,
          text: action.text,
          done: false,
        },
      ];
    case "REMOVE":
      return state.filter(({ id }) => id !== action.id);
    default:
      //throw new Error();
      return state;
  }
}; 

function useReducerManager(initialState: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch};  
}

const initState: ITodo[] = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function AppWrapper() {
  return (
    <div>
      <Heading title="React useContext() & TypeScript" />
      <Heading title="Todos" />
      
      <todoContext.Provider value={useReducerManager(initState)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%'
        }}>
          <App/>
          <JustShowTodos/>
        </div>
      </todoContext.Provider>
    </div>

  );
}

function App() {
  const { todos, dispatch } = useContext(todoContext);
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (todo: ITodo) => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [dispatch]);

  return (
    <div>
      <div>
        <input 
          id="ToDo" 
          type="text" 
          ref={newTodoRef} 
          placeholder="What to do?"
        />
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>
      <br />         
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </li>
      ))}
      <br />
    </div>
  );
}

function JustShowTodos() {
  const { todos } = useContext(todoContext);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type


//! Sub Comp.
function Heading({ title }: {title: string}) {
  return <h2>{title}</h2>
};
//const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
//  return <h2>{title}</h2>
//};


export default AppWrapper;
```
<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>커스텀 훅 버전</b></span> (from tut23)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```tsx
// src/hooks/useTodos.tsx

//* ---------
//! Case 1
//*   - useReducer() 만 옮김
//* ---------
/*
import React, { useReducer, createContext, useContext } from 'react';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: number 
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;

//! Custom Hook
const todoContext = createContext<UseReducerManager>({
  todos: [],
  dispatch: () => {}
});
//const todoContext = createContext<UseReducerManager>(null);
//const todoContext = createContext(null);

const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: state.length ? state[state.length-1].id + 1 : 1,
          text: action.text,
          done: false,
        },
      ];
    case "REMOVE":
      return state.filter(({ id }) => id !== action.id);
    default:
      //throw new Error();
      return state;
  }
}; 

function useReducerManager(initialState: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch};  
}

export function ContextProvider({ 
  initialState, 
  children 
}: {
  initialState: ITodo[],
  children: React.ReactNode
}) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

// export const ContextProvider: React.FunctionComponent<{
//   initialState: ITodo[],
//   children: React.ReactNode
// }> = ({ initialState, children }) => (
//   <todoContext.Provider value={useReducerManager(initialState)}>
//     {children}
//   </todoContext.Provider>
// )

export function useTodos() {
  const { todos, dispatch } = useContext(todoContext);

  return { todos, dispatch }
}
*/


//* ---------
//! Case 2
//*   - dispatch() 숨김
//* ---------

import React, { useReducer, useCallback, createContext, useContext } from 'react';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: number 
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;

//! Custom Hook
const todoContext = createContext<UseReducerManager>({
  todos: [],
  dispatch: () => {}
});
//const todoContext = createContext<IUseReducerManager>(null);
//const todoContext = createContext(null);

const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: state.length ? state[state.length-1].id + 1 : 1,
          text: action.text,
          done: false,
        },
      ];
    case "REMOVE":
      return state.filter(({ id }) => id !== action.id);
    default:
      //throw new Error();
      return state;
  }
}; 

function useReducerManager(initialState: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch};  
}

export function ContextProvider({ 
  initialState, 
  children 
}: {
  initialState: ITodo[],
  children: React.ReactNode       
}) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

// export const ContextProvider: React.FunctionComponent<{
//   initialState: ITodo[],
//   children: React.ReactNode    
// }> = ({ initialState, children }) => (
//   <todoContext.Provider value={useReducerManager(initialState)}>
//     {children}
//   </todoContext.Provider>
// )

export function useTodos(): {
  todos: ITodo[],
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const { todos, dispatch } = useContext(todoContext);   //! children 컴포넌트 내부에서 호출이라 가능

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, [dispatch]);  

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id
    });
  }, [dispatch]);

  return { todos, addTodo, removeTodo }
}
```

```tsx
// src/App_useTodos.tsx

//* =======================================
//! (from tut23 React version)
//* =======================================

//* ---------
//! Case 1
//*  - useReducer() 만 옮김
//* ---------
/*
import { useEffect, useCallback, useRef } from 'react';
import { useTodos, ContextProvider } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
function AppWrapper() {
  const initState: ITodo[] = [
    {
      id: 1,
      text: 'Study TS React first!',
      done: false
    }
  ];

  return (
    <div>
      <Heading title="React useContext() & TypeScript" />
      <h4>ToDos</h4>
      
      <ContextProvider initialState={initState}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%'
        }}>
          <App/>
          <JustShowTodos/>
        </div>
      </ContextProvider>
    </div>

  );
}

function App() {
  const { todos, dispatch } = useTodos();
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (todo: ITodo) => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [dispatch]);

  return (
    <div>
      <div>
        <input 
          id="ToDo" 
          type="text" 
          ref={newTodoRef} 
          placeholder="What to do?"
        />
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>      
      <br />
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </li>
      ))}
    </div>
  );
}

function JustShowTodos() {
  const { todos } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};

export default AppWrapper;
*/


//* ---------
//! Case 2
//*  - dispatch() 숨김
//* ---------

import React, { useEffect, useCallback, useRef } from 'react';
import { useTodos, ContextProvider } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
function AppWrapper() {
  const initState: ITodo[] = [
    {
      id: 1,
      text: 'Study TS React first!',
      done: false
    }
  ];

  return (
    <div>
      <Heading title="React useContext() & TypeScript" />
      <h4>ToDos</h4>
      
      <ContextProvider initialState={initState}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%'
        }}>
          <App/>
          <JustShowTodos/>
        </div>
      </ContextProvider>
    </div>

  );
}

function App() {
  const { todos, addTodo, removeTodo } = useTodos();
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (todo: ITodo) => {
    removeTodo(todo.id);

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);  

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [addTodo]);

  return (
    <div>
      <div>
        <input 
          id="ToDo" 
          type="text" 
          ref={newTodoRef} 
          placeholder="What to do?"
        />
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>      
      <br />
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </li>
      ))}
    </div>
  );
}

function JustShowTodos() {
  const { todos } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 

//! Type

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};

export default AppWrapper;
```
