import { all, call, fork, put, select, takeEvery } from "redux-saga/effects"
import { ActionType, ICard, IList, ITask } from "./types"
import Axios from '../../axios/axios'
import { fetchDataFailure, putData } from "./actions"
import { getState } from "./reducer"

async function handleFetch(currentUser: string, currentFolder: string) {
  return await Axios.get(`/${currentUser}/data/${currentFolder}.json`)
}
 
async function handleDeleteCard(currentUser: string, currentFolder: string, cardID: string) {
  Axios.delete(`/${currentUser}/data/${currentFolder}/${cardID}.json`)
}

async function handleCreateCard(currentUser: string, currentFolder: string) {
  const createCard = (): ICard => {
    return {
      title: 'Новая карточка',
      tasks: [],
      key: '', 
      cardID: ''
    }
  }

  const newCard: ICard = createCard()
  const response = await Axios.post(`/${currentUser}/data/${currentFolder}.json`, newCard)
  const cardKey: any = Object.values(response.data)[0]
  newCard.key = cardKey
  newCard.cardID = cardKey
  Axios.patch(`/${currentUser}/data/${currentFolder}/${cardKey}.json`, {'key': cardKey, 'cardID': cardKey})
  Axios.patch(`/${currentUser}/folders/${currentFolder}.json`, {'typeData': 'board'})

  return newCard
}

async function handleCreateList(currentUser: string, currentFolder: string) {
  const createList = (): IList => {
    return {
      title: 'Новый Список',
      tasks: [],
      key: '', 
      listID: ''
    }
  }

  const newList: IList = createList()
  const response = await Axios.post(`/${currentUser}/data/${currentFolder}.json`, newList)
  const cardKey: any = Object.values(response.data)[0]
  newList.key = cardKey
  newList.listID = cardKey
  Axios.patch(`/${currentUser}/data/${currentFolder}/${cardKey}.json`, {'key': cardKey, 'listID': cardKey})
  Axios.patch(`/${currentUser}/folders/${currentFolder}.json`, {'typeData': 'list'})

  return newList
}

async function handleChangeCard(currentUser: string, currentFolder: string, cardID: string, value: string) {
  Axios.patch(`/${currentUser}/data/${currentFolder}/${cardID}.json`, {'title': value})
}

async function handleCreateTask(currentUser: string, currentFolder: string, cardID: string, title: string) {
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
  const response = await Axios.post(`/${currentUser}/data/${currentFolder}/${cardID}/tasks.json`, newTask)
  const taskID: any = Object.values(response.data)[0]
  newTask.key = taskID
  newTask.taskID = taskID
  Axios.patch(`/${currentUser}/data/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'key': taskID, 'taskID': taskID})
  return newTask
}

function handleDeleteTask(currentUser: string, currentFolder: string, cardID: string, taskID: string) {
  Axios.delete(`/${currentUser}/data/${currentFolder}/${cardID}/tasks/${taskID}.json`)
}

function handleToggleTaskProps(currentUser: string, taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) {
  const newTask: ITask = taskData
  if (typeAction === 'done') {
    newTask['done'] = !newTask['done']
    Axios.patch(`/${currentUser}/data/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'done': newTask['done']})
    return newTask
  }
  if (typeAction === 'important') {
    newTask['important'] = !newTask['important']
    Axios.patch(`/${currentUser}/data/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'important': newTask['important']})
    return newTask
  }
}


function* workerFetchData(action: any) {
  try {
    const response = yield call(handleFetch, action.payload.currentUser, action.payload.currentFolder)

    if (response.error) {
      yield put(fetchDataFailure(response.error))
    } else {
      yield put(putData(Object.values(response.data)))
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
  yield call(handleDeleteCard, action.payload.currentUser, action.payload.currentFolder, action.payload.cardID)
  let state = yield select(getState) 
  const idx = state.data.elements.findIndex((el: any) => el.cardID === action.payload.cardID)
  const cards = [
    ...state.data.elements.slice(0, idx),
    ...state.data.elements.slice(idx + 1)
  ]
  yield put(putData(cards))
}

function* workerCreateCard(action: any) {
  let state = yield select(getState)
  const newCard = yield call(handleCreateCard, action.payload.currentUser, action.payload.currentFolder)
  const cards = [
    ...state.data.elements,
    newCard
  ]
  yield put(putData(cards))
}

function* workerCreateList(action: any) {
  let state = yield select(getState)
  const newList = yield call(handleCreateList, action.payload.currentUser, action.payload.currentFolder)
  const list = [
    ...state.data.elements,
    newList
  ]
  yield put(putData(list))
}

function* workerChangeCard(action: any) {
  let state = yield select(getState)
  yield call(handleChangeCard, action.payload.currentUser, action.payload.currentFolder, action.payload.cardID, action.payload.value)
  const idx = state.data.elements.findIndex((el: any) => el.cardID === action.payload.cardID)
  const oldCard: any = state.data.elements[idx]
  const newCard: ICard = {...oldCard,
    'title': action.payload.value
  }  
  const cards = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]
  yield put(putData(cards))
}

function* workerCreateTask(action: any) {
  let state = yield select(getState)
  const newTaskArr = yield call(handleCreateTask, action.payload.currentUser, action.payload.currentFolder, action.payload.cardID, action.payload.title)
  const idx = state.data.elements.findIndex((el: any) => (el.cardID || el.listID) === action.payload.cardID)
  const newTask: any = {}
  newTask[newTaskArr.taskID] = newTaskArr
  const oldCard: any = state.data.elements[idx]
  let newCard = {}
  if (oldCard.tasks === undefined) {
    newCard = {...oldCard,
      'tasks': newTask
    }   
  } else {
    newCard = {...oldCard,
      'tasks': Object.assign(oldCard.tasks, newTask)
    } 
  }
  const cards = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]  
  yield put(putData(cards))
}
 
function* workerDeleteTask(action: any) {
  yield call(handleDeleteTask, action.payload.currentUser, action.payload.currentFolder, action.payload.cardID, action.payload.taskID)
  let state = yield select(getState)
  const idx = state.data.elements.findIndex((el: any) => (el.cardID || el.listID) === action.payload.cardID)
  const oldCard: any = state.data.elements[idx]
  const taskIndex = Object.values(oldCard.tasks).findIndex((el: any) => el.taskID === action.payload.taskID)
  const newCard: ICard = {...oldCard,
    'tasks': [
      ...Object.values(oldCard.tasks).slice(0, taskIndex),
      ...Object.values(oldCard.tasks).slice(taskIndex + 1)
    ]
  }
  const cards = [
    ...state.data.elements.slice(0, idx),
    newCard,
    ...state.data.elements.slice(idx + 1)  
  ]
  yield put(putData(cards))
}

function* workerToggleTaskProps(action: any) {
  let state = yield select(getState)    
  const newTaskArr = yield call(handleToggleTaskProps, action.payload.currentUser, action.payload.taskData, action.payload.currentFolder, action.payload.cardID, action.payload.taskID, action.payload.typeAction)
  const idx = state.data.elements.findIndex((el: any) => (el.cardID || el.listID) === action.payload.cardID)
  const newTask: any = {}
  newTask[newTaskArr.taskID] = newTaskArr
  const oldCard: any = state.data.elements[idx]
  const newCard: any = {...oldCard,
    'tasks': Object.assign(oldCard.tasks, newTask)
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
