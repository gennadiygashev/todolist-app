import { combineReducers } from 'redux'
import { all, fork } from "redux-saga/effects"
import foldersSaga from "./folders/sagas"
import dataSaga from "./data/sagas"
import foldersReducer from './folders/reducer'
import contentReducer from './data/reducer'
import authReduer from './auth/reducer'
import { IFoldersState } from './folders/types'
import { IDataState } from './data/types'
import { IAuthState } from './auth/types'

export interface IAppState {
  folders: IFoldersState
  data: IDataState
  auth: IAuthState
}

export default combineReducers({
  folders: foldersReducer,
  data: contentReducer,
  auth: authReduer
})

export function* rootSaga() {
  yield all([fork(foldersSaga), fork(dataSaga)])
}