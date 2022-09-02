import React from 'react'
import {Navigate, Outlet} from "react-router-dom"
import {useAuthStatus} from "../hooks/useAuthStatus"

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus()

    if (checkingStatus) {
        return 
        //<Navigate to="/new-ticket" />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />

  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute