import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AddFolder from '../components/Folder/AddFolder'
import Folder from '../components/Folder/Folder'
import EmptyFolderList from '../components/Folder/EmptyFolderList'

import { IFolder } from '../interfaces'

import { fetchMenuList, addNewFolder, deleteFolder, changeFolder } from '../store/actions'

import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core/'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'

interface IMenuListProps {
  folders: IFolder[], 
  fetchMenuList: () => void, 
  addNewFolder: (title: string) => void, 
  deleteFolder: (folderID: string) => void, 
  changeFolder: (value: string, folderID: string, typeAction: string) => void
}

const MenuList: React.FC<IMenuListProps> = ({ folders, fetchMenuList, addNewFolder, deleteFolder, changeFolder }) => {
  const FoldersList = () => {
    if (folders.length === 0) {
      return (
        <EmptyFolderList/>
      )
    }
    return (
      <>
        {
          folders.map((folder: IFolder) => (
            <Folder
              folderData={folder}
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
  addNewFolder: (title: string) => dispatch(addNewFolder(title)),
  deleteFolder: (folderID: string) => dispatch(deleteFolder(folderID)),
  changeFolder: (value: string, folderID: string, typeAction: string) => dispatch(changeFolder(value, folderID, typeAction))
})

const mapStateToProps = (state: any) => ({
  folders: state.menu.folders,
  loading: state.menu.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)


