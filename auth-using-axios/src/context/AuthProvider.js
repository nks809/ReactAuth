import { createContext, useContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({})

    const value = {
        auth,
        setAuth
    }
    
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    return context
}