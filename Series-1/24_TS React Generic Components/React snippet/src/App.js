//* =======================================
//! tut21 React version
//* =======================================

import { nanoid } from 'nanoid';
import { useEffect, useReducer, useRef, useCallback } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 중복 가능
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
  const newTodoRef = useRef(null);

  useEffect(() => {
    newTodoRef.current.focus();
  }, []);   

  const handleRemoveClick = (todo) => {
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
      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => alert(todo.id)}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
          </li>
        ))}
      </ul>
      <br />     */}
      <UL 
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
  )
}

const Heading = ({ title }) => {
  return <h2>{title}</h2>;
};

const UL = ({ items, itemClick, render}) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}


export default App;