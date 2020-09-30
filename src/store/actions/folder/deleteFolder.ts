import Axios from '../../../axios/axios-folders'
import { DELETE_FOLDER } from '../actionTypes'

export function deleteFolder(folderID: any) {
  Axios.delete(`/folders/${folderID}.json`)
  return {
    type: DELETE_FOLDER,
    folderID
  }
}

