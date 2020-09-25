import React, { useState, useEffect } from 'react'
import Task from '../Task/Task'
import AddTask from '../Task/AddTask'
import Axios from '../../axios/axios-folders';
import DeleteCard from './DeleteCard';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ChangeCard from './ChangeCard'

export default function CardT(props) {

  const [data, setData] = useState({ tasks: [] })
  const [loading, setLoading] = useState(true)
  const [emptyCard, setEmptyCard] = useState({ tasks: [{
    name: 'Добавьте новую задачу',
    important: true,
    done: false,
    key: 'emptyCard'
  }] })

  const createTask = (name) => {
    return {
      name,
      important: false,
      done: false,
      key: ''
    }
  }

  const onCompleteEmptyCard = (taskID) => {
    setEmptyCard(({ tasks }) => {
      return {
        tasks: toggleProperty(tasks, taskID, 'done')
      }
    })
  }

  const onToggleImportantEmptyCard = (taskID) => {
    setEmptyCard(({ tasks }) => {
      return {
        tasks: toggleProperty(tasks, taskID, 'important')
      }
    })
  }

  const addTask = async (text) => {
    const newTask = createTask(text);
    const activeFolderKey = props.activeFolderKey
    const cardKey = props.cardID
    await Axios.post(`/folders/${activeFolderKey}/cards/${cardKey}/tasks.json`, newTask)
    .then(function (res) {
      const taskKey = ((Object.values(res.data))[0])
      newTask.key = taskKey
      Axios.patch(`/folders/${activeFolderKey}/cards/${cardKey}/tasks/${taskKey}.json`, {'key': taskKey})
    })
    setData(({ tasks }) => {
      const newArr = [
        ...tasks,
        newTask
      ];
      return {
        tasks: newArr
      }
    })
  }

  const deleteTask = (taskID) => {
    const idx = data.tasks.findIndex((el) => el.key === taskID)
    const activeFolderKey = props.activeFolderKey
    const cardKey = props.cardID
    Axios.delete(`/folders/${activeFolderKey}/cards/${cardKey}/tasks/${taskID}.json`)
    setData(({ tasks }) => {
      const newArr = [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1)
      ]
      console.log(newArr)
      return {
        tasks: newArr
      }
    })
  }

  const toggleProperty = (arr, taskID, propName) => {
    const idx = arr.findIndex((el) => el.key === taskID);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  const onToggleImportant = (taskID) => {
    const idx = data.tasks.findIndex((el) => el.key === taskID);
    const oldItem = data.tasks[idx];
    const newItem = {...oldItem,
      ['important']: !oldItem['important']
    }
    const activeFolderKey = props.activeFolderKey
    const cardKey = props.cardID
    const taskKey = taskID
    Axios.patch(`/folders/${activeFolderKey}/cards/${cardKey}/tasks/${taskKey}.json`, {'important': newItem.important})
    setData(({ tasks }) => {
      return {
        tasks: toggleProperty(tasks, taskID, 'important')
      }
    })
  }

  const onComplete = (taskID) => {
    const idx = data.tasks.findIndex((el) => el.key === taskID);
    const oldItem = data.tasks[idx];
    const newItem = {...oldItem,
      ['done']: !oldItem['done']
    }
    const activeFolderKey = props.activeFolderKey
    const cardKey = props.cardID
    const taskKey = taskID
    Axios.patch(`/folders/${activeFolderKey}/cards/${cardKey}/tasks/${taskKey}.json`, {'done': newItem.done})
    setData(({ tasks }) => {
      return {
        tasks: toggleProperty(tasks, taskID, 'done')
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {  
        const cardKey = props.cardID
        const activeFolderKey = props.activeFolderKey
        const responseTasks = await Axios.get(`/folders/${activeFolderKey}/cards/${cardKey}/tasks.json`)
        const tasks = []
        Object.values(responseTasks.data).forEach((task) => {
          tasks.push(task)
        })  
        setData({
          tasks
        }) 
      } catch (e) {
        console.log(e)
      }  
    }
    const renderData = async () => {
      await fetchData()
      setLoading(false)  
    }
    renderData()
  }, [])

  return (
    <Box style={{ minHeight: '90vh', height: '100%' }}>
      <CardHeader
        title={props.title}
        action={
          <>
            <ChangeCard 
              changeCardTitle={props.changeCardTitle}
              cardID={props.cardID}
              title={props.title}
              currentFolder={props.currentFolder}
            />
            <DeleteCard 
              deleteCard={props.onDeleteCard}
              currentFolder={props.currentFolder}
              cardID={props.cardID}
            />
          </>
        }
        style={{ display: 'flex', alignItems: 'baseline' }}
      />
      <CardContent>
        {loading ? <CircularProgress /> :
          <>
            {data.tasks.length === 0 ? 
            emptyCard.tasks.map((task) => {
              return( 
                <Task
                  name={task.name}
                  important={task.important}
                  done={task.done}
                  key={task.key}
                  taskID={task.key}
                  onToggleImportant={onToggleImportantEmptyCard}
                  onDeleted={null}
                  onComplete={onCompleteEmptyCard}
                />   
              )                 
            }) : 
            data.tasks.map((task) => {
              return( 
                <Task
                  name={task.name}
                  important={task.important}
                  done={task.done}
                  key={task.key}
                  taskID={task.key}
                  onToggleImportant={onToggleImportant}
                  onDeleted={deleteTask}
                  onComplete={onComplete}
                />   
              )                 
            })  
            }
          </>        
        }
        <AddTask text='Добавить задачу' onItemAdded={addTask} />
      </CardContent>
    </Box> 
  )
}

