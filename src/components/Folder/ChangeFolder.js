import React, { useState } from 'react'

import { IconButton, TextField, Dialog, DialogContent, DialogTitle, Button, Radio } from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function ChangeFolder({ folderID, changeFolder, folderColor, name, deleteFolder }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            onChange={(event) => changeFolder(event.target.value, folderID, 'name')}
          />
          <div>
            <Radio
              checked={folderColor === 'action'}
              onChange={() => changeFolder('action', folderID, 'folderColor')}
              value="action"
              color="default"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
              checked={folderColor === 'secondary'}
              onChange={() => changeFolder('secondary', folderID, 'folderColor')}
              value="secondary"
              name="radio-button-demo"
              color="secondary"
              inputProps={{ 'aria-label': 'B' }}
            />
            <Radio
              checked={folderColor === 'primary'}
              onChange={() => changeFolder('primary', folderID, 'folderColor')}
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

