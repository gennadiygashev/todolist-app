import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';


export default function DeleteCard({ deleteCard, cardID }) {
  return (
    <IconButton onClick={() => deleteCard(cardID)}>
      <ClearIcon />
    </IconButton>
  )
}

 