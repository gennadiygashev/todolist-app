const initialState = {
  folders: [],
  loading: false,
  error: null,
}

const menuListReducer = (state = initialState, action) => {
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
      const idxA = state.folders.findIndex((el) => el.folderID === action.folderID);
      return {
        ...state,
        folders: [
          ...state.folders.slice(0, idxA),
          ...state.folders.slice(idxA + 1)
        ]
      }
    case 'CHANGE_FOLDER':
      const idx = state.folders.findIndex((el) => el.folderID === action.folderID);
      const oldItem = state.folders[idx];
      const newItem = {...oldItem,
        [action.typeAction]: action.value
      }  
      return {
        ...state,
        folders: [
          ...state.folders.slice(0, idx),
          newItem,
          ...state.folders.slice(idx + 1)  
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

export default menuListReducer