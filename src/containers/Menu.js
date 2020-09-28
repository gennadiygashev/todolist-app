import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AddFolder from '../components/Folder/AddFolder'
import Folder from '../components/Folder/Folder'

import { fetchMenuList, addNewFolder, deleteFolder, changeFolder } from '../store/actions'

import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core/'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

function MenuList({ folders, fetchMenuList, addNewFolder, deleteFolder, changeFolder }) {
  
  useEffect(() => {
    fetchMenuList()
  }, [])

  return(
    <>
      {folders.map((folder) => (
        <Folder 
          name={folder.name}
          folderID={folder.folderID}
          folderColor={folder.folderColor}
          key={folder.key}
          deleteFolder={deleteFolder}
          changeFolder={changeFolder}
        />
      ))}
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

const mapDispatchToProps = dispatch => ({
  fetchMenuList: () => dispatch(fetchMenuList()),
  addNewFolder: (title) => dispatch(addNewFolder(title)),
  deleteFolder: (folderID) => dispatch(deleteFolder(folderID)),
  changeFolder: (value, folderID, typeAction) => dispatch(changeFolder(value, folderID, typeAction))
})

const mapStateToProps = state => ({
  folders: state.menu.folders
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)


