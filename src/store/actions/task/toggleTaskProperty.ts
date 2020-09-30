import Axios from '../../../axios/axios-folders'
import { TOGGLE_TASK_PROPERTY } from '../actionTypes'

export function changeCardsTask(taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) {
  const newTask = taskData;
  if (typeAction === 'done') {
    newTask['done'] = !newTask['done']
    Axios.patch(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'done': newTask['done']})
  }
  if (typeAction === 'important') {
    newTask['important'] = !newTask['important']
    Axios.patch(`/cards/${currentFolder}/${cardID}/tasks/${taskID}.json`, {'important': newTask['important']})
  }
  return {
    type: TOGGLE_TASK_PROPERTY,
    newTask,
    cardID,
    taskID
  }
}


