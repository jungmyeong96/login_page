//import { response } from 'express'
import React,{ useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const navigate = useNavigate();

    //useEffect를 사용함으로 function 컴포넌트 사용가능
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    //간단한 작업같은 경우는 따로 state redux로 처리하지 않아도됨.
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                navigate("/")
            } else {
                alert("로그아웃 하는데 실패했습니다.")
            }
        })
    }
        
    
    return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>
        <h2> 로그아웃 페이지</h2>
        <br />
        <div>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    </div>
    )
}

export default LogoutPage