//import { getName } from './functions1';     //? Error (Node 실행히, 브라우저에서는?)
const { getName } = require('./functions1');

// console.log(getName({
//   first: 'jungbuem',
//   last: 'lee'
// }));

console.log(getName());
