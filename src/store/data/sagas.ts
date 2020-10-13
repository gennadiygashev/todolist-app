import { IFolder } from './../folders/types';
import { all, call, fork, put, select, takeEvery } from "redux-saga/effects"
import { ActionType, IElement, ITask } from "./types"
import Axios from '../../axios/axios'
import { fetchDataFailure, putData } from "./actions"
import { getState } from "./reducer" 
import { putFolders } from "../folders/actions"
import { handleChange } from '../folders/sagas';

async function handleFetch(currentUser: string, currentFolder: string) {
  return await Axios.get(`/${currentUser}/data/${currentFolder}.json`)
}
 
async function handleDeleteCard(currentUser: string, currentFolder: string, elementID: string) {
  Axios.delete(`/${currentUser}/data/${currentFolder}/${elementID}.json`)
}

async function handleCreateCard(currentUser: string, currentFolder: string) {
  const createCard = (): IElement => {
    return {
      title: 'Новая карточка',
      tasks: [],
      key: '', 
      elementID: ''
    }
  }

  const newCard: IElement = createCard()
  
  const response = await Axios.post(`/${currentUser}/data/${currentFolder}.json`, newCard)
  
  const elementKey: any = Object.values(response.data)[0]
  newCard.key = elementKey
  newCard.elementID = elementKey
  
  Axios.patch(`/${currentUser}/data/${currentFolder}/${elementKey}.json`, {'key': elementKey, 'elementID': elementKey})
  Axios.patch(`/${currentUser}/folders/${currentFolder}.json`, {'typeData': 'board'})

  return newCard
}

async function handleCreateList(currentUser: string, currentFolder: string) {
  const createList = (): IElement => {
    return {
      title: 'Новый Список',
      tasks: [],
      key: '', 
      elementID: '' 
    }
  }

  const newList: IElement = createList()
  
  const response = await Axios.post(`/${currentUser}/data/${currentFolder}.json`, newList)
  
  const elementKey: any = Object.values(response.data)[0]
  newList.key = elementKey
  newList.elementID = elementKey
  
  Axios.patch(`/${currentUser}/data/${currentFolder}/${elementKey}.json`, {'key': elementKey, 'elementID': elementKey})
  Axios.patch(`/${currentUser}/folders/${currentFolder}.json`, {'typeData': 'list'})

  return newList
}

async function handleChangeCard(currentUser: string, currentFolder: string, elementID: string, value: string) {
  Axios.patch(`/${currentUser}/data/${currentFolder}/${elementID}.json`, {'title': value})
}

async function handleCreateTask(path: any, title: string) {
  const createTask = (title: string): ITask => {
    return {
      title,
      important: false,
      done: false,
      key: '',
      taskID: '' 
    }
  }

  const newTask: ITask = createTask(title)
  
  const response = await Axios.post(`/${path.currentUser}/data/${path.currentFolder}/${path.elementID}/tasks.json`, newTask)
  
  const taskID: any = Object.values(response.data)[0]
  newTask.key = taskID
  newTask.taskID = taskID

  Axios.patch(`/${path.currentUser}/data/${path.currentFolder}/${path.elementID}/tasks/${taskID}.json`, {'key': taskID, 'taskID': taskID})
  
  return newTask
}

function handleDeleteTask(currentUser: string, currentFolder: string, elementID: string, taskID: string) {
  Axios.delete(`/${currentUser}/data/${currentFolder}/${elementID}/tasks/${taskID}.json`)
}

function handleToggleTaskProps(currentUser: string, taskData: ITask, currentFolder: string, elementID: string, taskID: string, typeAction: string) {
  const newTask: ITask = taskData
  
  if (typeAction === 'done') {
    newTask['done'] = !newTask['done']
    Axios.patch(`/${currentUser}/data/${currentFolder}/${elementID}/tasks/${taskID}.json`, {'done': newTask['done']})
    return newTask
  }
  
  if (typeAction === 'important') {
    newTask['important'] = !newTask['important']
    Axios.patch(`/${currentUser}/data/${currentFolder}/${elementID}/tasks/${taskID}.json`, {'important': newTask['important']})
    return newTask
  }
}


function* workerFetchData(action: any) {
  try {
    const changeData = (title: string, tasks = [], key: string, elementID: string) => {
      tasks = Object.values(tasks)
      return {
        title,
        tasks,
        key, 
        elementID
      }
    }  

    const response = yield call(handleFetch, action.payload.currentUser, action.payload.currentFolder)
    
    let data: any[] = []

    Object.values(response.data).map((element: any) => {
      return (data.push(changeData(
        element.title, 
        element.tasks, 
        element.key, 
        element.elementID) 
      ))
    })

    if (response.error) {
      yield put(fetchDataFailure(response.error))
    } else {
      yield put(putData(data))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchDataFailure(err.stack))
    } else {
      yield put(fetchDataFailure('An unknown error occured.'))
    }
  }
}

function* workerDeleteCard(action: any) {
  let state = yield select(getState) 

  yield call(handleDeleteCard, action.payload.currentUser, action.payload.currentFolder, action.payload.elementID)

  const idx = state.data.elements.findIndex((el: IElement) => el.elementID === action.payload.elementID)
  
  const cards = [
    ...state.data.elements.slice(0, idx),
    ...state.data.elements.slice(idx + 1)
  ]

  yield put(putData(cards))
}

function* workerCreateCard(action: any) {
  let state = yield select(getState)

  const newCard = yield call(handleCreateCard, action.payload.currentUser, action.payload.currentFolder)

  const cards: IElement[] = [
    ...state.data.elements,
    newCard
  ]

  yield put(putData(cards))
}

