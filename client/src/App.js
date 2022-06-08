import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
//  Link
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage'

import LoginPage from './components/views/LoginPage/LoginPage'

import RegisterPage from './components/views/RegisterPage/RegisterPage'


function App() { //APP을 구성 APP은 어떤 내용인지
  return (
    <div className="App">
  <BrowserRouter>

      {/* <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr /> */}

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

        <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>
        <Route exact path="/login" element = {<LoginPage/>}/>
        <Route exact path="/register" element = {<RegisterPage/>}/>
        </Routes>
        {/* <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route exact path="/About" element = {<About/>}/>
        <Route exact path="/Dashboard" element = {<Dashboard/>}/>
        </Routes> */}

      </BrowserRouter>
    </div>
  );
}

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

export default App;
