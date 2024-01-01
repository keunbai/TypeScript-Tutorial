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
//*   - dispatch() 숨김
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
