//* =================================
//!  7. Generic function w/ callback
//*   - 함수의 call signature는 'const 함수명 = ' 형식에서만 이용 가능,
//*     'function 함수명() {}' 형식은 이용 불가
//*   - 함수의 call signature + generic
//*      1) 'type FuncType = <T>(param: T) => T'
//*           : 함수 선언 시 T type 명기 X -> 범용
//*      2) 'type FuncType<T> = (param: T) => T'
//*           : 함수 선언 시 반드시 T type 명기 O -> 제한적
//!           ※ 콜백 인자 포함 함수는 이걸로만  
//* =================================


//* ---------------------------------
//! Generic function w/ callback #1
//*   (from 'tut06_TS Tuples')
//* ---------------------------------

//* basic
/*
const simpleState = <T>(stateInit: T): [() => T, (stateNew: T) => void] => {     //! tuple
  let state = stateInit;

  return [       
    () => state,            //! closure 
    (stateNew: T) => {      //! closure
      state = stateNew;
    }      
  ]
};

const [getState, setState] = simpleState([1, 2, 3]);
console.log(getState());
setState([11, 12, 13]);
console.log(getState(), '\n');

//const [getState2, setState2] = simpleState(null);                //? Error
const [getState2, setState2] = simpleState<string | null>(null);   //! overriding inferred generic types
console.log(getState2());
setState2('hello~');
console.log(getState2(), '\n');
*/


//* hybrid
/*
type SimpleState = <T>(stateInit: T) => [() => T, (stateNew: T) => void];

//
const simpleState2: SimpleState = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

const [getState3, setState3] = simpleState2([1, 2, 3]);
console.log(getState3());
setState3([11, 12, 13]);
console.log(getState3(), '\n');
*/


//* call signature #1  
/*
type GetState<T> = () => T;  //! 차이 확인
type SetState<T> = (stateNew: T) => void;

type SimpleState2 = <T>(stateInit: T) => [GetState<T>, SetState<T>];


//
const simpleState3: SimpleState2 = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

const [getState4, setState4] = simpleState3([1, 2, 3]);
console.log(getState4());
setState4([11, 12, 13]);
console.log(getState4(), '\n');
*/


//* call signature #2  
/*
type GetState<T> = () => T;  //! 차이 확인
type SetState<T> = (stateNew: T) => void;

type SimpleState2<T> = (stateInit: T) => [GetState<T>, SetState<T>];

//
const simpleState3: SimpleState2<number[]> = (stateInit) => {     
  let state = stateInit;

  return [       
    () => state,             //! closure 
    (stateNew) => {          //! closure
      state = stateNew;
    }      
  ]
};

const [getState4, setState4] = simpleState3([1, 2, 3]);
console.log(getState4());
setState4([11, 12, 13]);
console.log(getState4(), '\n');
*/


//* ---------------------------------
//! Generic function w/ callback #2
//* ---------------------------------
/*
//* preliminary
interface IPokemon {
  name: string,
  hp: number
};

type ItemCard<T> = {item: T, rank: number};
interface IItemCard<T> {
  item: T, 
  rank: number
}

//
const pokemon: IPokemon[] = [
  {
    name: "Bulbasaur",
    hp: 20,
  },
  {
    name: "Megaasaur",
    hp: 5,
  },
  {
    name: "Ivysur",
    hp: 15,
  },
  {
    name: "Wartortle",
    hp: 30
  }
];
//const itemCards: ItemCard<IPokemon>[] = pokemon.map(item => ({
//  item,
//  rank: item.hp
//}));
const itemCards: IItemCard<IPokemon>[] = pokemon.map(item => ({
  item,
  rank: item.hp
}));

itemCards.sort((card1, card2) => card2.rank - card1.rank);   // descending

const itemsRanked: IPokemon[] = itemCards.map(rank => rank.item);
console.log(itemsRanked, '\n');
*/


//* basic
interface IPokemon {
  name: string,
  hp: number
};

interface IItemCard<T> {
  item: T, 
  rank: number
}

//
/**
 * items -> ranked items
 * @param items 
 * @param rankFunc 
 * @returns itemsRanked
 */
function ranker<T>(items: T[], rankFunc: (item: T) => number): T[] {
  const itemCards: IItemCard<T>[] = items.map(item => ({   //! T in func body
  //const itemCards = items.map(item => ({
    item,
    rank: rankFunc(item)
  }));

  itemCards.sort((card1, card2) => card1.rank - card2.rank);   // ascending

  return itemCards.map(card => card.item);   //! item 만 발라내기 -> ranked items 
}

