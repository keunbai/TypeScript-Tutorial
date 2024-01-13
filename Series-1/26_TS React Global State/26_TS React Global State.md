# <p><span style="color:cyan">26. TS React Global State</span></p>

Ref) &nbsp;https://github.com/streamich/react-use

<br />

&nbsp;※ 여기서부터 React, React+TypeScript 프로젝트 <u>**<span style="color:orange">Vite</span>**</u> 로 전환  

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>

<br />

> <span style="color:orange"><b>React + TypeScript 코딩 원칙</b></span>
>
> 1. `void` 타입 인자(파라미터)의 리액트 함수 컴포넌트 선언은 심플하게!  
> 2. 리액트 함수 컴포넌트 내부에서는 심플하게 내용 채우기!  
> 3. 리액트 함수 컴포넌트 호출은 심플하게!  
>
> &nbsp; &nbsp; &nbsp; ※ &nbsp;리액트 함수 컴포넌트 파일 확장자는 `.tsx` 사용 필수!

<br />

### <span style="color:cyan"><b>createGlobalState() hook </b></span> 
- A React hook that creates globally cross component shared state

<br />

(from tut21, tut23)  
통합본(`App_tot`) 은 ***tut21*** 에서, 커스텀 훅 버전(`App_useTodos`) 은 ***tut23*** 에서 수정

<br />

&nbsp;0. &nbsp;<span style="color:orange"><b>React Hooks 모듈인 `react-use` 설치</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;`npx yarn add react-use`  

<br />

&nbsp;1. &nbsp;<span style="color:orange"><b>통합본</b></span> (from tut21)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```tsx
// src/App_tot.tsx

//* =======================================
//! createGlobalState() hook
//*   - A React hook that creates globally shared state
//*   Ref) https://github.com/streamich/react-use
//* =======================================

//* -----------------
//! from tut21 
//* -----------------

//! Case 1
//?   - Custom Hook 생성 불가 
/*
import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

//const useGlobalState = createGlobalState<ITodo[]>([]);          
const useGlobalState = createGlobalState<ITodo[]>(initState);   //!

function AppWrapper() {
  return (
    <div>
      <Heading title="Generic Components & TypeScript" />
      <Heading title="Todos" />
      <div style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
      }}>
        <App />
        <JustShowTodos />
      </div>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useGlobalState();                   //!
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
          id: todos.length ? todos[todos.length-1].id + 1 : 1, 
          text: newTodoRef.current.value,
          done: false,
        },
      ]);

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [todos, setTodos]);


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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}      
      </ul>  
    </div>
  );
}

function JustShowTodos() {
  const [todos] = useGlobalState();                             //!

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

export default AppWrapper;
*/

//! Case 2
//*   - Custom Hook 생성 가능

import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
const useGlobalState = createGlobalState<ITodo[]>([]);          //!  

function AppWrapper() {
  return (
    <div>
      <Heading title="Generic Components & TypeScript" />
      <Heading title="Todos" />
      <div style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
      }}>
        <App />
        <JustShowTodos />
      </div>
    </div>
  )
}

const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function App() {
  const [todos, setTodos] = useGlobalState();                   //!
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {                                             //!
    setTodos(initState);
  }, [setTodos])

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
          id: todos.length ? todos[todos.length-1].id + 1 : 1, 
          text: newTodoRef.current.value,
          done: false,
        },
      ]);

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [todos, setTodos]);


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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}      
      </ul>  
    </div>
  );
}

function JustShowTodos() {
  const [todos, setTodos] = useGlobalState();                   //!

  useEffect(() => {                                             //!
    setTodos(initState);
  }, [setTodos])

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


export default AppWrapper;
```
<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>커스텀 훅 버전</b></span> (from tut23)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```tsx
// src/hooks/useTodos.tsx

//* -----------------
//! from tut23 React version
//* -----------------

//! Case 1
/*
import { useEffect } from 'react'
import { createGlobalState } from "react-use";

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! Custom Hook
const useGlobalState = createGlobalState([]);

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  setTodos: (state: ITodo[]) => void
} {
  const [todos, setTodos] = useGlobalState();

  useEffect(() => {
    setTodos(initTodos);
  }, [initTodos, setTodos])

  return { todos, setTodos }
}
*/


//! Case 2

import { useEffect, useCallback } from 'react'
import { createGlobalState } from "react-use";

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! Custom Hook
const useGlobalState = createGlobalState([]);

export function useTodos(initTodos: ITodo[]) {
  const [todos, setTodos] = useGlobalState();

  useEffect(() => {
    setTodos(initTodos);
  }, [initTodos, setTodos])

  const addTodo = useCallback((text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length-1].id + 1 : 1, 
        text,
        done: false,
      },
    ]);
  }, [todos, setTodos]);  

  const removeTodo = useCallback((idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));
  }, [todos, setTodos]);

  return { todos, addTodo, removeTodo }
}
```

```tsx
// src/App_useTodos.tsx

//* =======================================
//! createGlobalState() hook
//*   - A React hook that creates globally shared state
//*   Ref) https://github.com/streamich/react-use
//*
//!   - custom hook 버전
//* =======================================

//* -----------------
//! from tut23 React version
//* -----------------
/*
//! Case 1   <- from App_tot.jsx Case 2

import { useEffect, useRef, useCallback } from 'react';
import { useTodos } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
function AppWrapper() {
  return (
    <div>
      <Heading title="Generic Components & TypeScript" />
      <Heading title="Todos" />    
      <div style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
      }}>
        <App />
        <JustShowTodos />
      </div>
    </div>
  )
}

const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function App() {
  const { todos, setTodos } = useTodos(initState);
  const newTodoRef = useRef(null);

  useEffect(() => {
    newTodoRef.current.focus();
  }, []);   

  const handleRemoveClick = useCallback((idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  }, [todos, setTodos]);

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
          id: todos.length ? todos[todos.length-1].id + 1 : 1, 
          text: newTodoRef.current.value,
          done: false,
        },
      ]);

      newTodoRef.current.value = '';
      newTodoRef.current.focus();      
    }  
  }, [todos, setTodos]);

  return (
    <div>
      <div>
        <input 
          id="ToDo" 
          type="text" 
          ref={newTodoRef} 
          placeholder="What to do?"
        />
        <button onClick={handleAddClick}>Add Todo</button>
      </div>      
      <br />
      {todos.map((todo: ITodo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

function JustShowTodos() {
  const { todos } = useTodos(initState);

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 

//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

export default AppWrapper;
*/


//! Case 2   <- from App_tot.jsx Case 2

import { useEffect, useCallback, useRef } from 'react';
import { useTodos } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
function AppWrapper() {
  return (
    <div>
      <Heading title="Generic Components & TypeScript" />
      <Heading title="Todos" />    
      <div style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
      }}>
        <App />
        <JustShowTodos />
      </div>
    </div>
  )
}

const initState: ITodo[] = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function App() {
  const { todos, addTodo, removeTodo } = useTodos(initState);
  const newTodoRef = useRef(null);

  useEffect(() => {
    newTodoRef.current.focus();
  }, []);   

  const handleRemoveClick = useCallback((todo: ITodo) => {
    removeTodo(todo.id)

    newTodoRef.current.focus();
  }, [removeTodo]);

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
        <button onClick={handleAddClick}>Add Todo</button>
      </div>      
      <br />
      {todos.map((todo: ITodo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

function JustShowTodos() {
  const { todos } = useTodos(initState);

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 

//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

export default AppWrapper;
```
