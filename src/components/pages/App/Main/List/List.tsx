import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AddTask from '../../../../UI/Task/AddTask'
import Task from '../../../../UI/Task/Task'

import { IAppState } from '../../../../../store'
import { IElement, ITask } from '../../../../../store/data/types'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LoadCards from '../../../../UI/LoadCardsList'
import { fetchData } from '../../../../../store/data/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: '2rem 4rem',
    }
  } 
}))

interface IListProps {
  currentUser: string
  currentFolder: string
}

interface IListState {
  lists: IElement[]
  loading: boolean
}

interface IListDispatch {
  fetchData: typeof fetchData
}

type IListC = IListProps & IListState & IListDispatch

const List: React.FC<IListC> = ({ currentUser, currentFolder, lists, loading, fetchData }) => {
  const classes = useStyles()

  useEffect(() => {
    fetchData(currentUser, currentFolder)
  }, [currentFolder])

  if (loading === true) {
    return (
      <Box p={1} minWidth='100%' maxWidth='100%' minHeight='85vh' borderColor="paper">
        <LoadCards/>
      </Box>
    )
  } 

  return (
    <>
      {
        lists.map((list: IElement) => {
          return (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              className={classes.root}
              key={list.elementID}
            >
              <Grid item>
                {
                  list.tasks.length === 0 ?
                  <h2>В списке пока нет задач</h2> :
                  list.tasks.map((task: ITask) => {
                    return (
                      <Task 
                        currentUser={currentUser}
                        currentFolder={currentFolder}
                        key={task.taskID}
                        elementID={list.elementID}
                        taskData={task}
                      />
                    )
                  })
                }
              </Grid>
              <Grid item>
                <AddTask 
                  currentUser={currentUser}
                  currentFolder={currentFolder}
                  elementID={list.elementID} 
                />
              </Grid>
            </Grid>
          )
        })
      }
    </>
  )
}

const mapStateToProps = ({ data }: IAppState) => ({
  loading: data.loading,
  lists: data.elements
})

const mapDispatchToProps = {
  fetchData: fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(List)




