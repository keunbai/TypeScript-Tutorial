# <p><span style="color:cyan">22. TS React Advanced Properties</span></p>

Ref) &nbsp;
<br />

<span style="color:cyan"></span>  

<br />

(from tut21)  

&nbsp;※ <span style="color:orange">`tsconfig.json` 內 `"strict": false` 설정</span>


&nbsp;1. &nbsp;<span style="color:orange"><b>Prop Drilling `useState()`</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;<span style="color:cyan">TS에서 `useState()` hook 의 상태 변수/함수를 Props 로 받는 컴포넌트 선언</span>  

```js
// src/App.tsx

import React, { useState } from 'react';
import './App.css';


//! Type 


//! App Comp.
function App() {
  const [value, setValue] = useState(0);   // boolear/string/number 가능

  return (
    <div>
      <Heading title="React Advanced Properties"/>
      <Incrementer value={value} setValue={setValue} />    
    </div>
  );
}


//! Type


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

const Incrementer: React.FunctionComponent<{
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>  //! 타입 확인
}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>Add - {value}</button>
)

export default App;
```

<br />

&nbsp;2. &nbsp;<span style="color:orange"><b>Using `ReturnType`</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;<span style="color:cyan">TS에서 `useState()` hook 의 상태 변수/함수를 Props 로 받는 컴포넌트 선언</span>    
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;Props 객체 타입을 utility type 인 `ReturnType` 으로 선정  

```js
// src/App.tsx

//! Type 

//! App Comp.
function App() {
  const [value, setValue] = useState(0);     // boolear/string/number 가능

  return (
    <div>
      <Heading title="React Advanced Properties"/>
      <Incrementer value={value} setValue={setValue} />    
    </div>
  );
}

//! Type
function useNumber(init: number) {
 return useState<number>(init);
}

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

//type UseNumber = (init:number) => [ReturnType<typeof useState<number>>[0], ReturnType<typeof useState<number>>[1]];
//type UseNumberValue = ReturnType<UseNumber>[0];
//type UseNumberSetValue = ReturnType<UseNumber>[1];

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue,
  setValue: UseNumberSetValue  
}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>Add - {value}</button>
)

export default App;
```


<br />

&nbsp;3. &nbsp;<span style="color:orange"><b>Using ReturnType\<T></b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;<span style="color:cyan">TS에서 `useState()` hook 의 상태 변수/함수를 Props 로 받는 컴포넌트 선언</span>    
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;Props 객체 타입을 utility type 인 `ReturnType<T>` 로 선정  

```js
// src/App.tsx

//! Type 

//! App Comp.
function App() {
  const [value, setValue] = useState(0);             // boolear/string/number 가능

  return (
    <div>
      <Heading title="React Advanced Properties"/>
      <Incrementer value={value} setValue={setValue} />    
    </div>
  );
}


//! Type
//function useType<T>(init: T) {
//  return useState<T>(init);
//}

//type UseTypeValue<T> = ReturnType<typeof useType<T>>[0];
//type UseTypeSetValue<T> = ReturnType<typeof useType<T>>[1];

type UseType<T> = (init:T) => [ReturnType<typeof useState<T>>[0], ReturnType<typeof useState<T>>[1]];
type UseTypeValue<T> = ReturnType<UseType<T>>[0];
type UseTypeSetValue<T> = ReturnType<UseType<T>>[1];


//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

const Incrementer: React.FunctionComponent<{
  value: UseTypeValue<number>,
  setValue: UseTypeSetValue<number>  
}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>Add - {value}</button>
)

export default App;
```



<br />

