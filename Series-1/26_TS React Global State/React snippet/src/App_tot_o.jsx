//* =======================================
//! 『useReducer()』  
//*   - dispatch(action) --> reducer(state, action) : reducer state 업데이트
//*       => action 담아 dispatch() 호출하면 reducer() 에서 reducer state 업데이트
//*       => reducer state 업데이트는 항상 dispatch() 호출해서 reducer() 에서 진행 
//*
//*   - dispatch: state 업데이트 위한 요구
//*     action: 요구 내용
//*     reducer: state 업데이트 역할(은행)
//?     store X
//*
//*   - 또 하나의 state 변수 관리 내장 훅
//!   - 객체 등 복잡한 state 변수 관리에 유리
//* =======================================

/*
//! Step 1 
//*   - 예금/출금 금액 입력 input 테그 + 예금/출금 버튼 테그
//!   - useReducer() 기본 사용법 확인 

import { useState, useReducer } from 'react';

const reducer = (state, action) => {
  console.log('여긴 reducer 여 ', state, action);

  switch (action.type) {
    case 'deposit':
      return state + action.payload;   //! reducer state(==balance) 업데이트
    case 'withdrawl':
      return state - action.payload;   
    default:
      return state;  
  }
}

function App() {
  console.log('===> App() 호출!!');

  const [money, setMoney] = useState(0); 
  const [balance, dispatch] = useReducer(reducer, 0);

  const handleDeposit = () => {   
    dispatch({type: 'deposit', payload: money});
    setMoney(0);     // 입력창 초기화
  };

  const handleWithdrawl = () => {
    dispatch({type: 'withdrawl', payload: money});
    setMoney(0);     
  };

  return (
    <div style={{'padding': '20px'}}>
      <h2> Welcome to useReducer bank!!</h2>
      <p>잔고: {balance}원</p>
      <input
        type="number"
        value={money}
        onChange={e => setMoney(parseInt(e.target.value))}
        step="1000"
      /> 
      <button onClick={handleDeposit}>예금</button>
      <button onClick={handleWithdrawl}>출금</button>
    </div>
  )
}

export default App;
*/


//* =======================================
//! 『useRef()』  
//*   2) DOM 요소에 접근 
//*      - const refInput = useRef('')
//*        <input ref={refInput} />  
//!          => refInput === {current: input}
//!          => refInput.current 값으로 input 요소 저장 
//!      - input 요소 입력 시 리랜더링 X 
//!        input 요소 클릭 않아도 포커스 자동 생성 구현
//* =======================================

//? 포커스 생성 X + 리렌더링 발생 
/*
import { useState } from 'react';

export default function App() {
  console.log('===> App() 호출!!');

  const [name, setName] = useState('');


  const login = () => {
    alert(`환영한당께 ${name}`);

    setName('');    
  }

  const handleChangeName = function (e) {
    setName(e.target.value);
  } 

  return (
    <div style={{'padding': '20px'}}>
      <input 
        id = "Name"
        type="text" 
        onChange={handleChangeName} 
        placeholder="이름 입력 혀" 
        value={name}    //! 필수
      /> 
      <button style={{'margin': '5px'}} onClick={login}>로그인</button>
    </div>    
  );
}
*/


//* 포커스 자동 생성 + 리렌더링 발생 방지
/*
import {useEffect, useRef} from 'react';

export default function App() {
  console.log('===> App() 호출!!');

  const refInput = useRef('');

  useEffect(() => {
    refInput.current.focus();
  }, []);   

  const login = () => {
    alert(`환영한당께 ${refInput.current.value}`);

    // console.log(refInput);                  //! {current: input} 
    // console.log(refInput.current);          //! <input> 엘리먼트 레퍼런스 저장 
    // console.log(refInput.current.value);   

    refInput.current.value='';
    refInput.current.focus();    
  }

  return (
    <div style={{'padding': '20px'}}>
      <input 
        id="Name"
        type="text" 
        ref={refInput} 
        placeholder="이름 입력 혀" 
      /> 
      <button style={{'margin': '5px'}} onClick={login}>로그인</button>
    </div>    
  );
}
*/

//* =======================================
//! tut21 React version
//* =======================================

//import { nanoid } from 'nanoid';
import { useEffect, useReducer, useRef, useCallback } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          //id: state.length,  //? 중복 가능
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


function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const newTodoRef = useRef(null);

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

  //const handleRemoveClick = useCallback((todo) => {
  //  dispatch({
  //    type: "REMOVE",
  //    id: todo.id,
  //  });

  //  newTodoRef.current.focus();
  //}, []);

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
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
        </div>
      ))} */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => alert(todo.id)}>
            {todo.text}
            <button style={{marginLeft: "0.5rem"}} onClick={() => handleRemoveClick(todo)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Heading = ({ title }) => {
  return <h2>{title}</h2>;
};

export default App;

