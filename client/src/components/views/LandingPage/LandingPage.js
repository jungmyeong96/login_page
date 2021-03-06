//import { response } from 'express'
import React,{ useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    //useEffect를 사용함으로 function 컴포넌트 사용가능
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    //간단한 작업같은 경우는 따로 state redux로 처리하지 않아도됨.
    const onLoginClickHandler = () => {
        navigate("/login")
        return ;
    }
    const onRegisterClickHandler = () => {
        navigate("/register")
        return ;
    }
        
    return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>
        <h2> 시작 페이지</h2>
        <br />
        <div>
            <button onClick={onLoginClickHandler}>
                로그인하기
            </button>
            <button onClick={onRegisterClickHandler}>
                회원가입하기
            </button>
        </div>
    </div>
    )
}

export default LandingPage