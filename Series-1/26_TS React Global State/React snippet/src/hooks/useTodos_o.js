//* =======================================
//! tut23 React version
//* =======================================

//! Case 1
/*
import { nanoid } from 'nanoid';
import { useReducer } from 'react';

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

export function useTodos(initTodos) {
  const [todos, dispatch] = useReducer(reducer, initTodos);

  return { todos, dispatch }
}
*/


//! Case 2

//import { nanoid } from 'nanoid';
import { useReducer, useCallback } from 'react';

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

export function useTodos(initTodos) {
  const [todos, dispatch] = useReducer(reducer, initTodos);

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