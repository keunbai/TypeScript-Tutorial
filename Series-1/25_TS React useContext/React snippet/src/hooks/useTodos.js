//! Case 1

import { useReducer, createContext, useContext } from 'react';

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

  return {todos, dispatch}
}

export function ContextProvider({ initialState, children }) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

export function useTodos() {
  const { todos, dispatch } = useContext(todoContext);

  return { todos, dispatch }
}



//! Case 2
/*
import { useReducer, useCallback, createContext, useContext } from 'react';

const todoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 비추(중복 가능)
          id: state.length ? state[state.length-1].id + 1 : 1,     
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

function useReducerManager(initialState) {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return {todos, dispatch}
}

export function ContextProvider({ initialState, children }) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}

export function useTodos() {
  const { todos, dispatch } = useContext(todoContext);

  const addTodo = useCallback((text) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);  

  const removeTodo = useCallback((id) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo }
}
*/
