import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



export default function ChangeCard(props) {
  const [open, setOpen] = React.useState(false);

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
            defaultValue={props.title}
            onChange={(event) => props.changeTitle(event.target.value, props.cardID)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
