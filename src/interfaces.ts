export interface IMenuInitialState {
  folders: IFolder[],
  loading: boolean,
  error: any
}

export interface IMainInitialState {
  cards: ICard[],
  loading: boolean,
  error: any
}

export interface IFolder {
  name: string,
  key: string,
  folderID: string,
  folderColor: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'
}

export interface ICard {
  title: string,
  tasks: ITask[],
  key: string, 
  cardID: string
}

export interface ITask {
  title: string,
  important: boolean,
  done: boolean,
  key: string,
  taskID: string
}