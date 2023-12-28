## <p><span style="color:cyan">04. Challenge #1</span></p>

---

<br />

### **<u style="color:orange">TypeScript 에서 JSON 파일 로딩</u>**  
- `tsconfig.json` 內 설정 확인   
&nbsp; &nbsp; &nbsp;`"resolveJsonModule": true`   
&nbsp; &nbsp; &nbsp;`"esModuleInterop": true`    

<br />

<u> Case 1 </u>


```js
// index.js

import house from "./house.json"
console.log(typeof house);            // object
console.log(house.name);
console.log(JSON.stringify(house));   // string, JSON 형식
```

```json
// house.json

{ "name": "Corrino", "planets": ["Kaitan", "Salusa Secundus"] }
```

<br />

<u> Case 2 </u>


```js
// index.js

import houses from "./houses.json"
console.log(typeof houses);            // object, 실제로는 object[]  
console.log(houses[2].name);
console.log(JSON.stringify(houses));   // string, JSON 형식
```

```json
// houses.json

[
  { "name": "Atreides", "planets": "Calladan" },
  { "name": "Corrino", "planets": ["Kaitan", "Salusa Secundus"] },
  { "name": "Harkonnen", "planets": ["Giedi Prime", "Arrakis"] }
]
```


