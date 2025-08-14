/* eslint-disable */
import Reaact, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [title1, modify1] = useState('강남 맛집 추천')
  let [title2, modify2] = useState('이태원 맛집 추천')
  let [title3, modify3] = useState('신사 맛집 추천')
  let [title4, modify4] = useState('압구정 맛집 추천')
  let [따봉, 따봉변경] = useState(0);
  let [제목, 제목변경] = useState('')


  function 제목바꾸기(){
    modify1('이수 맛집 추천');
  }
  return (
    <div className="App">
      <div className = "black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick = {제목바꾸기}>버튼</button>
      <div className = "list">
        <h3> { title1 } <span onClick = {()=>{따봉변경(따봉 + 1)}}>👍🏻</span>{따봉}</h3>
        <p> 2월 17일 발행 </p>
        <hr/>
        <h3> { title2 } </h3>
        <p> 3월 18일 발행</p>
        <hr/>
        <h3> { title3 } </h3>
        <p> 4월 17일 발행 </p>
        <hr/>
        <h3> { title4 } </h3>
        <p> 5월 12일 발행 </p>
        <hr/>
      </div>

      
    <Modal />

    </div>
  );


}


function Modal(){
  return(
    <div className = "modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
        <p>요약</p>
      </div>
  )
}

export default App;
