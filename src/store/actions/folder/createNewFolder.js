import Axios from '../../../axios/axios-folders'
import { CREATE_NEW_FOLDER } from '../actionTypes'

const createFolder = (name) => {
  return {
    name,
    key: '',
    folderID: '',
    folderColor: 'action',
  }
}

export function addNewFolder(name) {
  return async dispatch => {
    const newFolder = createFolder(name);
    try {
      await Axios.post(`/folders.json`, newFolder)
      .then(function (res) {
        const folderKey = ((Object.values(res.data))[0])
        newFolder.folderID = folderKey
        newFolder.key = folderKey
        Axios.patch(`/folders/${folderKey}.json`, {'key': folderKey, 'folderID': folderKey})
      })  
      dispatch(createNewFolder(newFolder))  
    } catch (e) {
      console.error(e)
    }
  }
}

export function createNewFolder(folder) {
  return {
    type: CREATE_NEW_FOLDER,
    folder
  }
}

