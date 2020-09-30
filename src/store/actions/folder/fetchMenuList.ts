import Axios from '../../../axios/axios-folders'
import { IFolder } from '../../../interfaces'
import { 
  FETCH_MENULIST_STARTED,
  FETCH_MENULIST_SUCCESS,
  FETCH_MENULIST_FAILURE
} from '../actionTypes'


export function fetchMenuList() {
  return async (dispatch: any) => {
    dispatch(fetchMenuListStarted())
    try {      
      const response = await Axios.get('/folders.json')
      const folders: IFolder[] = Object.values(response.data)
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

export function fetchMenuListSuccess(folders: IFolder[]) {
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



