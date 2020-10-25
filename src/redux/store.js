import { createStore, applyMiddleware } from "redux";
import rootReducer from './modules'
import thunk from 'redux-thunk'

import api from './middleware/api'

let store;

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api))) // 增强
} 
else {
  store = createStore(rootReducer, applyMiddleware(thunk, api))
}

export default store