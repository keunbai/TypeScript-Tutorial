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