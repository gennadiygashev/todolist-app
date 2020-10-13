import React, { useState } from 'react'

import { addTask } from '../../store/data/actions'
import { addFolder } from '../../store/folders/actions'

import { TextField, Grid, IconButton } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0, 
    paddingRight: 0
  },
}))

interface IAddFormProps {
  path: {
    currentUser: string
    currentFolder?: string
    elementID?: string
  }
  addFunc: typeof addTask | typeof addFolder
}

const AddForm: React.FC<IAddFormProps> = ({ path, addFunc }) => {
  const [title, setTitle] = useState('')
  const classes = useStyles()

  const onLabelChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(e.target.value)
  }

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addFunc(path, title)
    setTitle('')
  }

  return(
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item style={{ width: '100%' }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField 
              id={`addTask${path.elementID}`} 
              label='Добавить задачу'
              type="text" 
              onChange={onLabelChange}
              value={title}
              onSubmit={onSubmit}
              size='small'
              style={{ flex: 1 }} 
            />
            <IconButton aria-label="delete" className={classes.addButton} disabled={title.length === 0} onClick={onSubmit}>
              <ArrowForwardIcon fontSize="inherit" color={(title.length !== 0) ? 'primary' : 'disabled'} /> 
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddForm