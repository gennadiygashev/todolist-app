import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import mainReducer from './mainReducer'

export default combineReducers({
  menu: menuReducer,
  main: mainReducer,
})