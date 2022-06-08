import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
/* redux 설정 */
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';

/* redux 미들웨어 */
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

/* redux reducer */
import Reducer from './_reducers';

/* redux store(미들웨어도 포함) */
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root')); //html의 body태그
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}//익스텐션으로 시각화
    >
      <App />
    </Provider>
  </React.StrictMode>
);//기본 리액트 화면이 돌아가는 로고

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
