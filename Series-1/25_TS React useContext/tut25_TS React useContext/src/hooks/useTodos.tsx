//* ---------
//! Case 1
//*   - useReducer() 만 옮김
//* ---------
/*
import React, { useReducer, createContext, useContext } from 'react';

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
  id: number 
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;

//! Custom Hook
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

export function ContextProvider({ 
  initialState, 
  children 
}: {
  initialState: ITodo[],
  children: React.ReactNode
}) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

// export const ContextProvider: React.FunctionComponent<{
//   initialState: ITodo[],
//   children: React.ReactNode
// }> = ({ initialState, children }) => (
//   <todoContext.Provider value={useReducerManager(initialState)}>
//     {children}
//   </todoContext.Provider>
// )

export function useTodos() {
  const { todos, dispatch } = useContext(todoContext);

  return { todos, dispatch }
}
*/


//* ---------
//! Case 2
//*   - dispatch() 숨김
//* ---------

import React, { useReducer, useCallback, createContext, useContext } from 'react';

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
  id: number 
};

//type UseReducerManager = {
//  todos: ITodo[];
//  dispatch: React.Dispatch<Action>;
//}
type UseReducerManager = ReturnType<typeof useReducerManager>;

//! Custom Hook
const todoContext = createContext<UseReducerManager>({
  todos: [],
  dispatch: () => {}
});
//const todoContext = createContext<IUseReducerManager>(null);
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

export function ContextProvider({ 
  initialState, 
  children 
}: {
  initialState: ITodo[],
  children: React.ReactNode       
}) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

// export const ContextProvider: React.FunctionComponent<{
//   initialState: ITodo[],
//   children: React.ReactNode    
// }> = ({ initialState, children }) => (
//   <todoContext.Provider value={useReducerManager(initialState)}>
//     {children}
//   </todoContext.Provider>
// )

export function useTodos(): {
  todos: ITodo[],
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const { todos, dispatch } = useContext(todoContext);   //! children 컴포넌트 내부에서 호출이라 가능

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, [dispatch]);  

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id
    });
  }, [dispatch]);

  return { todos, addTodo, removeTodo }
}

