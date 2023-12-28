//* ---------------------------------
//! Misconception #1
//!  - Types are enforced by TS sat compile time, not at run time
//* ---------------------------------
interface IUser {
  first: string,
  last: string
};

type GetName = (user: IUser) => string;

//
export const getName: GetName = function(user) {
  //return `${user?.first} ${user?.last}`;
  return `${user?.first ?? 'first'} ${user?.last ?? 'last'}`;
};

