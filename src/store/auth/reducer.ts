import { Reducer } from 'redux'
import { ActionType, IAuthState } from './types'

const initialState: IAuthState = {
  token: null,
  userID: null,
  errorMessage: null
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
    case ActionType.AUTH_ERROR: 
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    default: 
      return state
  }
}

export default authReducer