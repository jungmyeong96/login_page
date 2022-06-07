/*
mongoose에는 스키마(schema)와 모델(model)이라는 개념이 존재한다.

스키마는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체이다.
모델은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체이다.

*/

const mongoose = require('mongoose'); //몽구스디비로 데이터관리

const userSchema = mongoose.Schema({ //만들고자 하는 디비의 스키마형태
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //공백을 없애주는 역할
        unique: 1 //단일 이메일 사용조건
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role: {
        type: Number, //1, 2 , 3 등급
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델 설정

module.exports = { User } //파일을 밖에서도 사용가능하게 export처리