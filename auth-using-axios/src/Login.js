import React, {useEffect, useRef, useState} from 'react'
import Axios from 'axios'
export const Login = () => {
    const userNameRef = useRef(null)
    const errRef = useRef(null)

    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setErrMsg] = useState("")
    const [success,setSuccess] = useState(false)

    useEffect(()=>{
      userNameRef.current.focus()
    },[])

    
    useEffect(()=>{
      setErrMsg('')
    },[userName,password])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
          const res= Axios.post("/auth")
        }catch(err){
          setErrMsg('Error: Either username or password incorrect')
        }
    }

  return (
    <>
    {success? <section>
      <h1>Your are logged in</h1>
      <br/>
      <a href='#'>Go To Home</a>
    </section>:
    <section>
        <p ref={errRef} className={errMsg? 'errMsg':'offScreen'} aria-live='assertive'>{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' autoComplete='off' ref={userNameRef} onChange={(e)=>setUserName(e.target.value)}  value={userName} required/>

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' onChange={(e)=>setPassword(e.target.value)}  value={password} required/>
            
            <button type='submit'>Sign in</button>
        </form>
    </section>}
    </>
  )
}
