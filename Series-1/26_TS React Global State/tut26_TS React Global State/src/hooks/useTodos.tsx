//* -----------------
//! from tut23 React version
//* -----------------

//! Case 1
/*
import { useEffect } from 'react'
import { createGlobalState } from "react-use";

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! Custom Hook
const useGlobalState = createGlobalState([]);

export function useTodos(initTodos: ITodo[]): {
  todos: ITodo[],
  setTodos: (state: ITodo[]) => void
} {
  const [todos, setTodos] = useGlobalState();

  useEffect(() => {
    setTodos(initTodos);
  }, [initTodos, setTodos])

  return { todos, setTodos }
}
*/


//! Case 2

import { useEffect, useCallback } from 'react'
import { createGlobalState } from "react-use";

//! Type 
interface ITodo {
  id: number,
  text: string,
  done: boolean
}

//! Custom Hook
const useGlobalState = createGlobalState([]);

export function useTodos(initTodos: ITodo[]) {
  const [todos, setTodos] = useGlobalState();

  useEffect(() => {
    setTodos(initTodos);
  }, [initTodos, setTodos])

  const addTodo = useCallback((text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length-1].id + 1 : 1, 
        text,
        done: false,
      },
    ]);
  }, [todos, setTodos]);  

  const removeTodo = useCallback((idRemoved: number) => {
    setTodos(todos.filter(({ id }) => id !== idRemoved));
  }, [todos, setTodos]);

  return { todos, addTodo, removeTodo }
}

