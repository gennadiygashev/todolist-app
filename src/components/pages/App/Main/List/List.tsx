import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Task from '../../../../UI/Task/Task'
import AddForm from '../../../../UI/AddForm'
import LoadCards from '../../../../UI/LoadCardsList'

import { IAppState } from '../../../../../store'
import { IElement, ITask } from '../../../../../store/data/types'
import { addTask } from '../../../../../store/data/actions'

import { Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  addTask: typeof addTask
}

type IListC = IListProps & IListState & IListDispatch

const List: React.FC<IListC> = ({ currentUser, currentFolder, lists, loading, addTask }) => {
  const classes = useStyles()

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
                  list.tasks
                  .sort((prev) => {
                    if (prev.done === true) {
                      return 1
                    } else {
                      return -1
                    }
                  }) 
                  .map((task: ITask) => {
                    return (
                      <Task 
                        currentUser={currentUser}
                        currentFolder={currentFolder}
                        key={task.taskID}
                        elementID={list.elementID}
                        taskData={task}
                        classBorder='list'
                      />
                    )
                  })
                }
              </Grid>
              <Grid item>
                <AddForm 
                  path={{
                    currentUser,
                    currentFolder,
                    elementID: list.elementID
                  }}
                  addFunc={addTask}
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
  addTask: addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(List)




