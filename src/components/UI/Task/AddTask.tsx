import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addTask } from '../../../store/data/actions'

import { TextField, Grid } from '@material-ui/core/'

interface IAddTaskProps {
  currentUser: string
  currentFolder: string, 
  cardID: string,
}

interface IAddTaskDispatch {
  addTask: typeof addTask
}

type IAddTask = IAddTaskProps & IAddTaskDispatch

const AddTask: React.FC<IAddTask> = ({ currentUser, currentFolder, cardID, addTask }) => {
  const [title, setTitle] = useState('')

  const onLabelChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addTask(currentUser, currentFolder, cardID, title)
    setTitle('')
  }

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

const mapDispatchToProps = {
  addTask: addTask
}

export default connect(null, mapDispatchToProps)(AddTask)

