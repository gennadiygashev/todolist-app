import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_TASK } from '../actionTypes'

const createTask = (title: any) => {
  return {
    title,
    important: false,
    done: false,
    key: '',
    taskID: ''
  }
}

export function addNewTask(currentFolder: any, cardID: any, title: any) {
  return async (dispatch: (arg0: { type: string; newTask: any; cardID: any; taskID: any }) => void) => {
    const newTask = createTask(title);
    try {
      await Axios.post(`/cards/${currentFolder}/${cardID}/tasks.json`, newTask)
      .then(function (res) {
        const taskID: any = ((Object.values(res.data))[0])
        newTask.key = taskID
        newTask.taskID = taskID
        Axios.patch(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'key': taskID, 'taskID': taskID})
      })
      dispatch(createNewTask(newTask, cardID, newTask.taskID))  
    } catch (e) {
      console.error(e)
    }
  }
}

export function createNewTask(newTask: any, cardID: any, taskID: any) {
  return {
    type: CREATE_NEW_TASK,
    newTask,
    cardID,
    taskID
  }
}
