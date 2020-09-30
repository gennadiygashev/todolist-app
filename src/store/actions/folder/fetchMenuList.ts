import Axios from '../../../axios/axios-folders'
import { 
  FETCH_MENULIST_STARTED,
  FETCH_MENULIST_SUCCESS,
  FETCH_MENULIST_FAILURE
} from '../actionTypes'

export function fetchMenuList() {
  return async (dispatch: (arg0: { type: string; folders?: any; error?: any }) => void) => {
    dispatch(fetchMenuListStarted())
    try {      
      const response = await Axios.get('/folders.json')
      const folders: any = []
      Object.values(response.data).forEach((folder) => {
        folders.push(folder)
      })  
      dispatch(fetchMenuListSuccess(folders))
    } catch (e) {
      dispatch(fetchMenuListFailure(e))
    }  
  }
}

export function fetchMenuListStarted() {
  return {
    type: FETCH_MENULIST_STARTED
  }
}

export function fetchMenuListSuccess(folders: any) {
  return {
    type: FETCH_MENULIST_SUCCESS,
    folders
  }
}

export function fetchMenuListFailure(e: any) {
  return {
    type: FETCH_MENULIST_FAILURE,
    error: e
  }
}


