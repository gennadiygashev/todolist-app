import { combineReducers } from 'redux'
import menuListReducer from './menuListReducer'
import cardListReducer from './cardListReducer'

export default combineReducers({
  menuList: menuListReducer,
  cardList: cardListReducer
})