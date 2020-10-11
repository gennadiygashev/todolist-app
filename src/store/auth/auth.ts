import Axios from "axios"
import { ActionType } from "./types"

export function auth(email: string, password: string, isLogin: boolean) {
  return async (dispatch: any) => { 
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOnR4zBT5q89j9t0AvWuNzaP2raizQYe4'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOnR4zBT5q89j9t0AvWuNzaP2raizQYe4'
    }
    try {
      const response = await Axios.post(url, authData)
      const data = response.data

      const expirationDate: any = new Date(new Date().getTime() + data.expiresIn * 1000)
  
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userID', data.localId)
      localStorage.setItem('expirationDate', expirationDate) 
  
      dispatch(authSuccess(data.idToken, data.localId))
      dispatch(autoLogout(data.expiresIn))  
    } catch (err) { 
      const error = (err.response)
      const errorMessage = error.data.error.message
      console.log(error)
      console.log(errorMessage)
      dispatch(authError(errorMessage))
    }
  }
}

export function autoLogout(time: any) {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userID')
  localStorage.removeItem('expirationDate')
  return {
    type: ActionType.AUTH_LOGOUT
  }
}

export function autoLogin() {
  return (dispatch: any) => {
    const token = localStorage.getItem('token')
    const userID = localStorage.getItem('userID')
    if (!token) {
      dispatch(logout())
    } else {
      const localDate: any = localStorage.getItem('expirationDate')
      const experationDate = new Date(localDate)
      if (experationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token, userID))
        dispatch(autoLogout((experationDate.getTime() - new Date().getTime()) / 1000))    
      }
    }
  }
}

export function authSuccess(token: any, userID: any) {
  return {
    type: ActionType.AUTH_SUCCESS,
    userID,
    token
  }
}

export function authError(errorMessage: string) {
  return {
    type: ActionType.AUTH_ERROR,
    errorMessage
  }
}