import React, { useState } from 'react'
import { connect } from 'react-redux'

import { IFolder } from '../../../store/folders/types'
import { changeFolder, deleteFolder } from '../../../store/folders/actions'

import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup, Divider } from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 10,
    marginBottom: 10 
  },
  button: {
    width: '100%'
  }
}))

interface IChangeFolderProps {
  currentUser: string
  folderData: IFolder
}

interface IChangeFolderDispatch {
  deleteFolder: typeof deleteFolder,
  changeFolder: typeof changeFolder
}

type IChangeFolder = IChangeFolderProps & IChangeFolderDispatch 

const ChangeFolder: React.FC<IChangeFolder> = ({ currentUser, folderData, deleteFolder, changeFolder }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const [newTitle, setTitle] = useState<string>(folderData.name)
  const [newColor, setColor] = useState<string>(folderData.folderColor)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    changeFolder(currentUser, newTitle, folderData.folderID, 'name')
    changeFolder(currentUser, newColor, folderData.folderID, 'folderColor')
    setOpen(false)
  }

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">  
        <DialogTitle id="form-dialog-title">Редактирование папки</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Заголовок"
            fullWidth
            defaultValue={folderData.name}
            onChange={changeTitleHandler}
            variant='outlined' 
          />
          <Divider className={classes.divider} />
          <FormControl component="fieldset"> 
            <FormLabel component="legend">Цвет папки</FormLabel>
            <RadioGroup onChange={changeColorHandler}>
              <FormControlLabel value="action" control={
                <Radio
                  checked={newColor === 'action'}
                  onChange={changeColorHandler}
                  value="action"
                  color="default"
                />                
              } label="Обычная" />
              <FormControlLabel value="secondary" control={
                <Radio
                checked={newColor === 'secondary'}
                onChange={changeColorHandler}
                value="secondary"
                color="secondary"
                />
              } label="Важная" />
              <FormControlLabel value="primary" control={
                <Radio
                  checked={newColor === 'primary'}
                  onChange={changeColorHandler}
                  value="primary"
                  color="primary"
                />                
              } label="Специальная" />
            </RadioGroup>
          </FormControl>
          <Divider className={classes.divider}/>
          <Button onClick={() => deleteFolder(currentUser, folderData.folderID)} variant="outlined" color='secondary' className={classes.button}>
            <DeleteForeverIcon /> Удалить папку
          </Button>
          <Divider className={classes.divider}/>
          <Button onClick={() => handleClose()} variant="contained" color='primary' className={classes.button}>
            <DoneIcon /> Готово
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = {
  deleteFolder: deleteFolder,
  changeFolder: changeFolder
}

export default connect(null, mapDispatchToProps)(ChangeFolder)
