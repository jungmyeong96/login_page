const express = require('express')
const app = express()
const port = 3000


const config = require('./config/key');

//post body를 파싱하기위해 디펜던시 불러오기 
const bodyParser = require('body-parser');


//DB모델 불러오기
const { User } = require("./models/User");

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})