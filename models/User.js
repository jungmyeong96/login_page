/*
mongoose에는 스키마(schema)와 모델(model)이라는 개념이 존재한다.

스키마는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체이다.
모델은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체이다.

*/

const mongoose = require('mongoose'); //몽구스디비로 데이터관리
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');
let jwt = require('jsonwebtoken');
const saltRounds = 10; //10자리인 salt를 이용하여 암호화

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

userSchema.pre('save', function( next ) {
    let user = this;

    if (user.isModified('password')) {
    //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) { //암호화를 위한 salt생성
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            })
            //bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                // Store hash in your password DB.
        // });
        });
    } else
        next(); //next가 있어야 save로 넘어감
})

userSchema.methods.comparePassword = function (plainPassword, cb) { //userSchema에 메소드 만들기
   //plainPassword = 유저가 입력한 비밀번호 , this.password = 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    
    let user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb) {
    let user = this;

    //토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        //복호화된 id와 토큰을 비교하여 검색
        user.findOne({"_id": decoded, "token":token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema) //모델 설정

module.exports = { User } //파일을 밖에서도 사용가능하게 export처리