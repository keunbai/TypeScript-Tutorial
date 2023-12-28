//* =================================
//!    4. Function Overloading
//* =================================

//* ---------------------------------
//! Preliminary
//*   Ref) https://joshua1988.github.io/ts/guide/operator.html#union-type%EC%9D%98-%EC%9E%A5%EC%A0%90
//* ---------------------------------
/*
//* Union type
function getAge(age: number | string) {
  if (typeof age === 'number') {
    age.toFixed(); 
    return age;
  }
  if (typeof age === 'string') {
    return age;
  }
  return new TypeError('age must be number or string');
}

//* Intersection type
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
type Capt = Person & Developer;
*/


//* ---------------------------------
//! Function Overloading #1
//* ---------------------------------
/*
//* basic 
interface ICoordinate {
  x: number,
  y: number
};

//
function parseCoordinate(arg1: string|ICoordinate|number, arg2?: number): ICoordinate {
  let coord: ICoordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value);
    });
  //} else if (typeof arg1 === "ICoordinate") {   //? Error 
  //  coord = {   
  //    ...(arg1),   
  //  };       
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as ICoordinate),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate("x:12,y:22"));
console.log(parseCoordinate({x: 52, y: 35}));
console.log(parseCoordinate(10, 20), '\n');


//* call signature 
interface ICoordinate2 {
  x: number,
  y: number
};

type ParseCoordinate = (arg1: string|ICoordinate2|number, arg2?: number) => ICoordinate2;

//
const parseCoordinate2: ParseCoordinate = function(arg1, arg2) {
  let coord: ICoordinate2 = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as ICoordinate2),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate2("x:12,y:22"));
console.log(parseCoordinate2({x: 52, y: 35}));
console.log(parseCoordinate2(10, 20));
*/


//* ---------------------------------
//! Function Overloading #2
//*   - w/ 'unknown' type
//* ---------------------------------

//* basic 
interface ICoordinate {
  x: number,
  y: number
};

//
function parseCoordinate(arg: string): ICoordinate;
function parseCoordinate(arg: ICoordinate ): ICoordinate;
function parseCoordinate(arg1: number, arg2: number): ICoordinate;

function parseCoordinate(arg1: unknown, arg2?: unknown): ICoordinate {
  let coord: ICoordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value);
    });
  //} else if (typeof arg1 === "ICoordinate") {   //? Error 
  //  coord = {   
  //    ...(arg1),   
  //  };   
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as ICoordinate)
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate("x:12, y:22"));
console.log(parseCoordinate({x: 52, y: 35}));
console.log(parseCoordinate(10, 20), '\n');


//* call signature 
interface ICoordinate2 {
  x: number,
  y: number
};

type ParseCoordinate = (arg1: unknown, arg2?: unknown) => ICoordinate2;

//
const parseCoordinate2: ParseCoordinate = function(arg1, arg2) {
  let coord: ICoordinate2 = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as ICoordinate2),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate2("x:12,y:22"));
console.log(parseCoordinate2({x: 52, y: 35}));
console.log(parseCoordinate2(10, 20));
