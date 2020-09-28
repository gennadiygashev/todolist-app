import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_TASK } from '../actionTypes'

const createTask = (title) => {
  return {
    title,
    important: false,
    done: false,
  }
}

export function addNewTask(currentFolder, cardID, title) {
  return async dispatch => {
    const newTask = createTask(title);
    try {
      await Axios.post(`/cards/${currentFolder}/${cardID}/tasks.json`, newTask)
      .then(function (res) {
        const taskID = ((Object.values(res.data))[0])
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

export function createNewTask(newTask, cardID, taskID) {
  return {
    type: CREATE_NEW_TASK,
    newTask,
    cardID,
    taskID
  }
}
