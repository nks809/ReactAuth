import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider'

export const Home = () => {
  const { auth, setAuth } = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    setAuth({})
    navigate('/')
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {auth?.user ? <>
          <p>You are logged in</p>
          <button onClick={logout}>LogOut</button>
        </> : <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </>
        }
      </div>
      <br />
      <div>Welcome Home</div>
      <br />

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Link to={'/admin'}>Admin</Link>
        <Link to={'/manage'}>Manage</Link>
        <Link to={'/account'}>Account</Link>
      </div>
    </>
  )
}
