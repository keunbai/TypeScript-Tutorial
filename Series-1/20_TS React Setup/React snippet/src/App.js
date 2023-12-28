import { useCallback } from 'react';
import './App.css';


function App() {
  //const handleClick = (item) => {
  //  alert(item);
  //}
  const handleClick = useCallback((item) => {   //! 랜더링 시 마다 불필요한 재 생성 방지
    alert(item);
  }, []);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there!</Box>
      <List items={["one", "two", "three"]} />
      <ListEvent
        items={["kblee", 'jmhong', 'jblee']}
        onClick={handleClick}
      />
    </div>
  );
}


const Heading = ({ title }) => {
  return <h2>{title}</h2>;
};

const Box = ({ children }) => (      //! children 속성 변경 불가
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold"
    }}
  >
    {children}
  </div>
);

const List = ({ items }) => (
  <ol>
    {items.map((item, idx) => (
      <li key={idx}>    
        {item}
      </li>
    ))}
  </ol>
);

const ListEvent = ({ items, onClick }) => (
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
