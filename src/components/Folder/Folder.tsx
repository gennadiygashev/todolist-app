import React from 'react'
import { Link } from 'react-router-dom'

import ChangeFolder from './ChangeFolder'

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import FolderIcon from '@material-ui/icons/Folder'
import { IFolder } from '../../interfaces'

interface IFolderProps {
  folderData: IFolder
  deleteFolder: (folderID: string) => void, 
  changeFolder: (value: string, folderID: string, typeAction: string) => void
}

const Folder: React.FC<IFolderProps> = ({ folderData, deleteFolder, changeFolder }) => {
  return(
    <>
      <ListItem button key={folderData.folderID} >
        <Link to={`/folders/${folderData.folderID}`}>
          <ListItemIcon>
            <FolderIcon color={folderData.folderColor} />
          </ListItemIcon>
        </Link>
        <Link to={`/folders/${folderData.folderID}`}>
          <ListItemText primary={folderData.name} />
        </Link>
        <ChangeFolder 
          deleteFolder={deleteFolder} 
          folderID={folderData.folderID} 
          name={folderData.name} 
          changeFolder={changeFolder}
          folderColor={folderData.folderColor}
        />
      </ListItem>
    </> 
  )
}

export default Folder