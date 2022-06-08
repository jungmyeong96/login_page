import { combineReducers } from "redux";
import user from './user_reducer';

//reducer가 user number등으로 나눠질 수 있는데 현재 파일에서 하나로 합쳐줌
//변화 전 state와 action을 더해서 변한값을 나타내줌

const rootReducer = combindeReducers({
    //user,
})

export default rootReducer;