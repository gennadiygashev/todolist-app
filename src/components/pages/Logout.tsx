import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../../store/auth/auth'

interface ILogout {
  logout: () => void
}

const Logout: React.FC<ILogout> = ({ logout }) => {
  useEffect(() => {
    logout()
  }, [])

  return (
    <Redirect to='/' />
  )
}

function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)