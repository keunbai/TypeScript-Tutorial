//* =================================
//! 6. Tuple
//*   - 배열의 특수한 형태로 배열 내 정해진 타입 순서의 element 지정
//*   - JavaScript 에서는 지원 X
//* =================================


//* ---------------------------------
//! Basic
//* ---------------------------------
/*
//*
let tu: [number, string, boolean] = [18, 'foo', true];
tu = [22, 'baz', false];

//*
interface IGame {
  name: string,
  type: string
};

type OlympicGame = [IGame, boolean];

//
let newGame: OlympicGame = [   // tuple
  {
    name: '쇼트트랙', 
    type: '혼성 계주'
  }, 
  true
];

console.log(newGame);
console.log(newGame[0].name);
*/


//* ---------------------------------
//! Tuple w/ same type
//* ---------------------------------
/*
//* basic
//type ThreeDCoordi = [x: number, y: number, z: number];
type ThreeDCoordi = [number, number, number];

//
function add3DCoordi(c1: ThreeDCoordi, c2: ThreeDCoordi): ThreeDCoordi {
  return [c1[0]+c2[0], c1[1]+c2[1], c1[2]+c2[2]];
}
console.log(add3DCoordi([0, 100, 0], [10, 20, 30]));


//* call signature
//type ThreeDCoordi2 = [x: number, y: number, z: number];
type ThreeDCoordi2 = [number, number, number];
type Add3DCoordi2 = (c1: ThreeDCoordi2, c2: ThreeDCoordi2) => ThreeDCoordi2;

//
const add3DCoordi2: Add3DCoordi2 = function (c1, c2) {
  return [c1[0]+c2[0], c1[1]+c2[1], c1[2]+c2[2]];
};
console.log(add3DCoordi2([0, 100, 0], [10, 20, 30]), '\n');
*/


//* ---------------------------------
//! Tuple w/ different types #1
//* ---------------------------------
/*
//* hybrid 
type SetState = (stateNew: string) => void;

//
const simpleState = (stateInit: string): [string, SetState] => {     //! tuple
  let state = stateInit;

  return [       
    state,              
    (stateNew) => {           //! closure
      state = stateNew;
    }      
  ]
};

const [state1, setState1] = simpleState("krysl");
const [state2, setState2] = simpleState("hello");
console.log(state1);
console.log(state2);
setState2("goodbye");
console.log(state2);        //? no Change!! (simpleStrState() 호출시 initial 값으로 고정)
console.log(state1, '\n');


//* call signature
// skip

*/


//* ---------------------------------
//! Tuple w/ different types #2
//* ---------------------------------

//* basic
const simpleState = (stateInit: string): [() => string, (stateNew: string) => void] => {     //! tuple
  let state = stateInit;

  return [       
    () => state,                 //! closure 
    (stateNew: string) => {      //! closure
      state = stateNew;
    }      
  ]
};

const [getState1, setState1] = simpleState("krysl");
const [getState2, setState2] = simpleState("hello");
console.log(getState1());
console.log(getState2());
setState2("goodbye");
console.log(getState2());       
console.log(getState1(), '\n');


//* hybrid
type GetState = () => string;
type SetState = (stateNew: string) => void;

//
const simpleState2 = (stateInit: string): [GetState, SetState] => {     //! tuple
  let state = stateInit;

  return [       
    () => state,                 //! closure 
    (stateNew: string) => {      //! closure
      state = stateNew;
    }      
  ]
};

const [getState3, setState3] = simpleState2("krysl");
const [getState4, setState4] = simpleState2("hello");
console.log(getState3());
console.log(getState4());
setState4("goodbye");
console.log(getState4());
console.log(getState3(), '\n');


//* call signature
type GetState2 = () => string;
type SetState2 = (stateNew: string) => void;

type SimpleStrState = (initial: string) => [GetState2, SetState2];

//
const simpleState3: SimpleStrState = (stateInit) => {
  let state = stateInit;

  return [       
    () => state,         //! closure
    (stateNew) => {      //! closure
      state = stateNew;
    }      
  ]
};

const [getState5, setState5] = simpleState3("krysl");
const [getState6, setState6] = simpleState3("hello");
console.log(getState5());
console.log(getState6());
setState6("goodbye");
console.log(getState6());       
console.log(getState5());

