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
// const Heading: React.FunctionComponent<{title: string}> = ({ title }): JSX.Element => {
//   return <h2>{title}</h2>
// };
const Heading: React.FunctionComponent<{title: string}> = ({ title }) => {
  return <h2>{title}</h2>
};


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
);

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
      <li key={idx} onClick={() => onClick?.(item)}>    {/* optional chaning, onClick 옵션 */}
        {item}
      </li>
    ))}
  </ul>
);


export default App;







