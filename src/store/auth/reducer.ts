import { Reducer } from 'redux'
import { ActionType, IAuthState } from './types'

const initialState: IAuthState = {
  token: null,
  userID: null
}

const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH_SUCCESS: 
      return {
        ...state, 
        token: action.token,
        userID: action.userID
      }
    case ActionType.AUTH_LOGOUT: 
      return {
        ...state, 
        token: null,
        userID: action.userID
      }
    default: 
      return state
  }
}

export default authReducer