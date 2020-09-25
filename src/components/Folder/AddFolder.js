import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function AddFolder({ createNewFolder }) {
  
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createNewFolder(label);
    setLabel('')
  };

  return(
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <form onSubmit={onSubmit}>
            <TextField 
              id="standard-basic" 
              label='Новая папка' 
              type="text" 
              onChange={onLabelChange}
              value={label}
              onSubmit={onSubmit}
            />
          </form>
        </Grid>
      </Grid>
    </div>
  ) 
}