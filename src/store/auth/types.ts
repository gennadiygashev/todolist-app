export enum ActionType {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_ERROR = 'AUTH_ERROR'
}
 
export interface IAuthState {
  token: string | null,
  userID: string | null ,
  errorMessage: string | null
}


