import React, { useState } from 'react'
import { connect } from 'react-redux'

import { IFolder } from '../../../store/folders/types'
import { changeFolder, deleteFolder } from '../../../store/folders/actions'

import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, Radio } from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Изменить заголовок"
            fullWidth
            defaultValue={folderData.name}
            onChange={changeTitleHandler}
          />
          <div>
            <Radio
              checked={newColor === 'action'}
              onChange={changeColorHandler}
              value="action"
              color="default"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
              checked={newColor === 'secondary'}
              onChange={changeColorHandler}
              value="secondary"
              name="radio-button-demo"
              color="secondary"
              inputProps={{ 'aria-label': 'B' }}
            />
            <Radio
              checked={newColor === 'primary'}
              onChange={changeColorHandler}
              value="primary"
              color="primary"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'C' }}
            />
          </div>
          <Button onClick={() => deleteFolder(currentUser, folderData.folderID)} variant="contained" color='secondary' >
            Удалить папку
          </Button>
          <Button onClick={() => handleClose()} variant="contained" color='primary' >
            Готово
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
