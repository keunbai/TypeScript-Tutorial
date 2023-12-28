//* =================================
//! TypeScript Classes
//*   - How to extend existing JavaScript classes by allowing 'implements' & 'member visibility' 
//* =================================

//* ---------------------------------
//! Preliminary #1 - Record<KT, T>   
//* ---------------------------------
/*
//* Case 1
type Page = 'home' | 'about' | 'contact';

interface IPageInfo {
  title: string;
}

//
const nav: Record<Page, IPageInfo> = {
  home: {title: "home"},       //? key 누락시 에러
  about: {title: "about"},
  contact: {title: "contact"},
};

console.log(nav.about);


//* Case 3
interface IIDGenerator {
  id: string
}
interface IArticle {
  title: string,
  desc: string
}
type ArticleWithId = Record<IIDGenerator['id'], IArticle>   //! KT type frome Fields

//
const getArticleWithId = (idGen: IIDGenerator, article: IArticle): ArticleWithId => ({
  [idGen.id]: article
});

const idGen1 = {id: 'bigRock'};
const article1 = {
  title: 'TypeScript',
  desc: 'TypeScript is ...'
};

const articleWithId = getArticleWithId(idGen1, article1);
console.log(articleWithId, '\n');
*/


//* ---------------------------------
//! Preliminary #2 - class + interface
//*   - implements 키워드 이용
//*   - interface 는 클래스 속성에 대한 규약, 물리적인 속성 생성 X
//*       => 클래스 내 맴버 속성 포함 필수
//!   - interface + 클래스 시 클래스 멤버/메서드는 public 만 가능
//* ---------------------------------
/*
interface IUser {    
  fName: string,
  lName: string,
  nickname: string,

  getUserInfo(): string,

  getFullName(): string,   
  sayHi(name: string): string,
}

//
class Player implements IUser {    
  constructor(
    protected id: number,          //! IUser 무관 -> private/protected 가능

    public fName: string,        
    public lName: string,
    public nickname: string,
    //private nickname: string     //? public 만 사용 가능    
  ) {}    

  getUserInfo(): string {
    return `${this.id} ${this.fName} ${this.lName}`
  }

  getFullName(): string {
    return `${this.fName} ${this.lName}`;    
  }  

  sayHi(name: string): string {
    return `${name}, ${this.nickname}, Hello!!`;
  }    
}

const js = new Player(123, 'jisu', 'lee', '딸래미');
console.log(js.getUserInfo());
console.log(js.getFullName());
console.log(js.sayHi(js.getFullName()));

//js.id = 412;          //? 접근 불가
js.fName = 'jeesu';     //! 접근 가능
*/


//* ---------------------------------
//! Preliminary #3 - class 적용 사례
//*    ※ HashMap: key와 value 갖는 자료 구조
//* ---------------------------------
/*
type Words = {    
  [key: string]: string   //! index signature - 객체의 속성 특정되지 않고 타입만 string 으로 제한 
};

class Word {
  constructor(
    public term: string,
    public readonly def: string
  ) {}
};

//
class Dict {
  // 초기화 1 - 자동        //? 객체의 인스탄스 생성 시 초기값 입력 필수 => 여기선 error!
  //constructor(     
  //  words: Words,
  //) {}

  // 초기화 2 - 수동        //! 객체의 인스탄스 생성 시 초기값 입력 X
  private words: Words;
  constructor() {
    this.words = {}
  };

  // 초기화 3 - 수동        //! 객체의 인스탄스 생성 시 초기값 입력 X
  // private words: Words = {};

  // method
  add(word: Word) {       //! 클래스를 타입으로 => 파라미터가 클래스의 인스탄스
    if (this.words[word.term] === undefined) {    //? null 은 조건 불만족
      this.words[word.term] = word.def;
    } 
  };

  def(term: string) {
    return this.words[term];
  }; 

  // static method
  static intro() {
    return 'This is HashMap word dictionary'
  };
};


// 사전 소개
console.log(Dict.intro());

// 단어 생성
const kimchi = new Word('김치', '한국의 전통 음식');
//kimchi.def = '한국의 존맛탱 음식';     //? readonly => Error!

const bibimbap = new Word('비빔밥', '한국의 대표 음식');
const ramen = new Word('라면', '꼬불꼬불 맛있는 인스턴트 면');

// 사전 입력
const dict = new Dict();
dict.add(kimchi);
dict.add(ramen);

// 사전 검색
//console.log(dict.words['김치']);    //? 속성인 객체 words private => Error!
console.log(dict.def('김치'));
console.log(dict.def('라면'));
*/


//* ---------------------------------
//! class + member visibility + interface + inheritance
//* ---------------------------------

type DB = Record<string, string>;

interface IDatabase {
  get(id: string): string,
  set(id: string, value: string): void
}

interface IPersistable {
  saveToString(): string;
  restoreFromString(strState: string): void;
}

//
/**
 * 객체 1개 저장 데이터베이스 클래스 
 */
class DBinMemory implements IDatabase {
  //protected db: DB = {};     //! Member visibility

  protected db: DB;
  constructor() {     // 클래스 인스탄스 생성 시 db 객체 속성 구체적인 초기화 배제
    this.db = {};
  }

  //
  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

/**
 * DB 내 저장 1개 객체 타입 string <-> JSON 변환 메서드 추가 클래스
 */
class PersistentDBinMemory extends DBinMemory implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(strState: string): void {
    this.db = JSON.parse(strState);
  }
}

//
const myDB = new PersistentDBinMemory();
myDB.set('123A45', 'foo');
//myDB.db['123A45'] = 'bar';            //? protected
console.log(myDB.get('123A45'));

const savedStr = myDB.saveToString();   // 초기 db 저장
console.log(savedStr);

myDB.set('123A45', 'cuz');              // db 변경
console.log(myDB.get('123A45'));

const myDB2 = new PersistentDBinMemory();
myDB2.restoreFromString(savedStr);
console.log(myDB2.get('123A45'));       // 초기 db 확인






