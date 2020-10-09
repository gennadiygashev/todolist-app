import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar/NavBar'
import Main from './Main/Main'

import { fetchFolders } from '../../../store/folders/actions'
import { fetchData } from '../../../store/data/actions'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}))

interface IAppRouterProps {
  currentFolder: string
  currentUser: string
  currentType: string
  fetchFolders: typeof fetchFolders
  fetchData: typeof fetchData
}

interface IAppDispatch {
  fetchFolders: typeof fetchFolders
  fetchData: typeof fetchData
}

type IApp = IAppRouterProps & IAppDispatch

const App: React.FC<IApp> = ({ currentFolder, currentUser, currentType, fetchFolders, fetchData }) => {  
  const classes = useStyles()

  useEffect(() => {
    fetchFolders(currentUser)
    fetchData(currentUser, currentFolder)
  }, [])

  return (
    <div className={classes.root}>
      <NavBar 
        currentUser={currentUser}
      />
      <main className={classes.content} style={{ padding: '0' }} >
        <div className={classes.toolbar} />
        <Box display="flex" flexDirection="row" flexWrap="nowrap" overflow='scroll'>
          <Main 
            currentUser={currentUser}
            currentFolder={currentFolder}
            currentType={currentType}
          />
        </Box>
      </main>
    </div>
  )
}

const mapDispatchToProps = {
  fetchFolders: fetchFolders,
  fetchData: fetchData
}

export default connect(null, mapDispatchToProps)(App)
