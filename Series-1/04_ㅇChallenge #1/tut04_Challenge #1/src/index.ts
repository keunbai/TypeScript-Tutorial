//* =================================
//! Challenge #1
//*   - 공상과학 소설 Dune 의 house 검색
//* =================================


//* basic #1
/*
import houses from "./houses.json"
//console.log(typeof houses);            // object, 실제로는 object[]  
//console.log(houses[2].name);
//console.log(JSON.stringify(houses));   // string, JSON 형식

interface IHouse {
  name: string,
  planets: string | string[]
};

interface IHouseWithID {
  id: number,
  name: string,
  planets: string | string[]
};

//
function findHouses(houses: string): IHouseWithID[];
function findHouses(houses: string, filterCB: (ihouse: IHouse) => boolean): IHouseWithID[];
function findHouses(ihouses: IHouse[]): IHouseWithID[];
function findHouses(ihouses: IHouse[], filterCB: (ihouse: IHouse) => boolean): IHouseWithID[];

function findHouses(arg: unknown, filterCB?: (ihouse: IHouse) => boolean): IHouseWithID[] {
  let houses: IHouse[] = (typeof arg === 'string') ? JSON.parse(arg) : arg;    //! JSON string -> object[] | IHouse[]
  houses = filterCB ? houses.filter(filterCB) : houses;

  return houses.map(house => ({
    ...house,
    id: houses.indexOf(house)
  }));
}

console.log(findHouses(JSON.stringify(houses), (house) => house.name === "Atreides"));
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));
console.log(findHouses(houses, ({ name }) => name === "Corrino"));
*/


//* basic #2
/*
import houses from "./houses.json"

interface IHouse {
  name: string,
  planets: string | string[]
};

interface IHouseWithID extends IHouse {
  id: number,
  name: string,
  planets: string | string[]
};

//
function findHouses(arg: string | IHouse[], filterCB?: (ihouse: IHouse) => boolean): IHouseWithID[] {
  let houses: IHouse[] = (typeof arg === 'string') ? JSON.parse(arg) : arg;    //! JSON string -> object[] | IHouse[]
  houses = filterCB ? houses.filter(filterCB) : houses;

  return houses.map(house => ({
    ...house,
    id: houses.indexOf(house)
  }));
}

console.log(findHouses(JSON.stringify(houses), (house) => house.name === "Atreides"));
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));

console.log(findHouses(houses, ({ name }) => name === "Corrino"));
const housesSearch = findHouses(houses, ({ name }) => name === "Amugeona");
console.log(housesSearch.length ? housesSearch[0].planets : 'Not Found');
*/


//* call signature
import houses from "./houses.json"
//console.log(typeof houses);            // object, 실제로는 object[]  
//console.log(houses[2].name);
//console.log(JSON.stringify(houses));   // string, JSON 형식

interface IHouse {
  name: string,
  planets: string | string[]
};

interface IHouseWithID extends IHouse {
  id: number
};

type FilterCB = (ihouse: IHouse) => boolean;
type FindHouses = (arg: string | IHouse[], filter?: FilterCB) => IHouseWithID[];
//type FindHouses = (arg: unknown, filter?: FilterCB) => IHouseWithID[];

//
const findHouses: FindHouses = (arg, filterCB?) => {
  let houses: IHouse[] = (typeof arg === 'string') ? JSON.parse(arg) : arg;    //! JSON string -> object[] | IHouse[]
  houses = filterCB ? houses.filter(filterCB) : houses;

  return houses.map(house => ({
    ...house,
    id: houses.indexOf(house)
  }));
}

console.log(findHouses(JSON.stringify(houses), (house) => house.name === "Atreides"));
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"));

console.log(findHouses(houses, ({ name }) => name === "Corrino"));
const housesSearch = findHouses(houses, ({ name }) => name === "Amugeona");
console.log(housesSearch.length ? housesSearch[0].planets : 'Not Found');