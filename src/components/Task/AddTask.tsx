import React, { useState } from 'react'

import { TextField, Grid } from '@material-ui/core/';

interface IAddTask {
  currentFolder: string, 
  cardID: string,
  addNewTask: (currentFolder: string, cardID: string, title: string) => void
}

const AddTask: React.FC<IAddTask> = ({ addNewTask, currentFolder, cardID }) => {
  const [title, setTitle] = useState('')

  const onLabelChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    addNewTask(currentFolder, cardID, title);
    setTitle('')
  };

  return(
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <form onSubmit={onSubmit}>
            <TextField 
              id={`addTask${cardID}`} 
              label='Добавить задачу'
              type="text" 
              onChange={onLabelChange}
              value={title}
              onSubmit={onSubmit}
              size='small'
            />
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddTask

