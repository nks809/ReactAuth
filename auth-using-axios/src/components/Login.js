import React, { useEffect, useRef, useState } from 'react'
// import Axios from 'axios'
import { getAuth } from '../api/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProvider'

const fakeAuthVal = {
  user: "Nikhil Singh",
  roles: ['admin', 'manager', 'account'],
  accessToken: 'abcdxyz'
}

export const Login = () => {
  const userNameRef = useRef(null)
  const errRef = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'

  const { setAuth } = useAuthContext()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    userNameRef.current.focus()
  }, [])


  useEffect(() => {
    setErrMsg('')
  }, [userName, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await getAuth({ username: userName, password })
      setAuth(res?.data || fakeAuthVal) //need to remove this, just for testing
      setPassword('')
      setUserName('')
      navigate(from, { replace: true })
    }
    catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password!")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised")
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
      console.error(err)
    }
  }

  return (
    <>
      <section >
        <p ref={errRef} className={errMsg ? 'errMsg' : 'offScreen'} aria-live='assertive'>{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' autoComplete='off' ref={userNameRef} onChange={(e) => setUserName(e.target.value)} value={userName} required />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
          </div>
          <button type='submit'>Sign in</button>
        </form>
        <p>Need an account?</p>
        <span className='line'>
          <Link href='/register'>Sign Up</Link>
        </span>
      </section>
    </>
  )
}
