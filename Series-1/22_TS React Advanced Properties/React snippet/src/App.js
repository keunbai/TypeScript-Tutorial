import { useState } from 'react';

const useNumber = (initValue) => useState(initValue);

function App() {
  const [value, setValue] = useNumber(0);
  const [valueMinus, setValueMinus] = useState(0);     
  const [valueMultipl, setValueMultipl] = useState(1);       

  return (
    <div>
      <Heading title="React Advanced Properties" />
      <Button>Push</Button>   
      <br />
      <Incrementer value={value} setValue={setValue} />    
      <Decrementer value={valueMinus} setValue={setValueMinus} /> 
      <Multiplier value={valueMultipl} setValue={setValueMultipl} />       
    </div>
  )
}

const Heading = ({ title }) => {
  return <h2>{title}</h2>;
};

const Incrementer = ({ value, setValue }) => (
  //<button onClick={() => setValue(value + 1)}>Add - {value}</button>
  <Button1 
    //title={`Add : ${value}`}
    value={value} 
    setValue={setValue}
  >
    {`Add : ${value}`}
  </Button1>
)

const Decrementer = ({ value, setValue }) => (
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

  <Button2    //! <button> 고유 속성 여기서 정의 
    title={`Subtract : ${value}`}
    style={{
      backgroundColor: "red",
      color: "yellow",
      fontSize: "Large",
    }}  
    onClick={()=>setValue(value - 1)}     
  />
)

const Multiplier = ({ value, setValue }) => (
  <Button3    //! <button> 고유 속성 여기서 정의 
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

const Button = ({ children }) => (
  <button>{children}</button>
)

const Button1 = ({ children, title, value, setValue }) => (
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

const Button2 = ({ children, title, ...rest }) => (
  <button
    {...rest}
  >
    {children ?? title}    
  </button>
)

const Button3 = ({ children, title, style, ...rest }) => (
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

