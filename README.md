# login_page
Making login_page with react, JS, nodejs, mongoDB, redux for BoilerPlate


1. git clone “”
2. package.json에 있는 패키지 전부 install (npm이 없는 경우 npm init)
3. mongoDB 연결을 위해 네트워크 커넥션 복사




<img src="https://user-images.githubusercontent.com/55140432/172519617-7dd4819c-2cd5-43d6-a5b4-0ddd4d3ff43b.png" width="400" height="400"/>

1. 비밀정보를 보호하기 위해 config폴더에 dev.js 파일 생성( ID, PW 추가)

```jsx
module.exports ={
    mongoURI: "mongodb+srv://ID:PW@loginpage.rs7lk.mongodb.net/?retryWrites=true"
}
```

1. 회원가입 (id/pw를 기입하고 서버로 post 요청)
2. 회원정보에서 파싱한 pw를 Bcrypt로 암호화
3. 로그인 시도 id와 pw를 기입하고 서버로 요청
    1. DB에서 Email찾기
    2. Bcrypt로 암호화된 pw를 복호화
    3. 비밀번호가 같다면 token생성
    4. token을 서버와 cookie에 저장
4. 페이지 이동마다 로그인이 되어있는지 , 관리자인지 등을 체크하는 auth기능 생성
    
 
   <img src="https://user-images.githubusercontent.com/55140432/172519642-4ff0382f-95a7-4215-abe3-445e5e34e239.png" width="600" height="300"/>

    
5. 로그인 시, 토큰인증을 하기때문에, 토큰을 삭제해주면 로그아웃이 됨.
