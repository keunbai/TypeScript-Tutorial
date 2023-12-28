//* =======================================
//! (from tut21 React version)
//* =======================================

//! Case 1

import { useEffect, useRef, useCallback } from 'react';
import { useTodos, ContextProvider } from "./hooks/useTodos";

function AppWrapper() {
  const initState = [
    {
      id: 1,
      text: 'Study TS React first!',
      done: false
    }
  ];

  return (
    <ContextProvider initialState={initState}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%'
      }}>
        <App/>
        <JustShowTodos/>
      </div>
    </ContextProvider>
  );
}


function App() {
  const { todos, dispatch } = useTodos();
  const newTodoRef = useRef(null);

  useEffect(() => {
    newTodoRef.current.focus();
  }, []);   

  const handleRemoveClick = useCallback((todo) => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });

    newTodoRef.current.focus();
  }, [dispatch]);

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
  return <h2>{title}</h2>;
};

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

export default AppWrapper;



//! Case 2
/*
import { useEffect, useRef, useCallback } from 'react';
import { useTodos, ContextProvider } from "./hooks/useTodos";

function AppWrapper() {
  const initState = [
    {
      id: 1,
      text: 'Study TS React first!',
      done: false
    }
  ];

  return (
    <ContextProvider initialState={initState}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%'
      }}>
        <App/>
        <JustShowTodos/>
      </div>
    </ContextProvider>
  );
}


function App() {
  const { todos, addTodo, removeTodo } = useTodos([]);
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
  return <h2>{title}</h2>;
};

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

export default AppWrapper;  
*/