//* ---------
//! Case 1
//*   - useReducer() 만 옮김
//* ---------
/*
import { nanoid } from 'nanoid';
import { useReducer } from 'react';


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
  id: string 
};

//! Custom Hook
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

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  dispatch: React.Dispatch<Action>
} {
  const [todos, dispatch] = useReducer(reducer, initTodos);

  return { todos, dispatch }
}
*/


//* ---------
//! Case 2
//*   - dispatch() 내용 숨김
//* ---------

import { nanoid } from 'nanoid';
import { useReducer, useCallback } from 'react';


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
  id: string 
};

//! Custom Hook
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

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
} {
  const [todos, dispatch] = useReducer(reducer, initTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);  

  const removeTodo = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id
    });
  }, []);

  return { todos, addTodo, removeTodo }
}
