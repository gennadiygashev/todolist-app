import React from 'react'

import { Box, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';

interface IAddCard {
  addNewCard: (currentFolder :string) => void,
  currentFolder: string
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    cursor: 'pointer'
  },
  block: {
    height: '100%',
  }
});

const AddCard: React.FC<IAddCard> = ({ addNewCard, currentFolder }) => {
  const classes = useStyles();
  return (
    <Box onClick={() => addNewCard(currentFolder)} className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.block}
      >
        <Grid item>
          <AddBoxIcon  />
        </Grid>
      </Grid>
    </Box> 
  )
}

export default AddCard

