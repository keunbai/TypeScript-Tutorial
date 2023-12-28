//* =======================================
//! (from tut21 React version)
//* =======================================

import { 
  useEffect, useReducer, useRef, useCallback, createContext, useContext 
} from 'react';

const todoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: state.length ? state[state.length-1].id + 1 : 1,  
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

function useReducerManager(initialState) {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch};
}

const initState = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function AppWrapper() {
  return (
    <todoContext.Provider value={useReducerManager(initState)}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%'
      }}>
        <App/>
        <JustShowTodos/>
      </div>
    </todoContext.Provider>
  );
}

function App() {  
  const newTodoRef = useRef(null);

  const { todos, dispatch } = useContext(todoContext);

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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => alert(todo.id)}>
            {todo.text}
            <button 
              style={{marginLeft: "0.5rem"}} 
              onClick={() => handleRemoveClick(todo)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Heading = ({ title }) => {
  return <h2>{title}</h2>;
};

function JustShowTodos() {
  const { todos } = useContext(todoContext);

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