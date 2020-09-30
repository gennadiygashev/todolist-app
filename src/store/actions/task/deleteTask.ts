import Axios from '../../../axios/axios-folders'
import { DELETE_TASK } from '../actionTypes'

export function deleteTask(currentFolder: string, cardID: string, taskID: string) {
  Axios.delete(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`)
  return {
    type: DELETE_TASK,
    taskID,
    cardID
  }
}