# <p><span style="color:cyan">24. TS React Generic Components</span></p>

Ref) &nbsp;
<br />

<span style="color:cyan"><b>ToDo 앱 내 Generic Components 구현</b></span> 

<br />

(from tut21)  

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>

<br />

&nbsp;1. &nbsp;<span style="color:orange"><b>기본 ToDo 앱</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;  

```tsx
// src/App_o.tsx

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
  id: string,
};

//! App Comp.
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

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

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
      <Heading title="Generic Components & TypeScript"/>

      <Heading title="Todos" />

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
      <br />
    </div>
  );
}


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


export default App;
```

<br />


&nbsp;2. &nbsp;<span style="color:orange"><b>Generic Components 생성</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;기본 `<ul>` 둘러싸는 Generic 컴포넌트 생성  
&nbsp; &nbsp; &nbsp; &nbsp;※ &nbsp;`<li>` element key 값은 item 의 idx 값으로 충분   (item 객체 자체의 고유 id 속성값은 별도로 부여)


&nbsp;3. &nbsp;<span style="color:orange"><b>Adding Custom (Detailed) HTML Props</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;Generic 컴포넌트 + 기본 `<ul>` HTML element 커스텀  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &rarr; &nbsp;기본 `<ul>` HTML element 모든 Props 이용 가능 (ex: `style` 등)  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;컴포넌트 內, 커스텀 위한 HTML Props 타입 확인&nbsp;: &nbsp;https://unpkg.com/@types/react@18.2.0/index.d.ts  


```tsx
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

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

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
      <Heading title="Generic Components & TypeScript"/>

      <Heading title="Todos" />

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
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))} */}
      <UL 
        style={{marginLeft: "0.5rem"}}
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(item) => (
          <>
            {item.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(item)}>Remove</button>
          </>
        )}    
      />       
    </div>
  );
}


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


const UL = function<T>({     //! Generic Component
  items,
  itemClick,
  render  
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & { 
  items: T[], 
  itemClick: (item:T) => void,
  render: (item: T) => React.ReactNode
}) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
      {/* {items.map((item) => (    //? TS 에러 발생하나 li 요소 key 용도로는 위 ok!! (item 고유 id 는 별도 부여)
        <li key={item.id} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))} */}
    </ul>
  )
}

export default App;
```