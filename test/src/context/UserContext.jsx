import { createContext, useEffect, useState } from "react"
import api from "../services/api"

export const userData = createContext()
export default function UserContext({children}) {
  const [user,setUser] = useState(null)
  const [file,setFile] = useState(null)
  const [savefile,setSaveFile] = useState(null)
  const [selectedImage,setSelectedImage] = useState(null)
  const getuserinfo = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      
      if(!token){
        return
      }
      const res = await api.get("/user/me")
      setUser(res.data.user)
      
    } catch (error) {
      console.log(error);

      
    }
  }
  useEffect(() => {
    getuserinfo()
  },[])
  return (
    <div>
      <userData.Provider value={{user,setUser,file,setFile,savefile,setSaveFile,selectedImage,setSelectedImage}}>
      {children}
      </userData.Provider>
    </div>
  )
}

