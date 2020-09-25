import React from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    cursor: 'pointer'
  },
  block: {
    height: '100%',
  }
});

const AddCard = ({ addNewCard, currentFolder }) => {
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

