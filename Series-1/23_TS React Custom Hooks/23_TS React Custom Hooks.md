# <p><span style="color:cyan">23. TS React Custom Hooks</span></p>

Ref) &nbsp;
<br />

### <span style="color:cyan"><b>Custom Hook 사용으로 ToDo 앱 구현</b></span>

<br />

> <span style="color:orange"><b>React + TypeScript 코딩 원칙</b></span>
>
> 1. `void` 타입 인자(파라미터)의 리액트 함수 컴포넌트 선언은 심플하게!  
> 2. 리액트 함수 컴포넌트 내부에서는 심플하게 내용 채우기!  
> 3. 리액트 함수 컴포넌트 호출은 심플하게!  
>
> &nbsp; &nbsp; &nbsp; ※ &nbsp;리액트 함수 컴포넌트 파일 확장자는 `.tsx` 사용 필수!

<br />

(from tut21)  

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>

&nbsp;1. &nbsp;<span style="color:orange"><b>기본 ToDo 앱</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```ts
// src/App.tsx

import { nanoid } from 'nanoid';
import React, { useEffect, useCallback, useReducer, useRef } from 'react';
import './App.css';

//! Type 
interface ITodo {
  id: string,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: string 
};

//! App Comp.
const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: nanoid(),
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

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
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
  }, []);

  return (
    <div>
      <Heading title="Custom Hooks & TypeScript"/>
      
      <h4>ToDos</h4>
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
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>Custom Hook 이용</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;Case1 (`useReducer()`만 옮김) &nbsp;vs &nbsp;Case2 (`dispatch()` 숨김)  
&nbsp; &nbsp; &nbsp; &nbsp;※ &nbsp;Custom Hook 내부에서 반환값으로 나가는 함수는 `useCallback()` 이용 추천!  

```ts
// src/hooks/useTodos.ts

//* ---------
//! Case 1
//*   - useReducer() 만 옮김
//* ---------
/*
import { nanoid } from 'nanoid';
import { useReducer } from 'react';


//! Type 
interface ITodo {
  id: string,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: string 
};

//! Custom Hook
const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: nanoid(),
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

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initTodos);

  return { todos, dispatch }
}
*/


//* ---------
//! Case 2
//*   - dispatch() 내용 숨김
//* ---------

import { nanoid } from 'nanoid';
import { useReducer, useCallback } from 'react';


//! Type 
interface ITodo {
  id: string,
  text: string,
  done: boolean
}

type Action = { 
  type: "ADD", 
  text: string 
} | { 
  type: "REMOVE", 
  id: string 
};

//! Custom Hook
const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: nanoid(),
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

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
} {
  const [todos, dispatch] = useReducer(reducer, initTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);  

  const removeTodo = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id
    });
  }, []);

  return { todos, addTodo, removeTodo }
}
```

```tsx
// src/App.tsx

//* ---------
//! Case 1
//* ---------
/*
import React, { useEffect, useCallback, useRef } from 'react';
import { useTodos } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: string,
  text: string,
  done: boolean
}

//! App Comp.
function App() {
  const { todos, dispatch } = useTodos([]);
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
      <Heading title="Custom Hooks & TypeScript"/>
      
      <h4>ToDos</h4>
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
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

//! Type

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};

export default App;
*/


//* ---------
//! Case 2
//* ---------

import React, { useEffect, useCallback, useRef } from 'react';
import { useTodos } from "./hooks/useTodos";
import './App.css';

//! Type 
interface ITodo {
  id: string,
  text: string,
  done: boolean
}

//! App Comp.
function App() {
  const { todos, addTodo, removeTodo } = useTodos([]);
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (todo: ITodo) => {
    removeTodo(todo.id)

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
      <Heading title="Custom Hooks & TypeScript"/>
      
      <h4>ToDos</h4>
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
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

//! Type

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};

export default App;
```