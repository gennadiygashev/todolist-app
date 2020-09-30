import React from 'react'
import { Link } from 'react-router-dom'

import ChangeFolder from './ChangeFolder'

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import FolderIcon from '@material-ui/icons/Folder';

interface IFolder {
  folderID: string, 
  folderColor: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error', 
  name: string, 
  deleteFolder: (folderID: any) => void, 
  changeFolder: (value: any, folderID: any, typeAction: any) => void
}

const Folder: React.FC<IFolder> = ({ folderID, folderColor, name, deleteFolder, changeFolder }) => {
  return(
    <>
      <ListItem button key={folderID} >
        <Link to={`/folders/${folderID}`}>
          <ListItemIcon>
            <FolderIcon color={folderColor} />
          </ListItemIcon>
        </Link>
        <Link to={`/folders/${folderID}`}>
          <ListItemText primary={name} />
        </Link>
        <ChangeFolder 
          deleteFolder={deleteFolder} 
          folderID={folderID} 
          name={name} 
          changeFolder={changeFolder}
          folderColor={folderColor}
        />
      </ListItem>
    </> 
  )
}

export default Folder