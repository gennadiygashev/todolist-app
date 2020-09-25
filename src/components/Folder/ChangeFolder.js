import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

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
              checked={folderColor === 'default'}
              onChange={() => changeFolder('default', folderID, 'folderColor')}
              value="default"
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
        </DialogContent>
      </Dialog>
    </>
  )
}

