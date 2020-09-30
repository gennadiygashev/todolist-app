import React from 'react'

import { CircularProgress, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
  }
})

export default function LoadCards() {
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
          <CircularProgress />
        </Grid>
      </Grid>
  )
}
