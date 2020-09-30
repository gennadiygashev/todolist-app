import Axios from '../../../axios/axios-folders'
import { IFolder } from '../../../interfaces'
import { CREATE_NEW_FOLDER } from '../actionTypes'

const createFolder = (name: string): IFolder => {
  return {
    name,
    key: '',
    folderID: '',
    folderColor: 'action',
  }
}

export function addNewFolder(name: string) {
  return async (dispatch: any) => {
    const newFolder: IFolder = createFolder(name)
    try {
      await Axios.post(`/folders.json`, newFolder)
      .then(function (res) {
        const folderKey: any = Object.values(res.data)[0]
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

export function createNewFolder(folder: IFolder) {
  return {
    type: CREATE_NEW_FOLDER,
    folder
  }
}

