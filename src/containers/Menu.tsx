import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AddFolder from '../components/Folder/AddFolder'
import Folder from '../components/Folder/Folder'
import EmptyFolderList from '../components/Folder/EmptyFolderList'

import { fetchMenuList, addNewFolder, deleteFolder, changeFolder } from '../store/actions'

import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core/'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

interface IMenuList {
  folders: any, 
  fetchMenuList: () => void, 
  addNewFolder: (title: any) => void, 
  deleteFolder: (folderID: any) => void, 
  changeFolder: (value: any, folderID: any, typeAction: any) => void
}

const MenuList: React.FC<IMenuList> = ({ folders, fetchMenuList, addNewFolder, deleteFolder, changeFolder }) => {
  const FoldersList = () => {
    if (folders === undefined || folders.length === 0) {
      return (
        <EmptyFolderList/>
      )
    }
    return (
      <>
        {
          folders.map((folder: any) => (
            <Folder 
              name={folder.name}
              folderID={folder.folderID}
              folderColor={folder.folderColor}
              key={folder.key}
              deleteFolder={deleteFolder}
              changeFolder={changeFolder}
            />
          ))          
        }
      </>
    )
  }
  
  useEffect(() => {
    fetchMenuList()
  }, [])

  return(
    <>
      <FoldersList />
      <Divider />
      <ListItem>
        <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
        <ListItemText primary={
          <AddFolder 
            createNewFolder={addNewFolder}
          />       
        }/>
      </ListItem>
    </>
  )     
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchMenuList: () => dispatch(fetchMenuList()),
  addNewFolder: (title: any) => dispatch(addNewFolder(title)),
  deleteFolder: (folderID: any) => dispatch(deleteFolder(folderID)),
  changeFolder: (value: any, folderID: any, typeAction: any) => dispatch(changeFolder(value, folderID, typeAction))
})

const mapStateToProps = (state: any) => ({
  folders: state.menu.folders,
  loading: state.menu.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)


