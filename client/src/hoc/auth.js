import React,{ useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";


/*
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입이가능한 페이지
    false => 로그안한 유저는 출입이 불가능한 페이지
*/

//분기처리를 auth에서 직접해줌
export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const navigate = useNavigate();
        const dispatch = useDispatch();
        //backend에 rq를 날려서 현재 상태를 받아오기 위함
        useEffect(() => {
          dispatch(auth())
          .then(response => {
              console.log(response)
              //로그인을 하지 않은 상태
              if (!response.payload.isAuth){
                  if (option) {
                      navigate('/');
                  }
              } else {
                  if (adminRoute && !response.payload.isAdmin) { //admin이 아닐때
                      navigate("/");
                  } else {
                      if (option === false)
                        navigate('/');
                  }
              }
          })
        
        
        }, [])
        
        return<SpecificComponent/> //생략하면 겉돎
        

    }
    
    return AuthenticationCheck
}