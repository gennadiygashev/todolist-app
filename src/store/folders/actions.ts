import { action } from 'typesafe-actions'
import { ActionType, IFolder } from './types'

export const putFolders = (folders: IFolder[]) => action(ActionType.PUT_FOLDERS, folders)

export const fetchFolders = (currentUser: string) => action(ActionType.FETCH_FOLDERS_STARTED, currentUser)
export const fetchFoldersFailure = (e: any) => action(ActionType.FETCH_FOLDERS_FAILURE, e)
export const addFolder = (currentUser: string, name: string) => action(ActionType.CREATE_NEW_FOLDER, {currentUser, name})
export const deleteFolder = (currentUser: string, folderID: string) => action(ActionType.DELETE_FOLDER, {currentUser, folderID})
export const changeFolder = (currentUser: string, value: string, folderID: string, typeAction: string) => action(ActionType.CHANGE_FOLDER, {currentUser, value, folderID, typeAction})