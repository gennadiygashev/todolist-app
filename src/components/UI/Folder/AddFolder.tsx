import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addFolder } from '../../../store/folders/actions'

import { TextField, Grid, IconButton } from '@material-ui/core/'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  addButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0, 
    paddingRight: 0
  },
}))

interface IAddFolderProps {
  currentUser: string
}

interface IAddFolderDispatch {
  addFolder: typeof addFolder
}

type IAddFolder = IAddFolderProps & IAddFolderDispatch

const AddFolder: React.FC<IAddFolder> = ({ currentUser, addFolder }) => {
  const classes = useStyles()
  const [label, setLabel] = useState('')
  const [open, setOpen] = useState<boolean>(false)

  const onLabelChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setOpen(true)
    addFolder(currentUser, label)
    setLabel('')
  }

  const handleClose = () => {
    setOpen(false)
  }

  return(
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item style={{ width: '100%' }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
            <TextField 
              id="addFolder" 
              label='Новая папка' 
              type="text" 
              onChange={onLabelChange}
              value={label}
              onSubmit={onSubmit}  
              size="small"
              style={{ flex: 1 }}  
            />
            <IconButton aria-label="delete" className={classes.addButton} disabled={label.length === 0} onClick={onSubmit}>
              <ArrowForwardIcon fontSize="inherit" color={(label.length !== 0) ? 'primary' : 'disabled'} /> 
            </IconButton>
          </form>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Вы создали новую папку
        </Alert>
      </Snackbar>
    </div>
  ) 
}

const mapDispatchToProps = {
  addFolder: addFolder
}

export default connect(null, mapDispatchToProps)(AddFolder)



