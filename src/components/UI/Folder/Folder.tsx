import React from 'react'
import { Link } from 'react-router-dom'

import ChangeFolder from './ChangeFolder'

import { IFolder } from '../../../store/folders/types'

import { Badge, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core/'
import FolderIcon from '@material-ui/icons/Folder'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { FolderSharedTwoTone } from '@material-ui/icons'

interface IFolderProps {
  currentUser: string
  folderData: IFolder
}

const Folder: React.FC<IFolderProps> = ({ currentUser, folderData }) => {
  const myFolderIcon = (folderData: IFolder) => {
    switch (folderData.typeData) {
      case ('board'): 
        return <Badge badgeContent={folderData.folderLength} color="primary"><ViewCarouselIcon color={folderData.folderColor} /></Badge>
      case ('list'): 
        return <Badge badgeContent={folderData.folderLength} color="primary"><FormatListBulletedIcon color={folderData.folderColor} /></Badge>
      default:
        return <Badge badgeContent={folderData.folderLength} color="primary"><FolderIcon color={folderData.folderColor} /></Badge>
    }
  }

  return(
    <>
      <ListItem button key={folderData.folderID} style={{
        justifyContent: 'space-between'
      }}>
        <Link to={`/${folderData.typeData}/${folderData.folderID}`}>
          <ListItemIcon style={{transform: 'translateX(4px)'}}>
            { myFolderIcon(folderData) }
          </ListItemIcon>
        </Link>
        <Link to={`/${folderData.typeData}/${folderData.folderID}`} style={{ color: 'rgba(0, 0, 0, 0.75)', textDecoration: 'none' }}>
          <ListItemText primary={folderData.name} />
        </Link>
        <ChangeFolder  
          currentUser={currentUser}
          folderData={folderData}
        />
      </ListItem>
    </>  
  )
}

export default Folder