import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Folders from './pages/Folders'

export default function App() {
  return (
    <Router>
      <Route path='/' component={Folders} />
    </Router>
  )
}