const pokemon: IPokemon[] = [
  {name: "Bulbasaur", hp: 20},
  {name: "Megaasaur", hp: 5},
  {name: "Ivysur", hp: 15},
  {name: "Wartortle", hp: 30}
];

function rankItem(item: IPokemon): number {
  return item.hp;
}

const itemRanked1 = ranker(pokemon, rankItem);
const itemRanked2 = ranker(pokemon, ({ hp }) => hp);
console.log(itemRanked1);
console.log(itemRanked2);


//* hybrid
interface IPokemon2 {
  name: string,
  hp: number
};

//interface IItemCard2<T> {
//  item: T, 
//  rank: number
//}

type Ranker2 = <T>(items: T[], rankFunc: (item: T) => number) => T[];

//
const ranker2: Ranker2 = (items, rankFunc) => {
  const itemCards = items.map(item => ({
    item,
    rank: rankFunc(item)
  }));

  itemCards.sort((card1, card2) => card1.rank - card2.rank);   // ascending

  return itemCards.map(card => card.item);   //! item 만 발라내기 -> ranked items 
}

const pokemon2: IPokemon2[] = [
  {name: "Bulbasaur", hp: 20},
  {name: "Megaasaur", hp: 5},
  {name: "Ivysur", hp: 15},
  {name: "Wartortle", hp: 30}
];

function rankItem2(item: IPokemon2): number {
  return item.hp;
}

const itemRanked3 = ranker2(pokemon2, rankItem2);
const itemRanked4 = ranker2(pokemon2, ({ hp }) => hp);
console.log(itemRanked3);
console.log(itemRanked4);


//* call signature #1
interface IPokemon3 {
  name: string,
  hp: number
};

//interface IItemCard3<T> {
//  item: T, 
//  rank: number
//}

type RankFunc3<T> = (item: T) => number;
type Ranker3 = <T>(items: T[], rankFunc: RankFunc3<T>) => T[];

//
const ranker3: Ranker3 = (items, rankFunc) => {
  const itemCards = items.map(item => ({
    item,
    rank: rankFunc(item)
  }));

  itemCards.sort((card1, card2) => card1.rank - card2.rank);   // ascending

  return itemCards.map(card => card.item);   //! item 만 발라내기 -> ranked items 
}

const pokemon3: IPokemon3[] = [
  {name: "Bulbasaur", hp: 20},
  {name: "Megaasaur", hp: 5},
  {name: "Ivysur", hp: 15},
  {name: "Wartortle", hp: 30}
];

function rankItem3(item: IPokemon3): number {
  return item.hp;
}

const itemRanked5 = ranker3(pokemon3, rankItem3);
const itemRanked6 = ranker3(pokemon3, ({ hp }) => hp);
console.log(itemRanked5);
console.log(itemRanked6);


//* call signature #2
interface IPokemon4 {
  name: string,
  hp: number
};

interface IItemCard4<T> {
  item: T, 
  rank: number
}

type RankFunc4<T> = (item: T) => number;
type Ranker4<T> = (items: T[], rankFunc: RankFunc4<T>) => T[];

//
const ranker4: Ranker4<IPokemon4> = (items, rankFunc) => {
  const itemCards: IItemCard<IPokemon4>[] = items.map(item => ({   //! ok  
  //const itemCards = items.map(item => ({
    item,
    rank: rankFunc(item)
  }));

  itemCards.sort((card1, card2) => card1.rank - card2.rank);   // ascending

  return itemCards.map(card => card.item);   //! item 만 발라내기 -> ranked items 
}

const pokemon4: IPokemon4[] = [
  {name: "Bulbasaur", hp: 20},
  {name: "Megaasaur", hp: 5},
  {name: "Ivysur", hp: 15},
  {name: "Wartortle", hp: 30}
];

function rankItem4(item: IPokemon3): number {
  return item.hp;
}

const itemRanked7 = ranker4(pokemon4, rankItem4);
const itemRanked8 = ranker4(pokemon4, ({ hp }) => hp);
console.log(itemRanked7);
console.log(itemRanked8);


/*
//* arr.sort()
//*   ref) https://hianna.tistory.com/409
const arr = [4, 2, 1, 7, 5];
console.log(arr.sort((a, b) => b - a))   // 계산값이 음수면 a 왼쪽 -> descending 
console.log(arr.sort())   // ascending
*/










