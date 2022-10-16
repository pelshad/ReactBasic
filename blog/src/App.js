/* eslint-disable */ //lint 경고 없애는 명령어

import {useState} from 'react';
import './App.css';

//jsx? js파일에서 html을 사용할 수 있게 해주는 형식
//jsx 규칙
// class는 className으로 작성
// 함수내에서 선언한 변수명은 랜더링 화면에서 { 변수명 }으로 사용가능
// 선택자에서 style사용시 style={{ 스타일명='값' }}형식으로 사용
// 단, style 중 -가 들어가는 스타일(ex. backgorund-color)은 -대신 카멜케이스기법으로 작성

function App() {
  const logo = 'ReactBlog'

  //useState? 자바스크립트의 destructuring 문법
    // destructuring 문법
     let num = [1,2];
      //기존 배열값 가져오기
      // let a = num[0];
      // let c = num[1];
    //destructuring 문법
      let [a, c] = [1, 2];
      //a에는 1, c에는 2의 값이 들어감
      //변수명을 지정하지 않고 usestate를 활용하는 이유 -> 즉시 재렌더링이됨
      //setstate를 활용하기 위해

    //다수의 값을 useState에 담는 법
    //1. useState여러개 만들기
    //2. 객체형
      const [blog, setBlog] = useState({
        post1 : '남자 코트 추천',
        post2 : '강남 우동 맛집',
        post3 : '파이썬 독학'
      });
      const {post1, post2, post3} = blog;
    //3. 배열형
      const [fav, setFav] = useState([0,0,0]);

  //setstate 사용시 주의! 값+=1, 값++ 같은 =식은 사용안됨
  const favUp = () => {
    //배열형 state의 경우 원본을 직접적으로 바꾸지 않고 카피본을 만들어서 짜는게 좋음
    const favCopy = [...fav]; // 기존 favstate의 카피본 생성
    //favCopy=fav로는 동작 안함, 기존의 참조값이 똑같다고 판단 아래 변경함수 특징 참고
    favCopy[0] = fav[0] + 1;
    setFav(favCopy);

    //state 변경함수 특징
    //1. 자바스크립트 내의 array, object의 특징 (변수에는 각 배열 및 객체의 참조만 가지고 있음)
    //그로 인해 직접 값을 변경(setstate)를 하여도 참조는 변하지 않음
    //2. 기존 state == 신규 state의 경우 변경 안해줌 (fav == favCopy -> true가 나옴, 결국 변경 안됨)
    //자세한 내용은 reference data type 공부
    //[...state]를 참조값도 바꿔달라고 요청 -> 2번 조건에 false가 나올거니 변경됨
    //...문법 -> [], {}를 해제, 그래서 객체형도 저렇게 풀어서 사용하는구나...
  }

  //객체 sort기능 사용 도전...안됨
  //해결법 찾아보기
  const sortPost = () => {
    setBlog(
      blog.sort(function(a,b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if(x < y){
          return -1;
        } if(x > y){
          return 1;
        }
        return 0;
      })
    )
  }



  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'red', fontSize:'16px'}}>{ logo }</h4>
      </div>
      <span onClick={sortPost}>가나다순 정렬</span>
      <div className="list">
        <h4>{ post1 } 
        <span onClick={ favUp }>❤️</span> 
        {fav[0]} </h4>
        <p>2월 17일 발행<p onClick={() => {
          post1 === '남자 코트 추천' 
          ? setBlog({
            ...blog,
            post1:'여자 코트 추천'
          })
          : setBlog({
            ...blog,
            post1:'남자 코트 추천'
          })
        }}>숙제버튼</p></p>
      </div>
      <div className="list">
        <h4>{ post2 }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ post3 }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
