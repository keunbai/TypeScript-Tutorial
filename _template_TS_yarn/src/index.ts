//*
const myValue: string = "jack";
let myVariable: number = 1;
myVariable += 1;
let myBoolean: boolean = true;

let myRETest: RegExp = /foo/;

let myValues1: number[] = [1, 2, 3];
let myValues2: Array<number> = [1, 2, 3];
let myValues3: Array<string> = ["a"];

myValues1.forEach((a) => console.log(a));
const multipliedValues= myValues1.map((a) => a * 10);


//*
interface Person {
  first: string;
  last: string;
}

const myPerson: Person = {
  first: "jack",
  last: "herrington",
};


//!
const data: Record<number, string> = {
  10: "megan",
  20: "lori",
};

data[5] = "joe";




