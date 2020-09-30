import React, { useState } from 'react'

import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, Radio } from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'

interface IChangeFolderProps {
  folderID: string, 
  folderColor: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error', 
  name: string, 
  deleteFolder: (folderID: string) => void,
  changeFolder: (value: string, folderID: string, typeAction: string) => void,
}

const ChangeFolder: React.FC<IChangeFolderProps> = ({ folderID, folderColor, name, deleteFolder, changeFolder }) => {
  const [open, setOpen] = useState(false)
  const [newTitle, setTitle] = useState<string>(name)
  const [newColor, setColor] = useState<string>(folderColor)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    changeFolder(newTitle, folderID, 'name')
    changeFolder(newColor, folderID, 'folderColor')
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
            defaultValue={name}
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
          <Button onClick={() => deleteFolder(folderID)} variant="contained" color='secondary' >
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

export default ChangeFolder

