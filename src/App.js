import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Folders from './pages/Folders'
import Auth from './pages/Auth'

export default function App() {
  return (
    <Router>
      <Route path='/folders' component={Folders} />
      <Route path='/' component={Auth} exact/>
    </Router>
  )
}
