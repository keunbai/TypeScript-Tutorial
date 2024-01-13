# <p><span style="color:cyan">21. TS React Hooks</span></p>

Ref) &nbsp;https://github.com/typescript-cheatsheets/react 

<br />

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>


> <span style="color:orange"><b>React + TypeScript 코딩 원칙</b></span>
>
> 1. `void` 타입 인자(파라미터)의 리액트 함수 컴포넌트 선언은 심플하게!  
> 2. 리액트 함수 컴포넌트 내부에서는 심플하게 내용 채우기!  
> 3. 리액트 함수 컴포넌트 호출은 심플하게!  
>
> &nbsp; &nbsp; &nbsp; ※ &nbsp;리액트 함수 컴포넌트 파일 확장자는 `.tsx` 사용 필수!

<br />

### <span style="color:cyan"><b>useState(), useEffect(), useReducer(), useRef(), useCallback()</b></span>

<br />

(from tut20)  

&nbsp;0. &nbsp;<span style="color:orange">json 데이터 생성</span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;`public` 폴더 內 `data/db.json` 생성  

```json
// public/data/db.json

{
  "text": "Hello keunbai"
}
```
<br />

&nbsp;1. &nbsp;<span style="color:orange">useState()</span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```ts
// src/App.tsx

import React, { useState } from 'react';
import './App.css';

//! Type 
interface IPayload {
  text: string;
}

//! App Comp.
function App() {
  //const [checkState, setCheckState] = useState(true);             // boolear/string/number 가능
  const [payload, setPayload] = useState<IPayload | null>(null);    // null 과 다른 type 함께 쓰일 경우
  
  return (
    <div>
    
    </div>
  );
}
```
<br />

&nbsp;2. &nbsp;<span style="color:orange">useEffect()</span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```js
// src/App.tsx

import React, { useCallback, useState, useEffect } from 'react';
import './App.css';

//! Type 
interface IPayload {
  text: string;
}

//! App Comp.
function App() {
  //const [checkState, setCheckState] = useState(true);             
  const [payload, setPayload] = useState<IPayload | null>(null);    

  useEffect(() => {
    fetch("/data/db.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);  

  return (
    <div>
      <Box>{JSON.stringify(payload)}</Box>      
    </div>
  );
}
```

<br />

&nbsp;3. &nbsp;<span style="color:orange">useReducer()</span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```js
// src/App.tsx

import React, { useEffect, useCallback, useReducer, useRef } from 'react';
import './App.css';


//! Type 
interface IPayload {
  text: string
}

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

//! App Comp.
const reducer = (state: ITodo[], action: Action): ITodo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: state.length,
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
      <Heading title="Todos" />

      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
      <br />
      <div>
        <input 
          id="ToDo" 
          type="text" 
          ref={newTodoRef} 
          placeholder="What to do?"
        />
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>         
    </div>
  );
}
```