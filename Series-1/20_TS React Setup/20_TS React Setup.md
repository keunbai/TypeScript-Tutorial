# <p><span style="color:cyan">20. TS React SetUp</span></p>

<br />

### <span style="color:cyan"><b>React + TypeScript Basic</b></span>

<br />

> <span style="color:orange"><b>React + TypeScript 코딩 원칙</b></span>
>
> 1. `void` 타입 인자(파라미터)의 리액트 함수 컴포넌트 선언은 심플하게!  
> 2. 리액트 함수 컴포넌트 내부에서는 심플하게 내용 채우기!  
> 3. 리액트 함수 컴포넌트 호출은 심플하게!  
>
> &nbsp; &nbsp; &nbsp; ※ &nbsp;리액트 함수 컴포넌트 파일 확장자는 `.tsx` 사용 필수!

<br />


&nbsp;0. &nbsp;<span style="color:orange">Project setup w/ yarn</span>  
&nbsp; &nbsp; &nbsp;1) &nbsp;`npx yarn create react-app [프로젝트명] --template typescript`  
&nbsp; &nbsp; &nbsp;2) &nbsp;CRA 기본 파일 정리  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;`App.tsx`, `App.css` 수정  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;`package.json`, `index.tsx` 수정  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : &nbsp;`src` 폴더 내 불필요 파일 삭제  

<br />

&nbsp;1. &nbsp;<span style="color:orange">Components</span>  

```js
// src/App.tsx

import './App.css';

const Heading = () => {
  return <h2>Heading</h2>
}

function App() {
  return (
    <div>
      <Heading />
    </div>
  );
}

export default App;
```
<br />

&nbsp;2. &nbsp;<span style="color:orange">Components w/ properties</span> 
- 함수의 타입 선언과 동일 

```js
// src/App.tsx

import './App.css';

function App() {
  return (
    <div>
      <Heading title="Introduction"/>
    </div>
  );
}

// const Heading = (props: {title: string}): JSX.Element => {
//   return <h2>{props.title}</h2>
// };

// const Heading = ({ title }: {title: string}): JSX.Element => {
//   return <h2>{title}</h2>
// };

// const Heading = ({ title }: {title: string}) => {
//   return <h2>{title}</h2>
// };

// const Heading: React.FunctionComponent<{title: string}> = (props): JSX.Element => {
//   return <h2>{props.title}</h2>
// };

const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
  return <h2>{title}</h2>
};


export default App;
``` 
<br />

&nbsp;3. &nbsp;<span style="color:orange">Components w/ children</span>  

```js
// src/App.tsx

import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there!</Box>      
    </div>
  );
}

const Heading = ({ title }: {title: string}) => {
  return <h2>{title}</h2>
}

//const Box = ({ children }: {children: React.ReactNode}) => (
const Box: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => (   //! ref) tut07  
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
)

export default App;
```
<br />

&nbsp;4. &nbsp;<span style="color:orange">Components w/ complex properties</span>  

```js
// src/App.tsx

import React from 'react';
import './App.css';

function App() {
  return (
    <div> 
      <Heading title="Introduction"/>
      <Box>Hello there!</Box>    
      <List items={["one", "two", "three"]} />        
    </div>
  );
}

const Heading = ({ title }: {title: string}) => {
  return <h2>{title}</h2>
}

//const Box = ({ children }: {children: React.ReactNode}) => (
const Box: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => (   //! ref) tut07  
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
)

//const List = ({ items }: {items: string[]}) => (
const List: React.FunctionComponent<{items: string[]}> = ({ items }) => (   //! ref) tut07 
  <ol>
    {items.map((item, idx) => (
      <li key={idx}>    
        {item}
      </li>
    ))}
  </ol>
);

export default App;
```
<br />

&nbsp;5. &nbsp;<span style="color:orange">Event handlers</span>  


```js
// src/App.tsx

import React, { useCallback } from 'react';
import './App.css';

function App() {
  //const handleClick = (item: string) => {
  //  alert(item);
  //}
  const handleClick = useCallback((item: string) => {   //! 랜더링 시 마다 불필요한 재 생성 방지
    alert(item);
  }, []);
  
  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there!</Box>    
      <List items={["one", "two", "three"]} />  
      <ListEvent
        items={["kblee", 'jmhong', 'jblee']}
        onClick={handleClick}
      />            
    </div>
  );
}

const Heading = ({ title }: {title: string}) => {
  return <h2>{title}</h2>
}

//const Box = ({ children }: {children: React.ReactNode}) => (
const Box: React.FunctionComponent<{children: React.ReactNode}> = ({ children }) => (   //! ref) tut07  
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
)

//const List = ({ items }: {items: string[]}) => (
const List: React.FunctionComponent<{items: string[]}> = ({ items }) => (   //! ref) tut07 
  <ol>
    {items.map((item, idx) => (
      <li key={idx}>    
        {item}
      </li>
    ))}
  </ol>
);


interface IComp {    
  items: string[],
  onClick?: (item: string) => void
}
//const ListEvent = ({ items, onClick }: IComp) => (
const ListEvent: React.FunctionComponent<IComp> = ({ items, onClick }) => (   //! ref) tut07 
  <ul>
    {items.map((item, idx) => (
      //<li key={idx} onClick={() => onClick(item)}>    {/* onClick 필수 */}
      <li key={idx} onClick={() => onClick?.(item)}>    {/* onClick 옵션 */}
        {item}
      </li>
    ))}
  </ul>
);


export default App;
```

<br />

&nbsp;※ &nbsp;<span style="color:orange">React Function Component 선언 두가지 방식</span>  
- basic vs Call signature  

&nbsp; <u>Case #1 - **Basic**</u>

```tsx
function Heading({ title }: {title: string}) {
  return <h2>{title}</h2>
};

function ContextProvider({ 
  initialState, 
  children 
}: {
  initialState: ITodo[],
  children: any
}) {
  return (
    <todoContext.Provider value={useReducerManager(initialState)}>
      {children}
    </todoContext.Provider>
  )
}
```
<br />

&nbsp; <u>Case #2 - **Call signature**</u>

```tsx
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
 return <h2>{title}</h2>
};

const ContextProvider: React.FunctionComponent<{
  initialState: ITodo[],
  children: any
}> = ({ initialState, children }) => (
  <todoContext.Provider value={useReducerManager(initialState)}>
    {children}
  </todoContext.Provider>
)
```