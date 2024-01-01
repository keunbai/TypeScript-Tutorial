//* =======================================
//! (from tut21 React version)
//* =======================================

import { 
  useEffect, useReducer, useRef, useCallback, createContext, useContext 
} from 'react';
import './App.css';


//! Type 
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
  id: number,
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;


//! App Comp.
const todoContext = createContext<UseReducerManager>({
  todos: [],
  dispatch: () => {}
});
//const todoContext = createContext<UseReducerManager>(null);
//const todoContext = createContext(null);

const reducer = (state: ITodo[], action: Action): ITodo[] => {
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

function useReducerManager(initialState: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch};  
}

const initState: ITodo[] = [
  {
    id: 1,
    text: 'Study TS React first!',
    done: false
  }
];

function AppWrapper() {
  return (
    <div>
      <Heading title="React useContext() & TypeScript" />
      <Heading title="Todos" />
      
      <todoContext.Provider value={useReducerManager(initState)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%'
        }}>
          <App/>
          <JustShowTodos/>
        </div>
      </todoContext.Provider>
    </div>

  );
}

function App() {
  const { todos, dispatch } = useContext(todoContext);
  const newTodoRef = useRef(null);
  //const newTodoRef = useRef<HTMLInputElement>(null);

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
      <br />
    </div>
  );
}

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


//! Type


//! Sub Comp.
function Heading({ title }: {title: string}) {
  return <h2>{title}</h2>
};
//const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
//  return <h2>{title}</h2>
//};


export default AppWrapper;