import Axios from '../../../axios/axios-folders'
import { ITask } from './../../../interfaces'
import { CREATE_NEW_TASK } from '../actionTypes'

const createTask = (title: string): ITask => {
  return {
    title,
    important: false,
    done: false,
    key: '',
    taskID: ''
  }
}

export function addNewTask(currentFolder: string, cardID: string, title: string) {
  return async (dispatch: any) => {
    const newTask: ITask = createTask(title)
    try {
      await Axios.post(`/cards/${currentFolder}/${cardID}/tasks.json`, newTask)
      .then(function (res) {
        const taskID: any = Object.values(res.data)[0]
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

export function createNewTask(newTask: ITask, cardID: string, taskID: string) {
  return {
    type: CREATE_NEW_TASK,
    newTask,
    cardID,
    taskID
  }
}
