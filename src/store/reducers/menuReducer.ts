const initialState = {
  folders: [],
  loading: false,
  error: null,
}

const menuReducer = (state = initialState, action: any) => {
  
  const folderIndex = (folderID: any) => {
    return (
      state.folders.findIndex((el: any) => el.folderID === folderID)
    )
  }  

  switch (action.type) {
    case 'FETCH_MENULIST_STARTED':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_MENULIST_SUCCESS':
      return {
        ...state,
        loading: false,
        folders: action.folders
      }
    case 'FETCH_MENULIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'DELETE_FOLDER':
      return {
        ...state,
        folders: [
          ...state.folders.slice(0, folderIndex(action.folderID)),
          ...state.folders.slice(folderIndex(action.folderID) + 1)
        ]
      }
    case 'CHANGE_FOLDER':
      const oldFolder: any = state.folders[folderIndex(action.folderID)];
      const newFolder = {...oldFolder,
        [action.typeAction]: action.value
      }  
      return {
        ...state,
        folders: [
          ...state.folders.slice(0, folderIndex(action.folderID)),
          newFolder,
          ...state.folders.slice(folderIndex(action.folderID) + 1)  
        ]
      }
    case 'CREATE_NEW_FOLDER':
      return {
        ...state,
        folders: [
          ...state.folders,
          action.folder
        ]
      }
    default:
      return state
  }
}

export default menuReducer