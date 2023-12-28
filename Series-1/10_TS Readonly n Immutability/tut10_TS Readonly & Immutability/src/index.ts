//* =================================
//! Readonly & Immutability
//* =================================

//* ---------------------------------
//! Readonly #1
//*   - Readonly in interface
//* ---------------------------------
interface ICat1 {
  readonly name: string;
  breed: string;
}

//
function makeCat(name: string, breed: string): ICat1 {
  return {
    name,
    breed,
  };
}

const usul = makeCat("Usul", "Tabby");
//usul.name = 'Victor'  //? Error


//* ---------------------------------
//! Readonly #2
//*   - Readonly utility type
//* ---------------------------------
interface ICat2 {
  name: string;
  breed: string;
}

type ReadonlyCat = Readonly<ICat2>    

//
function makeCat2(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const usul2 = makeCat("Usul", "Tabby");
//usul2.name = 'Victor'  //? Error


//* ---------------------------------
//! Readonly #3
//*   - Readonly tuples
//* ---------------------------------
function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
//c1[0] = 50;     //? Error


//* ---------------------------------
//! Immutable Arrays
//* ---------------------------------
const reallyConst = [1, 2, 3]; 
reallyConst[0] = 4;

const reallyConst2 = [1, 2, 3] as const;    //! immutable array
//reallyConst2[0] = 4;   //? Error

