import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addTask } from '../../../store/data/actions'

import { TextField, Grid, IconButton } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

interface IAddTaskProps {
  currentUser: string
  currentFolder: string, 
  elementID: string,
}

interface IAddTaskDispatch {
  addTask: typeof addTask
}

type IAddTask = IAddTaskProps & IAddTaskDispatch

const AddTask: React.FC<IAddTask> = ({ currentUser, currentFolder, elementID, addTask }) => {
  const [title, setTitle] = useState('')
  const classes = useStyles()

  const onLabelChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addTask(currentUser, currentFolder, elementID, title)
    setTitle('')
  }

  return(
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <form onSubmit={onSubmit}>
            <TextField 
              id={`addTask${elementID}`} 
              label='Добавить задачу'
              type="text" 
              onChange={onLabelChange}
              value={title}
              onSubmit={onSubmit}
              size='small'
            />
            <IconButton aria-label="delete" className={classes.margin} disabled={title.length === 0} onClick={onSubmit}>
              <ArrowForwardIcon fontSize="inherit" color={(title.length !== 0) ? 'primary' : 'disabled'} /> 
            </IconButton>
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

