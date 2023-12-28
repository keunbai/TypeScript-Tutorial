## Misconception #1 

<br />

<span style="color:orange">**Types are enforced by TS at transfile time, not at run time**</span>  
  


<u>Proof</u>

Case 1) &nbsp;<u>함수 리턴값 체크 없이 타입스크립트 파일 트랜스파일 후 자바스크립트 파일에서 함수 호출 시</u>  

  1. &nbsp;`functions1.ts` 트랜스파일 (<span style="color:cyan">타입 체크 미적용 TS 파일</span>)  
     - &nbsp;`tsc function1.ts` &nbsp; -> &nbsp;`functions1.js` 생성  
  2. &nbsp;`function1.js` 파일의 타입 체크 미적용 함수 리턴 부분 내용 확인  
  3. &nbsp;`js-functions-test1.js` 생성 후 Node 실행  
     - &nbsp;`Node js-functions-test1.js`  

  &nbsp; &nbsp;&nbsp; &nbsp;==> &nbsp;<span style="color:red">**Error 출력**</span>  

Case 2) &nbsp;<u>함수 리턴값 체크 조치된 타입스크립트 파일 트랜스파일 후 자바스크립트 파일에서 함수 호출 시</u>  

  1. &nbsp;`functions2.ts` 트랜스파일 (<span style="color:cyan">타입 체크 적용 TS 파일</span>)  
     - &nbsp;`tsc function2.ts` &nbsp; -> &nbsp;`functions2.js` 생성  
  2. &nbsp;`function1.js` 파일의 타입 체크 적용 함수 리턴 부분 내용 확인      
  3. &nbsp;`js-functions-test2.js` 생성 후 Node 실행  
     - &nbsp;`Node js-functions-test2.js`  

  &nbsp; &nbsp;&nbsp; &nbsp;==> &nbsp;설정에 따라 `undefined` 또는 default 값 출력  


<br />

※ &nbsp;TypeScript 모듈 간에는 `import` 키워드, 트랜스파일된 JavaScript 모듈 간에는 `require` 키워드 이용  