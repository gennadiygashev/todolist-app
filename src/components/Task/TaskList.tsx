import React from 'react'

import Task from './Task'

interface ITaskList {
  currentFolder: string, 
  cardID: string,
  tasks: Array<Object>, 
  deleteTask: (currentFolder: any, cardID: any, taskID: any) => void,
  changeCardsTask: (taskData: any, currentFolder: any, cardID: any, taskID: any, typeAction: any) => void,
}

const TaskList: React.FC<ITaskList> = ({ tasks, currentFolder, cardID, changeCardsTask, deleteTask }) => {
  return (
    <>
      {tasks === undefined ?
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