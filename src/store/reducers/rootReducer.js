import { combineReducers } from 'redux'
import menuListReducer from './menuListReducer'

export default combineReducers({
  menuList: menuListReducer
})