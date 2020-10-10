import Axios from '../../axios/axios'
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { fetchFoldersFailure, putFolders } from './actions'
import { ActionType, IFolder } from './types'
import { getState } from './reducer'

async function handleFetch(currentUser: any) {
  return await Axios.get(`/${currentUser}/folders.json`)
}

async function handleCreate(currentUser: any, name: any) {
  const createFolder = (name: string): IFolder => {
    return {
      name,
      typeData: 'notChosen',
      key: '',
      folderID: '',
      folderColor: 'action',
      folderLength: 0,
    }
  }

  const newFolder: any = createFolder(name)
  const response = await Axios.post(`/${currentUser}/folders.json`, newFolder)
  const folderKey: any = Object.values(response.data)[0]
  newFolder.folderID = folderKey
  newFolder.key = folderKey
  Axios.patch(`/${currentUser}/folders/${folderKey}.json`, {'key': folderKey, 'folderID': folderKey})

  return newFolder
}

function handleDelete(currentUser: string, folderID: string) {
  Axios.delete(`/${currentUser}/folders/${folderID}.json`)
  Axios.delete(`/${currentUser}/data/${folderID}.json`)
}

export function handleChange(currentUser: string, value: string | number, folderID: string, typeAction: string) {
  if (typeAction === 'name') {
    Axios.patch(`/${currentUser}/folders/${folderID}.json`, {name: value})
  }
  if (typeAction === 'folderColor') {
    Axios.patch(`/${currentUser}/folders/${folderID}.json`, {folderColor: value})
  }
  if (typeAction === 'typeData') {
    Axios.patch(`/${currentUser}/folders/${folderID}.json`, {typeData: value})
  }  
  if (typeAction === 'folderLength') {
    Axios.patch(`/${currentUser}/folders/${folderID}.json`, {folderLength: value})
  }  
}

 
function* workerFetchFolders(action: any) {
  try {
    const response = yield call(handleFetch, action.payload)

    if (response.error) {
      yield put(fetchFoldersFailure(response.error))
    } else {
      yield put(putFolders(Object.values(response.data)))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchFoldersFailure(err.stack))
    } else {
      yield put(fetchFoldersFailure('An unknown error occured.'))
    }
  }
}

function* workerCreateFolder(action: any) {
  let state = yield select(getState)
  const newFolder = yield call(handleCreate, action.payload.currentUser, action.payload.name)
  const folders = [
    ...state.folders.folders,
    newFolder
  ]
  yield put(putFolders(folders))
}

function* workerDeleteFolder(action: any) {
  let state = yield select(getState)
  yield call(handleDelete, action.payload.currentUser, action.payload.folderID)
  const idx = state.folders.folders.findIndex((el: IFolder) => el.folderID === action.payload.folderID)
  const folders = [
    ...state.folders.folders.slice(0, idx),
    ...state.folders.folders.slice(idx + 1)
  ]
  yield put(putFolders(folders))
}

function* workerChangeFolder(action: any) {
  let state = yield select(getState)
  const idx = state.folders.folders.findIndex((el: IFolder) => el.folderID === action.payload.folderID)
  const oldFolder: IFolder = state.folders.folders[idx]
  const newFolder: IFolder = {...oldFolder,
    [action.payload.typeAction]: action.payload.value
  }  
  const folders = [
    ...state.folders.folders.slice(0, idx),
    newFolder,
    ...state.folders.folders.slice(idx + 1)  
  ]  
  yield call(handleChange, action.payload.currentUser, action.payload.value, action.payload.folderID, action.payload.typeAction)
  yield put(putFolders(folders))
}


function* watchFetchFolders() {
  yield takeEvery(ActionType.FETCH_FOLDERS_STARTED, workerFetchFolders)
}

function* watchCreateFolder() {
  yield takeEvery(ActionType.CREATE_NEW_FOLDER, workerCreateFolder)
}

function* watchDeleteFolder() {
  yield takeEvery(ActionType.DELETE_FOLDER, workerDeleteFolder)
}

function* watchChangeFolder() {
  yield takeEvery(ActionType.CHANGE_FOLDER, workerChangeFolder)
}


function* foldersSaga() {
  yield all([fork(watchFetchFolders), fork(watchCreateFolder), fork(watchDeleteFolder), fork(watchChangeFolder)])
}

export default foldersSaga 