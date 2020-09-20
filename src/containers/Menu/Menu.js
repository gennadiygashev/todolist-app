// Контейнер для панели коллекции папок
import React, { useState, useEffect } from 'react'
import Axios from '../../axios/axios-folders'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core/'
import AddFolder from '../../components/UI/AddFolder/AddFolder'
import Folder from '../../components/UI/Folder/Folder'

export default function MenuT() {
  const [data, setData] = useState({ folders: [] })

  const createFolder = (name) => {
    return {
      name,
      folderColor: 'default'
    }
  }

  const deleteFolder = (key) => {
    Axios.delete(`/folders/${key}.json`)
    setData(({ folders }) => {
      const idx = data.folders.findIndex((el) => el.key === key);
      const newArr = [
        ...folders.slice(0, idx),
        ...folders.slice(idx + 1)
      ]
      return {
        folders: newArr
      }
    })
  }

  const changeTitle = (value, key) => {
    const idx = data.folders.findIndex((el) => el.key === key);
    const oldItem = data.folders[idx];
    const newItem = {...oldItem,
      ['name']: value
    }
    setData(({ folders }) => {
      const newArr = [
        ...folders.slice(0, idx),
        newItem,
        ...folders.slice(idx + 1)
      ]  
      return {
        folders: newArr
      }      
    })
    Axios.patch(`/folders/${key}.json`, {'name': value})
  }

  const changeColor = (value, key) => {
    const idx = data.folders.findIndex((el) => el.key === key);
    const oldItem = data.folders[idx];
    const newItem = {...oldItem,
      ['folderColor']: value
    }
    setData(({ folders }) => {
      const newArr = [
        ...folders.slice(0, idx),
        newItem,
        ...folders.slice(idx + 1)
      ]  
      return {
        folders: newArr
      }      
    })
    Axios.patch(`/folders/${key}.json`, {'folderColor': value})
  }

  const addFolder = async (text) => {
    const newFolder = createFolder(text);
    await Axios.post(`/folders.json`, newFolder)
    .then(function (res) {
      const folderKey = ((Object.values(res.data))[0])
      newFolder.key = folderKey
      Axios.patch(`/folders/${folderKey}.json`, {'key': folderKey})
    })
    setData(({ folders }) => {
      const newArr = [
        ...folders,
        newFolder
      ];
      return {
        folders: newArr
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {      
        const responseFolders = await Axios.get('/folders.json')
        const folders = []
        Object.values(responseFolders.data).forEach((folder) => {
          folders.push(folder)
        })  
        setData({
          folders
        }) 
      } catch (e) {
        console.log(e)
      }  
    }
    fetchData()
  }, [])


  return(
    <>
      {data.folders.map((item) => (
        <Folder 
          name={item.name}
          folderID={item.key}
          deleteFolder={deleteFolder}
          changeTitle={changeTitle}
          badgeCount={4}
          folderColor={item.folderColor}
          changeColor={changeColor}
        />
      ))}
      <Divider />
      <ListItem>
        <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
        <ListItemText primary={
          <AddFolder 
            text='Новая папка' 
            onItemAdded={addFolder}
          />       
        }/>
      </ListItem>
    </>
  )     
}


