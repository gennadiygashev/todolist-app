import React from 'react'

import { Button, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
  }
})

export default function EmptyCardsList({ addNewCard, currentFolder }) {
  const classes = useStyles();
  return(
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <h1>Poka cartochek net</h1>
        </Grid>
        <Grid item>
          <Button onClick={() => addNewCard(currentFolder)}>Sozdat novuyu</Button>
        </Grid>
      </Grid>
  )
}



