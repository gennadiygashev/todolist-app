import React, { useState } from 'react'

import { IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function ChangeCard({ title, changeCardTitle, currentFolder, cardID }) {
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
        <DialogTitle id="form-dialog-title">Редактирование карточки</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Заголовок"
            fullWidth
            defaultValue={title}
            onChange={(event) => changeCardTitle(currentFolder, cardID, event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} variant="contained" color="primary">
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
