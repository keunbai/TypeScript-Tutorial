//* =================================
//! Conditional Types 
//*   - Ternary operator + typescript type 결합 
//*
//*   Ref) https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
//* =================================

//* ---------------------------------
//! Preliminary 
//* ---------------------------------
/*
interface IAnimal {
  live(): void;
}
interface IDog extends IAnimal {
  woof(): void;
}

type Example1 = IDog extends IAnimal ? number : string;      //! -> type Example1 = number; 
type Example2 = RegExp extends IAnimal ? number : string;   //! -> type Example2 = string; 
*/


//* ---------------------------------
//! Conditional Types 적용
//*   - Pokemon API 로부터 10개의 괴물 정보 fetch
//*   ※ polemon API - https://pokeapi.co/api/v2/pokemon?limit=10
//*
//?   ※ Conditional Types 활용은 없고 (fetch/axios + .then()/async,await 비동기처리)와 TypeScript 결합만 열심히... 
//* ---------------------------------

//! Case 1
/*
import axios from 'axios';

//* Type declaration
interface IPokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type DumpData<T> = (data: T) => void;
//type FetchPokemon1 = <T>(url: string, cb: DumpData<T>) => void;    //? 不可
type FetchPokemon1<T> = (url: string, cb: DumpData<T>) => void;

//* Function definition
//const fetchPokemon1: FetchPokemon1<IPokemonResults> = (url, cb) => {
//  fetch(url)
//    .then((data) => data.json())
//    .then((data) => cb(data));
//
//  //axios.get(url)
//  //  .then(({ data }) => cb(data));
//}

const fetchPokemon1: FetchPokemon1<IPokemonResults> = async (url, cb) => {
  //const data = await fetch(url);
  //const dataJson = await data.json();
  //cb(dataJson);

  const { data } = await axios.get(url);
  cb(data);
}

//* Function call
fetchPokemon1("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
  //console.log(data, '\n');
  //console.log(data.results, '\n');
  data.results.forEach(({ name }) => console.log(name));
});
*/


//! Case 2
/*
import axios from 'axios';

//* Type declaration
interface IPokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type FetchPokemon2<T> = (url: string) => Promise<T>;     //! 핵심

//* Function definition
//const fetchPokemon2: FetchPokemon2<IPokemonResults> = (url) => {
//  return (
//    //fetch(url)
//    //  .then((data) => data.json())
//
//    axios.get(url)
//      .then(({ data }) => data)
//  );
//}

const fetchPokemon2: FetchPokemon2<IPokemonResults> = async (url) => {
  const data = await fetch(url);  
  return data.json();

  //const { data } = await axios.get(url);
  //return data;
}

//* Function call
(async function() {
  const data = await fetchPokemon2("https://pokeapi.co/api/v2/pokemon?limit=10");
  data.results.forEach(({ name }) => console.log(name));
})();
*/


//! Case 3 (= Case 1 + Case 2)

import axios from 'axios';

//* Type declaration
interface IPokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type DumpData<T> = (data: T) => void;
//type FetchPokemon = <T>(url: string, cb?: DumpData<T>) => Promise<T>;           //? 不可
//type FetchPokemon<T> = (url: string, cb?: DumpData<T>) => Promise<T> | void;    //? 익명함수 不可
type FetchPokemon<T> = (url: string, cb?: DumpData<T>) => Promise<T> ;

//* Function definition
// const fetchPokemon: FetchPokemon<IPokemonResults> = (url, cb?) => {
//   if (cb) {
//     fetch(url)
//       .then((data) => data.json())
//       .then((data) => cb(data));

//     //axios.get(url)
//     //  .then(({ data }) => cb(data));
//   } else {
//     return (
//       fetch(url)
//         .then((data) => data.json())

//       //axios.get(url)
//       //  .then(({ data }) => data)        
//     );
//   }
// }

const fetchPokemon: FetchPokemon<IPokemonResults> = async (url, cb?) => {
  if (cb) {
    //const data = await fetch(url);
    //const dataJson = await data.json();
    //cb(dataJson);

    const { data } = await axios.get(url);
    cb(data);
  }
  else {
    const data = await fetch(url);  
    return data.json();
  
    //const { data } = await axios.get(url);
    //return data;
  }
}

//* Function call
fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
  //console.log(data, '\n');
  //console.log(data.results, '\n');
  data.results.forEach(({ name }) => console.log(name));
});

(async function () {
  const data: IPokemonResults = await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10");
  data.results.forEach(({ name }) => console.log(name));
})();

