const express = require('express')
const app = express()
const port = 4000


const config = require('./config/key');

//post body를 파싱하기위해 디펜던시 불러오기 
const bodyParser = require('body-parser');


//토큰을 쿠키에 저장하기위한 모듈
const cookieParser = require('cookie-parser');


//DB모델 불러오기
const { User } = require("./models/User");

//auth함수 불러오기 
const { auth } = require("./middleware/auth");

/*  몽고db 환경설정 */
//버전업그레이드영향으로 옵션제거
//몽고디비 설정 시 비밀번호 명확히 사용할것
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)//&w=majoritynp') // No write concern mode named 'majoritynp' found in replica set configuration 에러
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))


/* application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended: true}));

/*application/json */
app.use(bodyParser.json());


app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세여!!")
})

app.post('/api/users/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면 
  //그것들을 DB에 넣어줌
  const user = new User(req.body)

  user.save((err, userInfo) => { //mongodb출신 메소드 save
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
  //comparePassword 호출 함수내부에서 비교처리하고 결과값을 파리미터로 받은 cb의 파라미터로 넣어줌
      user.comparePassword(req.body.password, (err, isMatch) => {
        console.log("pw in")
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        else
          user.generateToken((err, user) => {//토큰을 생성하기 위해 jsonwebtoken 모듈 생성
            if (err) return res.status(400).send(err);
    
          // 토큰을 저장한다. 어디에? 쿠키, 로컬 스토리지, 세션
          res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
    
          })
      })
  //비밀번호까지 맞다면 토큰을 생성하기.

    })

})


/* auth라는 미들웨어를 사용하여 관리 */
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //일단 여기서는 role 0일때 일반유저 0이아니면 관리자로 처리 실제로는 부서별로다룸
    isAuth: true,
    name: req.user.email,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })  
})

app.get('/api/users/logout', auth, (req, res) => {

  console.log("here",req.user._id);
  User.findOneAndUpdate({ _id: req.user._id}, //auth에서 user에 담아줌
    { token: ""}, 
    (err, user) => {
      if (err) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
    })

})