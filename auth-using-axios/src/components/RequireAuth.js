import React from 'react'
import { useAuthContext } from '../context/AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuthContext()
    const location = useLocation()

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet /> :
            auth?.user ?
                <Navigate to='/unauthorised' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}
