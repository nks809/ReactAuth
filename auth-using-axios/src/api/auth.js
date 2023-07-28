import Axios  from "axios"

export const getAuth= async (payload)=>{
    return Axios.post("/auth", payload, 
    {
        headers:{'content-type':'application/json'},
        withCredentials:true,
    }
    )
}