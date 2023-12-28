//* =================================
//! Enum Types & Literal Types
//* =================================

//* ---------------------------------
//! Enumerations
//*   Ref) https://curryyou.tistory.com/495
//* ---------------------------------
enum LoadingState1 {
  beforeLoad,
  loading,
  loaded,
}

enum LoadingState2 {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

//
const isLoading1 = (state: LoadingState1) => state === LoadingState1.loading;
console.log(isLoading1(LoadingState1.beforeLoad));

const isLoading2 = (state: LoadingState2) => state === LoadingState2.loading;
console.log(isLoading2(LoadingState2.loading));


//* ---------------------------------
//! Literal Types
//* ---------------------------------

//! Numeric Literals
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}
console.log(rollDice(3));
//console.log(rollDice(5));   //? Error


//! String Literals
function sendEvent(name: 'addToCart' | 'checkout', data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('checkout', {cartCount: 123});
sendEvent('addToCart', {productID: 456});