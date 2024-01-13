//* =======================================
//! createGlobalState() hook
//*   - A React hook that creates globally shared state
//*   Ref) https://github.com/streamich/react-use
//* =======================================

//* -----------------
//! Preliminary
//* -----------------

//! useState() + Props drilling
/*
import { useState } from 'react';

const CompA = ({ value, setValue }) => {
  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB = ({ value, setValue }) => {
  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>{value}</p>
      <CompA value={value} setValue={setValue} />
      <CompB value={value} setValue={setValue} />
    </div>
  );
};

export default App;
*/


//! createGlobalState() #1
/*
import { createGlobalState } from 'react-use';

const useGlobalValue = createGlobalState(0);

const CompA = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const App = () => {
  const [value] = useGlobalValue();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};

export default App;
*/


//! createGlobalState() #2
/*
import { useEffect } from 'react';
import { createGlobalState } from 'react-use';

const useGlobalValue = createGlobalState();

const CompA = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const App = () => {
  const [value, setValue] = useGlobalValue();

  useEffect(() => {
    setValue(0);
  }, [setValue])

  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};

export default App;
*/


//* -----------------
//! from tut21 react version
//* -----------------

//! Case 1
//?   - Custom Hook 생성 불가 

import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';

const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

//const useGlobalState = createGlobalState([]);
const useGlobalState = createGlobalState(initState);   //!

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
  const [todos, setTodos] = useGlobalState();          //!
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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => alert(todo.id)}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Heading = ({ title }) => {
  return <h1>{title}</h1>;
};

function JustShowTodos() {
  const [todos] = useGlobalState();                    //!

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
//*   - Custom Hook 생성 가능
/*
import { useEffect, useRef, useCallback } from 'react';
import { createGlobalState } from 'react-use';

const useGlobalState = createGlobalState([]);          //!

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
  const [todos, setTodos] = useGlobalState();          //!
  const newTodoRef = useRef(null);

  useEffect(() => {                                    //!
    setTodos(initState);
  }, [setTodos])

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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => alert(todo.id)}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Heading = ({ title }) => {
  return <h1>{title}</h1>;
};

function JustShowTodos() {
  const [todos, setTodos] = useGlobalState();          //!

  useEffect(() => {                                    //!
    setTodos(initState);
  }, [setTodos])

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




