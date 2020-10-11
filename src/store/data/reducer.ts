import { Reducer } from 'redux'
import { ActionType, IDataState } from './types'

export const initialState: IDataState = {
  elements: [],
  loading: false,
  error: null
}

export const getState = (initialState: IDataState) => initialState

const contentReducer: Reducer<IDataState> = (state = initialState, action): IDataState => {  
  switch (action.type) {
    case ActionType.FETCH_DATA_STARTED:
      return {
        ...state,
        loading: true,
        elements: []
      }
    case ActionType.PUT_DATA:
      return {
        ...state,
        loading: false,
        elements: action.payload
      }
    case ActionType.FETCH_DATA_FAILURE:
      return {
        elements: [],
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default contentReducer