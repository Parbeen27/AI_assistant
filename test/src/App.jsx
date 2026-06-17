import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Customize from './pages/Customize'
import { userData } from './context/UserContext'
import Home from './pages/Home'
function App() {
  const {user,selectedImage} = useContext(userData)
  return (
    <Routes>
      <Route path='/' element={user? <Home/> : <Navigate to={"signin"}/>}/>
      <Route path='/signup' element={!user?<Signup/> : <Navigate to={"/"}/>}/>
      <Route path='/signin' element={!user?<Signin/> : <Navigate to={"/"}/>}/>
      <Route path='/customize' element={user?<Customize/> : <Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App