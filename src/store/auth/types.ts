export enum ActionType {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_LOGOUT = 'AUTH_LOGOUT'
}

export interface IAuthState {
  token: string | null,
  userID: string | null 
}


