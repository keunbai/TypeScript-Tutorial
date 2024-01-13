//* =======================================
//! createGlobalState() hook
//*   - A React hook that creates globally shared state
//*   Ref) https://github.com/streamich/react-use
//* =======================================

//* -----------------
//! from tut21 
//* -----------------

//! Case 1
//?   - Custom Hook 생성 불가 
/*
import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

//const useGlobalState = createGlobalState<ITodo[]>([]);          
const useGlobalState = createGlobalState<ITodo[]>(initState);   //!

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

function App() {
  const [todos, setTodos] = useGlobalState();                   //!
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
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
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}      
      </ul>  
    </div>
  );
}

function JustShowTodos() {
  const [todos] = useGlobalState();                             //!

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


export default AppWrapper;
*/

//! Case 2
//*   - Custom Hook 생성 가능

import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';
import './App.css';

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! App Comp.
const useGlobalState = createGlobalState<ITodo[]>([]);          //!  

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
  const [todos, setTodos] = useGlobalState();                   //!
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {                                             //!
    setTodos(initState);
  }, [setTodos])

  useEffect(() => {
    newTodoRef.current.focus();  
  }, []);  

  const handleRemoveClick = (idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));

    newTodoRef.current.focus();
  };

  const handleAddClick = useCallback(() => {
    if (newTodoRef.current) {
      setTodos([
        ...todos,
        {
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
        <button style={{marginLeft: "0.5rem"}} onClick={handleAddClick}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}      
      </ul>  
    </div>
  );
}

function JustShowTodos() {
  const [todos, setTodos] = useGlobalState();                   //!

  useEffect(() => {                                             //!
    setTodos(initState);
  }, [setTodos])

  return (
    <ul>
      {todos.map((todo: ITodo) => (
        <li key={todo.id} onClick={() => alert(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
} 


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


export default AppWrapper;