import React from 'react'

import Task from '../Task/Task'
import AddTask from '../Task/AddTask'
import DeleteCard from './DeleteCard';
import ChangeCard from './ChangeCard'

import { CardHeader, CardContent, Box } from '@material-ui/core/';


export default function CardSection({ cardID, currentFolder, title, onDeleteCard, changeCardTitle, tasks, addNewTask, changeCardsTask, deleteTask }) {
  const TaskList = () => {
    if (tasks === false || tasks === undefined || tasks.length === 0) {
      return <h1>Poka Zadach net</h1>
    }
    return (
      Object.values(tasks).map((task) => {
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
      })
    )
  }
  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={title}
        action={
          <>
            <ChangeCard 
              changeCardTitle={changeCardTitle}
              cardID={cardID}
              title={title}
              currentFolder={currentFolder}
            />
            <DeleteCard 
              deleteCard={onDeleteCard}
              currentFolder={currentFolder}
              cardID={cardID}
            />
          </>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent>
        <TaskList />
        <AddTask 
          addNewTask={addNewTask}
          currentFolder={currentFolder}
          cardID={cardID}
        />
      </CardContent>
    </Box> 
  )
}



