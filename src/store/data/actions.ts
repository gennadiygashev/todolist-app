import { action } from 'typesafe-actions'
import { ActionType, ITask } from './types'

export const putData = (elements: any) => action(ActionType.PUT_DATA, elements)

export const fetchDataFailure = (e: any) => action(ActionType.FETCH_DATA_FAILURE, e)
export const fetchData = (currentUser: string, currentFolder: string) => action(ActionType.FETCH_DATA_STARTED, {currentUser, currentFolder})
export const deleteCard = (currentUser: string, currentFolder: any, elementID: any) => action(ActionType.DELETE_CARD, {currentUser, currentFolder, elementID})
export const addCard = (currentUser: string, currentFolder: any) => action(ActionType.CREATE_NEW_CARD, {currentUser, currentFolder})
export const addList = (currentUser: string, currentFolder: any) => action(ActionType.CREATE_NEW_LIST, {currentUser, currentFolder})
export const changeCard = (currentUser: string, currentFolder: string, elementID: string, value: string) => action(ActionType.CHANGE_CARD, {currentUser, currentFolder, elementID, value})
export const addTask = (currentUser: string, currentFolder: string, elementID: string, title: string) => action(ActionType.CREATE_NEW_TASK, {currentUser, currentFolder, elementID, title})
export const deleteTask = (currentUser: string, currentFolder: string, elementID: string, taskID: string) => action(ActionType.DELETE_TASK, {currentUser, currentFolder, elementID, taskID})
export const toggleTaskProperty = (currentUser: string, taskData: ITask, currentFolder: string, elementID: string, taskID: string, typeAction: string) => action(ActionType.TOGGLE_TASK_PROPERTY, {currentUser, taskData, currentFolder, elementID, taskID, typeAction})
 
 
