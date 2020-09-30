import React from 'react'

import { ITask } from '../../interfaces'

import Task from './Task'

interface ITaskListProps {
  currentFolder: string, 
  cardID: string,
  tasks: ITask[], 
  deleteTask: (currentFolder: string, cardID: string, taskID: string) => void,
  changeCardsTask: (taskData: ITask, currentFolder: string, cardID: string, taskID: string, typeAction: string) => void,
}

const TaskList: React.FC<ITaskListProps> = ({ tasks, currentFolder, cardID, changeCardsTask, deleteTask }) => {
  return (
    <>
      {tasks === undefined || Object.values(tasks).length === 0 ?
      <h1>Poka Zadach net</h1> :
      Object.values(tasks).map((task: any) => {
        return (
          <Task 
            title={task.title}
            key={task.taskID}
            currentFolder={currentFolder}
            cardID={cardID}
            taskID={task.taskID}
            done={task.done}
            important={task.important}
            changeCardsTask={changeCardsTask}
            taskData={task}
            deleteTask={deleteTask}
          />
        )
      })}
    </>
  )
}

export default TaskList