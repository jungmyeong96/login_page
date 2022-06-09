//import { Axios } from 'axios'
//import { response } from 'express';
//import { withRouter } from 'react-router-dom'; //구버전
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate(); //페이지 이동

    //내부에서 컴포넌트의 데이터를 변화시키려고 할때는 props나 state를 사용해야함

    //스테이트 설정
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    //이벤트 핸들러 정의
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //정보를 파싱하기전 리프레쉬를 막아줌

       // console.log('Email', Email);
       // console.log('Password', Password);

       //유저가 기입한 정보를 변수에담아 서버로 보냄
       let body = {
           email: Email,
           password: Password
       }
       dispatch(loginUser(body)) //디스패치를 하면 액션실행 후 리듀서가 호출됨
       .then(response => {
           if (response.payload.loginSuccess){
               //props.history.push('/')
               navigate('/');
           } else {
               alert('Error');
           }
       })

       // 리덕스를 안쓰면 여기서 바로 처리해도 괜찮으나
       //현재는 리덕스를 통해 스테이트를 관리하기에 action으로 옮김
    //    Axios.post('/api/users/login', body)
    //    .then(response => {

    //    })
    }

    return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>
        <form style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type='email' value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type='password' value={Password} onChange={onPasswordHandler} />
            <br />
            <button>
                Login
            </button>
        </form>
    </div>
  )
}

export default LoginPage