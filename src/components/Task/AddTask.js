import React, { useState } from 'react'

import { TextField, Grid } from '@material-ui/core/';

export default function AddTask({ addNewTask, currentFolder, cardID }) {
  const [title, setTitle] = useState('')

  const onLabelChange = (e) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e) => {
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

