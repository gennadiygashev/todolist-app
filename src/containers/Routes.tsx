import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from '../components/pages/App/App'
import Auth from '../components/pages/Auth/Auth'
import Folders from '../components/pages/Folders/Folders'
import Logout from '../components/pages/Logout'
 
import { autoLogin } from '../store/auth/auth'

interface IRoutes {
  isAuthenticated: boolean,
  currentUser: string
  autoLogin: () => void
}

const Routes: React.FC<IRoutes> = ({ isAuthenticated, currentUser, autoLogin }) => {
  useEffect(() => {
    autoLogin()
  }, [])

  let routes = (
    <Switch>
      <Route path="/" component={Auth} exact />
      <Redirect to='/' />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/folders" render={() => <Folders currentUser={currentUser} />} exact />
        <Route path="/:type/:id" render={({ match }) => <App currentFolder={match.params.id} currentType={match.params.type} currentUser={currentUser} />} exact />
        <Route path="/logout" component={Logout} exact />
        <Redirect to='/folders' />
      </Switch>
    )
  }

  return (
    <Router>
      { routes }
    </Router>
  )
}

function mapStateToProps(state: any) {
  return {
    isAuthenticated: !!state.auth.token,
    currentUser: state.auth.userID
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes)