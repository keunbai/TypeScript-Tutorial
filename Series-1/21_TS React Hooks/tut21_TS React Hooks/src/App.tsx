import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
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
  //const [checkState, setCheckState] = useState(true);             // boolear/string/number 가능
  const [payload, setPayload] = useState<IPayload | null>(null);    // null 과 다른 type 함께 쓰일 경우
  const [todos, dispatch] = useReducer(reducer, []);
  //const newTodoRef = useRef(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/data/db.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });

    newTodoRef.current.focus();  
  }, []);  

  const msgObj = JSON.parse(JSON.stringify(payload));
  const msg = msgObj ? msgObj.text : null;

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
      <Heading title="Hooks & TypeScript"/>

      <Box>{JSON.stringify(payload)}</Box>      
      <Box>{msg}</Box>    

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


//! Type


//! Sub Comp.
// const Heading = (props: {title: string}): JSX.Element => {
//   return <h2>{props.title}</h2>
// };
// const Heading = ({ title }: {title: string}): JSX.Element => {
//   return <h2>{title}</h2>
// };
// const Heading = ({ title }: {title: string}) => {
//   return <h2>{title}</h2>
// };
// const Heading: React.FunctionComponent<{title: string}> = (props): JSX.Element => {
//   return <h2>{props.title}</h2>
// };
const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};


// const Box = ({ children }: {children: React.ReactNode}) => (
const Box: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => (   //! ref) tut07  
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
);


export default App;



