import Axios from '../../../axios/axios-folders'
import { CHANGE_FOLDER } from '../actionTypes'

export function changeFolder(value, folderID, typeAction) {
  console.log(value, folderID, typeAction)
  if (typeAction === 'name') {
    Axios.patch(`/folders/${folderID}.json`, {name: value})
  }
  if (typeAction === 'folderColor') {
    Axios.patch(`/folders/${folderID}.json`, {folderColor: value})
  }
  return {
    type: CHANGE_FOLDER,
    folderID, 
    value, 
    typeAction
  }
}

