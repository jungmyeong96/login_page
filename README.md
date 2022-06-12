# login_page
Making login_page with react, JS, nodejs, mongoDB, redux for BoilerPlate

<br/>

## 실행 방법

1. package.json확인 후, (client, main)모듈을 다운받기 
2. server의 config폴더 위치에 dev.js 생성 (conncet을 위해 DB주소를 따온뒤, name과 pw를 기입)
	``` module.exports ={
    mongoURI: \"mongodb+srv://{name}:{password}@loginpage.rs7lk.mongodb.net/?retryWrites=true" } ```
3. ``` npm run dev ``` 으로 실행
4. http://localhost:3000/ , http://localhost:3000/login, http://localhost:3000/register 로 로그인 및 회원가입

<br />
<br />

### back-end

1. git clone “”
2. package.json에 있는 패키지 전부 install (npm이 없는 경우 npm init)
3. mongoDB 연결을 위해 네트워크 커넥션 복사




<img src="https://user-images.githubusercontent.com/55140432/172519617-7dd4819c-2cd5-43d6-a5b4-0ddd4d3ff43b.png" width="400" height="400"/>

4. 비밀정보를 보호하기 위해 config폴더에 dev.js 파일 생성( ID, PW 추가)

```jsx
module.exports ={
    mongoURI: "mongodb+srv://ID:PW@loginpage.rs7lk.mongodb.net/?retryWrites=true"
}
```

5. 회원가입 (id/pw를 기입하고 서버로 post 요청)
6. 회원정보에서 파싱한 pw를 Bcrypt로 암호화
7. 로그인 시도 id와 pw를 기입하고 서버로 요청
    1. DB에서 Email찾기
    2. Bcrypt로 암호화된 pw를 복호화
    3. 비밀번호가 같다면 token생성
    4. token을 서버와 cookie에 저장
8. 페이지 이동마다 로그인이 되어있는지 , 관리자인지 등을 체크하는 auth기능 생성
    
 
   <img src="https://user-images.githubusercontent.com/55140432/172519642-4ff0382f-95a7-4215-abe3-445e5e34e239.png" width="600" height="300"/>

    
9. 로그인 시, 토큰인증을 하기때문에, 토큰을 삭제해주면 로그아웃이 됨.

---

### front-end

Tip-box

> 1. 기본 react는 index.html → index.js → app.js 순으로 호출되며 화면을 띄워줌
개발하기 편하게 디렉토리 구조를 바꿈
2. [snippet](https://www.hanl.tech/blog/vs-code-react-time-awesome-snippets/)을 사용하여 간편하게 functional component 사용
3. react에서는 페이지간의 이동을 할때, [react router dom](https://v5.reactrouter.com/web/example/basic)을 사용
> 

1. 브라우저로 클라이언트 호출
2. react로 기존 html을 설정한 뒤, 호출
3. html의 body값을 빌드하기 위해 index.js를 호출
4. index.js에서 redux store 및 css 관련 세팅을 한 뒤, app.js호출
5. app.js에서 각종 컴포넌트들을 불러온 뒤, auth인증을 위해 HOC로 관리해줌


<img src="https://user-images.githubusercontent.com/55140432/172758044-6ce3c38b-efc0-4586-80da-cbe3a0982fe8.png" width="400" height="200"/>

    
6. auth처리된 컴포넌트들을 react-route-dom을 통해 라우팅시켜줌.
    1. LandingPage, LoginPage, RegisterPage
        1. LandingPage
            1. 초기화면, logout을 처리 (보안 NULL 아무나 진입가능)
        2. LoginPage
            1. 로그인 화면 (보안 False 로그인시 진입 불가)
        3. RegisterPage
            1. 회원가입화면 (보안 False 로그인시 진입불가)
7. 모든 컴포넌트(page)들은 redux를 통해 state를 관리

<img src="https://user-images.githubusercontent.com/55140432/172757991-afafa033-2cde-48b8-86e1-bb8d7fd9322e.png" width="400" height="200"/>
<img src="https://user-images.githubusercontent.com/55140432/172758008-4e7a793c-0df2-447c-a75e-3f2f5745a5ee.png" width="400" height="200"/>


- LoginPage 정보를 저장하기 위한 **state변수**를생성 후 초기화
- form형식의 컴포넌트를 리턴하여 브라우저에 띄우고, 사용자로부터 입력을 받음.
- 입력받은 정보는 핸들러를 통해 **state 변수**로 저장됨.
- action을 파라미터로 갖는 dispatch를 호출
- 저장한 정보(**state 변수**)를 형식에 맞게 action의 파라미터로 보내고,
- action에서 내부적으로 서버에서 필요한 정보가 있는 경우 axios로 **backend**에 데이터를 요청함
    - 프로미스로 요청 후 응답받은 데이터는 변수에 타입과 함께 저장하여 reducer로 전달
- action이 끝나면 dispatch를 통해 자동적으로 reducer가 호출된다.
- reducer작업이 끝난 후 프로미스를 통해 남은작업(페이지 이동, 성공알람 ,에러 등)을 처리해줌
8. 모든 요청 처리 완료

