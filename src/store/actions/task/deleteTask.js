import Axios from '../../../axios/axios-folders'
import { DELETE_TASK } from '../actionTypes'

export function deleteTask(currentFolder, cardID, taskID) {
  console.log(currentFolder, cardID, taskID)
  Axios.delete(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`)
  return {
    type: DELETE_TASK,
    taskID,
    cardID
  }
}