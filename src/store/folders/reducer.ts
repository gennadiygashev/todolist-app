import { Reducer } from 'redux'
import { ActionType, IFoldersState } from './types'

export const initialState: IFoldersState = {
  folders: [],
  loading: false,
  error: null
}

export const getState = (initialState: IFoldersState) => initialState

const foldersReducer: Reducer<IFoldersState> = (state = initialState, action): IFoldersState => {  
  switch (action.type) {
    case ActionType.FETCH_FOLDERS_STARTED:
      return {
        ...state,
        loading: true
      }
    case ActionType.PUT_FOLDERS:
      return {
        ...state,
        loading: false,
        folders: action.payload
      }
    case ActionType.FETCH_FOLDERS_FAILURE:
      return {
        folders: [],
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default foldersReducer