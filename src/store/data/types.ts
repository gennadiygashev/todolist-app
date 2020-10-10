export interface IDataState {
  readonly elements: IElement[],
  readonly loading: boolean,
  readonly error: any
}

export interface IElement {
  title: string,
  tasks: ITask[],
  key: string, 
  elementID: string
}

export interface ITask {
  title: string,
  important: boolean,
  done: boolean,
  key: string,
  taskID: string,
  subTask?: ITask[]
}

export enum ActionType {
  FETCH_DATA_STARTED = 'FETCH_DATA_STARTED',
  PUT_DATA = 'PUT_DATA',
  FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE',

  CREATE_NEW_CARD = 'CREATE_NEW_CARD',
  CREATE_NEW_LIST = 'CREATE_NEW_LIST',
  DELETE_CARD = 'DELETE_CARD',
  CHANGE_CARD = 'CHANGE_CARD',

  CREATE_NEW_TASK = 'CREATE_NEW_TASK',
  TOGGLE_TASK_PROPERTY = 'TOGGLE_TASK_PROPERTY',
  DELETE_TASK = 'DELETE_TASK',
}