function* workerCreateList(action: any) {
  let state = yield select(getState)

  const newList = yield call(handleCreateList, action.payload.currentUser, action.payload.currentFolder)

  const list: IElement[] = [
    ...state.data.elements,
    newList
  ]

  yield put(putData(list))
}

function* workerChangeCard(action: any) {
  let state = yield select(getState)

  yield call(handleChangeCard, action.payload.currentUser, action.payload.currentFolder, action.payload.elementID, action.payload.value)
  const idx = state.data.elements.findIndex((el: IElement) => el.elementID === action.payload.elementID)
  const oldCard: any = state.data.elements[idx]

  const newCard: IElement = {...oldCard,
    'title': action.payload.value
  }  

  const cards: IElement[] = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]

  yield put(putData(cards))
}

function* workerCreateTask(action: any) {
  const path = action.payload.path

  let state = yield select(getState)

  const newTask: ITask = yield call(handleCreateTask, path, action.payload.title)
  const idx = state.data.elements.findIndex((el: IElement) => el.elementID === path.elementID)
  const oldCard: IElement = state.data.elements[idx]
  
  const newCard: IElement = {...oldCard, 
    'tasks': [...oldCard.tasks, newTask]
  } 

  const cards: IElement[] = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]  

  yield put(putData(cards))

  const folderIdx = state.folders.folders.findIndex((el: IFolder) => el.folderID === path.currentFolder)
  const oldFolder: IFolder = state.folders.folders[folderIdx]
  const newLength: number = oldFolder.folderLength + 1
  
  const newFolder: IFolder = {...oldFolder,
    'folderLength': newLength
  }
  
  const folders: IFolder[] = [
    ...state.folders.folders.slice(0, folderIdx),
    newFolder,
    ...state.folders.folders.slice(folderIdx + 1)  
  ]

  yield put(putFolders(folders)) 

  yield call(handleChange, path.currentUser, newLength, path.currentFolder, 'folderLength')
}
 
function* workerDeleteTask(action: any) {
  let state = yield select(getState)

  yield call(handleDeleteTask, action.payload.currentUser, action.payload.currentFolder, action.payload.elementID, action.payload.taskID)
  const idx = state.data.elements.findIndex((el: IElement) => el.elementID === action.payload.elementID)
  const oldCard: IElement = state.data.elements[idx]
  const taskIndex = oldCard.tasks.findIndex((el: ITask) => el.taskID === action.payload.taskID)
  
  const newCard: IElement = {...oldCard,
    'tasks': [
      ...oldCard.tasks.slice(0, taskIndex),
      ...oldCard.tasks.slice(taskIndex + 1)
    ]
  }

  const cards: IElement[] = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]

  yield put(putData(cards))

  const folderIdx: number = state.folders.folders.findIndex((el: IFolder) => el.folderID === action.payload.currentFolder)
  const oldFolder: IFolder = state.folders.folders[folderIdx]
  const newLength: number = oldFolder.folderLength - 1
  
  const newFolder: IFolder = {...oldFolder,
    'folderLength': newLength
  }
  
  const folders: IFolder[] = [
    ...state.folders.folders.slice(0, folderIdx),
    newFolder,
    ...state.folders.folders.slice(folderIdx + 1)  
  ]

  yield put(putFolders(folders)) 

  yield call(handleChange, action.payload.currentUser, newLength, action.payload.currentFolder, 'folderLength')
}

function* workerToggleTaskProps(action: any) {
  let state = yield select(getState) 

  const newTask = yield call(handleToggleTaskProps, action.payload.currentUser, action.payload.taskData, action.payload.currentFolder, action.payload.elementID, action.payload.taskID, action.payload.typeAction)
  const idx = state.data.elements.findIndex((el: IElement) => el.elementID === action.payload.elementID)
  const oldCard: IElement = state.data.elements[idx]
  const taskIndex = oldCard.tasks.findIndex((el: ITask) => el.taskID === action.payload.taskID)

  const newCard: IElement = {...oldCard,
    'tasks': [
      ...oldCard.tasks.slice(0, taskIndex),
      newTask,
      ...oldCard.tasks.slice(taskIndex + 1)
    ]
  }

  const cards = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]  

  yield put(putData(cards))
}


function* watchFetchData() {
  yield takeEvery(ActionType.FETCH_DATA_STARTED, workerFetchData)
}

function* watchDeleteCard() {
  yield takeEvery(ActionType.DELETE_CARD, workerDeleteCard)
}

function* watchCreateCard() {
  yield takeEvery(ActionType.CREATE_NEW_CARD, workerCreateCard)
}

function* watchCreateList() {
  yield takeEvery(ActionType.CREATE_NEW_LIST, workerCreateList)
}

function* watchChangeCard() {
  yield takeEvery(ActionType.CHANGE_CARD, workerChangeCard)
}

function* watchCreateTask() {
  yield takeEvery(ActionType.CREATE_NEW_TASK, workerCreateTask)
}

function* watchDeleteTask() {
  yield takeEvery(ActionType.DELETE_TASK, workerDeleteTask)
}

function* watchToggleTaskProps() {
  yield takeEvery(ActionType.TOGGLE_TASK_PROPERTY, workerToggleTaskProps)
}


function* dataSaga() {
  yield all([
    fork(watchFetchData), 
    fork(watchDeleteCard), 
    fork(watchCreateCard), 
    fork(watchCreateList), 
    fork(watchChangeCard), 
    fork(watchCreateTask), 
    fork(watchDeleteTask), 
    fork(watchToggleTaskProps)
  ])
}

export default dataSaga 
