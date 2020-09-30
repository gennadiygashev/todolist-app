import Axios from '../../../axios/axios-folders'
import { DELETE_TASK } from '../actionTypes'

export function deleteTask(currentFolder: any, cardID: any, taskID: any) {
  Axios.delete(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`)
  return {
    type: DELETE_TASK,
    taskID,
    cardID
  }
}