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

//! Case 1   <- from App_tot.jsx Case 2
/*
import { useEffect, useRef, useCallback } from 'react';
import { useTodos } from "./hooks/useTodos";

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

  const handleRemoveClick = useCallback((idRemoved) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  }, [todos, setTodos]);

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
          //id: state.length,  //? 중복 가능
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
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

const Heading = ({ title }) => {
  return <h1>{title}</h1>;
};

function JustShowTodos() {
  const { todos } = useTodos(initState);

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

export default AppWrapper;
*/


//! Case 2   <- from App_tot.jsx Case 2

import { useEffect, useCallback, useRef } from 'react';
import { useTodos } from "./hooks/useTodos";

function AppWrapper() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustShowTodos />
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
  const { todos, addTodo, removeTodo } = useTodos(initState);
  const newTodoRef = useRef(null);

  useEffect(() => {
    newTodoRef.current.focus();
  }, []);   

  const handleRemoveClick = useCallback((todo) => {
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
      <Heading title="Todos" />

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
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

const Heading = ({ title }) => {
  return <h1>{title}</h1>;
};

function JustShowTodos() {
  const { todos } = useTodos(initState);

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

export default AppWrapper;



