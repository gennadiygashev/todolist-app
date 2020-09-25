const [data, setData] = useState({ currentCards: [] })
  
const createCard = () => {
  return {
    title: 'Hello World'
  }
}


const onDeleteCard = (cardID) => {
  const idx = data.currentCards.findIndex((el) => el.key === cardID)
  const activeFolderKey = props.folderID
  Axios.delete(`/folders/${activeFolderKey}/cards/${cardID}.json`)
  setData(({ currentCards }) => {
    const newArr = [
      ...currentCards.slice(0, idx),
      ...currentCards.slice(idx + 1)
    ]
    return {
      currentCards: newArr
    }
  })
}

