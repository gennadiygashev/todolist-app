import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar/NavBar'
import Main from './Main/Main'

import { fetchFolders } from '../../../store/folders/actions'
import { fetchData } from '../../../store/data/actions'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { IFolder } from '../../../store/folders/types'

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

interface IAppState {
  folders: IFolder[]
}

interface IAppDispatch {
  fetchFolders: typeof fetchFolders
  fetchData: typeof fetchData
}

type IApp = IAppRouterProps & IAppState & IAppDispatch

const App: React.FC<IApp> = ({ currentFolder, currentUser, currentType, folders, fetchFolders, fetchData }) => {  
  const classes = useStyles()

  const findCurrentFolderName = (currentFolder: string): string => {
    const idx = folders.findIndex((el) => el.folderID === currentFolder)
    return folders[idx].name
  }

  const currentFolderName = findCurrentFolderName(currentFolder)

  useEffect(() => {
    fetchFolders(currentUser)
    fetchData(currentUser, currentFolder)
  }, [currentFolder])

  return (
    <div className={classes.root}>
      <NavBar 
        currentUser={currentUser}
        currentFolderName={currentFolderName}
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

const mapStateToProps = ({ folders }: any) => ({
  folders: folders.folders,
})

const mapDispatchToProps = {
  fetchFolders: fetchFolders,
  fetchData: fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
