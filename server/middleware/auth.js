const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    //토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true}); //유저가 없는 경우

        req.token = token; //index에서 참조하기 편하게 req에 넣어줌
        req.user = user;
        next();// next가 없으면 미들웨어에서 갇힘
    })

    //유저가 있으면 인증 okey

    //유저가 없으면 인증 NO!
}

module.exports = { auth };