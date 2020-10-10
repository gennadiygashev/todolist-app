export interface IFoldersState {
  readonly folders: IFolder[],
  readonly loading: boolean,
  readonly error: any
}

export interface IFolder {
  name: string,
  key: string,
  folderID: string,
  folderColor: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error',
  typeData: 'notChosen' | 'list' | 'board',
  folderLength: number
}

export enum ActionType {
  FETCH_FOLDERS_STARTED = 'FETCH_FOLDERS_STARTED',
  PUT_FOLDERS = 'PUT_FOLDERS',
  FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE',

  CREATE_NEW_FOLDER = 'CREATE_NEW_FOLDER',
  DELETE_FOLDER = 'DELETE_FOLDER',
  CHANGE_FOLDER = 'CHANGE_FOLDER',
}