&nbsp;4. &nbsp;<span style="color:orange"><b>Custom (Detailed) HTML Props</b></span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;<span style="color:cyan">기본 HTML element 테그의 커스텀 위한 Props 받는 컴포넌트 선언</span>  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;사례) &nbsp;`<button>` 태그 커스텀 위한 `<Button>` 컴포넌트  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;컴포넌트 內, 커스텀 위한 HTML Props 타입 확인&nbsp;: &nbsp;https://unpkg.com/@types/react@18.2.0/index.d.ts  
&nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;`<Button>` &nbsp;&nbsp;: &nbsp;Props 없는 기본 `<button>` 태그 생성  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`<Button1>` : &nbsp;Props 전달 없이 `<button>` 자체 속성 설정으로 테그 생성 (요게 편할듯)  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`<Button2>` : &nbsp;모든 `<button>` 테그 속성을 Props 에서 설정  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`<Button3>` : &nbsp;일부 `<button>` 테그 속성을 `<button>` 자체 속성 설정으로 테그 생성  

```tsx
// src/App.tsx

//! Type 

//! App Comp.
function App() {
  const [valuePlus, setValuePlus] = useState(0);     // boolear/string/number 가능
  const [valueMinus, setValueMinus] = useState(0);     
  const [valueMultipl, setValueMultipl] = useState(1);     

  return (
    <div>
      <Heading title="React Advanced Properties"/>
      <Button>Push</Button>   
      <br />
      <Incrementer value={valuePlus} setValue={setValuePlus} /> 
      <Decrementer value={valueMinus} setValue={setValueMinus} /> 
      <Multiplier value={valueMultipl} setValue={setValueMultipl} /> 
    </div>
  );
}


//! Type
function useType<T>(init: T) {
 return useState<T>(init);
}

type UseTypeValue<T> = ReturnType<typeof useType<T>>[0];
type UseTypeSetValue<T> = ReturnType<typeof useType<T>>[1];

//! Sub Comp.
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};

const Incrementer: React.FunctionComponent<{
  value: UseTypeValue<number>,
  setValue: UseTypeSetValue<number>  
}> = ({ value, setValue }) => (
  //<button onClick={() => setValue(value + 1)}>Add - {value}</button>
  <Button1 
    //title={`Add : ${value}`}
    value={value} 
    setValue={setValue}
  >
    {`Add : ${value}`}
  </Button1>
)

const Decrementer: React.FunctionComponent<{
  value: UseTypeValue<number>,
  setValue: UseTypeSetValue<number>  
}> = ({ value, setValue }) => (
  // <Button2    //! <button> 고유 속성 여기서 정의 
  //   style={{
  //     backgroundColor: "red",
  //     color: "yellow",
  //     fontSize: "Large",
  //   }}  
  //   onClick={()=>setValue(value - 1)}     
  // >
  //   {`Subtract : ${value}`}
  // </Button2>

  <Button2    
    title={`Subtract : ${value}`}
    style={{
      backgroundColor: "red",
      color: "yellow",
      fontSize: "Large",
    }}  
    onClick={()=>setValue(value - 1)}     
  />
)

const Multiplier: React.FunctionComponent<{
  value: UseTypeValue<number>,
  setValue: UseTypeSetValue<number>  
}> = ({ value, setValue }) => (
  <Button3    
    style={{
      backgroundColor: "purple",
      color: "yellow",
      fontSize: "Large",
    }}  
    onClick={()=>setValue(2*value)}     
  >
    {`Multiply(x2) : ${value}`}
  </Button3>
)

const Button: React.FunctionComponent<{children: string}> = ({ children }) => (
  <button>{children}</button>
)

const Button1: React.FunctionComponent<{
  children?: string 
  title?: string,
  value: UseTypeValue<number>,
  setValue: UseTypeSetValue<number>,
}> = ({ children, title, value, setValue }) => (
  <button
    style={{
      backgroundColor: "steelblue",
      color: "yellow",
      fontSize: "Large",
    }}
    onClick={() => setValue(value + 1)}
  >
    {children ?? title}      {/* nullish coalescing */} 
  </button>
)

const Button2: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 
    HTMLButtonElement
  >
> = ({ children, title, ...rest }) => (
  <button
    {...rest}
  >
    {children ?? title}    
  </button>
)

const Button3: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>, 
    HTMLButtonElement
  >
> = ({ children, title, style, ...rest }) => (
  <button
    {...rest}
    style={{        //! 추가할 속성 정의
      ...style,
      marginLeft: '5px'
    }}
  >
    {title ?? children}    
  </button>
)


export default App;
```


