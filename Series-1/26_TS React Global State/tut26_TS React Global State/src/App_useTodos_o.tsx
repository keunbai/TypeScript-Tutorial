//* ---------
//! Case 1
//* ---------
/*
import React, { useEffect, useCallback, useRef } from 'react';
import { useTodos } from "./hooks/useTodos_o";
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
import { useTodos } from "./hooks/useTodos_o";
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
